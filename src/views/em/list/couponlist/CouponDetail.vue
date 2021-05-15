
<template>

  <a-layout-content
    :style="{
      padding: '0 24px 24px 24px',
      background: '#fff',
      minHeight: '700px',
      position: 'relative'
    }"
  >
    <div class="head-title">
      <div class="head-title-left">优惠券详情
        <span class="ac-states" has-act="true" v-if="itemObj.activation_type==0">未激活</span>
        <span class="ac-states" v-else>已激活</span>
      </div>

      <a-button @click="back">返回上一页</a-button>
    </div>

    <div class="global_couponDetailBox">
      <div class="global_couponDetail_right">
        <div class="global_couponDetail_right_line">
          <div class="global_couponDetail_right_left">优惠券名</div>
          <div class="global_couponDetail_right_right">
            <div>{{itemObj.coupons_name}}</div>
          </div>
        </div>
        <div class="global_couponDetail_right_line">
          <div class="global_couponDetail_right_left">生效油站</div>
          <div class="global_couponDetail_right_right">
            <div>{{itemObj.site_id}}</div>
          </div>
        </div>
        <div class="global_couponDetail_right_line">
          <div class="global_couponDetail_right_left">活动人群</div>
          <div class="global_couponDetail_right_right">
            <div>神仙优惠</div>
          </div>
        </div>
        <div class="global_couponDetail_right_line">
          <div class="global_couponDetail_right_left">支付限制</div>
          <div class="global_couponDetail_right_right">
            <div>神仙优惠</div>
          </div>
        </div>
        <div class="global_couponDetail_right_line">
          <div class="global_couponDetail_right_left">券类型</div>
          <div class="global_couponDetail_right_right">
            <div>神仙优惠</div>
          </div>
        </div>
        <div class="global_couponDetail_right_line">
          <div class="global_couponDetail_right_left">券面额</div>
          <div class="global_couponDetail_right_right">
            <div>固定金额<span style="color:#3a85ff;padding:0 3px;">2</span>元</div>
          </div>
        </div>
        <div class="global_couponDetail_right_line">
          <div class="global_couponDetail_right_left">券有效期</div>
          <div class="global_couponDetail_right_right">
            <div >2021-05-13 00:00:00至2021-06-13 23:59:59</div>

            <a-date-picker 
              v-if="itemObj.activation_type==1"
              style="min-width: 195px;" 
              format="YYYY-MM-DD HH:mm:ss"
              :disabled-date="disabledDate"
              :disabled-time="disabledDateTime"
              :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
              v-model="time"
              @ok="onOkTime">
              <div class="modify">修改</div>
            </a-date-picker>

          </div>
        </div>
        <div class="global_couponDetail_right_line">
          <div class="global_couponDetail_right_left">使用限制</div>
          <div class="global_couponDetail_right_right">
            <div >2021-05-13 00:00:00至2021-06-13 23:59:59</div>
          </div>
        </div>
        <div class="global_couponDetail_right_line">
          <div class="global_couponDetail_right_left">使用须知</div>
          <div class="global_couponDetail_right_right">
            <div >2021-05-13 00:00:00至2021-06-13 23:59:59</div>
          </div>
        </div>
        <div class="global_couponDetail_right_line">
          <div class="global_couponDetail_right_left">时间限制</div>
          <div class="global_couponDetail_right_right">
            <div >2021-05-13 00:00:00至2021-06-13 23:59:59</div>
          </div>
        </div>
        <div class="global_couponDetail_right_line">
          <div class="global_couponDetail_right_left">使用条件</div>
          <div class="global_couponDetail_right_right">
            <div>98#车用汽油原价满2元可用<br><div style="height: 5px;"></div>95#车用汽油原价满2元可用<br><div style="height: 5px;"></div>92#车用汽油原价满2元可用<br><div style="height: 5px;"></div>4#车用柴油原价满2元可用<br><div style="height: 5px;"></div>3#车用柴油原价满2元可用<br><div style="height: 5px;"></div>0#车用柴油原价满2元可用<br><div style="height: 5px;"></div></div>
          </div>
        </div>
        <div class="global_couponDetail_right_line" v-if="itemObj.activation_type==0">
          <div class="global_couponDetail_right_left">操作</div>
          <div class="global_couponDetail_right_right">
            <a v-if="itemObj.activation_type==0" @click="updateCoupons(itemObj)">激活</a>
            <a style="margin-left: 18px;" @click="delCoupons(itemObj)" v-if="itemObj.activation_type==0">删除</a>
          </div>
        </div>








      </div>
    </div>



  </a-layout-content>

</template>

<script>
import { STable } from '@/components'

import moment from 'moment';
import { delCoupons,updateCoupons } from '@/api/em'

export default {
  name: 'CouponDetail',
  components: {
    STable
  },
  data () {
    return {
      time: null
    }
  },
  props:{
    itemObj:{
      type: Object,
      default: null
    }
  },
  created () {
    console.log(this.itemObj)

  },
  methods: {
    moment,
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day');
    },

    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    },
    onOkTime(date){
      console.log(date)

      let that = this
      this.$confirm({
        title: '温馨提示',
        content: `是否将优惠券结束时间改为 ${date.format('YYYY-MM-DD HH:mm:ss')}`,
        onOk () {

        },
        onCancel () {}
      })
    },
    // 激活
    updateCoupons(item){
      updateCoupons(item.id).then(res=>{
        this.$message.success('操作成功')
        this.back()
      })
    },
    // 删除一个
    delCoupons (item) {
      let that = this
      this.$confirm({
        title: '操作提示',
        content: '删除不可恢复，请确认是否继续',
        onOk () {
          delCoupons(item.id).then(res=>{
            // console.log(res)
            that.$message.success('操作成功')
            that.back()
          })
        },
        onCancel () {}
      })
    },
    back(){
      this.$emit('back')
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
  height: 50px;
  line-height: 60px;
  margin-bottom: 24px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  .head-title-left{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .ac-states{
    display: inline-block;
    width: 60px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background: rgba(51,119,255,.1);
    border-radius: 4px;
    color: #37f;
    font-size: 12px;
    margin-left: 8px;
    &[has-act=true]{
      background: #f5f5fa;
      color: #999;
    }
  }
}
.global_couponDetail_left, .global_couponDetailBox{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.global_couponDetail_right{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 8px;
  .global_couponDetail_right_line{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    margin-bottom: 24px;
    color: #1e1e28;
    .global_couponDetail_right_left{
      width: 120px;
      text-align: right;
      color: #3c3c46;
    }
    .global_couponDetail_right_right{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex: 6;
      -ms-flex: 6;
      flex: 6;
      padding-left: 20px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      text-align: left;
      font-weight: 500;
      color: #1e1e28;
      &>div{
        display: block;
      }
      .modify{
        color: #37f;
        margin-left: 16px;
        cursor: pointer;
      }
    }
  }
}
</style>
