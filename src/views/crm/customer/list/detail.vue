
<template>
  <a-layout>
    <a-layout-content
      v-if="pageType=='detail'"
      :style="{
       
        padding: '0 24px 24px 24px',
        background: '#fff',
        minHeight: '280px',
        position: 'relative'
      }"
    >
      <div class="add-rule">
        <a-button @click="$router.go(-1)"> 返回上一页 </a-button>
      </div>
      <div class="list">
        <div class="page-block">
          <div class="head-title">
            客户详情
          </div>
          <div class="base-info" style="border-right: none; border-bottom: none;" v-if="detail">
            <div class="base-item">
              <div class="base-title">客户编号</div>
              <div class="base-val">{{detail.id}}</div>
            </div>
            <div class="base-item">
              <div class="base-title">客户子编号</div>
              <div class="base-val">{{detail.sonnumber}}</div>
            </div>
            <div class="base-item">
              <div class="base-title">手机号</div>
              <div class="base-val">{{detail.mobile=='****'?'-':detail.mobile}}</div>
            </div>
            <div class="base-item rightBorder">
              <div class="base-title">昵称</div>
              <div class="base-val">{{detail.nickname?detail.nickname:'-'}}</div>
            </div>
            <div class="base-item">
              <div class="base-title">性别</div>
              <div class="base-val" v-if="detail.sex==null">-</div>
              <div class="base-val" v-if="detail.sex==0">男</div>
              <div class="base-val" v-if="detail.sex==1">女</div>
            </div>
            <div class="base-item">
              <div class="base-title">车牌号</div>
              <div class="base-val">{{plate_numberText()}}</div>
              <!-- <a-button type="link" style="padding: 0px 8px 0px 0px;" @click="openPlateEdit">编辑</a-button> -->
            </div>
            <div class="base-item">
              <div class="base-title">油品偏好</div>
              <div class="base-val">{{detail.oils_name?detail.oils_name:'-'}}</div>
            </div>
            <div class="base-item rightBorder">
              <div class="base-title">会员等级</div>
              <div class="base-val">{{detail.level_name?detail.level_name:'-'}}</div>
              <a-button type="link" style="padding: 0px 8px 0px 0px;" @click="openEditLevel">修改</a-button>
            </div>
            <div class="base-item">
              <div class="base-title">客户身份</div>
              <div class="base-val">{{identityText(detail.identity_id)}}</div>
            </div>
            <div class="base-item">
              <div class="base-title">现有积分</div>
              <div class="base-val">{{detail.integral?detail.integral:0}}</div>
              <a-button type="link" style="padding: 0px 8px 0px 0px;" @click="openChangeIntegralModal('plus')">增加</a-button>
              <a-button type="link" style="padding: 0px 8px 0px 0px;" @click="openChangeIntegralModal('reduce')">减少</a-button>
            </div>
            <div class="base-item">
              <div class="base-title">加油卡</div>
              <div class="base-val">{{detail.card.length}}张</div>
              <a-button type="link" style="padding: 0px 8px 0px 0px;" v-if="detail.card.length" @click="openCardListModal">查看</a-button>
            </div>
            <div class="base-item rightBorder">
              <div class="base-title">优惠券</div>
              <div class="base-val">{{detail.coupons.length}}张</div>
              <!-- <a-button type="link" style="padding: 0px 8px 0px 0px;">查看</a-button> -->
              <a-button type="link" style="padding: 0px 8px 0px 0px;" @click="pageType='SendCoupon'">发券</a-button>
            </div>
            <div class="base-item rightBorder">
              <div class="base-title">客户标签</div>
              <div class="base-val">
                <div class="label-box">
                  <span>
                    {{userTagText()}}
                  </span>
                </div>
                <!-- <a>修改</a> -->
              </div>
            </div>
            <div style="flex: 1 1 25%;"></div>
            <div style="flex: 1 1 25%;"></div>
            <div style="flex: 1 1 25%;"></div>
          </div>
          <a-tabs default-active-key="5">
            <a-tab-pane key="1" tab="消费记录">
              <ConsumptionHistory 
                ref="ConsumptionHistory"/>
            </a-tab-pane>
            <a-tab-pane key="2" tab="加油卡记录">
            </a-tab-pane>
            <a-tab-pane key="3" tab="优惠券记录">
              <CouponHistory 
                ref="CouponHistory"/>
            </a-tab-pane>
            <!-- <a-tab-pane key="4" tab="等级记录">
            </a-tab-pane> -->
            <a-tab-pane key="4" tab="积分记录">
              <IntegralHistory 
                ref="IntegralHistory"/>
            </a-tab-pane>
            <a-tab-pane key="5" tab="身份认证记录">
              <AuthenticationHistory 
                ref="AuthenticationHistory"/>
            </a-tab-pane>
          </a-tabs>

          
        </div>
      </div>
    </a-layout-content>

    <!-- 发优惠券 -->
    <SendCoupon 
      ref="SendCoupon"
      v-if="pageType=='SendCoupon'"
      @exit="pageType='detail'"
      @reset="onLoad"/>

    <!-- 增减积分 -->
    <ChangeIntegral 
      ref="ChangeIntegral"
      @reset="onLoad"/>
    
    <!-- 编辑车牌号 -->
    <ChangePlateNumber 
      ref="ChangePlateNumber"/>
    
    <!-- 修改会员等级 -->
    <ChangeLevel 
      ref="ChangeLevel"
      @reset="onLoad"/>

    <CardListModal 
      ref="CardListModal"/>

    
  </a-layout>
