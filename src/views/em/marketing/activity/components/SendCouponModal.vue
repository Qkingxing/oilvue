<template>
  <a-modal 
    v-model="visible"
    title="选择优惠券" 
    :width="720"
    @ok="handleOk"
    @cancel="onCancel">

    <div class="couponsChoiceModal">
      <div class="couponsChoiceModal_line">
        <div class="couponsChoiceModal_text">优惠券</div>

        <CouponSelect 
          v-if="visible"
          ref="CouponSelect" />

        <div class="couponsChoiceModal_text">没有合适的优惠券？</div>
        <div class="couponsChoiceModal_text">
          <router-link :to="{path:'/em/marketing/add'}">去创建</router-link>
        </div>
      </div>
      <div class="couponsChoiceModal_line">
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

      <div class="couponsChoiceModal_line">
        <div class="couponsChoiceModal_text">每个用户发券成本约</div>
        <a src="javascript:;" style="cursor: auto; padding: 0px 3px;">{{money}}</a>
        <div class="couponsChoiceModal_text">元</div>
        <!-- <div class="couponsChoiceModal_text" style="margin-left: 10px;">(未统计折扣券)</div> -->
      </div>

    </div>

  </a-modal>
</template>

<script>
import { SendCoupon } from '@/api/crm'
import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'


export default {
  name: 'SendCouponModal',
  components:{
    CouponSelect: ()=>import('./CouponSelect')
  },
  data(){
    return {
      visible: false,
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
      ruleIndex: null,
      stepIndex: null,

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
    showModal(obj) {
      this.resetData()

      this.ruleIndex = obj.ruleIndex
      this.stepIndex = obj.stepIndex
      let checkedCoupons = _.cloneDeep(obj.checkedCoupons)

      this.SET_CHECKED_COUPONS(checkedCoupons)

      this.visible = true;
    },
    // 重置数据
    resetData(){
      this.SET_CHECKED_COUPONS([])
      this.ruleIndex = null
      this.stepIndex = null
    },
    handleOk(e) {
      // console.log(this.checkedCoupons);
      let checkedCoupons = _.cloneDeep(this.checkedCoupons)

      this.$emit('change', {
        ruleIndex: this.ruleIndex,
        stepIndex: this.stepIndex,
        checkedCoupons
      })

      this.visible = false;
      this.resetData()
    },
    onCancel(){
      this.resetData()
      this.visible = false;
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

.couponsChoiceModal{
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.couponsChoiceModal_line{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 510px;
  min-height: 32px;
  margin-bottom: 16px;
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