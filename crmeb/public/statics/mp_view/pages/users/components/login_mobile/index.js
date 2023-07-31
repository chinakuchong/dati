require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/users/components/login_mobile/index"],{"2f3a":function(t,e,i){"use strict";(function(t){var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("3de7")),s=n(i("7635")),a=(n(i("ebdf")),i("8ba8")),c=(i("d322"),i("a9a5"),getApp()),u={name:"login_mobile",components:{Verify:function(){i.e("pages/users/components/verify/index").then(function(){return resolve(i("233b"))}.bind(null,i)).catch(i.oe)}},props:{isUp:{type:Boolean,default:!1},canClose:{type:Boolean,default:!0},authKey:{type:String,default:""}},data:function(){return{keyCode:"",account:"",codeNum:""}},mixins:[o.default],mounted:function(){this.getCode()},methods:{success:function(t){var e=this;this.$refs.verify.hide(),(0,a.getCodeApi)().then((function(i){(0,a.registerVerify)({phone:e.account,key:i.data.key,captchaType:"blockPuzzle",captchaVerification:t.captchaVerification}).then((function(t){e.$util.Tips({title:t.msg}),e.sendCode()})).catch((function(t){return e.$util.Tips({title:t})}))}))},code:function(){return this.account?/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.account)?void this.$refs.verify.show():this.$util.Tips({title:this.$t("请输入正确的手机号码")}):this.$util.Tips({title:this.$t("请填写手机号码")})},getCode:function(){var t=this;(0,a.getCodeApi)().then((function(e){t.keyCode=e.data.key})).catch((function(e){t.$util.Tips({title:e})}))},close:function(t){this.canClose&&this.$emit("close",t)},loginBtn:function(){var e=this;return this.account?/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.account)?this.codeNum?/^[\w\d]+$/i.test(this.codeNum)?(t.showLoading({title:this.$t("正在登录中")}),void s.default.getCode().then((function(t){e.phoneSilenceAuth(t)})).catch((function(e){t.hideLoading()}))):this.$util.Tips({title:this.$t("请输入正确的验证码")}):this.$util.Tips({title:this.$t("请填写验证码")}):this.$util.Tips({title:this.$t("请输入正确的手机号码")}):this.$util.Tips({title:this.$t("请填写手机号码")})},phoneAuth:function(e){var i=this;(0,a.phoneWxSilenceAuth)({spid:c.globalData.spid,spread:c.globalData.code,phone:this.account,captcha:this.codeNum,key:e}).then((function(t){var e=t.data.expires_time-i.$Cache.time();i.$store.commit("LOGIN",{token:t.data.token,time:e}),i.getUserInfo()})).catch((function(e){t.hideLoading(),i.$util.Tips({title:e})}))},phoneSilenceAuth:function(t){var e=this,i=this;(0,a.phoneSilenceAuth)({code:t,spread_spid:c.globalData.spid,spread_code:c.globalData.code,phone:this.account,captcha:this.codeNum}).then((function(t){var i=t.data.expires_time-e.$Cache.time();e.$store.commit("LOGIN",{token:t.data.token,time:i}),e.getUserInfo(t.data.new_user)})).catch((function(t){i.$util.Tips({title:t})}))},getUserInfo:function(e){var i=this;(0,a.getUserInfo)().then((function(n){t.hideLoading(),i.userInfo=n.data,i.$store.commit("SETUID",n.data.uid),i.$store.commit("UPDATE_USERINFO",n.data),e?i.$util.Tips({title:i.$t("登录成功"),icon:"success"}):i.$util.Tips({title:i.$t("登录成功"),icon:"success"},{tab:3}),i.close(e||0)}))}}};e.default=u}).call(this,i("543d")["default"])},"388f":function(t,e,i){},5404:function(t,e,i){"use strict";var n=i("388f"),o=i.n(n);o.a},a2ef:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){}));var n=function(){var t=this.$createElement,e=(this._self._c,this.isUp?this.$t("输入手机号"):null),i=this.isUp?this.$t("输入验证码"):null,n=this.isUp?this.$t("立即登录"):null;this.$mp.data=Object.assign({},{$root:{m0:e,m1:i,m2:n}})},o=[]},b3e8:function(t,e,i){"use strict";i.r(e);var n=i("a2ef"),o=i("deb0");for(var s in o)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(s);i("5404");var a=i("f0c5"),c=Object(a["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=c.exports},deb0:function(t,e,i){"use strict";i.r(e);var n=i("2f3a"),o=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/users/components/login_mobile/index-create-component',
    {
        'pages/users/components/login_mobile/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b3e8"))
        })
    },
    [['pages/users/components/login_mobile/index-create-component']]
]);