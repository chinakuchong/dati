/*!
 * oss - node.js sdk 
 * oss core
 * Copyright(c) 2012 fantaysni <fantasyni@163.com>
 * MIT Licensed
 */

var Emitter = require('events').EventEmitter;
var request = require('request');
var mimetypes = require('mime'); 
var fs = require('fs'); 
var path = require('path');
var async = require('async');
var xml2js = require('xml2js');
var data2xml = require('data2xml');
var util = require('util');
var oppressor = require('oppressor')
var crypto = require('crypto');
var _ = require('../util');
var ProgressBar = require('progress');
var con = require('../config.js');
var ndir = require('ndir');
var bucket_filter = require('./filter').bucket_filter;
var object_filter = require('./filter').object_filter;

var emitter = new Emitter;
var written = 0;
var debug_mode = 0;
emitter.on("progress",function(result){
	//console.log(result);
	process.stdout.write('\r\033[2K' + JSON.stringify(result));
})

var oss = function(options){
	this._accessId = options.accessId;
	this._accessKey = options.accessKey;
	this._host = options.host || "oss.aliyuncs.com";
	//"storage.aliyun.com";
	this._port = options.port || "8080";
	this._timeout = 50000;

	if(this._accessId == "" || this._accessKey == ""){
		throw new Error("OSS accessId and accessKey are both required");
	}
}

module.exports = oss;

var pro = oss.prototype;

/**
* oss authRequest
* @param object $options (Optional)
* @return {cb}
* @api private
*/
pro.authRequest = function(options,cb){
	var self = this;

	// check Bucket name,list_bucket do not have to
	if(!((('/' == options[con.OSS_OBJECT])||('' == options[con.OSS_BUCKET]))&&('GET' == options[con.OSS_METHOD])) && !_.validate_bucket(options[con.OSS_BUCKET])){
		throw new Error("oss_bucket : " + options[con.OSS_BUCKET] + " invalid");
	}

	//Object charset should be UTF-8
	// gb2312->utf8
	// current version do not support gb2312 or gbk object name
	if(_.is_gb2312(options[con.OSS_OBJECT])){
		throw new Error('current version do not support gb2312 or gbk object name !!!');
	}

	//check Object name
	if(options[con.OSS_OBJECT] !== "" && typeof options[con.OSS_OBJECT] === "string" && !_.validate_object(options[con.OSS_OBJECT])){
		throw new Error("oss_object : " + options[con.OSS_OBJECT] + " invalid");
	}

	//check ACL
	if(typeof options[con.OSS_HEADERS]!== "undefined" && typeof options[con.OSS_HEADERS][con.OSS_ACL] === "string" && options[con.OSS_HEADERS][con.OSS_ACL] != "" ){
		for(var _acl in options[con.OSS_HEADERS][con.OSS_ACL]){
			var _temp = _acl.toLowerCase();
			var _flag = 0;
			for(var _i in options[con.OSS_HEADERS][con.OSS_ACL]){
				if(_temp == _i) {
					_flag = 1;
					break;
				}
			}
			if(_flag == 0){
				throw new Error("oss_acl : " + options[con.OSS_HEADERS][con.OSS_ACL] + "invalid");
			}
		}
	}

	//make url
	var url = this.make_url(options);
	options['url'] = url;

	var request_md5 = "";
	var response_md5 = ""; //etag
	
	async.waterfall([
			function getHeader(callback){
				self.get_headers(options,function(headers){
					//if(options['action'] === 'GET_SIGN_URL'){
					//	var sign_url = url + '?' + this._accessId + '&Expires=' + options['expires'] + '&Signature=' + headers 
					//}
					callback(null,headers);
				});
			},
			function doRequest(headers,callback){
				options['headers'] = headers;
				options['timeout'] = options['timeout'] || self._timeout;
				var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
					      complete: '='
					    , incomplete: ' '
					    , width: 20
					    , total: parseInt(options['filesize']) || 0
				});
				var req = request(options,function(err,response,body){
					
					if(err && cb) cb(err);
					if(response && response.statusCode != 200 && response.statusCode != 204){
						var e = new Error(body);
			            e.code = response.statusCode;
			            if (cb) cb(e);
					}else{
						if (body && !options.dstFile) {
			              var parser = new xml2js.Parser();
			              parser.parseString(body, function(error, result) {
			              	if(error) throw error;
			                cb(error, result);
			              });
			            } else {
			            	if(response && response.headers){
			            		cb(err,{bucket: options['bucket'],
				              			method: options['method'],
				              			request_header:options['headers'],
				              			response_header:response.headers,
				              			statusCode:response.statusCode,
				              			status:"operations finished"
			              		});
			            	}
				              
			            }
					}
				});
				  // put a file to oss
			      if (typeof options['action']!="undefined" && options.srcFile) {
			      	var rstream ; 
			      	if(options['action'] == "UPLOAD_PART"){
			      		rstream = fs.createReadStream(options.srcFile,{start:options['seekTo'],end:(options['upload_length']+options['seekTo']-1)});
			      	}else{
			      		rstream = fs.createReadStream(options.srcFile);
			      	}
			        
			        if(options['gzip']){
			        	rstream.pipe(oppressor(req));
			        }else{
			        	rstream.pipe(req);
			        }
			     
			          var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
					      complete: '='
					    , incomplete: ' '
					    , width: 20
					    , total: options['filesize']
					  });

			        rstream.on('data', function(chunk){
			        	written+=chunk.length;
			        	//bar.tick(chunk.length);
			        	emitter.emit('progress',{
			        		 percent: written/options['filesize'] * 100 | 0
						     , written: written
						     , total:  options['filesize']
			        	});
				    });				
				    req.on('progress', emitter.emit.bind(emitter, 'progress'));    
			      }

			      // get a object from oss and save as a file
			      if (typeof options['action']!="undefined" && options.dstFile) {
			        var wstream = fs.createWriteStream(options.dstFile);
			        
				    req.pipe(wstream);
			      }
			      callback(null,req);
			}
		],function(err,result){
			if(err) cb(err,result);
	});

}

