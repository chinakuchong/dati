(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/recommend/index"],{2671:function(t,e,n){},"5e9f":function(t,e,n){"use strict";(function(t){var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("26cb"),o=n("2c78"),u=i(n("66ca")),c={computed:(0,a.mapGetters)(["uid"]),props:{hostProduct:{type:Array,default:function(){return[]}}},mixins:[u.default],data:function(){return{}},methods:{goDetail:function(e){(0,o.goShopDetail)(e,this.uid).then((function(n){t.navigateTo({url:"/pages/goods_details/index?id=".concat(e.id)})}))}}};e.default=c}).call(this,n("543d")["default"])},"9eef":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={easyLoadimage:function(){return Promise.all([n.e("common/vendor"),n.e("components/easy-loadimage/easy-loadimage")]).then(n.bind(null,"9362"))}},a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.$t("热门推荐")),i=t.$t("￥"),a=t.__map(t.hostProduct,(function(e,n){var i=t.__get_orig(e),a=e.activity&&"1"===e.activity.type?t.$t("秒杀"):null,o=e.activity&&"2"===e.activity.type?t.$t("砍价"):null,u=e.activity&&"3"===e.activity.type?t.$t("拼团"):null,c=e.vip_price&&e.vip_price>0&&e.base?t.$t("￥"):null,r=e.vip_price&&e.vip_price>0&&e.is_vip?t.$t("￥"):null;return{$orig:i,m1:a,m2:o,m3:u,m5:c,m6:r}}));t.$mp.data=Object.assign({},{$root:{m0:n,m4:i,l0:a}})},o=[]},ba97:function(t,e,n){"use strict";var i=n("2671"),a=n.n(i);a.a},f1f8:function(t,e,n){"use strict";n.r(e);var i=n("9eef"),a=n("fad1");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("ba97");var u=n("f0c5"),c=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"2fe7bd73",null,!1,i["a"],void 0);e["default"]=c.exports},fad1:function(t,e,n){"use strict";n.r(e);var i=n("5e9f"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/recommend/index-create-component',
    {
        'components/recommend/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f1f8"))
        })
    },
    [['components/recommend/index-create-component']]
]);