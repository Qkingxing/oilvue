
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">

    <div  class="ant-tabs ant-tabs-top ant-tabs-large ant-tabs-line">
      <div role="tablist" tabindex="0" class="ant-tabs-bar ant-tabs-top-bar ant-tabs-large-bar"><div class="ant-tabs-nav-container"><span unselectable="unselectable" class="ant-tabs-tab-prev ant-tabs-tab-btn-disabled"><span class="ant-tabs-tab-prev-icon"><i aria-label="图标: left" class="anticon anticon-left ant-tabs-tab-prev-icon-target"><svg viewBox="64 64 896 896" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg></i></span></span><span unselectable="unselectable" class="ant-tabs-tab-next ant-tabs-tab-btn-disabled"><span class="ant-tabs-tab-next-icon"><i aria-label="图标: right" class="anticon anticon-right ant-tabs-tab-next-icon-target"><svg viewBox="64 64 896 896" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg></i></span></span><div class="ant-tabs-nav-wrap"><div class="ant-tabs-nav-scroll"><div class="ant-tabs-nav ant-tabs-nav-animated"><div><div role="tab" aria-disabled="false" aria-selected="true" class="ant-tabs-tab-active ant-tabs-tab">
        <div >配置工具</div>
        </div>
        <div role="tab" aria-disabled="false" aria-selected="false" class=" ant-tabs-tab">
          手机号授权
        </div>
        </div>
        <div class="ant-tabs-ink-bar ant-tabs-ink-bar-animated" style="display: block; transform: translate3d(0px, 0px, 0px); width: 96px;">
          </div>
          </div>
          </div>
          </div>
          </div>
          </div>
          <div tabindex="0" role="presentation" style="width: 0px; height: 0px; overflow: hidden; position: absolute;">
            </div>
            <div class="ant-tabs-content ant-tabs-content-animated ant-tabs-top-content" style="margin-left: 0%;">
              <div  role="tabpanel" aria-hidden="false" class="ant-tabs-tabpane ant-tabs-tabpane-active">
                <div tabindex="0" role="presentation" style="width: 0px; height: 0px; overflow: hidden; position: absolute;"></div>
              <div  class="page-block">
                <div  class="page-title"><span >基本配置</span>
              <div  class="config-instruction" style="margin-left: 20px;">配置说明

              </div>
              </div>
              <div  class="page-content"><div  class="page-content-item">
                <div  class="page-item-content"><div  class="config-category">
                  <div  class="category-title">弹窗设置</div><div  class="category-content"><div   class="category-content-item">
                    <div  class="config-item-head"><div  class="config-title">优惠券-快捷加油</div><div  class="config-tips">设置进入快捷加油页弹出可用优惠券提示，最多可选择三张优惠券</div>
                    <div  class="config-status"><span >已</span><span >开启</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div></div></div><div  class="config-category"><div  class="category-title">挂牌价与优惠展示设置</div><div  class="category-content"><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title">油站挂牌价展示与隐藏</div><div  class="config-tips">根据选中的油号，展示油站油机挂牌价及其与发改委价格对比，默认开启展示</div><div  class="config-status"><span >已</span><span >开启</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title">优惠信息展示与隐藏</div><div  class="config-tips">展示与隐藏客户享受的价立减、满额减、等级优惠，默认开启展示</div><div  class="config-status"><span >已</span><span >开启</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title">实付单价展示与隐藏</div><div  class="config-tips">展示与隐藏客户享受各种优惠后，实际付款单价，默认关闭展示</div><div  class="config-status"><span >已</span><span >关闭</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div></div></div><div  class="config-category"><div  class="category-title">支付流程配置</div><div  class="category-content"><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title">油品分类</div><div  class="config-tips">汽油和柴油分行展示，先展示汽油，后展示柴油</div><div  class="config-status"><span >已</span><span >开启</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title">加油金额范围</div><div  class="config-tips">默认0.01-100000</div><div  class="config-status"><span >已</span><span >开启</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title">固定加油金额</div><div  class="config-tips">默认100、150、200、300，配置金额最多可设置四个，按金额递增排序</div><div  class="config-status"><span >已</span><span >开启</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div></div></div><div  class="config-category"><div  class="category-title">油站定位</div><div  class="category-content"><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title">加油距离限制</div><div  class="config-tips">设置用户与油站之间可继续支付距离</div><div  class="config-status"><span >已</span><span >关闭</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div></div></div><!----><div  class="page-title"><span >微信小程序专有配置</span></div><div  class="config-category"><div  class="category-title">广告</div><div  class="category-content"><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title">数字键盘-文字广告</div><div  class="config-tips">数字键盘上方的提示文字，只能设置一种提示；例：进入油站后，请在安全区域内使用手机</div><div  class="config-status"><span >已</span><span >开启</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title">支付完成页-图文广告</div><div  class="config-tips">图文广告路径可跳转</div><div  class="config-status"><span >已</span><span >开启</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div></div></div><div  class="config-category"><div  class="category-title">无感支付</div><div  class="category-content"><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title">无感支付</div><div  class="config-tips">设置用户可开通无感支付的渠道类型</div><div  class="config-status"><span >已</span><span >开启</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div></div></div><div  class="page-title"><span >支付宝小程序专有配置</span></div><div  class="config-category"><div  class="category-title">广告</div><div  class="category-content"><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title"> 数字键盘-文字广告</div><div  class="config-tips">数字键盘上方的提示文字，只能设置一种提示；例：进入油站后，请在安全区域内使用手机</div><div  class="config-status"><span >已</span><span >开启</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div><div   class="category-content-item"><div  class="config-item-head"><div  class="config-title">支付完成页-图文广告</div><div  class="config-tips">图文广告路径可跳转</div><div  class="config-status"><span >已</span><span >开启</span></div><div  class="config-operate"><button  type="button" class="ant-btn ant-btn-link"><span>编辑</span></button></div></div><!----></div></div></div></div></div></div></div><div tabindex="0" role="presentation" style="width: 0px; height: 0px; overflow: hidden; position: absolute;"></div></div><div  role="tabpanel" aria-hidden="true" class="ant-tabs-tabpane ant-tabs-tabpane-inactive"><div  class="page-block"><div  class="setting-scope"><div  class="setting-scope-title">生效范围</div><div  class="ant-checkbox-group"><label  class="ant-checkbox-wrapper ant-checkbox-wrapper-checked ant-checkbox-wrapper-disabled"><span class="ant-checkbox ant-checkbox-checked ant-checkbox-disabled"><input type="checkbox" disabled="disabled" class="ant-checkbox-input" value="1"><span class="ant-checkbox-inner"></span></span><span><span  style="color: rgb(31, 46, 77);">微信小程序</span></span></label><label  class="ant-checkbox-wrapper"><span class="ant-checkbox"><input type="checkbox" class="ant-checkbox-input" value="2"><span class="ant-checkbox-inner"></span></span><span>支付宝小程序</span></label><svg data-v-578a61c7=""  aria-hidden="true" class="iconfont"><use data-v-578a61c7="" xlink:href="#iconquestion"></use></svg></div></div><div  class="ant-table-wrapper" style="width: 100%;"><div class="ant-spin-nested-loading"><div class="ant-spin-container"><div class="ant-table ant-table-scroll-position-left ant-table-default ant-table-bordered"><div class="ant-table-content"><!----><div class="ant-table-body"><table class=""><colgroup><col style="width: 25%; min-width: 25%;"><col style="width: 40%; min-width: 40%;"><col style="width: 150px; min-width: 150px;"><col style="width: 180px; min-width: 180px;"><col style="width: 170px; min-width: 170px;"></colgroup><thead class="ant-table-thead"><tr><th key="_module" class="ant-table-align-left ant-table-row-cell-break-word" style="text-align: left;"><span class="ant-table-header-column"><div><span class="ant-table-column-title">模块</span><span class="ant-table-column-sorter"></span></div></span></th><th key="_operation" class="ant-table-align-left ant-table-row-cell-break-word" style="text-align: left;"><span class="ant-table-header-column"><div><span class="ant-table-column-title">操作</span><span class="ant-table-column-sorter"></span></div></span></th><th key="_close" class="ant-table-align-center ant-table-row-cell-break-word" style="text-align: center;"><span class="ant-table-header-column"><div><span class="ant-table-column-title">关闭授权弹窗</span><span class="ant-table-column-sorter"></span></div></span></th><th key="_forceOpen" class="ant-table-align-center ant-table-row-cell-break-word" style="text-align: center;"><span class="ant-table-header-column"><div><span class="ant-table-column-title"><div  slot="title">开启授权弹窗<br>拒绝后不可继续使用</div></span><span class="ant-table-column-sorter"></span></div></span></th><th key="_allowOpen" class="ant-table-align-center ant-table-row-cell-break-word ant-table-row-cell-last" style="text-align: center;"><span class="ant-table-header-column"><div><span class="ant-table-column-title"><div  slot="title">开启授权弹窗<br>拒绝后可继续使用</div></span><span class="ant-table-column-sorter"></span></div></span></th></tr></thead><tbody class="ant-table-tbody"><tr class="ant-table-row ant-table-row-level-0" data-row-key="refuelPopupBox"><td rowspan="3" class="ant-table-row-cell-break-word" style="text-align: left;"><div  class="phoneConfigTitleBox"><div >快捷加油</div></div></td><td class="ant-table-row-cell-break-word" style="text-align: left;">选择油枪油号页-&gt;优惠券弹窗-&gt;领取优惠券</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper" size="large"><span class="ant-radio"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked" size="large"><span class="ant-radio ant-radio-checked"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper" size="large"><span class="ant-radio"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="refuelNotificationBox"><!----><td class="ant-table-row-cell-break-word" style="text-align: left;">选择油枪油号页-&gt;优惠券下拉页-&gt;领取优惠券</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper" size="large"><span class="ant-radio"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked" size="large"><span class="ant-radio ant-radio-checked"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper" size="large"><span class="ant-radio"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="refuelPay"><!----><td class="ant-table-row-cell-break-word" style="text-align: left;">调起支付</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper" size="large"><span class="ant-radio"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper" size="large"><span class="ant-radio"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked" size="large"><span class="ant-radio ant-radio-checked"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="quickPay"><td class="ant-table-row-cell-break-word" style="text-align: left;"><div  class="phoneConfigTitleBox"><div >闪付</div></div></td><td class="ant-table-row-cell-break-word" style="text-align: left;">调起支付</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper" size="large"><span class="ant-radio"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper" size="large"><span class="ant-radio"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked" size="large"><span class="ant-radio ant-radio-checked"><input type="radio" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="addCar"><td class="ant-table-row-cell-break-word" style="text-align: left;"><div  class="phoneConfigTitleBox"><div >我的车辆</div></div></td><td class="ant-table-row-cell-break-word" style="text-align: left;">我的车辆列表页-&gt;新增车辆-&gt;确认添加</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-checked ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="userCenterSelf"><td rowspan="9" class="ant-table-row-cell-break-word" style="text-align: left;"><div  class="phoneConfigTitleBox"><div >个人中心/首页</div></div></td><td class="ant-table-row-cell-break-word" style="text-align: left;">个人资料页-&gt;授权手机号</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-checked ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="/extendService/myScore/index/index"><!----><td class="ant-table-row-cell-break-word" style="text-align: left;">我的积分</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-checked ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="/extendService/car/myCar/myCar"><!----><td class="ant-table-row-cell-break-word" style="text-align: left;">我的车辆</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-checked ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="/extendService/authentication/authentication/authentication"><!----><td class="ant-table-row-cell-break-word" style="text-align: left;">身份认证</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-checked ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="/commonService/personalCoupon/personalCoupon"><!----><td class="ant-table-row-cell-break-word" style="text-align: left;">优惠券</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large">
    <span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-checked ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="/commonService/purchaseHistory/purchaseHistory"><!----><td class="ant-table-row-cell-break-word" style="text-align: left;">我的订单</td>
    <td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-checked ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="/pages/refuelStationList/refuelStationList"><!----><td class="ant-table-row-cell-break-word" style="text-align: left;">快捷加油</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-disabled" size="large">
    <span class="ant-radio ant-radio-checked ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="/pages/refuelStationList/refuelStationList?has_quick=1"><!----><td class="ant-table-row-cell-break-word" style="text-align: left;">闪付</td>
    <td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-checked ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td></tr><tr class="ant-table-row ant-table-row-level-0" data-row-key="/pages/personalCenter/qrCode/qrCode"><!----><td class="ant-table-row-cell-break-word" style="text-align: left;">用户码</td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large">
    <span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-disabled" size="large">
    <span class="ant-radio ant-radio-checked ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span></label></td><td class="ant-table-row-cell-break-word" style="text-align: center;"><label  class="ant-radio-wrapper ant-radio-wrapper-disabled" size="large"><span class="ant-radio ant-radio-disabled"><input type="radio" disabled="disabled" class="ant-radio-input" value=""><span class="ant-radio-inner"></span></span>
    </label></td></tr></tbody></table></div></div></div></div>
    </div>
    </div>
    <div  class="phoneConfigButtons"><button  type="button" class="ant-btn ant-btn-lg" style="margin-right: 20px;"><span>恢复默认</span>
    </button>
    <button  type="button" class="ant-btn ant-btn-primary ant-btn-lg"><span>提交修改</span></button>
    </div>
    </div>
    </div></div>
    <div tabindex="0" role="presentation" style="width: 0px; height: 0px; overflow: hidden; position: absolute;">
    </div>
    </div>
    </a-layout-content>

  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'