/**
* make request URL
* @param object $options (Optional)
* @return string
* @api private
*/
pro.make_url = function(options){
	var url = "";
	var params = [];
	url += con.use_ssl ? 'https://' : 'http://';
	url += (this._host+":"+this._port);

	if(typeof options[con.OSS_BUCKET] === "string"){
		url += ('/' + options[con.OSS_BUCKET]);
	}
	if(typeof options[con.OSS_OBJECT] === "string"){
		url = url + '/' + options[con.OSS_OBJECT];
	}

	if(typeof options[con.OSS_PREFIX] === "string"){
		params.push('prefix=' + options[con.OSS_PREFIX]);
	}

	if(typeof options[con.OSS_MARKER] === "string"){
		params.push('marker=' + options[con.OSS_MARKER]);
	}

	if(typeof options[con.OSS_MAX_KEYS] !== "undefined"){
		params.push('max-keys=' + options[con.OSS_MAX_KEYS]);
	}

	if(typeof options[con.OSS_DELIMITER] === "string"){
		params.push('delimiter=' + options[con.OSS_DELIMITER]);
	}

	if(params.length > 0){
		url = url + '?' + params.join('&');
	}

	//Acl
	if(typeof options[con.OSS_ACL] !== "undefined" ){
		url += '?acl';
	}  

	//Group
	if(typeof options[con.OSS_OBJECT_GROUP] !== "undefined"){
		url += '?group';
	}

	//Multi part
	if(typeof options[con.OSS_MULTI_PART] !== "undefined"){
		url += '?uploads';
	}

	//Multi Delete
	if(typeof options[con.OSS_MULTI_DELETE] !== "undefined"){
		url += '?delete';
	}

	//partNumber
	if(typeof options["partNumber"] !== "undefined"){
		url += ('?partNumber='+options["partNumber"]);
	}

	//uploadId
	if(typeof options["uploadId"] !== "undefined"){
		url += ('?uploadId='+options["uploadId"]);
	}

	url = url.replace(/\?/g,"&").replace(/\&/,"?");

	return url;
}

