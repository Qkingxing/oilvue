
<template>
  <main  class="ant-layout-content" showallsider="true">
    <div  showbreadcrumb="true" usedefault="true" class="mainContainreBox">
      <div  class="mainContainreBlock">
        <div   class="container animated fadeIn">
          <div  class="stepsBox">
            <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          </div>
        <div  class="public-layout-line"></div>
        <div  class="contentContainer">
          <div  itstate="0" class="contentScroll">
      <div  class="contentBlock formOne">
      <form  class="ant-form ant-form-horizontal">
        <div  class="ant-row ant-form-item">
    <div class="ant-col ant-col-2 ant-form-item-label">
  <label for="openInvoiceVaildTimeType" title="开票有效期" class="ant-form-item-required">开票有效期</label></div><div class="ant-col ant-col-14 ant-form-item-control-wrapper"><div class="ant-form-item-control">
<span class="ant-form-item-children">
<div  class="ant-radio-group ant-radio-group-outline ant-radio-group-default" data-__meta="[object Object]" data-__field="[object Object]" id="openInvoiceVaildTimeType"><label  class="ant-radio-wrapper"><span class="ant-radio"><input type="radio" class="ant-radio-input" value="1"><span class="ant-radio-inner"></span></span><span>1天</span></label><label  class="ant-radio-wrapper"><span class="ant-radio"><input type="radio" class="ant-radio-input" value="7"><span class="ant-radio-inner"></span>
</span><span>7天</span></label>
<label  class="ant-radio-wrapper">
  <span class="ant-radio">
    <input type="radio" class="ant-radio-input" value="30">
    <span class="ant-radio-inner"></span></span><span>30天
      </span></label><label  class="ant-radio-wrapper">
  <span class="ant-radio">
<input type="radio" class="ant-radio-input" value="-1">
<span class="ant-radio-inner"></span></span><span>自定义
  </span></label></div></span></div></div></div>
  <div  class="contentInput ant-row ant-form-item">
    <div class="ant-col ant-form-item-control-wrapper">
      <div class="ant-form-item-control">
  <span class="ant-form-item-children"></span></div>
  </div></div><div  class="ant-row ant-form-item">
<div class="ant-col ant-col-2 ant-form-item-label">
<label for="canOpenInvoiceEnter" title="开票入口" class="ant-form-item-required">开票入口</label></div><div class="ant-col ant-col-14 ant-form-item-control-wrapper"><div class="ant-form-item-control has-success"><span class="ant-form-item-children"><div  class="ant-checkbox-group" data-__meta="[object Object]" data-__field="[object Object]" id="canOpenInvoiceEnter">
<label  class="ant-checkbox-wrapper"><span class="ant-checkbox">
  <input type="checkbox" class="ant-checkbox-input" value="1">
  <span class="ant-checkbox-inner"></span></span><span>
  支付完成页</span></label><label  class="ant-checkbox-wrapper">
  <span class="ant-checkbox">
  <input type="checkbox" class="ant-checkbox-input" value="2">
<span class="ant-checkbox-inner"></span>
</span><span>订单详情页</span></label>
<label  class="ant-checkbox-wrapper">
  <span class="ant-checkbox">
    <input type="checkbox" class="ant-checkbox-input" value="3">
    <span class="ant-checkbox-inner"></span></span>
    <span>支付小票</span></label>
    <label  class="ant-checkbox-wrapper">
