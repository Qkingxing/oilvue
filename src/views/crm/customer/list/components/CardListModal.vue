
<template>
  <a-modal
      :title="'加油卡'"
      :width="600"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
    <div class="oilCardModalHeader"><span>加油卡11张</span></div>
    <div class="oilCardModalBody public_global_scroll">
      <div class="cardItem base-info" v-for="(item,i) in list" :key="i">
        <div class="base-item">
          <div class="base-title">卡号</div>
          <div class="base-val">
            <span :title="item.card_no" class="">{{item.card_no}}</span>
          </div>
        </div>
        <div class="base-item">
          <div class="base-title">卡名称</div>
          <div class="base-val-category">
            <div>{{item.card_name}}</div>
            <div class="category" v-if="item.type==1">个人卡</div>
            <div class="category" v-else>车队卡</div>
          </div>
        </div>
        <div class="base-item">
          <div class="base-title">卡面号</div>
          <div class="base-val">
            <span class="">{{item.card_face}}</span>
          </div>
        </div>
        <div class="base-item">
          <div class="base-title">开卡时间</div>
          <div class="base-val">
            <span class="">{{item.create_time}}</span>
          </div>
        </div>
        <div class="base-item">
          <div class="base-title">余额</div>
          <div class="base-val">
            <span class="">{{item.money.toFixed(2)}}</span>
          </div>
        </div>
        <div class="base-item">
          <div class="base-title">赠送金额</div>
          <div class="base-val">
            <span class="">{{item.give_money.toFixed(2)}}</span>
          </div>
        </div>
        <div class="base-item">
          <div class="base-title">开卡油站</div>
          <div class="base-val">
            <span class="">{{item.site_name}}</span>
          </div>
        </div>

      </div>
      
    </div>

  </a-modal>
</template>

<script>

import _ from 'lodash'
import { getUserCard } from '@/api/crm'

export default {
  name: 'CardListModal',
  data(){
    return {

      visible: false,
      confirmLoading: false,
      list: []

    }
  },
  created(){

  },
  methods: {

    showModal() {
      getUserCard(this.$route.query.id).then(res=>{
        console.log(res.data)
        this.list = res.data
      })

      this.visible = true;
    },
    handleOk(e) {
     
      

      this.visible = false;
      this.confirmLoading = false;
    },
    handleCancel(e) {
      this.visible = false;
    },
    
  }
}
</script>

<style lang="less" scoped>
.oilCardModalHeader{
  font-size: 14px;
  font-family: PingFangSC-Regular,PingFang SC;
  font-weight: 400;
  color: #1f2e4d;
  line-height: 14px;
}
.oilCardModalBody{
  margin-bottom: 24px;
  max-height: 420px;
  overflow: auto;
  margin-top: 8px;
  &>.cardItem{
    &:first-child{
      margin-top: 0;
    }
  }
  .base-info{
    border: 1px solid #e4e4e4;
    border-bottom: none;
    margin-bottom: 0;
    .base-item{
      -webkit-box-flex: 50%;
      -ms-flex: 50%;
      flex: 50%;
      .base-title{
        font-size: 12px;
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight: 400;
        color: #1f2e4d;
        line-height: 22px;
      }
      .base-val{
        font-size: 14px;
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight: 400;
        color: #1f2e4d;
      }
      .base-val-category{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding-left: 6px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight: 400;
        color: #1f2e4d;
        white-space: nowrap;
        .category{
          min-width: 64px;
          height: 24px;
          font-size: 14px;
          background: #eaeaf4;
          border-radius: 2px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          margin-right: 4px;
        }
      }
    }
  }
  .cardItem{
    margin-top: 8px;
    .base-val{
      padding-left: 6px!important;
    }
  }
}
.base-info{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  border: 1px solid #ededed;
  margin-bottom: 16px;
  .base-item{
    -webkit-box-flex: 0;
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    min-height: 50px;
    border-bottom: 1px solid #ededed;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #1e1e28;
    border-right: 1px solid #ededed;
    .base-title{
      width: 90px;
      background-color: #f8f8f9;
      padding-right: 10px;
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;
    }
    .base-val{
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding-left: 10px;
      text-align: left;
    }
  }
}
</style>