/**
* get canonicalizeResource for the auth
* @param object $options (Optional)
* @return string
* @api private
*/
pro.canonicalizeResource = function(options){
	var resource = '';

	if(typeof options[con.OSS_BUCKET] === 'string'){
		resource = '/' + options[con.OSS_BUCKET];
	}

	if(typeof options[con.OSS_OBJECT] === 'string'){
		resource = resource + '/' + options[con.OSS_OBJECT];
	}
		      
	//Acl
	if(typeof options[con.OSS_ACL] !== "undefined" ){
		resource += '?acl';
	}  

	//Group
	if(typeof options[con.OSS_OBJECT_GROUP] !== "undefined"){
		resource += '?group';
	}

	//partNumber
	if(typeof options["partNumber"] !== "undefined"){
		resource += ('?partNumber='+options["partNumber"]);
	}

	//Multi part
	if(typeof options[con.OSS_MULTI_PART] !== "undefined"){
		resource += '?uploads';
	}

	//uploadId
	if(typeof options["uploadId"] !== "undefined"){
		resource += ('?uploadId='+options["uploadId"]);
	}

	//Multi Delete
	if(typeof options[con.OSS_MULTI_DELETE] !== "undefined"){
		resource += '?delete';
	}

	resource = resource.replace(/\?/g,"&").replace(/\&/,"?");

	return resource;
}

/**
 * Perform the following:
 *
 *  - ignore non-oss headers
 *  - lowercase fields
 *  - sort lexicographically
 *  - trim whitespace between ":"
 *  - join with newline
 *
 * @param {Object} headers
 * @return {String}
 * @api private
 */
pro.canonicalizeHeaders = function(headers){
	var buf = []
    , fields = Object.keys(headers);
  for (var i = 0, len = fields.length; i < len; ++i) {
    var field = fields[i]
      , val = headers[field]
      , field = field.toLowerCase();
    if (0 !== field.indexOf('x-oss')) continue;
    buf.push(field + ':' + val);
  }
  return buf.sort().join('\n'); 
}

/**
* get http request headers
* @param object options 
* @return string
* @api private
*/
pro.get_headers = function(options,cb){
	var headers = {};
	var self = this;
	
	if(options['action'] == "UPLOAD_PART" && options.srcFile){
		headers['content-type'] = mimetypes.lookup(path.extname(options.srcFile));
		self.fillHeaders(options,headers);
		cb(headers);
	}else{
		if(typeof options['action'] !== "undefined" && options.srcFile){
			headers['content-type'] = mimetypes.lookup(path.extname(options.srcFile));
			async.waterfall([	
					function checkFile(callback){
						fs.stat(options.srcFile,function(err,stats){
							if(err) throw err;
							callback(err,stats,options.srcFile);
						});
					},
					function readFile(stats,file,callback){
						if(stats.isFile()){
							fs.readFile(file,'utf8',function(err,data){
								callback(err,stats,data);
							});
						}else{
							throw new Error("file is not exist");
						}
					},
					function fillFileData(stats,data,callback){
						headers['Content-MD5'] = _.md5(data);
						self.fillHeaders(options,headers);
						if(typeof headers['Content-Length'] == "undefined"){
							options['filesize'] = stats.size;
							headers['Content-Length'] = stats.size; // file length
						}
						callback(null,headers);
					}
				],function(err,result){
					cb(headers);
				}
			);
		}else{
			self.fillHeaders(options,headers);
			cb(headers);
		}
	}
}

/**
* fill headers
* @param object $options (Required)
* @return 
* @api private
*/
pro.fillHeaders = function(options,headers){
	headers['Date'] = new Date().toGMTString();

	if(options[con.OSS_GROUP]){
		headers['content-type'] = 'txt/xml';
	}

	for(var key in options['headers']){
		headers[key] = options['headers'][key];
	}

	headers['Authorization'] = this.authorization(options,headers);
}

/**
 * Return an "Authorization" header value with the given `options`
 * in the form of "OSS <key>:<signature>"
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */

pro.authorization = function(options,headers){
	var method = options['method'];
	var content_md5 = headers['Content-MD5'] || '';
	var content_type = headers['content-type'] || '';
	var date = headers['Date'];
	var canonicalizeHeader = this.canonicalizeHeaders(headers);
	var resource = this.canonicalizeResource(options);

	
	var params = [method,content_md5,content_type,date];

	// this is a trick
	if(canonicalizeHeader != ""){
		params.push(canonicalizeHeader);
	}
	params.push(resource);
	var string_to_sign = params.join('\n') ;
	
	//var string_to_sign = method + '\n' + content_md5 + '\n' + content_type + '\n' + date + '\n' + canonicalizeHeader + resource;

  	return 'OSS ' + this._accessId + ':' + this.hmacSha1(string_to_sign);
};

