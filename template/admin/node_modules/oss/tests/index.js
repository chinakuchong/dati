/*!
 * oss - node.js sdk 
 * oss test
 * Copyright(c) 2012 fantaysni <fantasyni@163.com>
 * MIT Licensed
 */

var ossClient = require('../lib/oss');
var util = require("util");

var _options = { 
	accessId:'',  
	accessKey:''
};

var oss = new ossClient(_options);

var options = {};

/*
oss.list_bucket(function(err,results){
	console.log(results['Buckets']);
})
*/

/*
oss.create_bucket( {bucket : "fni_oss2"},function(err,results){
	console.log(results);
})
*/

/*
oss.get_bucket({bucket:"fni_test"},function(err,results){
	console.log(results);
})
*/

/*
oss.delete_bucket({bucket:"fni_oss2"},function(err,results){
	console.log(results);
})
*/

/*
oss.get_bucket_acl({bucket:"fni_test"},function(err,results){
	console.log(results);
})
*/


/*
oss.set_bucket_acl({ bucket:"fni_test", headers:{ "x-oss-acl":"public-read" } },function(err,results){
	console.log(results);
})
*/

/*
oss.put_object( {	bucket : "fni_te", object : "node-demos.tar.gz" , srcFile : "/home/fantasyni/node-demos.tar.gz" ,gzip : true},function(err,results){
		if(err) {
			console.error(err);
			return;
		}
		console.log('operation finished........');
		console.log(results);
	}
);*/


/*
oss.get_object({ bucket:"fni_te", object:"nw_release_linux_x32.tar.gz", dstFile:"getFni.tar.gz" },function(err,results){
	console.log(results);
})
*/

/*
oss.copy_object({ bucket:"fni_test", object:"fniCopy.txt", copyBucket:"fni_test", copyObject:"fni.txt" },function(err,results){
	console.log(results);
})
*/

/*
oss.head_object({ bucket:"fni_te", object:"nw_release_linux_x32.tar.gz" },function(err,results){
	console.log(results);
})
*/

/*
oss.delete_object({ bucket:"fni_test", object:"fni.txt" },function(err,results){
	console.log(results);
})
*/

/*
oss.delete_objects({ bucket:"fni_test", objects:["fniCopy.txt","test.avi"]
},function(err,results){
	console.log(results);
})
*/

/*
oss.initiate_multipart_upload({ bucket:"fni_test", object:"bigFile.zip"
},function(err,results){
	console.log(results); 
})
*/

/*
oss.multipart_upload_object({ bucket:"fni_te", object:"nw_release_linux_x32.tar.gz", srcFile:"/home/fantasyni/nw_release_linux_x32.tar.gz" },function(err,results){
	console.log("----------------complete-------------");
	console.log(results);
})
*/

/*
oss.list_multipart_uploads({ bucket:"fni_test" },function(err,results){
	console.log(results);
})
*/

/*
oss.create_object_group({ bucket:"fni_test", object:"group.txt", objects:["index.txt","info.txt"] },function(err,results){
	console.log(results);
})
*/

/*
oss.get_object_group({ bucket:"fni_test", object:"group.txt", dstFile:"group.txt" },function(err,results){
	console.log(results);
})
*/

/*
oss.get_object_group_index({ bucket:"fni_test", object:"group.txt" },function(err,results){
	console.log(util.inspect(results, false, null));
})
*/

/*
  oss.create_dir( {	bucket : "fni_test", dir : "test3/" },function(err,results){
		console.log("good");
		console.log(results);
	}
);
*/

/*
oss.upload_objects_by_dir({ bucket:"fni_oss1", ossDir:"test3", local:"." },function(err,results){
	console.log(results);
});
*/

/*
oss.sync_local_dir({ bucket:"fni_oss1", ossDir:"test2", local:"." },function(err,results){
	console.log(results);
});
*/