<span class="ant-checkbox">
<input type="checkbox" class="ant-checkbox-input" value="4">
<span class="ant-checkbox-inner"></span></span>
<span>订单记录</span></label></div></span>
</div></div></div><div  class="ant-row ant-form-item">
<div class="ant-col ant-col-2 ant-form-item-label">
<label for="canOpenInvoiceType" title="可开票类型" class="ant-form-item-required">可开票类型</label></div><div class="ant-col ant-col-14 ant-form-item-control-wrapper"><div class="ant-form-item-control has-success"><span class="ant-form-item-children"><div  class="ant-checkbox-group" data-__meta="[object Object]" data-__field="[object Object]" id="canOpenInvoiceType">
<label  class="ant-checkbox-wrapper ant-checkbox-wrapper-checked">
<span class="ant-checkbox ant-checkbox-checked">
<input type="checkbox" class="ant-checkbox-input" value="electronics">
<span class="ant-checkbox-inner"></span></span><span>电票
</span></label><label  class="ant-checkbox-wrapper ant-checkbox-wrapper-checked"><span class="ant-checkbox ant-checkbox-checked"><input type="checkbox" class="ant-checkbox-input" value="paper"><span class="ant-checkbox-inner">
</span></span><span>纸票</span></label></div>
</span></div></div></div>
<div  class="ant-row ant-form-item">
<div class="ant-col ant-col-2 ant-form-item-label">
<label for="openInvoiceType" title="开票金额" class="ant-form-item-required">开票金额</label></div><div class="ant-col ant-col-14 ant-form-item-control-wrapper">
<div class="ant-form-item-control has-success">
<span class="ant-form-item-children">
<div  class="ant-radio-group ant-radio-group-outline ant-radio-group-default" data-__meta="[object Object]" data-__field="[object Object]" id="openInvoiceType"><label  class="ant-radio-wrapper ant-radio-wrapper-checked">
<span class="ant-radio ant-radio-checked">
<input type="radio" class="ant-radio-input" value="1">
<span class="ant-radio-inner"></span></span><span>实付金额
</span></label><label  class="ant-radio-wrapper">
<span class="ant-radio">
<input type="radio" class="ant-radio-input" value="2">
<span class="ant-radio-inner"></span></span>
<span>原价金额</span></label></div></span>
</div></div></div><div  class="ant-row ant-form-item">
<div class="ant-col ant-col-2 ant-form-item-label">
<label for="oilCardType" title="加油卡开票余额" class="ant-form-item-required">加油卡开票余额</label></div><div class="ant-col ant-col-14 ant-form-item-control-wrapper">
  <div class="ant-form-item-control has-success">