/**
 * Simple HMAC-SHA1 Wrapper
 *
 * @param signature
 * @return {String}
 * @api private
 */ 

pro.hmacSha1 = function(signature){

  return crypto.createHmac('sha1', this._accessKey).update(signature).digest('base64');
};


/*
* bucket operations
*/

/**
 *  Get_Service 
 *  list all the bucket you own
 *  
 *  @param 
 *  @return {cb}
 *  @api public
 */
pro.get_service = pro.list_bucket = function(callback){
	var options = {};
	options['method'] = "GET";
	options['bucket'] = '';

	this.authRequest(options,callback);
}

/**
 *  Create_Bucket 
 *  create a bucket in oss with acl default 'private'
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      headers {optional}: {   
 *			"x-oss-acl" : acl
 *		}
 *	}
 *  @return {cb}
 *  @api public
 */
pro.create_bucket = function(options,callback){
	bucket_filter(options);

	options['method'] = "PUT";
	options['x-oss-acl'] = options['x-oss-acl'] || con.OSS_ACL_TYPE_PRIVATE;

	this.authRequest(options,callback);
}

/**
 *  Get_Bucket 
 *  get the list of objects in the bucket
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      prefix {optional}: prefix,
 *		max-keys {optional}: max-keys,
 *		marker {optional}: marker,
 *		delimiter {optional}: delimiter
 *	}
 *  @return {cb}
 *  @api public
 */
pro.get_bucket = pro.list_object = function(options,callback){
	bucket_filter(options);

	options['method'] = "GET";

	this.authRequest(options,callback);
}

/**
 *  Delete_Bucket 
 *  delete bucket in oss
 *  
 *  @param {
 *		bucket {required}: bucketName
 *	}
 *  @return {cb}
 *  @api public
 */
pro.delete_bucket = function(options,callback){
	bucket_filter(options);

	options['method'] = "DELETE";

	this.authRequest(options,callback);
}

/**
 *  Get_Bucket_Acl
 *  get the acl of the bucket
 *  
 *  @param {
 *		bucket {required}: bucketName
 *	}
 *  @return {cb}
 *  @api public
 */
pro.get_bucket_acl = function(options,callback){
	bucket_filter(options);

	options['method'] = "GET";
	options['oss-acl'] = "acl";

	this.authRequest(options,callback);
}

/**
 *  Set_Bucket_Acl
 *  set the bucket acl 
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *		headers {required} : {
 *			"x-oss-acl" : acl
 *		}
 *	}
 *  @return {cb}
 *  @api public
 */
pro.set_bucket_acl = function(options,callback){
	bucket_filter(options);

	options['method'] = "PUT";
	options['headers']['x-oss-acl'] = options['headers']['x-oss-acl'] || con.OSS_ACL_TYPE_PRIVATE;

	this.authRequest(options,callback);
}

/*
******************************************object operations**********************************
*/

/**
 *  Put_Object 
 *  put a object to a bucket in oss
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName, { you can use / to create a directory in oss}
 *		srcFile {required}: localObjectPath
 *	}
 *  @return {cb}
 *  @api public
 */
pro.put_object = function(options,callback){
	if(typeof options != "undefined"){
		if(typeof options['srcFile'] == "undefined"){
			throw new Error("put_object path is required");
		}
		bucket_filter(options);
		object_filter(options);
	}

	options['method'] = "PUT";
	options['action'] = "UPLOAD_OBJECT";
	written = 0;
	this.authRequest(options,callback);
}

/**
 *  Get_Object
 *  get the object
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName,
 *		dstFile {required}: downLoadObjectPath
 *	}
 *  @return {cb}
 *  @api public
 */
pro.get_object = function(options,callback){
	if(typeof options != "undefined"){
		if(typeof options['dstFile'] == "undefined"){
			throw new Error("get_object path is required");
		}
		bucket_filter(options);
		object_filter(options);
	}

	var self = this;
	self.head_object({
		bucket:options['bucket'],
		object:options['object']
	},function(err,result){
		options['filesize'] = result['response_header']['content-length'];
		options['method'] = "GET";
		self.authRequest(options,callback);
	})
}