export default {
  name: 'business',
  components: {
    STable
  },
  data () {
    return {
      loading:'loading',
      imageUrl:'',
      radioType:1,
      noticeType:1,
      columns:[
        {
          dataIndex: '业务类型',
          title: '业务类型',
          key: 'name'
        },
         {
          dataIndex: '支付方式',
          title: '支付方式',
          key: '支付方式'
        },
        {
          dataIndex: '生效时间',
          title: '生效时间',
          key: '生效时间'
        },
        {
          dataIndex: '普通受理规则',
          title: '普通受理规则',
          key: '普通受理规则'
        },
        {
          dataIndex: '特殊受理规则',
          title: '特殊受理规则',
          key: '特殊受理规则'
        },
         {
          dataIndex: '操作人',
          title: '操作人',
          key: '操作人'
        },
         {
          dataIndex: '操作',
          title: '操作',
          key: '操作'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  created () {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  methods: {
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    }
  }
}
</script>
<style  scoped>
.ant-tabs {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #1e1e28;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    position: relative;
    overflow: hidden;
    zoom: 1;
}
.container .page-block {
    position: relative;
    padding: 20px;
    padding-top: 0;
}
.container .page-title:first-child {
    height: 40px;
    line-height: unset;
}
.container .page-block .config-instruction {
    display: inline-block;
    font-size: 12px;
    color: #3985ff;
    cursor: pointer;
}

.container .page-block .config-category .category-title{
    border-left: 1px solid #eaeaf4;
    border-right: 1px solid #eaeaf4;
    border-top: 1px solid #eaeaf4;
    background-color: #f8f8f9;
    font-size: 14px;
    font-weight: 500;
    color: #1e1e28;
    line-height: 50px;
    height: 50px;
    padding-left: 24px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.container .page-block .config-category .category-content {
    color: #3e4b6f;
    border: 1px solid #eaeaf4;
}
.category-content-item:last-of-type {
    border-bottom: none;
}
.category-content-item .config-item-head {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-left: 80px;
    height: 50px;
    color: #3e4b6f;
}
.category-content-item .config-item-head .config-title {
    width: 13em;
    text-align: right;
    margin-right: 2%;
    font-size: 14px;
    color: #1e1e28;
    line-height: 1em;
}
.category-content-item .config-item-head .config-tips{
    -webkit-box-flex: 3;
    -ms-flex: 3;
    flex: 3;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    font-size: 12px;
    line-height: 1em;
}
.category-content-item .config-item-head .config-status
{
    font-size: 12px;
    width: 130px;
}
.category-content-item .config-item-head .config-operate{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.ant-btn-link {
    background-color: transparent;
    border-color: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
    min-width: auto;
}
.container .page-title:first-child {
    height: 40px;
    line-height: unset;
}
.container .page-block .config-instruction{
    display: inline-block;
    font-size: 12px;
    color: #3985ff;
    cursor: pointer;
}
</style>


