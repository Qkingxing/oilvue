
<template>
  <div class="add">
    <a-layout v-if="$route.name=='add'">
      <a-layout-content :style="{padding: '24px', minHeight: '280px' }">
        <a-card>
          <a-steps :current="step">
            <a-step>
              <!-- <span slot="title">Finished</span> -->
              <template slot="title">
                设置基础信息
              </template>
            </a-step>
            <a-step title="使用规则设置" />
            <a-step title="完成" />
          </a-steps>
        </a-card>
        <a-card v-show="step == 0" style="margin-top: 10px;">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="优惠券名称"
          >
            <a-input
              v-model="coupons_name"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="活动人群"
          >
            <a-radio-group v-model="activity_type">
              <a-radio :value="1">
                所有线上客户
              </a-radio>
              <a-radio :value="2">
                部分可参与
              </a-radio>
              <a-radio :value="3">
                部分不可参与
              </a-radio>
            </a-radio-group>
            <div v-if="activity_type != 1 && treeData.length>0" style="width: 400px;min-height: 40px;">
              <a-tree-select
                v-model="activePersons"
                style="width: 100%"
                :tree-data="treeData"
                tree-checkable
                :replace-fields="{children:'treeList', key:'id', value: 'id', title: 'name'}"
                search-placeholder="Please select"
              />
            </div>
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="券类型"
          >
            <a-radio-group v-model="volume_type">
              <a-radio :value="1">
                油品券
              </a-radio>
              <a-radio :value="2">
                商品券
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="券金额"
            v-if="volume_type == 1"
          >
            <a-radio-group v-model="amount_type" @change="onChangeAmount">
              <a-radio :value="1">
                固定金额
              </a-radio>
              <a-radio :value="2">
                随机金额
              </a-radio>
              <a-radio :value="3">
                固定折扣
              </a-radio>
            </a-radio-group>
            <div v-if="amount_type==1" style="width: 500px;height: 80px;line-height: 80px; background-color: #fafafa;text-align: center;">
              <span>固定金额</span>
              <a-input-number style="margin: 0 10px;" :min="1" :max="1001" v-model="coupons_amount" />
              <span>元</span>
              <span style="color: #c7c7c7;margin-left: 10px;">最多支持一千元与两位小数，例：5.21元</span>
            </div>
            <div v-if="amount_type==2" style="width: 500px;height: 80px;line-height: 80px; background-color: #fafafa;text-align: center;">
              <span>随机金额</span>
              <a-input-number style="margin: 0 10px;" v-model="sjMin" :min='0'/>
              <span>至</span>
              <a-input-number style="margin: 0 10px;" v-model="sjMax" :min='0'/>
              <span>元</span>
            </div>
            <div v-if="amount_type==3" style="width: 500px;height: 80px;line-height: 80px; background-color: #fafafa;text-align: center;">
              <span>固定折扣</span>
              <a-input-number style="margin: 0 10px;" v-model="discount" />
              <span>折，最大抵扣金额</span>
              <a-input-number style="margin: 0 10px;" v-model="coupons_amount" placeholder="金额(选填)" />
              <span>元</span>
            </div>
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="商品价值"
            v-if="volume_type == 2"
          >
            <a-input-number style="margin: 0 10px;" :min="1" :max="1001" v-model="coupons_amount" @change="handleGdjeChange" />
            <span>元</span>
            <span style="color: #c7c7c7;margin-left: 10px;">最多支持一千元与两位小数，例：5.21元</span>
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="券有效期"
          >
            <a-radio-group v-model="validity_type" @change="onChangeActivity">
              <a-radio :value="1">
                固定时间段
              </a-radio>
              <a-radio :value="2">
                领取后有效天数
              </a-radio>
            </a-radio-group>
            <div v-if="validity_type== 1" style="width: 500px;height: 80px;line-height: 80px;text-align: center; background-color: #fafafa;">
              <span>有效期</span>
              <a-range-picker
                style="margin-left: 10px;"
                :disabled-date="disabledDate"
                :disabled-time="disabledRangeTime"
                @change="onPickerChange"
                :show-time="{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                }"
                format="YYYY-MM-DD HH:mm:ss"
              />
            </div>
            <div v-if="validity_type== 2" style="width: 500px;height: 80px;line-height: 80px;text-align: center; background-color: #fafafa;">
              <span>自领取起</span>
              <a-input-number v-model="effective_day" :min="0" style="margin: 0 10px;"></a-input-number>
              <span>天有效</span>
            </div>
          </a-form-item>
          <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
            <a-button type="primary" @click="nextOne">
              下一步
            </a-button>
          </a-form-item>
        </a-card>
        <a-card v-show="step == 1" style="margin-top: 10px;">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="使用限制"
          >
            <a-checkbox-group v-model="coupons_limit">
              <a-checkbox value="1">
                线上支付
              </a-checkbox>
              <a-checkbox value="2">
                线下核销
              </a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="使用门槛"
          >
            <span>消费</span>
            <a-select
              mode="multiple"
              v-model="oilChooseList"
              placeholder="请选择油品"
              @change="oilChange()"
              style="width: 200px;margin-left: 10px;"
            >
              <a-select-option v-for="(item,index) in oilList" :key="item.id">
                {{ item.oils_name }}
              </a-select-option>
            </a-select>
            <span style="margin: 0 10px;">原价满</span>
            <a-input-number v-model="count_available" :min='0'></a-input-number>
            <span style="margin-left: 10px;">可用</span>
          </a-form-item>
         <!-- <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="时间限制"
          >
            <a-radio-group v-model="limit_time" @change="onChangeActivity">
              <a-radio :value="1">
                不限制
              </a-radio>
              <a-radio :value="2">
                时间内可用
              </a-radio>
              <a-radio :value="3">
                时间内不可用
              </a-radio>
            </a-radio-group>
          </a-form-item> -->
         <!-- <div class="ant-row" v-show="limit_time != 1">
            <div class="ant-col ant-col-4">
            </div>
            <div class="ant-col ant-col-10" style="border: 1px solid #eee;padding: 20px;width: 500px;margin-bottom: 20px;" >
              <a-radio-group v-model="time_type" @change="onChangeActivity">
                <a-radio :value="1">
                  每日重复
                </a-radio>
                <a-radio :value="2">
                  每周重复
                </a-radio>
                <a-radio :value="3">
                  每月重复
                </a-radio>
              </a-radio-group>
              <div style="margin-top: 20px;">
                <a-radio-group v-if="time_type==2" v-model="week_threshold" button-style="solid" style="display: block;margin-bottom: 20px;">
                  <a-radio-button v-for="(item,index) in weekList" :key="index" :value="index">
                    {{ item }}
                  </a-radio-button>
                </a-radio-group>
                <el-checkbox-group v-if="time_type==3" v-model="month_threshold" style="display: block;margin-bottom: 20px;">
                  <el-checkbox-button v-for="i in 31" :label="i" :key="i"> <span v-show="i<10" style="margin-right: -4px;">0</span> {{ i }}</el-checkbox-button>
                </el-checkbox-group>
                <a-time-picker v-model="limit_timer1" @openChange="handleOpenChange"> </a-time-picker>
                <a-time-picker v-model="limit_timer2" style="margin-left: 20px;"></a-time-picker>
                </el-checkbox-group v-if="time_type==3"></div>
            </div>
          </div> -->
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="使用须知"
          >
            <a-textarea style="width: 300px;height: 150px;" v-model="conditions"></a-textarea>
          </a-form-item>
          <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
            <a-button @click="step = 0">
              上一步
            </a-button>
            <a-button type="primary" @click="nextTwo()" style="margin-left: 10px;">
              下一步
            </a-button>
          </a-form-item>
        </a-card>
        <a-card v-show="step ==2" style="margin-top: 10px;">
           <a-result
              status="success"
              title="营销券创建成功"
            >
              <template #extra>
                <a-button key="console" @click="step=0">
                  继续创建
                </a-button>
                <a-button key="buy">
                  立即激活
                </a-button>
              </template>
            </a-result>
        </a-card>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import moment from 'moment'