/**
 *  Copy_Object 
 *  copy object which can be in different bucket in oss 
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName,
 *		copyBucket {required}: copyBucket,
 *		copyObject {required}: copyObjectName
 *	}
 *  @return {cb}
 *  @api public
 */
pro.copy_object = function(options,callback){
	bucket_filter(options);
	object_filter(options);

	options['method'] = "PUT";

	if(typeof options["copyBucket"] == "undefined" || typeof options["copyObject"] == "undefined"){
		throw new Error("dstBucket and dstObject are both required");
	}
	options.headers = {};
	options['headers'][con.OSS_OBJECT_COPY_SOURCE] = "/" + options["copyBucket"] + "/" + options["copyObject"];

	this.authRequest(options,callback);
}

/**
 *  Head_Object 
 *  get the meta infomation for the object like acl
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName
 *	}
 *  @return {cb}
 *  @api public
 */
pro.head_object = function(options,callback){
	bucket_filter(options);
	object_filter(options);

	options['method'] = "HEAD";

	this.authRequest(options,callback);
}

/**
 *  Delete_Object 
 *  delete an object in the bucket
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName
 *	}
 *  @return {cb}
 *  @api public
 */
pro.delete_object = function(options,callback){
	bucket_filter(options);
	object_filter(options);

	options['method'] = "DELETE";

	this.authRequest(options,callback);
}

/**
 *  Delete_Objects 
 *  delete many objects in the bucket
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      objects {required}: [ossObjectName1,ossObjectName2,...]
 *	}
 *  @return {cb}
 *  @api public
 */
pro.delete_objects = function(options,callback){
	bucket_filter(options);

	options['method'] = "POST";
	options[con.OSS_MULTI_DELETE] = "delete";
	options['quiet'] = options['quiet'] || "false";

	var objects = options['objects'];
	if(objects.length != 0){
		var xml_obj = {
			Quiet : options['quiet'],
			Object : []
		}

		for(var key in objects){
			xml_obj.Object.push({Key:objects[key]});
		}

		var xml_content = data2xml("Delete",xml_obj);

		options['body'] = xml_content;
		options['Content-type'] = 'application/xml';
		options['headers'] = {}
		
		options['headers']['Content-Length'] = xml_content.length;
		options['headers']['Content-MD5'] = crypto.createHash('md5').update(xml_content).digest('base64');

		this.authRequest(options,callback);
	}else{
		callback(null,"no objects in this bucket");
	}
}

/**
 *  Create_Dir 
 *  create a dir in oss
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      dir {required}: dirName { with / in the end to represent a dir}
 *	}
 *  @return {cb}
 *  @api public
 */
pro.create_dir = function(options,callback){
	if(typeof options != "undefined"){
		bucket_filter(options);
	}

	options['method'] = "PUT";
	options['object'] = options['dir'] || '/';

	this.authRequest(options,callback);
}

/*
***************************************multipart operations******************************************
*/

/**
 *  Get_Multipart_Counts 
 *  divide a big file and get the parts array
 *  
 *  @param {
 *		upload_filesize {required}: fileSize,  
 *      part_size {optional}: dividePartSize
 *	}
 *  @return {array}
 *  @api private
 */
pro.get_multipart_counts = function(upload_filesize,part_size){
	part_size = part_size || 5242880; // default 5M
	part_size = _.getPartSize(part_size);

	var sizeCount = upload_filesize;
	var values = [];
	var i = 0;
	while(sizeCount>0){
		sizeCount -= part_size;
		values.push({ seekTo : part_size*i,
					  length : (sizeCount > 0) ? part_size : (sizeCount+part_size)
					});
		i++;
	}

	return values;
}

/**
 *  Initiate_Mulipart_Upload 
 *  do initiation and get the upload_id 
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName
 *	}
 *  @return {cb}
 *  @api private
 */
pro.initiate_multipart_upload = function(options,callback){
	bucket_filter(options);
	object_filter(options);

	options['method'] = "POST";
	options[con.OSS_MULTI_PART] = "uploads";

	this.authRequest(options,callback);
}