<span class="ant-form-item-children">
<div  class="ant-radio-group ant-radio-group-outline ant-radio-group-default" data-__meta="[object Object]" data-__field="[object Object]" id="oilCardType"><label  class="ant-radio-wrapper">
<span class="ant-radio">
<input type="radio" class="ant-radio-input" value="0">
<span class="ant-radio-inner"></span></span>
<span>关闭</span></label>
<label  class="ant-radio-wrapper ant-radio-wrapper-checked">
<span class="ant-radio ant-radio-checked">
<input type="radio" class="ant-radio-input" value="1">
<span class="ant-radio-inner"></span></span><span>开启
</span></label></div></span></div></div>
</div><div  class="ant-row ant-form-item">
<div class="ant-col ant-col-2 ant-form-item-label">
<label for="corporation" title="油站法人" class="ant-form-item-required">油站法人</label></div><div class="ant-col ant-col-14 ant-form-item-control-wrapper"><div class="ant-form-item-control"><span class="ant-form-item-children">
<span  class="ant-input-affix-wrapper" style="width: 200px;">
<input placeholder="请输入油站法人姓名" type="text" maxlength="9" data-__meta="[object Object]" data-__field="[object Object]" id="corporation" class="ant-input"><span class="ant-input-suffix">0/9</span></span>
</span></div></div></div>
<div  class="ant-row ant-form-item" style="margin-top: 20px;"><div class="ant-col ant-col-2 ant-form-item-label">
<label title="营业执照" class="ant-form-item-required" for="url">营业执照</label></div>
<div class="ant-col ant-col-14 ant-form-item-control-wrapper">
<div class="ant-form-item-control">
<span class="ant-form-item-children">
<div data-v-de23988c=""  class="uploadManyContainer" tiptext="请上传营业执照，图片大小不超过3M（必填）" data-__meta="[object Object]" data-__field="[object Object]" id="url">
<span data-v-de23988c="" class="uploadManyContainer_main ant-upload-picture-card-wrapper"><div class="ant-upload-list ant-upload-list-picture-card"><div class="ant-upload-list-picture-card-container"><span>
<div class="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card"><div class="ant-upload-list-item-info"><span>
<i aria-label="图标: picture" class="anticon anticon-picture ant-upload-list-item-thumbnail"><svg viewBox="64 64 896 896" data-icon="picture" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
<path fill="#1890ff" d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z"></path><path fill="#e6f7ff" d="M424.6 765.8l-150.1-178L136 752.1V792h752v-30.4L658.1 489z"></path>
<path fill="#e6f7ff" d="M136 652.7l132.4-157c3.2-3.8 9-3.8 12.2 0l144 170.7L652 396.8c3.2-3.8 9-3.8 12.2 0L888 662.2V232H136v420.7zM304 280a88 88 0 1 1 0 176 88 88 0 0 1 0-176z"></path>
<path fill="#e6f7ff" d="M276 368a28 28 0 1 0 56 0 28 28 0 1 0-56 0z"></path><path fill="#1890ff" d="M304 456a88 88 0 1 0 0-176 88 88 0 0 0 0 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z"></path>
</svg></i>
<span title="image.png" class="ant-upload-list-item-name">image.png</span></span></div><span class="ant-upload-list-item-actions"><a target="_blank" rel="noopener noreferrer" title="预览文件" style="pointer-events: none; opacity: 0.5;"><i aria-label="图标: eye-o" class="anticon anticon-eye-o"><svg viewBox="64 64 896 896" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg></i></a><i aria-label="图标: delete" tabindex="-1" class="anticon anticon-delete" title="删除文件">
<svg viewBox="64 64 896 896" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
<path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg></i></span></div></span></div></div><div class="ant-upload ant-upload-select ant-upload-select-picture-card" style="display: none;">
<span role="button" tabindex="0" class="ant-upload">
<input type="file" accept="" style="display: none;">
</span></div></span><div data-v-de23988c="" class="uploadManyContainer_prompt">请上传营业执照，图片大小不超过3M（必填）</div></div></span></div></div></div><div  class="ant-row ant-form-item" style="margin-top: 64px;">
<div class="ant-col ant-col-2 ant-form-item-label">
<label title=" " class="ant-form-item-no-colon"> 
</label></div><div class="ant-col ant-col-14 ant-form-item-control-wrapper"><div class="ant-form-item-control"><span class="ant-form-item-children"><button  type="button" class="ant-btn ant-btn-primary"><span>下一步</span>
</button></span></div></div>
</div></form></div><div  class="contentBlock"></div>
<div  class="contentBlock"><div  class="successBox">
<svg   aria-hidden="true" class="iconfont" style="color: rgb(72, 198, 114); width: 60px; height: 60px;"><use  xlink:href="#iconsuccess--filled"></use></svg><h6 >创建成功</h6><span >开票信息中纳税人识别号与开票方名称修改后，必须注册才可使用</span><div  class="ev_loginUpClass"><button  type="button" class="ant-btn" style="margin: 40px 0px 0px 8px; width: 88px;"><span>返 回</span></button><button  type="button" class="ant-btn ant-btn-primary" style="margin: 40px 0px 0px 8px; width: 88px; padding: 0px;"><span>立即注册</span></button></div></div></div></div></div></div><div  class="public_local_loading" style="display: none;"><div  class="public_local_loading_box ant-spin ant-spin-lg ant-spin-spinning"><span class="ant-spin-dot ant-spin-dot-spin"><i class="ant-spin-dot-item"></i>
<i class="ant-spin-dot-item"></i>
<i class="ant-spin-dot-item"></i>
<i class="ant-spin-dot-item"></i>
</span>
</div>
</div>
</div>
</div></main>
</template>

<script>
export default {
    name: 'Sinvoice',
    data(){
      return{
        current: 0,
        steps: [
          {
            title: '设置基础信息',
            content: '设置基础信息',
          },
          {
            title: '使用规则设置',
            content: '使用规则设置',
          },
          {
            title: '完成',
            content: '完成',
          },
        ]
      }
    }
}
</script>
<style scoped>
main{
  background:#fff;
}
  .stepsBox {
    height: 82px;
    background: #fff;
   
    align-items: center;
  
    justify-content: center;
  }
</style>
