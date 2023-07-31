/*!
 * oss - node.js sdk 
 * oss filter support
 * Copyright(c) 2012 fantaysni <fantasyni@163.com>
 * MIT Licensed
 */

 exports.bucket_filter = function(options){
 	if(typeof options != "undefined"){
		if(typeof options['bucket'] == "undefined"){
			throw new Error("bucket is required");
		}
	}
 }

 exports.object_filter = function(options){
 	if(typeof options != "undefined"){
		if(typeof options['object'] == "undefined"){
			throw new Error("object is required");
		}
	}
 }