/**
 *  Initiate_Mulipart_Upload 
 *  do initiation and get the upload_id 
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName
 *	}
 *  @return {cb}
 *  @api private
 */
pro.upload_part = function(options,callback){
	bucket_filter(options);
	object_filter(options);

	if(typeof options['partNumber'] == "undefined" || typeof options['uploadId'] == "undefined"){
		throw new Error("partNumber and uploadId are both required");
	}

	options['method'] = "PUT";
	options['action'] = "UPLOAD_PART";

	this.authRequest(options,callback);
}

/**
 *  Complete_Mulipart_Upload 
 *  mulipart_upload complete operation
 *  
 *  @param 
 *  @return {cb}
 *  @api private
 */
pro.complete_multipart_upload = function(options,callback){
	bucket_filter(options);
	object_filter(options);

	if(typeof options['uploadId'] == "undefined"){
		throw new Error("uploadId is required");
	}

	options['method'] = "POST";
	this.authRequest(options,callback);
}

/**
 *  Mulipart_Upload_Object
 *  mulipart_upload operation
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName,
 *		srcFile {required}: localObjectPath
 *	}
 *  @return {cb}
 *  @api public
 */
pro.multipart_upload_object = function(options,cb){
	bucket_filter(options);
	object_filter(options);

	if(typeof options['srcFile'] == "undefined"){
		throw new Error("upload object path is required");
	}

	written = 0;
	var srcFile = options['srcFile'];
	options['partSize'] = options['partSize'] || 5242880;
	var self = this;
	//var upload_filesize = 0;
	async.waterfall([
			function checkFile(callback){
				fs.stat(options.srcFile,function(err,stats){
					if(err) throw err;
					callback(err,stats,options.srcFile);
				});
			},
			function getFileSize(stats,file,callback){
				if(stats.isFile()){
					//upload_filesize = stats.size;
					options['filesize'] = stats.size;
					callback(null,stats.size,file);
				}else{
					throw new Error("file is not exist");
				}
			},
			function filterFileUpload(filesize,file,callback){
				options['partSize'] = _.getPartSize(options['partSize']);
				if(filesize <= 52428800*2){ // if it is not a big file ,simple upload it 
					self.put_object(options,function(err,result){
						cb(err,result);
						return;
					});
				}else{  // multipart_upload_file
					options['srcFile'] = undefined;
					self.initiate_multipart_upload(options,function(err,result){
						var pieces = self.get_multipart_counts(filesize,options['partSize']);
						options['uploadId'] = result['InitiateMultipartUploadResult']['UploadId'];
						options[con.OSS_MULTI_PART] = undefined;
						options['srcFile'] = srcFile;
						callback(err,result['InitiateMultipartUploadResult']['UploadId'],pieces);
					})	
				}
			},
			function uploadFilePart(uploadId,pieces,callback){
				var i = 0;
				var parts = [];
				async.whilst(
					function(){ return i < pieces.length; },
					function(_cb){
						options['partNumber'] = i+1;
						if(typeof options['headers'] == "undefined"){
							options['headers'] = {};
						}
						options['headers']['Content-Length'] = pieces[i]['length'];
						options['seekTo'] = pieces[i]['seekTo'];
						options['upload_length'] = pieces[i]['length'];
						self.upload_part(options,function(err,result){
							if(result){
								parts.push({partNumber:i+1,etag:result['response_header']['etag']});
								i++;
								_cb(err,result);
							}
						})
					},
					function(err){
						delete pieces;
						callback(null,parts);
					}
				);
				
			},
			function completeMultipartUpload(parts,callback){
				var xml_obj = {
					Part : []
				}
		
				for(var key in parts){
					xml_obj.Part.push({PartNumber:parts[key]['partNumber'],ETag:parts[key]['etag']});
				}

				var xml_content = data2xml("CompleteMultipartUpload",xml_obj);
				delete xml_obj;
				delete parts;
				options['partNumber'] = undefined;
				options['body'] = xml_content;
				options['action'] = undefined;
				options['Content-type'] = 'application/xml';
				options['headers'] = {}
				
				options['headers']['Content-Length'] = xml_content.length;
				options['headers']['Content-MD5'] = crypto.createHash('md5').update(xml_content).digest('base64');
				delete xml_content;
				
				self.complete_multipart_upload(options,function(err,result){
					callback(err,result);
				})
			}
		],function(err,result){
			cb(err,result); 
	})
}

