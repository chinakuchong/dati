(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/eidtUserModal/index"],{3158:function(t,a,n){},"953d":function(t,a,n){"use strict";var i=n("9f28"),e=n.n(i);e.a},"9cfa6":function(t,a,n){"use strict";(function(t){var i=n("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e=i(n("66ca")),u=(i(n("ebdf")),n("8ba8")),s={mixins:[e.default],props:{isShow:{type:Boolean,default:!1}},data:function(){return{defHead:n("f77a"),mp_is_new:this.$Cache.get("MP_VERSION_ISNEW")||!1,userInfo:{avatar:"",nickname:""},mpData:t.getStorageSync("copyRight"),canvasStatus:!1}},mounted:function(){},methods:{uploadpic:function(){var t=this,a=this;this.canvasStatus=!0,a.$util.uploadImageChange("upload/image",(function(n){var i=a.userInfo;void 0!==i&&(a.userInfo.avatar=n.data.url),t.canvasStatus=!1}),(function(a){t.canvasStatus=!1}),(function(a){t.canvasWidth=a.w,t.canvasHeight=a.h}))},onChooseAvatar:function(t){var a=this,n=t.detail.avatarUrl;this.$util.uploadImgs("upload/image",n,(function(t){a.userInfo.avatar=t.data.url}),(function(t){}))},closeAttr:function(){this.$emit("closeEdit")},formSubmit:function(t){var a=this,n=this;return this.userInfo.avatar?t.detail.value.nickname?(this.userInfo.nickname=t.detail.value.nickname,void(0,u.userEdit)(this.userInfo).then((function(t){return a.$emit("editSuccess"),n.$util.Tips({title:t.msg,icon:"success"},{tab:3})})).catch((function(t){return n.$util.Tips({title:t||n.$t("保存失败")},{tab:3,url:1})}))):n.$util.Tips({title:n.$t("请输入昵称")}):n.$util.Tips({title:n.$t("请上传头像")})}}};a.default=s}).call(this,n("543d")["default"])},"9f28":function(t,a,n){},a471:function(t,a,n){"use strict";n.d(a,"b",(function(){return i})),n.d(a,"c",(function(){return e})),n.d(a,"a",(function(){}));var i=function(){var t=this.$createElement,a=(this._self._c,this.$t("获取您的昵称、头像")),n=this.$t("提供具有辨识度的用户中心界面"),i=this.$t("头像"),e=this.$t("昵称"),u=this.$t("请输入昵称"),s=this.$t("保存");this.$mp.data=Object.assign({},{$root:{m0:a,m1:n,m2:i,m3:e,m4:u,m5:s}})},e=[]},b326:function(t,a,n){"use strict";n.r(a);var i=n("a471"),e=n("eae4");for(var u in e)["default"].indexOf(u)<0&&function(t){n.d(a,t,(function(){return e[t]}))}(u);n("c580"),n("953d");var s=n("f0c5"),c=Object(s["a"])(e["default"],i["b"],i["c"],!1,null,"7192451d",null,!1,i["a"],void 0);a["default"]=c.exports},c580:function(t,a,n){"use strict";var i=n("3158"),e=n.n(i);e.a},eae4:function(t,a,n){"use strict";n.r(a);var i=n("9cfa6"),e=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){n.d(a,t,(function(){return i[t]}))}(u);a["default"]=e.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/eidtUserModal/index-create-component',
    {
        'components/eidtUserModal/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b326"))
        })
    },
    [['components/eidtUserModal/index-create-component']]
]);