
<template>
  <a-layout>
    <a-layout-content :style="{ margin: '24px 0', padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">

      <a-tabs default-active-key="1" size="large">
        <a-tab-pane key="1" tab="公众号菜单配置">
         <!-- <div class="main">
           <div class="left-wrap">
             <img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/20191114/17/abc9ca8e715fbf65cc4dc2dba169.png" style="width: 293px;">
             <p class="mobile-title">全球能数</p>
           </div>
           <div class="right-wrap">
             right
           </div>
         </div> -->
        <div class="main">
          <div class="main-item item-left">
            <div class="mobile-view">
              <img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/20191114/17/abc9ca8e715fbf65cc4dc2dba169.png" style="width: 293px;">
              <p class="mobile-title">全球能数</p>
              <div class="submenu-view">
                <div class="btn-wrap">
                  <a-button>订单详情</a-button>
                  <a-button>一键加油</a-button>
                  <a-button>幸运抽奖</a-button>
                  <a-button>闪付</a-button>
                </div>
                <div class="btn-wrap hide-bg">
                  <a-button>个人中心</a-button>
                  <a-button>发送消息</a-button>
                  <a-button>油卡充值</a-button>
                  <a-button>优惠券</a-button>
                  <a-button>大转盘</a-button>
                </div>
                <div class="btn-wrap hide-bg">
                  <a-button>优惠券</a-button>
                  <a-button>百元红包</a-button>
                  <a-button>今日油价</a-button>
                  <a-button>积分商城</a-button>
                  <a-button>好友邀请</a-button>
                  
                </div>
              </div>
              <div class="btn-view">
                <img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/20191114/17/22fdd022ba69f333980405c24c14.png" style="width: 20px; height: 20px; margin: 0px 10px;">
                <a-button>一键加油</a-button>
                <a-button>会员中心</a-button>
                <a-button>优惠活动</a-button>
              </div>
            </div>
          </div>
          <div class="main-item item-right menu-edit-tips" style="display: none;">
            <p>点击左侧菜单进行编辑操作</p>
          </div>
          <div class="main-item item-right">
            <div class="menu-title"><span>菜单名称</span>
           <a-button>删除菜单</a-button>
           </div>
           <div class="menu-content">
            <div class="content-item">
              <span class="content-item-title" style="line-height: 40px;">菜单名称</span>
              <div class="content-item-main">
                <a-input placeholder="请输入菜单名称" />
               
                <span class="name-edit-tips">
                  仅支持中英文和数字,字数不超过4个汉字或8个字母</span>
              </div>
            </div>
            <div class="content-item">
              <span class="content-item-title">菜单内容</span>
              <div class="content-item-main">
                <a-radio-group v-model="radioType" name="radioGroup">
                  <a-radio :value="1">
                    发送消息
                  </a-radio>
                  <a-radio :value="2">
                     跳转网页
                  </a-radio>
                  <a-radio :value="3">
                   跳转小程序
                  </a-radio>
                 
                </a-radio-group>
               
      <div class="edit-wrap" v-show="radioType==1">
        <div class="btn-view">
          <a-radio-group v-model="noticeType">
            <a-radio-button :value="1">
              文字
            </a-radio-button>
            <a-radio-button :value="2">
              图片
            </a-radio-button>
           
          </a-radio-group>
        </div>
      <div  v-show="noticeType==1">
         <a-textarea
        
          placeholder="请输入文字"
          :auto-size="{ minRows: 10 }"
        />
        <p class="total">0/600</p>
      </div>
      <div v-show="noticeType==2">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                大小不超过2M
              </div>
            </div>
          </a-upload>
       </div>
      </div>
      <div class="edit-wrap" v-show="radioType==2">
        <div class="edit-item">
        <div class="edit-item-left">
        <span class="title">页面地址</span>
        </div>
        <div class="edit-item-right">
           <a-input style="width: 300px;" placeholder="请输入页面地址" />
         
          <p class="url-set-tips">请以http://或https://开头，订阅者点击子菜单会跳到此链接</p>
        </div>
        </div>
        </div>
        <div class="edit-wrap" v-show="radioType==3">
        <div class="edit-item">
          <div class="edit-item-left">
            <span class="title">小程序APPID</span>
          </div>
          <div class="edit-item-right">
            <a-input style="width: 300px;" placeholder="请输入小程序APPID" />
          </div>
        </div>
        <div class="edit-item">
          <div class="edit-item-left">
            <span class="title">小程序路径</span>
          </div>
          <div class="edit-item-right">
            <a-input style="width: 300px;" placeholder="请输入小程序路径" />
        
            <span class="name-edit-tips emptyWarnTips" style="display: none;">请填写小程序路径</span></div>
        </div>
        <div class="edit-item">
          <div class="edit-item-left">
            <span class="title">备用网页</span>
            </div>
          <div class="edit-item-right">
            <a-input style="width: 300px;" placeholder="请输入备用网页" />
            <span style="color: red; margin-left: 10px; font-size: 12px; display: none;">请以http://或https://开头</span>
          <p class="url-set-tips">旧版微信客户端无法支持小程序，用户点击菜单时将会打开备用网页</p>
          </div>
        </div>
      </div>
    <p class="emptyWarnTips" style="margin-top: 10px; display: none;">
    <i aria-label="图标: exclamation-circle" class="anticon anticon-exclamation-circle">
      <svg viewBox="64 64 896 896" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path></svg></i>
          请设置当前菜单内容
      </p></div>
    </div>
    </div>
    </div>
  </div>

