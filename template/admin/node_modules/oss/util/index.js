/*!
 * oss - node.js sdk 
 * util -- useful functions support
 * Copyright(c) 2012 fantaysni <fantasyni@163.com>
 * MIT Licensed
 */

var crypto = require('crypto');

/**  
* 检验bucket名称是否合法
* bucket的命名规范： 
* 1. 只能包括小写字母，数字，下划线（_）和短横线（-） 
* 2. 必须以小写字母或者数字开头 
* 3. 长度必须在3-255字节之间
*/

exports.validate_bucket = function(bucket){
	var pattern = /^[a-z0-9][a-z0-9_\\-]{2,254}$/;
	if( !pattern.test(bucket)) {
		return false;
	}
	return true;
}

/**
* 检验object名称是否合法
* object命名规范:
* 1. 规则长度必须在1-1023字节之间
* 2. 使用UTF-8编码
*/

exports.validate_object = function(object){
	var pattern = /^.{1,1023}$/;
	if(object == null || !pattern.test(object)){
		return false;
	}
	return true;
}

/*
* check for gb2312
*/
exports.is_gb2312 = function(object){
  var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	if(reg.test(object)){
		return true;
	}
	return false;
}

/*
* encode convert 
* utf8 -> gb2312
* gb2312 -> utf8
*/
exports.iconv = function(from_code,to_code,str){
	this.Dig2Dec=function(s){
      var retV = 0;
      if(s.length == 4){
          for(var i = 0; i < 4; i ++){
              retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
          }
          return retV;
      }
      return -1;
  } 
  this.Hex2Utf8=function(s){
     var retS = "";
     var tempS = "";
     var ss = "";
     if(s.length == 16){
         tempS = "1110" + s.substring(0, 4);
         tempS += "10" +  s.substring(4, 10); 
         tempS += "10" + s.substring(10,16); 
         var sss = "0123456789ABCDEF";
         for(var i = 0; i < 3; i ++){
            retS += "%";
            ss = tempS.substring(i * 8, (eval(i)+1)*8);
            retS += sss.charAt(this.Dig2Dec(ss.substring(0,4)));
            retS += sss.charAt(this.Dig2Dec(ss.substring(4,8)));
         }
         return retS;
     }
     return "";
  } 
  this.Dec2Dig=function(n1){
      var s = "";
      var n2 = 0;
      for(var i = 0; i < 4; i++){
         n2 = Math.pow(2,3 - i);
         if(n1 >= n2){
            s += '1';
            n1 = n1 - n2;
          }
         else
          s += '0';
      }
      return s;      
  }

  this.Str2Hex=function(s){
      var c = "";
      var n;
      var ss = "0123456789ABCDEF";
      var digS = "";
      for(var i = 0; i < s.length; i ++){
         c = s.charAt(i);
         n = ss.indexOf(c);
         digS += this.Dec2Dig(eval(n));
      }
      return digS;
  }
  this.Gb2312ToUtf8=function(s1){
    var s = escape(s1);
    var sa = s.split("%");
    var retV ="";
    if(sa[0] != ""){
      retV = sa[0];
    }
    for(var i = 1; i < sa.length; i ++){
      if(sa[i].substring(0,1) == "u"){
        retV += this.Hex2Utf8(this.Str2Hex(sa[i].substring(1,5)));
		if(sa[i].length){
		  retV += sa[i].substring(5);
		}
      }
      else{
	    retV += unescape("%" + sa[i]);
		if(sa[i].length){
		  retV += sa[i].substring(5);
		}
	  }
    }
    return retV;
  }
  this.Utf8ToGb2312=function(str1){
        var substr = "";
        var a = "";
        var b = "";
        var c = "";
        var i = -1;
        i = str1.indexOf("%");
        if(i==-1){
          return str1;
        }
        while(i!= -1){
		  if(i<3){
                substr = substr + str1.substr(0,i-1);
                str1 = str1.substr(i+1,str1.length-i);
                a = str1.substr(0,2);
                str1 = str1.substr(2,str1.length - 2);
                if(parseInt("0x" + a) & 0x80 == 0){
                  substr = substr + String.fromCharCode(parseInt("0x" + a));
                }
                else if(parseInt("0x" + a) & 0xE0 == 0xC0){ //two byte
                        b = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        var widechar = (parseInt("0x" + a) & 0x1F) << 6;
                        widechar = widechar | (parseInt("0x" + b) & 0x3F);
                        substr = substr + String.fromCharCode(widechar);
                }
                else{
                        b = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        c = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        var widechar = (parseInt("0x" + a) & 0x0F) << 12;
                        widechar = widechar | ((parseInt("0x" + b) & 0x3F) << 6);
                        widechar = widechar | (parseInt("0x" + c) & 0x3F);
                        substr = substr + String.fromCharCode(widechar);
                }
			  }
			  else {
			   substr = substr + str1.substring(0,i);
			   str1= str1.substring(i);
			  }
              i = str1.indexOf("%");
        }

        return substr+str1;
  }

	if(from_code == "GB2312" && to_code == "UTF8"){
		return this.Gb2312ToUtf8(str);
	}else if(from_code == "UTF8" && to_code == "GB2312"){
		return this.Utf8ToGb2312(str);
	}
}

/**
 *  md5
 *  md5 the string
 *  @param string {required}
 *  @return string
 *  @api public
 */
exports.md5 = function (str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

/**
 *  base64
 *  base64 the string
 *  @param str {required}
 *  @return string
 *  @api public
 */
exports.base64 = function(str){
  return crypto.createHash('md5').update(str).digest('base64');
}

/**
 *  Get_Part_Size
 *  
 *  @param partSize {required}
 *  @return string
 *  @api public
 */
exports.getPartSize = function(partSize){
    var _partSize = 0;
    if(partSize <= 5242880){
      _partSize = 5242880; //5M
    }else if(partSize > 524288000){
      _partSize = 524288000; //500M
    }else{
      _partSize = 52428800; //50M
    }

    return _partSize;
}

/**
 *  Get_File_Name
 *  
 *  @param fileName {required}
 *  @return string
 *  @api public
 */
exports.getFileName = function(name){
  for(var i=name.length-1;i>=0;i--){
    if(name[i] == '/'){
      return name.substr(i+1);
    }
  }
  return name;
}

/**
 *  Get_Absolute_File_Name
 *  
 *  @param fileName {required}
 *  @return string
 *  @api public
 */
exports.getAbsoluteFileName = function(dir,name){

  if(name.length < dir.length){
    throw new Error('file path must be longger than dir path');
  }
  for(var i=0;i<name.length;i++){
    if(dir[i] != name[i]){
      return name.substr(i);
    }
  }
}