<?php
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

use app\api\middleware\BlockerMiddleware;
use think\facade\Route;
use think\facade\Config;
use think\Response;

Route::group(function () {
		Route::any('wechat/serve', 'v1.wechat.WechatController/serve')->option(['real_name' => '公众号服务']);//公众号服务
		Route::any('wechat/miniServe', 'v1.wechat.WechatController/miniServe')->option(['real_name' => '小程序服务']);//公众号服务
		Route::any('pay/notify/:type', 'v1.PayController/notify')->option(['real_name' => '支付回调']);//支付回调
		Route::get('get_script', 'v1.PublicController/getScript')->option(['real_name' => '获取统计代码']);//获取统计代码
		Route::get('version', 'v1.PublicController/getVersion')->option(['real_name' => '获取代码版本号']);
})->option(['mark' => 'serve', 'mark_name' => '服务接口']);