<div class="footer-btn-view">
<div class="btn-view-item item-left"></div>
<div class="btn-view-item item-right">
<button type="button" class="ant-btn ant-btn-primary">
<span>保存并发布</span></button></div></div>
        </a-tab-pane>
      
      
      </a-tabs>
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
.main{
  display:flex;
}
/* .main .left-wrap{
    margin-left: 20px;
    width: 295px;
    border:1px solid #d8d8d8;
    min-height:582px;
} */
.main .item-left {
    margin-left: 20px;
    width: 295px;
}
.main .main-item {
    min-height: 582px;
}
.main .item-left .mobile-view {
  position: relative;
  width: 295px;
  border: 1px solid #d8d8d8;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 582px;
}
.main .item-left .mobile-view .mobile-title {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    top: 21px;
}
.main .item-left .mobile-view .submenu-view {
    padding-left: 40px;
    position: absolute;
    left: 0;
    bottom: 44px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.main .item-left .mobile-view .submenu-view .btn-wrap {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    overflow: hidden;
}
.main .item-left .mobile-view button {
    width: 100%;
    height: 44px;
    border-radius: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 5px;
    min-width: 70px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.hide-bg {
    opacity: 0;
}
.main .item-left .mobile-view .btn-view {
    position: absolute;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background: #f6f7fb;
    border-top: 1px solid #d8d8d8;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.main .item-left .mobile-view button {
    width: 100%;
    height: 44px;
    border-radius: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 5px;
    min-width: 70px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.main .menu-edit-tips {
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.main .item-right {
    padding: 0 10px;
    margin-left: 15px;
    width: 816px;
    height: 582px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #f6f7fb;
}
.main .main-item {
    min-height: 582px;
}
.main .item-right {
    padding: 0 10px;
    margin-left: 15px;
    width: 816px;
    height: 582px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #f6f7fb;
}
.main .item-right .menu-title {
    height: 50px;
    line-height: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
}
.main .item-right .menu-title .delete-btn {
    font-size: 12px;
    color: #3985ff;
}
.main .item-right .menu-content {
    margin-top: 20px;
}
.main .item-right .menu-content .content-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 10px;
}
.main .item-right .menu-content .content-item .content-item-title {
    min-width: 60px;
}
.main .item-right .menu-content .content-item .content-item-main {
    margin-left: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
}
.main .item-right .menu-content .content-item .content-item-main .name-edit-tips {
    font-size: 12px;
    color: #c7c7c7;
    margin-left: 10px;
}
.main .item-right .menu-content .content-item .content-item-title {
    min-width: 60px;
}
.main .item-right .menu-content .content-item .content-item-main {
    margin-left: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
}
.main .item-right .menu-content .content-item .content-item-main .edit-wrap {
    width: 666px;
    height: 325px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid #d8d8d8;
    margin-top: 22px;
}
.emptyWarnTips {
    color: red!important;
}
.footer-btn-view {
    margin-top: 50px;
}
.footer-btn-view, .footer-btn-view .btn-view-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.main .item-right .menu-content .content-item .content-item-main .edit-wrap .edit-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 20px;
}
.main .item-right .menu-content .content-item .content-item-main .edit-wrap .edit-item .edit-item-right .url-set-tips {
    color: #c7c7c7;
    font-size: 12px;
    margin-top: 10px;
}
.main .item-right .menu-content .content-item .content-item-main .edit-wrap .edit-item .edit-item-left {
    width: 90px;
    margin-left: -10px;
    text-align: right;
}
.main .item-right .menu-content .content-item .content-item-main .edit-wrap .edit-item .edit-item-right {
    margin-left: 20px;
}
.main .item-right .menu-content .content-item .content-item-main .edit-wrap .edit-item .edit-item-left .title {
    line-height: 32px;
}
</style>

