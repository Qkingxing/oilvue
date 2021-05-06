<template>
  <div>
    <a-layout v-if="$route.name=='Aoverview'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }" v-if="false">
        <h3 class="o-title">账户概览</h3>
        <a-divider />
        <div class="account-box">
          <p>账户可用余额（元）</p>
          <span>{{ accountBalance }}</span><a-button type="primary" class="abutton">充值</a-button>
        </div>
      </a-layout-content>
      <a-layout-content  :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <a-tabs default-active-key="1" >
          <a-tab-pane key="1" tab="线上充值">
            <a-form layout="inline" style="margin-left: 30px;">
              <div style="margin-top:30px">
                <span style="margin-right: 10px;">充值账户</span>
                <span>第一集团</span>
              </div>
              <div style="margin-top:30px">
                <span style="margin-right: 10px;">账户余额</span>
                <span>{{accountBalance}}</span>
              </div>
              <div style="margin-top:30px">
                <span style="margin-right: 10px;">充值金额</span>
                <span><a-input type="number" style="width: 90px;" v-model="wxParams.money"></a-input> 元</span>
              </div>
            </a-form>
            <div style="margin-left: 30px;margin-top: 30px;">
              <a-button type="primary" @click="toWxPay()">确认充值</a-button>
              <a-button style="margin-left: 20px;">取消</a-button>
            </div>
            <img :src="wxPayImg" alt="">
          </a-tab-pane>
          <a-tab-pane key="2" tab="对公汇款" force-render>
            <a-form layout="inline" style="margin-left: 30px;">
              <div style="margin-top:30px">
                <span style="margin-right: 10px;">充值账户</span>
                <span>第一集团</span>
              </div>
              <div style="margin-top:30px">
                <span style="margin-right: 10px;">账户余额</span>
                <span>{{accountBalance}}</span>
              </div>
              <div style="margin-top:30px">
                <span style="margin-right: 10px;">充值金额</span>
                <span><a-input type="number" style="width: 90px;" v-model="wxParams.money"></a-input> 元</span>
              </div>
              <div style="margin-top:30px">
                <span style="margin-right: 10px;">回款流程</span>
                <div class="step-title">
                  <span>1</span>
                  <span>输入汇款时使用的银行卡信息</span>
                </div>
                <div class="step-one">
                  <p class="tips">可使用任意银行卡汇款，实际汇款户名必须与所填户名一致，才可充值到账</p>
                  <div>
                    <span>汇款姓名</span>
                    <a-input style="width:200px" type="text" placeholder="请输入汇款户名">></a-input>
                  </div>
                  <div>
                    <span>汇款账号</span>
                    <a-input style="width:200px" type="text" placeholder="请输入汇款账号">></a-input>
                  </div>
                  <div>
                    <span>汇款回单号</span>
                    <a-input style="width:200px" type="text" placeholder="请输入汇款回单号">></a-input>
                    <span class="memo">注：回单号和汇款截图二选一即可</span>
                  </div>
                  <div>
                    <span>汇款截图</span>
                     <a-upload
                        style="vertical-align: top;"
                        name="avatar"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        action="https://oiljava.ldyxx.com:4435/goods/FileImg"
                        :before-upload="beforeUpload"
                        @change="handleChange"
                      >
                        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                        <div v-else>
                          <a-icon :type="loading ? 'loading' : 'plus'" />
                          <div class="ant-upload-text">
                            Upload
                          </div>
                        </div>
                      </a-upload>
                  </div>
                </div>
                <div class="step-title" style="margin-left: 70px;">
                  <span>2</span>
                  <span>请使用所填账户汇款至以下收款账户：</span>
                </div>
                <div class="step-two">
                  <div class="step-two-dsc">
                    <div>
                      <span>户名</span>
                      <span>深圳市能数科技有限公司</span>
                    </div>
                    <div>
                      <span>账号</span>
                      <span>7559 4741 3910 806</span>
                    </div>
                    <div>
                      <span>开户行</span>
                      <span>招商银行股份有限公司深圳南山支行</span>
                    </div>
                    <div>
                      <span>汇款备注</span>
                      <span>能链云平台充值</span>
                    </div>
                  </div>
                </div>
                <div class="step-title" style="margin-left: 70px;margin-top: 10px;">
                  <span>3</span>
                  <span>等待 1-2工作日后会换金额充值到账：</span>
                </div>
                <div class="step-three">
                  <p>汇款信息正确的情况下2工作日内可核实到账情况，最快当天可处理，请耐心等待或联系您的客户经理催办。 您可以在 充值记录 页面随时查看充值进度</p>
                </div>
                <div class="step-title" style="margin-left: 70px;">
                  <span>4</span>
                  <span>已汇款</span>
                </div>
              </div>
            </a-form>
            
            <div style="margin-left: 30px;margin-top: 30px;">
              <a-button type="primary" @click="toWxPay()">确认充值</a-button>
              <a-button style="margin-left: 20px;">取消</a-button>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import { getBasic, wxPay } from '@/api/finance'