/**
 *  Abort_Multipart_Upload
 *  when using multipart_upload ,you can abort the process by using this api
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName,
 *		uploadId {required}: mulipartUploadId
 *	}
 *  @return {cb}
 *  @api public
 */
pro.abort_multipart_upload = function(options,callback){
	bucket_filter(options);
	object_filter(options);

	if(typeof options['uploadId'] == "undefined"){
		throw new Error("uploadId is required");
	}

	options['method'] = "DELETE";

	this.authRequest(options,callback);
}

/**
 *  List_Multipart_Uploads
 *  you can list the object by using mulipart_upload in the bucket
 *  
 *  @param {
 *		bucket {required}: bucketName
 *	}
 *  @return {cb}
 *  @api public
 */
pro.list_multipart_uploads = function(options,callback){
	bucket_filter(options);

	options['method'] = "GET";
	options[con.OSS_MULTI_PART] = "uploads";

	this.authRequest(options,callback);
}

/**
 *  List_Parts
 *  list mulipart_upload parts
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName,
 *		uploadId {required}: multipartUploadId
 *	}
 *  @return {cb}
 *  @api public
 */
pro.list_parts = function(options,callback){
	bucket_filter(options);
	object_filter(options);

	if(typeof options['uploadId'] == "undefined"){
		throw new Error("uploadId is required");
	}

	options['method'] = "GET";

	this.authRequest(options,callback);
}

/*
*******************************************object group operations*************************************
*/

/**
 *  Create_Object_Group
 *  softly link some objects to become a big one 
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectGroupName,
 *		objects {required}: [ossObject1,ossObject2,...]
 *	}
 *  @return {cb}
 *  @api public
 */
pro.create_object_group = function(options,callback){
	bucket_filter(options);
	object_filter(options);

	if(typeof options['objects'] == "undefined"){
		throw new Error("object_group objects are required");
	}
	
	options['method'] = "POST";
	options[con.OSS_OBJECT_GROUP] = "group";

	var self = this;
	var objects = options['objects'];
	var i = 0;

	var xml_obj = {
		Part : []
	}

	var xml_content = "";

	async.whilst(
		function(){ return i<objects.length; },
		function(_cb){
			self.head_object({bucket:options["bucket"],object:objects[i]},function(err,result){
				xml_obj.Part.push({PartNumber:(i+1),PartName:objects[i],ETag:result['response_header']['etag']});
				i++;
				_cb(err,result);
			})
		},
		function(err){
			xml_content = data2xml("CreateFileGroup",xml_obj);
			options['body'] = xml_content;
			options['Content-type'] = 'application/xml';
			options['headers'] = {}
						
			options['headers']['Content-Length'] = xml_content.length;
			options['headers']['Content-MD5'] = crypto.createHash('md5').update(xml_content).digest('base64');
			self.authRequest(options,callback);
		}
	);
}

/**
 *  Get_Object_Group
 *  object group is the same as simple oss object
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName,
 *		dstFile {required}: downLoadObjectPath
 *	}
 *  @return {cb}
 *  @api public
 */
pro.get_object_group = pro.get_object;

/**
 *  Get_Object_Group_Index
 *  get the index of object_group
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName
 *	}
 *  @return {cb}
 *  @api public
 */
pro.get_object_group_index = function(options,callback){
	bucket_filter(options);
	object_filter(options);

	options['method'] = "GET";
	options['headers'] = {};
	options['headers']['x-oss-file-group'] = undefined;

	this.authRequest(options,callback);
}

/**
 *  Head_Object_Group
 *  get the meta infomation of the object_group
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName
 *	}
 *  @return {cb}
 *  @api public
 */
pro.head_object_group = pro.head_object;

/**
 *  Delete_Object_Group
 *  delete the object_group
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      object {required}: ossObjectName
 *	}
 *  @return {cb}
 *  @api public
 */
pro.delete_object_group = pro.delete_object;