import { getRoleList, getServiceList } from '@/api/manage'
import { getOilSetList } from '@/api/order'
import { getlevelAlls } from '@/api/user'
import { isEmpty } from '@/utils/lzz.js'
import { addCoupons } from '@/api/coupon'
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10, offset: 4 }
}
export default {
  name: 'Clist',
  components: {
  },
  data () {
    return {
      post_obj: {},
      treeData: {},
      coupons_name: '',
      fixed_id: '',
      dynamic_id: '',
      activePersons: [],
      coupons_limit: ['1', '2'],
      validity_type: 1,
      limit_time: 1,
      week_threshold: [],
      month_threshold: [],
      effective_day: 7,
      gdzk: '',
      discount: '',
      sjMin: '',
      sjMax: '',
      coupons_amount: '',
      conditions: '',
      amount_type: 2,
      activity_type: 1,
      volume_type: 1,
      checkNick: false,
      formItemLayout,
      formTailLayout,
      step: 0,
      count_available: '',
      yxqValue: [],
      oilList: [],
      oilChooseList: [],
      post_obj: {},
      open: false,
      open2: false,
      limit_timer1: '',
      limit_timer2: '',
      time_type:'',
      weekList: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  created () {
    this.laodLevel()
    this.loadOilList()
  },
  methods: {
    moment,
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    loadOilList () {
      getOilSetList().then(res => {
        console.log(res.data.data)
        this.oilList = res.data.data;
      })
    },
    laodLevel () {
      let _obj={
        type:3
      }
      getlevelAlls(_obj).then(res => {
        this.treeData = res.data
      })
    },
    handleGdjeChange () {

    },
    oilChange () {

    },
    handleOpenChange (open) {
      this.open = open
    },
    handleClose () {
      this.open = false
      this.open2 = false
    },
    onChangeAmount (e) {
      console.log(e)
    },
    onChangeActivity (e) {
      console.log(e)
    },
    // 时间改变的方法
    onPickerChange (date, dateString) {
      this.yxqValue = dateString
      // 这两个参数值antd自带的参数
    },
    disabledDate (current) {
      return current && current < moment().endOf('day')
    },
    disabledRangeTime (_, type) {
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56]
        }
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56]
      }
    },
    yxqChange (value) {
      console.log(value)
    },
    nextOne () {
      if (this.coupons_name == '') {
        this.$message.error('请输入优惠券名称')
        return
      }
      this.post_obj.coupons_name = this.coupons_name
      this.post_obj.activity_type = this.activity_type
      this.post_obj.volume_type = this.volume_type
      if(this.activity_type != 1){
        if(this.activePersons.length==0){
          this.$message.error('请选择活动人群范围')
          return;
        }
        let _fixed_id=[]
        let _dynamic_id=[]
        let _grouping_id=[]
        this.activePersons.forEach((item)=>{
          if(item.indexOf('1_')!=-1){
            _fixed_id.push(item.slice(2))
          }
          if(item.indexOf('2_')!=-1){
            _dynamic_id.push(item.slice(2))
          }
          if(item.indexOf('3_')!=-1){
            _grouping_id.push(item.slice(2))
          }
        })
        this.post_obj.fixed_id = _fixed_id.join(',')
        this.post_obj.dynamic_id = _dynamic_id.join(',')
        this.post_obj.grouping_id = _grouping_id.join(',')
      }
      if(this.volume_type == 1){
        if (this.amount_type == 1) {
          if (isEmpty(this.coupons_amount)) {
            this.$message.error('请输入固定金额')
            return;
          }
          this.post_obj.coupons_amount = this.coupons_amount
        }
        if (this.amount_type == 2) {
          if (this.sjMin == '' || this.sjMax == '') {
            this.$message.error('请输入随机金额范围')
            return;
          }
          this.post_obj.min = this.sjMin
          this.post_obj.max = this.sjMax
        }
        if (this.amount_type == 3) {
          if (isEmpty(this.discount)) {
            this.$message.error('请输入固定折扣')
            return;
          }
          if (isEmpty(this.coupons_amount)) {
            this.$message.error('请输入最大抵扣金额')
            return;
          }
          this.post_obj.coupons_amount = this.coupons_amount
          this.post_obj.discount = this.discount
        }
        this.post_obj.amount_type = this.amount_type
      }else{
        this.post_obj.coupons_amount = this.coupons_amount
      }
      // 券有效期
      this.post_obj.validity_type = this.validity_type
      if (this.validity_type == 1) {
        if(this.yxqValue.length == 0){
          this.$message.error('请输入选择有效期')
          return;
        }
        this.post_obj.start_time = this.yxqValue[0]
        this.post_obj.end_time = this.yxqValue[1]
      }
      if (this.validity_type == 2) {
        if(isEmpty(this.effective_day)){
          this.$message.error('请输入有效天数')
          return
        }
        this.post_obj.effective_day = this.effective_day
      }
      this.step = 1
    },
    nextTwo () {
      if (this.coupons_limit.length == 0) {
        this.$message.error('请选择使用限制')
        return
      }
      this.post_obj.coupons_limit = this.coupons_limit.length == 1 ? this.coupons_limit[0] : 3
      // this.post_obj.limit_time = this.limit_time
      if (this.oilChooseList.length == 0) {
        this.$message.error('请选择门槛油品');
        return
      }
      this.post_obj.oils_threshold = this.oilChooseList.join(',')
      // if(this.limit_time!=1){
      //   this.post_obj.time_type = this.time_type;
      //   if(isEmpty(this.time_type)){
      //     this.$message.error('请选择重复方式？')
      //     return;
      //   }
      //   if(this.time_type==2){
      //     if (this.week_threshold.length == 0) {
      //       this.$message.error('请选择每周几？')
      //       return;
      //     }
      //     this.post_obj.total_data = [
      //       {
      //         'tart_time': this.limit_timer1, // 起止时间
      //         'end_time': this.limit_timer2// 结束时间
      //       }]
      //      this.post_obj.week_threshold = this.week_threshold.toString(",");
      //   }
      //   if(this.limit_time==3){
      //     if (this.month_threshold.length == 0) {
      //       this.$message.error('请选择每月几日？')
      //       return;
      //     }
      //     this.post_obj.total_data = [
      //       {
      //         'tart_time': this.limit_timer1, // 起止时间
      //         'end_time': this.limit_timer2// 结束时间
      //       }]
      //     this.post_obj.month_threshold = this.month_threshold.toString(",");
      //   }
      //   if (isEmpty(this.limit_timer1)||isEmpty(this.limit_timer2)) {
      //     this.$message.error('请选择时间限制范围');
      //     return
      //   }
      // }
      this.post_obj.count_available = this.count_available
      this.post_obj.conditions = this.conditions
      this.post_obj.wechat_type = 2
      addCoupons(this.post_obj).then(res => {
        if(res.code=='200'){
          this.step = 2;
        }
      })
    },
    handleChange (e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    },
    changeTime (now) {
      const time = new Date(now._d)
      const d = new Date(time)
      const dateValue = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      return dateValue
    }
  }
}
</script>
<style lang="less" scoped>
.o-title{
  font-weight: 600;
}
.screen-box{
  padding: 27px 0 24px 0;
  .screen-item{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: #040a46;
  }
  .screen-item-inline{
    display: inline-block;
    margin-bottom: 16px;
    color: #040a46;
  }
}
.search-btn{
  margin-left: 72px;
  margin-top: 8px;
}
.showDataForTable{
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 60px;
  overflow: hidden;
  .showSearchAndTotal{
    height: 63px;
    text-align: center;
    border-top: 1px solid #eaeaf4;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{
    font-size: 16px;
    font-weight: 500;
    color: #040a46;
    line-height: 24px;
    padding: 23px 0 16px 0;
  }
  .dec{
    color: #3c3c46;
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
  }
}
.themeColor{
  color: #3b85ff;
}
.select-all{
  margin-left: 16px;
  cursor: pointer;
}

</style>
