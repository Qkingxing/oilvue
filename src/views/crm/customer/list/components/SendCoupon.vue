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

        <CouponSelect ref="CouponSelect"/>

        <div class="couponsChoiceModal_text">没有合适的优惠券？</div>
        <div class="couponsChoiceModal_text">
          <a src="javascript:;">去创建</a>
        </div>
      </div>
      <div class="couponsChoiceModal_line" style="margin: 10px 0px 0px 57px;">
        <a-table 
          style="width:100%"
          :columns="columns" 
          :data-source="data" 
          rowKey="id"
          :pagination="false">
        </a-table>
      </div>

      <div class="couponsChoiceModal_line" style="margin: 10px 0px 0px 57px;">
        <div class="couponsChoiceModal_text">每个用户发券成本约</div>
        <a src="javascript:;" style="cursor: auto; padding: 0px 3px;">0</a>
        <div class="couponsChoiceModal_text">元</div>
        <div class="couponsChoiceModal_text" style="margin-left: 10px; display: none;">(未统计折扣券)</div><div class="couponsChoiceModal_text" style="margin-left: 10px; display: none;">(未统计折扣券)</div>
      </div>

    </div>

    <div class="container_button" style="display: flex; justify-content: space-around; width: 280px;">
      <a-button type="primary" disabled>确 认</a-button>
      <a-button>取 消</a-button>

    </div>

  </a-layout-content>
</template>

<script>
import { getCoupons } from '@/api/em'


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
      data: [],
      columns: [
        {
          title: '券名称',
          dataIndex: 'sonnumber',
        },
        {
          title: '券金额',
          dataIndex: 'mobile',
        },
        {
          title: '数量',
          dataIndex: 'nickname',
        },
        {
          title: '操作',
          dataIndex: 'level_id',
        },
      ],

    }
  },
  created(){

  },
  methods: {

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
</style>