/**
*****************************************************other useful functions*******************************
*/

/**
 *  Upload_Objects_By_Dir
 *  you can upload local dir files to oss
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      ossDir {required}: ossDirName, 
 *		local {required}: localDirPath
 *	}
 *  @return {cb}
 *  @api public
 */
pro.upload_objects_by_dir = function(options,callback){
	if(typeof options['local'] == "undefined"){
		throw new Error("local dir is required");
	}
	var self = this;
	var _path = options['local'];
	var bucket = options['bucket'];
	var ossDir = options['ossDir'];
	var _files = [];
	fs.stat(_path,function(err,stats){
		if(stats.isDirectory()){
			var walker = ndir.walk(_path);
			walker.on('dir', function(dirpath, files) {
			  for (var i = 0, l = files.length; i < l; i++) {
			    var info = files[i];
			    if (info[1].isFile()) {
			    	console.log(info[0]);
			    	_files.push(info[0]);
			    }
			  }
			});
			walker.on('end',function(){
				var _i = 0;
				
				async.whilst(
					function(){ return _i<_files.length; },
					function(_cb){
						options = {};
						options['bucket'] = bucket;
						options['srcFile'] = _files[_i];
						if(ossDir){
							if(ossDir[ossDir.length-1] == '/'){
								options['object'] = ossDir + _.getFileName(_files[_i]);
							}else{
								options['object'] = ossDir + '/' + _.getFileName(_files[_i]);
							}
						}else{
							options['object'] = _.getFileName(_files[_i]);
						}
						self.multipart_upload_object(options,function(err,_res){
							_i++;
							_cb(err,_res);
						});		
					},
					function(err){
							callback(err,"upload_objects_by_dir good");
					}
				);
				
			});
		}else{
			throw new Error("local dir is not a directory");
		}
	});
}

/**
 *  Sync_Local_Dir
 *  similar to upload_objects_by_dir the differene is the dir will also be created in oss
 *  
 *  @param {
 *		bucket {required}: bucketName,  
 *      ossDir {required}: ossDirName, 
 *		local {required}: localDirPath
 *	}
 *  @return {cb}
 *  @api public
 */
pro.sync_local_dir = function(options,callback){
	if(typeof options['local'] == "undefined"){
		throw new Error("local dir is required");
	}
	var self = this;
	var _path = options['local'];
	var bucket = options['bucket'];
	var ossDir = options['ossDir'];
	var _files = [];
	var _dirname = path.resolve(_path);
	if(_dirname[_dirname.length-1] != '/'){
		_dirname = _dirname + '/';
	}
	fs.stat(_path,function(err,stats){
		if(stats.isDirectory()){
			var walker = ndir.walk(_path);
			walker.on('dir', function(dirpath, files) {
			  for (var i = 0, l = files.length; i < l; i++) {
			    var info = files[i];
			    if (info[1].isFile()) {
			    	_files.push(info[0]);
			    }
			  }
			});
			walker.on('end',function(){
				var _i = 0;
				
				async.whilst(
					function(){ return _i<_files.length; },
					function(_cb){
						options = {};
						options['bucket'] = bucket;
						options['srcFile'] = _files[_i];
						if(ossDir){
							if(ossDir[ossDir.length-1] == '/'){
								options['object'] = ossDir + _.getAbsoluteFileName(_dirname,_files[_i]);
							}else{
								options['object'] = ossDir + '/' + _.getAbsoluteFileName(_dirname,_files[_i]);
							}
						}else{
							options['object'] = _.getAbsoluteFileName(_dirname,_files[_i]);
						}
						console.log('');
						console.log(options['object']);
						self.multipart_upload_object(options,function(err,_res){
							_i++;
							_cb(err,_res);
						});		
					},
					function(err){
							callback(err,"\nsync_local_dir good");
					}
				);
				
			});
		}else{
			throw new Error("local dir is not a directory");
		}
	});
}

/*
pro.get_sign_url = function(options,callback){
	if(typeof options != "undefined"){
		if(typeof options['dstFile'] == "undefined"){
			throw new Error("get_object path is required");
		}
		bucket_filter(options);
		object_filter(options);
	}

	options['action'] == 'GET_SIGN_URL';

	this.authRequest(options,callback);
}
*/