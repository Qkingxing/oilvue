<template>
  <a-layout-content
    :style="{
      padding: '0 24px 24px 24px',
      background: '#fff',
      minHeight: '760px',
      position: 'relative'
    }"
  >
    <div class="head-title"><span>人工发券</span></div>

    <div class="couponsChoiceModal">
      <div class="couponsChoiceModal_line">
        <div class="couponsChoiceModal_text">优惠券</div>

        <CouponSelect 
          ref="CouponSelect" />

        <div class="couponsChoiceModal_text">没有合适的优惠券？</div>
        <div class="couponsChoiceModal_text">
          <router-link :to="{path:'/em/marketing/add'}">去创建</router-link>
        </div>
      </div>
      <div class="couponsChoiceModal_line" style="margin: 10px 0px 0px 57px;">
        <a-table 
          style="width:100%"
          :columns="columns" 
          :data-source="checkedCoupons" 
          rowKey="id"
          :pagination="false">

          <span slot="coupons_amount" slot-scope="text, record, index">
            <template>
              {{text}}元
            </template>
          </span>
          <span slot="count" slot-scope="text, record, index">
            <template>
              <div class="couponsChoiceModal_tableLine">
                <a-button icon="minus" @click="minusCount(index)"/>
                <span style="padding: 0px 10px;">{{record.count}}</span>
                <a-button icon="plus" @click="plusCount(index)"/>
              </div>
            </template>
          </span>
          <span slot="action" slot-scope="text, record, index">
            <template>
              <a @click="delItem(index)">删除</a>
            </template>
          </span>
        </a-table>
      </div>

      <div class="couponsChoiceModal_line" style="margin: 10px 0px 0px 57px;">
        <div class="couponsChoiceModal_text">每个用户发券成本约</div>
        <a src="javascript:;" style="cursor: auto; padding: 0px 3px;">{{money}}</a>
        <div class="couponsChoiceModal_text">元</div>
        <div class="couponsChoiceModal_text" style="margin-left: 10px; display: none;">(未统计折扣券)</div><div class="couponsChoiceModal_text" style="margin-left: 10px; display: none;">(未统计折扣券)</div>
      </div>

    </div>

    <div class="container_button" style="display: flex; justify-content: space-around; width: 280px;">
      <a-button type="primary" :disabled="checkedCoupons.length==0" @click="SendCoupon">确 认</a-button>
      <a-button @click="exit">取 消</a-button>

    </div>

  </a-layout-content>
</template>

<script>
import { SendCoupon } from '@/api/crm'
import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'


export default {
  name: 'SendCoupon',
  components:{
    CouponSelect: ()=>import('./CouponSelect')
  },
  data(){
    return {
      value: [],
      couponsList: [],  // 优惠券下拉
      oldChooseData: [], // 油站下拉上次的选择
      form: {
        site_id: []
      },
      columns: [
        {
          title: '券名称',
          dataIndex: 'coupons_name',
        },
        {
          title: '券金额',
          dataIndex: 'coupons_amount',
          scopedSlots: { customRender: 'coupons_amount' }
        },
        {
          title: '数量',
          dataIndex: 'count',
          scopedSlots: { customRender: 'count' }
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        },
      ],

    }
  },
  props:{
    ids:{
      type: Array,
      default: []
    }
  },
  computed:{
    ...mapGetters(['checkedCoupons']),
    money(){
      let money = 0
      // console.log(this.table)
      this.checkedCoupons.forEach(e=>{
        money += (e.coupons_amount*e.count)
      })
      return money.toFixed(2)
    }
  },
  created(){

  },
  methods: {
    ...mapMutations(['SET_CHECKED_COUPONS']),
    SendCoupon(){
      let table = _.cloneDeep(this.checkedCoupons)
      let params = {
        user_id: this.$route.query.id?this.$route.query.id:this.ids,
        coupons: table.map(e=>{
          return {
            id: e.id,
            count: e.count
          }
        })
      }
      // console.log(params)
  
      SendCoupon(params).then(res=>{
        // console.log(res).
        this.$message.success('优惠券发放成功')
        this.$emit('reset')
        this.exit()
      })
    },
    delItem(index){
      let table = _.cloneDeep(this.checkedCoupons)
      // 通知下拉框，删除一个
      this.$refs.CouponSelect.delItem(table[index])
      table.splice(index,1)
      this.SET_CHECKED_COUPONS(table)
    },
    minusCount(index){
      let table = _.cloneDeep(this.checkedCoupons)
      table[index].count -= 1
      if (table[index].count<1) {
        // 通知下拉框，删除一个
        this.$refs.CouponSelect.delItem(table[index])
        table.splice(index,1)
      }
      this.SET_CHECKED_COUPONS(table)
    },
    plusCount(index){
      let table = _.cloneDeep(this.checkedCoupons)
      table[index].count += 1
      this.SET_CHECKED_COUPONS(table)
    },
    exit(){
      this.$emit('exit')
    }
  }
}
</script>

<style lang="less" scoped>
.head-title{
  font-size: 16px;
  font-weight: 700;
  color: #1e1e28;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
  margin-bottom: 30px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.couponsChoiceModal{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  padding: 0 89px;
}
.couponsChoiceModal_line{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 510px;
  min-height: 40px;
  margin-bottom: 15px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.couponsChoiceModal_text{
  font-size: 14px;
  color: #1e1e28;
  a{
    color: #3b85ff;
  }
}
.multipleChoiceContainer{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 220px;
  height: 40px;
  border-color: #d9d9d9;
  margin: 0 15px;
  text-align: left;
}
.container_button{
  margin: 50px 130px;
}
.couponsChoiceModal_tableLine{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  .ant-btn{
    min-width: auto;
    width: 24px;
    height: 24px;
    padding: 0;
  }
}
</style>