</template>

<script>
import { STable } from '@/components'
import { identitySelect } from '@/utils/enums'

import { getServiceList } from '@/api/manage'

import { getUserdefault } from '@/api/crm'

export default {
  name: 'CrmDetail',
  components: {
    STable,
    ChangeIntegral: ()=>import('./components/ChangeIntegral'),
    SendCoupon: ()=>import('./components/SendCoupon'),
    ChangePlateNumber: ()=>import('./components/ChangePlateNumber'),
    ChangeLevel: ()=>import('./components/ChangeLevel'),
    ConsumptionHistory: ()=>import('./components/table/ConsumptionHistory'),
    CouponHistory: ()=>import('./components/table/CouponHistory'),
    IntegralHistory: ()=>import('./components/table/IntegralHistory'),
    AuthenticationHistory: ()=>import('./components/table/AuthenticationHistory'),
    CardListModal: ()=>import('./components/CardListModal'),
  },
  data () {
    return {
      pageType: 'detail',
      detail: null,
      identitySelect,
      
      
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    async onLoad(){
      getUserdefault(this.$route.query.id).then(res=>{
        // console.log(res)
        this.detail = res.data
      })
    },
    // 打开加油卡详情
    openCardListModal(){
      this.$refs.CardListModal.showModal()
    },
    plate_numberText(){
      let arr = this.detail.plate_number.map(e=>{return e.plate_number})
      let str = arr.join('、')
      // console.log(str)
      if (this.detail.plate_number.length) {
        return str
      }else{
        return '-'
      }
    },
    userTagText(){
      let arr = this.detail.label.map(e=>{return e.name})
      let str = arr.join('、')
      // console.log(str)
      if (this.detail.label.length) {
        return str
      }else{
        return '-'
      }
    },
    // 修改会员等级
    openEditLevel(){
      this.$refs.ChangeLevel.showModal({
        level_id: this.detail.level_id,
        level_name: this.detail.level_name
      })
    },
    // 编辑车牌号
    openPlateEdit(){
      this.$refs.ChangePlateNumber.showModal(this.detail.plate_number)
    },
    // 增加减少积分
    openChangeIntegralModal(type){
      this.$refs.ChangeIntegral.showModal({
        user_id: this.detail.user_id,
        type
      })
    },
    identityText(id){
      let item = this.identitySelect.find(e=>{
        return e.value === id
      })
      // console.log(item)
      if (item&&item.value) {
        return item.label
      }else{
        return '-'
      }
      
    },
    delTag () {
      this.$confirm({
        title: '操作提示',
        content: '撤回后将删除本次导入的客户数据，用户已授权的数据不会删除，请确认是否继续',
        onOk () {
          return new Promise((resolve, reject) => {
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },
  }
}
</script>
<style lang="less" scoped>
.add-rule {
  position: absolute;
  right: 24px;
  top: 10px;
}
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  line-height: 24px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  padding: 22px 0 16px 0;
  border-bottom: 1px solid #eaeaf4;
}
.base-info{
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ededed;
  margin-bottom: 16px;
  .base-item{
    flex: 25%;
    min-height: 50px;
    border-bottom: 1px solid #ededed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #040a46;
    .base-title{
      width: 90px;
      background-color: #f8f8f9;
      padding-right: 10px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .base-val{
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 10px;
      text-align: left;
      .label-box{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        padding-top: 4px;
      }
      a{
        display: inline-block;
        width: 28px;
        font-size: 14px;
        margin-right: 16px;
      }
    }
    &.rightBorder{
      border-right: 1px solid #ededed;
    }
  }
}
.page-content {
  margin-top: 30px;
}
.growth-setting {
  .setting-item {
    display: flex;
    .setting-title {
      line-height: 45px;
      width: 128px;
      margin-right: 20px;
      text-align: right;
    }
    .setting-content {
      line-height: 45px;
    }
  }
}
.growth-level {
  margin-top: 15px;
  .level-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 60px;
    color: #040a46;
  }
}
.page-foot {
  text-align: center;
  margin-top: 50px;
  button {
    margin-right: 20px;
  }
}
</style>
