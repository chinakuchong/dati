(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/visualization/components/recommend"],{"08ce":function(t,e,i){"use strict";var n=i("1f9d"),a=i.n(n);a.a},"16b9":function(t,e,i){"use strict";i.r(e);var n=i("b50d"),a=i.n(n);for(var l in n)["default"].indexOf(l)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(l);e["default"]=a.a},"1f9d":function(t,e,i){},b50d:function(t,e,i){"use strict";(function(t){var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;i("26cb");var a=i("2c78"),l=i("1579"),s=n(i("66ca")),o=getApp(),c={name:"goodList",props:{dataConfig:{type:Object,default:function(){}}},mixins:[s.default],components:{goodLists:function(){Promise.all([i.e("common/vendor"),i.e("components/goodList/index")]).then(function(){return resolve(i("812b"))}.bind(null,i)).catch(i.oe)}},created:function(){},mounted:function(){},watch:{dataConfig:{immediate:!0,handler:function(t,e){t&&(this.isShow=t.isShow.val,this.selectType=t.tabConfig.tabVal,this.$set(this,"selectId",t.selectConfig.activeValue||""),this.$set(this,"type",t.selectSortConfig.activeValue),this.salesOrder=1==t.goodsSort.type?"desc":"",this.newsOrder=2==t.goodsSort.type?"news":"",this.ids=t.ids?t.ids.join(","):"",this.numConfig=t.numConfig.val,this.titleInfo=t.titleInfo.list,this.productslist())}}},data:function(){return{circular:!0,interval:3e3,duration:500,bastList:[],name:this.$options.name,isShow:!0,isIframe:o.globalData.isIframe,selectType:0,selectId:"",salesOrder:"",newsOrder:"",ids:"",page:1,limit:this.$config.LIMIT,type:"",numConfig:0,titleInfo:[]}},methods:{productslist:function(){var t=this,e={};e=t.selectType?{page:t.page,limit:t.limit,type:t.type,ids:t.ids,selectType:t.selectType}:{page:t.page,limit:t.numConfig<=t.limit?t.numConfig:t.limit,type:t.type,newsOrder:t.newsOrder,salesOrder:t.salesOrder,selectId:t.selectId,selectType:t.selectType},(0,l.getHomeProducts)(e).then((function(e){t.bastList=e.data.list})).catch((function(e){t.$util.Tips({title:e})}))},gopage:function(e){t.navigateTo({url:e})},goDetail:function(e){var i=this;(0,a.goPage)().then((function(n){(0,a.goShopDetail)(e,i.uid).then((function(i){t.navigateTo({url:"/pages/goods_details/index?id=".concat(e.id)})}))}))}}};e.default=c}).call(this,i("543d")["default"])},d525:function(t,e,i){"use strict";i.r(e);var n=i("f1ae"),a=i("16b9");for(var l in a)["default"].indexOf(l)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(l);i("08ce");var s=i("f0c5"),o=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=o.exports},f1ae:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return l})),i.d(e,"a",(function(){return n}));var n={easyLoadimage:function(){return Promise.all([i.e("common/vendor"),i.e("components/easy-loadimage/easy-loadimage")]).then(i.bind(null,"9362"))}},a=function(){var t=this,e=t.$createElement,i=(t._self._c,t.isShow&&t.bastList.length),n=i?t.$t(t.titleInfo[0].val):null,a=i?t.$t(t.titleInfo[1].val):null,l=i?t.$t("更多"):null,s=i?t.__map(t.bastList,(function(e,i){var n=t.__get_orig(e),a=e.activity&&"1"==e.activity.type?t.$t("秒杀"):null,l=e.activity&&"2"==e.activity.type?t.$t("砍价"):null,s=e.activity&&"3"==e.activity.type?t.$t("砍价"):null,o=t.$t("￥"),c=e.vip_price&&e.vip_price>0&&e.base?t.$t("￥"):null,u=e.vip_price&&e.vip_price>0&&e.is_vip?t.$t("￥"):null;return{$orig:n,m3:a,m4:l,m5:s,m6:o,m7:c,m8:u}})):null,o=!t.isShow&&t.isIframe&&t.bastList.length,c=o?t.$t("更多"):null,u=o?t.__map(t.bastList,(function(e,i){var n=t.__get_orig(e),a=e.activity&&"1"==e.activity.type?t.$t("秒杀"):null,l=e.activity&&"2"==e.activity.type?t.$t("砍价"):null,s=e.activity&&"3"==e.activity.type?t.$t("砍价"):null,o=e.checkCoupon?t.$t("ticket"):null,c=t.$t("￥"),u=e.vip_price&&e.vip_price>0&&e.base?t.$t("￥"):null,r=e.vip_price&&e.vip_price>0&&e.is_vip?t.$t("￥"):null;return{$orig:n,m10:a,m11:l,m12:s,m13:o,m14:c,m15:u,m16:r}})):null,r=t.isIframe&&!t.bastList.length,d=r?t.isIframe&&!t.fastList.length:null,f=r&&d?t.$t("更多"):null,p=r&&d?t.$t("精品推荐，暂无数据"):null;t.$mp.data=Object.assign({},{$root:{g0:i,m0:n,m1:a,m2:l,l0:s,g1:o,m9:c,l1:u,g2:r,g3:d,m17:f,m18:p}})},l=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/index/visualization/components/recommend-create-component',
    {
        'pages/index/visualization/components/recommend-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d525"))
        })
    },
    [['pages/index/visualization/components/recommend-create-component']]
]);