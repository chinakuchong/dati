#OSS
OSS is a [node.js](http://nodejs.org) SDK and Command-Line Tool for [Aliyun OSS](http://www.aliyun.com/product?type=oss)  

#Support API  
+ service operation  
+ bucket operation 
+ object operation  
+ multipart upload operation  
+ object group operation  
  
more api infomations you can see [oss_api](http://storage.aliyun.com/aliyun_portal_storage/oss_api/OSS_API.zip)  

#Install  
npm install oss  

#Usage  
all api functions have the same style as showed below  
  
<pre>
   var oss = require('oss');  
   var client = new oss({
       accessId : xxx,
       accessKey xxx: 
   });
   var options = {
       bucket : "test"
   }
   client.create_bucket(options,function(err,result){
       if(err) throw err;
       // operation result
       console.log(result);
   });
</pre>

you can configue the options object to make your oss request , it is really simple !!!  

#Command Line  
first you must configure the key.js file to add your access_id and access_key  
then put oss/bin/ to your system PATH then you can use oss command line directly  
type oss -h you can get the help infomation showed below
<pre>
    Usage: oss [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -v, --version                    output the version number
    -p, --putbucket                  create a new bucket
    -l, --listbucket                 list buckets
    -s, --setacl                     set bucket acl
    -L, --listobject                 list objects
    -g, --getacl                     get bucket acl
    -d, --deletebucket               delete bucket
    -P, --putobject                  simple put object to oss
    -G, --getobject                  get object from oss to local dstFile
    -C, --copyobject                 copy object in oss
    -H, --headobject                 get object meta info
    -D, --deleteobject               delete object in oss
    -x, --deleteobjects              delete objects in oss
    -m, --multiputobject             multipart upload object to oss
    -S, --listmultiput               list multipart uploads
    -n, --group                      post object group
    -u, --uploaddir                  upload local dir files to a oss dir in a bucket
    -U, --syncdir                    sync local dir files to a oss dir in a bucket
    -c, --copyright                  show oss command line copyright
</pre>
#Examples  
you can visit test file to get more examples

#Some Features  
+ compress upload  
when put object you can set options gzip : true to use compress upload
<pre>  
  oss.put_object( {  bucket : "fni_te", object : "node-demos.tar.gz" , srcFile : "/home/fantasyni/node-demos.tar.gz" ,gzip : true},function(err,results){
		if(err) throw err;
		console.log(results);
	}
);
</pre>

+ upload_objects_by_dir  
you can upload local dir files to oss  
local dir path support relative path  and absolute path of course  
<pre>
 oss.upload_objects_by_dir({ bucket:"fni_oss1", ossDir:"test3", local:"." },function(err,results){
  console.log(results);
 });
</pre>

+ sync_local_dir  
similar to upload_objects_by_dir the differene is the dir will also be created in oss  
<pre>
 oss.sync_local_dir({ bucket:"fni_oss1", ossDir:"test2", local:"." },function(err,results){
  console.log(results);
 });
</pre> 