import store from '@/store'
export default {
    name: 'Aoverview',
    data () {
      return {
        loading: false,
        imageUrl: '',
        wxPayImg:'',
        wxParams:{
          money:'',
          body:'账户充值',
          uid:''
        },
        accountBalance: ''
      }
    },
    created () {
      this.wxParams.uid = store.getters.userId
      if (store.getters.site_id === (-1)) {
        this.wxParams.group_id = store.getters.group_id
      } else {
        this.wxParams.site_id = store.getters.site_id
      }
      this.loadBasic()
    },
    methods: {
      handleChange(info) {
        if (info.file.status === 'uploading') {
          this.loading = true;
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          console.log(info)
          // getBase64(info.file.originFileObj, imageUrl => {
          //   this.imageUrl = imageUrl;
          //   this.loading = false;
          // });
        }
      },
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          this.$message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      },
      toWxPay(){
        wxPay(this.wxParams).then(res=>{
          this.wxPayImg = window.URL.createObjectURL(res)
          console.log(this.wxPayImg)
        })
      },
      async loadBasic () {
        const res = await getBasic()
        this.accountBalance = res.data.account_balance
          console.log(res.data.account_balance)
      }
    }
}
</script>
<style lang="less" scoped="scoped">
  .step-title{
    display: inline-block;
    span:first-child{
      display: inline-block;
      width: 24px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      background-color: #0091ff;
      color: #FFFFFF;
      border-radius: 100%;
    }
    span:last-child{
      margin-left: 10px;
    }
  }
  .step-three{
    width: 660px;
    margin-left: 80px;
    margin-top: 10px;
    color: #96a2be;
    border-left: 1px dotted #000000;
    padding-left: 20px;
  }
  .step-two{
    margin-left: 80px;
    margin-top: 10px;
    padding-left: 20px;
    border-left: 1px dotted #000000;
    .step-two-dsc{
      background-color: #fafafa;
      padding: 10px;
      width: 480px;
      div{
        margin-bottom: 10px;
        span:first-child{
          display: inline-block;
          width: 70px;
          margin-right: 20px;
          text-align: right;
        }
      }
    }
  }
  .step-one{
    margin-left: 80px;
    padding-left: 20px;
    border-left: 1px dotted #000000;
    .tips{
      margin-top: 15px;
      font-size: 14px;
      font-weight: 400;
      color: #96a2be;
    }
    div{
      margin-bottom: 20px;
      span{
        display: inline-block;
        width: 80px;
        text-align: right;
        margin-right: 10px;
      }
      .memo{
        width: 200px;
        color: #96a2be;
        margin-left: 20px;
      }
    }
  }
  .account-box{
    box-sizing: border-box;
    width: 554px;
    height: 138px;
    padding: 24px 24px 24px 24px;
    background: #fafafa;
    span{
      font-size: 52px;
      font-family: Helvetica-Bold,Helvetica;
      font-weight: 700;
      color: #040a46;
      line-height: 52px;
      height: 40px;
      display: inline-block;
    }
    .abutton{
      margin-left: 200px;
      min-width: 96px;
      height: 40px;
      vertical-align: top;
    }
  }
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
