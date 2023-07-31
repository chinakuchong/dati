/*!
 * oss - node.js sdk 
 * oss config support
 * Copyright(c) 2012 fantaysni <fantasyni@163.com>
 * MIT Licensed
 */

 module.exports = { 
 	//OSS内部常量
 	OSS_BUCKET : "bucket", 
 	OSS_OBJECT : "object",
 	OSS_HEADERS : "headers",
 	OSS_METHOD : "method",  
 	OSS_QUERY : "query",
 	OSS_BASENAME : "basename",
 	OSS_MAX_KEYS : "max-keys",
 	OSS_UPLOAD_ID : "uploadId",
 	OSS_MAX_KEYS_VALUE : 100,
 	OSS_MAX_OBJECT_GROUP_VALUE : 1000,
 	OSS_FILE_SLICE_SIZE : 8192,
 	OSS_PREFIX : "prefix",
 	OSS_DELIMITER : "delimiter",
 	OSS_MARKER : "marker",
 	OSS_CONTENT_MD5 : "Content-Md5",
 	OSS_CONTENT_TYPE : "Content-Type",
 	OSS_CONTENT_LENGTH : "Content-Length",
 	OSS_IF_MODIFIED_SINCE : "If-Modified-Since",
 	OSS_IF_UNMODIFIED_SINCE : "If-Unmodified-Since",
 	OSS_IF_MATCH : "If-Match",
 	OSS_IF_NONE_MATCH : "If-None-Match",
 	OSS_CACHE_CONTROL : "Cache-Control",
 	OSS_EXPIRES : "Expires",
 	OSS_CONTENT_COING : "Content-Coding",
 	OSS_CONTENT_DISPOSTION : "Content-Disposition",
 	OSS_RANGE : "Range",
 	OS_CONTENT_RANGE : "Content-Range",
 	OSS_CONTENT : "content",
 	OSS_GROUP : "group" ,
 	OSS_BODY : "body",
 	OSS_LENGTH : "length",
 	OSS_HOST : "Host",
 	OSS_DATE : "Date",
 	OSS_AUTHORIZATION : "Authorization",
 	OSS_DEFAULT_PREFIX : "x-oss-",
 	OSS_SUB_RESOURCE : "sub_resource",
 	OSS_PART_SIZE : "partSize",
 	OSS_SEEK_TO : "seekTo",
 	OSS_SIZE : "size",

 	//外链URL相关常量
 	OSS_URL_ACCESS_KEY_ID : "OSSAccessKeyId",
 	OSS_URL_EXPIRES : "Expires",
 	OSS_URL_SIGNATURE : "Signature",

 	//请求方法常量
 	OSS_HTTP_GET : "GET",
 	OSS_HTTP_PUT : "PUT",
 	OSS_HTTP_HEAD : "HEAD",
 	OSS_HTTP_POST : "POST",
 	OSS_HTTP_DELETE : "DELETE",

 	//ACL TYPE

 	//sub_resource
 	//ACL
 	OSS_ACL : "oss-acl",

 	//OBJECT GROUP
 	OSS_OBJECT_GROUP : "x-oss-file-group",

 	//Multi Part
 	OSS_MULTI_PART : "uploads",

 	//Multi Delete
 	OSS_MULTI_DELETE : "delete",

 	//OBJECT COPY SOURCE
 	OSS_OBJECT_COPY_SOURCE : "x-oss-copy-source",

 	//私有权限，仅限于bucket的所有者
 	OSS_ACL_TYPE_PRIVATE : "private",

 	//公共读权限
 	OSS_ACL_TYPE_PUBLIC_READ : "public-read",

 	//所有权限
 	OSS_ACL_TYPE_PUBLIC_READ_WRITE : "public-read-write",

 	//OSS ACL类型数组
 	OSS_ACL_TYPES : [this.OSS_ACL_TYPE_PRIVATE,this.OSS_ACL_TYPE_PUBLIC_READ,this.OSS_ACL_TYPE_PUBLIC_READ_WRITE],

 	//上传文件的最大值,默认值128M
 	MAX_UPLOAD_FILE_SIZE : 128 * 1024 * 1024,

 	use_ssl : false,

 	OSS_VERSION : "v0.0.1"
 }