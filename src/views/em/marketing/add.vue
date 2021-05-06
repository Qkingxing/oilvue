
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
               <a-radio-group v-model="activity_type" @change="onChangeActivity">
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
               <div v-if="activity_type != 1" style="width: 400px;height: 80px;background-color: #fafafa;">
                 <a-tree-select
                   v-model="activePersons"
                   style="width: 100%"
                   :tree-data="treeData"
                   tree-checkable
                   :replace-fields="{children:'treeList', key:'name', value: 'id', title: 'name'}"
                   search-placeholder="Please select"
                 />
               </div>
             </a-form-item>
             <a-form-item
               :label-col="formItemLayout.labelCol"
               :wrapper-col="formItemLayout.wrapperCol"
               label="券类型"
             >
               <a-radio-group v-model="volume_type" @change="onChangeActivity">
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
                 <a-input-number style="margin: 0 10px;" :min="1" :max="1000" v-model="gdjeValue" @change="handleGdjeChange" />
                 <span>元</span>
                 <span style="color: #c7c7c7;margin-left: 10px;">最多支持一千元与两位小数，例：5.21元</span>
               </div>
               <div v-if="amount_type==2" style="width: 500px;height: 80px;line-height: 80px; background-color: #fafafa;text-align: center;">
                 <span>随机金额</span>
                 <a-input-number style="margin: 0 10px;"  v-model="sjMin" />
                 <span>至</span>
                 <a-input-number style="margin: 0 10px;"  v-model="sjMax" />
                 <span>元</span>
               </div>
               <div v-if="amount_type==3" style="width: 500px;height: 80px;line-height: 80px; background-color: #fafafa;text-align: center;">
                 <span>固定折扣</span>
                 <a-input-number style="margin: 0 10px;"  :value="gdzkValue" />
                 <span>折，最大抵扣金额</span>
                 <a-input-number style="margin: 0 10px;"  :value="maxdkValue" placeholder="金额(选填)" />
                 <span>元</span>
               </div>
             </a-form-item>
             <a-form-item
               :label-col="formItemLayout.labelCol"
               :wrapper-col="formItemLayout.wrapperCol"
               label="商品价值"
               v-if="volume_type == 2"
             >
               <a-input-number style="margin: 0 10px;" :min="1" :max="1001" :value="gdjeValue" @change="handleGdjeChange" />
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
                   @change=onPickerChange
                   :show-time="{
                       hideDisabledOptions: true,
                       defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                     }"
                   format="YYYY-MM-DD HH:mm:ss"
                  />
               </div>
               <div v-if="validity_type== 2" style="width: 500px;height: 80px;line-height: 80px;text-align: center; background-color: #fafafa;">
                 <span>自领取起</span>
                 <a-input-number v-model="effective_day" style="margin: 0 10px;"></a-input-number>
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
          </a-form-item>
            <a-form-item label="使用门槛">
              <span>消费</span>
              <a-select
                mode="tags"
                placeholder="Please select"
                style="width: 200px"
                v-model="oils_threshold"
              >
                <a-select-option v-for="(item,index) in oilList" :key="index">
                  {{item.oils_name}}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-select default-value="lucy" style="width: 50px;margin-left: 10px;" >
              <a-select-option value="jack">
                原价
              </a-select-option>
              <a-select-option value="lucy">
                升数
              </a-select-option>
            </a-select>
            <span style="margin: 0 10px;">满</span>
            <a-input-number></a-input-number>
            <span style="margin-left: 10px;">可用</span>
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="使用须知"
          >
            <a-textarea style="width: 300px;height: 150px;" v-model="conditions"></a-textarea>
          </a-form-item>
          <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
            <a-button  @click="step = 0">
              上一步
            </a-button>
            <a-button type="primary" @click="nextTwo" style="margin-left: 10px;">
              下一步
            </a-button>
          </a-form-item>
        </a-card>
      </a-layout-content>
    </a-layout>
   </div>
</template>

<script>
import { getSiteoillist } from '@/api/oil'
import moment from 'moment';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10, offset: 4 },
};
import { getRoleList, getServiceList } from '@/api/manage'
import { getlevelAlls } from '@/api/user'
export default {
  name: 'Clist',
  components: {
  },
  data () {
    return {
      post_obj:{},
      treeData:{},
      coupons_name:'',
      fixed_id:'',
      dynamic_id:'',
      activePersons:[],
      coupons_limit:['1','2'],
      oils_threshold:[],
      validity_type:1,
      limit_time:1,
      effective_day:7,
      gdzk:'',
      maxdkValue:'',
      sjMin:'',
      sjMax:'',
      gdjeValue:'',
      conditions:'',
      amount_type:2,
      activity_type:1,
      volume_type:1,
      checkNick: false,
      formItemLayout,
      formTailLayout,
      step:1,
      yxqValue:[],
      oilList:[]
      
    }
  },
  created () {
    this.laodLevel()
    this.loadOilList()
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
    laodLevel(){
      let _params={
        type:''
      }
      getlevelAlls(_params).then(res=>{
        this.treeData = res.data
        console.log(res.data)
      })
    },
    handleGdjeChange(){
      
    },
    async loadOilList(){
      // 油品下拉
      let oilRes = await getSiteoillist()
      if (oilRes) {
        this.oilList = oilRes.data.data
        console.log( this.oilList)
      }
    },
    onChangeAmount(e){
      console.log(e)
    },
    onChangeActivity(e){
      console.log(e)
    },
    //时间改变的方法
    onPickerChange(date, dateString){
      this.yxqValue = dateString
      //这两个参数值antd自带的参数
    },
    disabledDate(current) {
      return current && current < moment().endOf('day');
    },
    disabledRangeTime(_, type) {
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56],
      };
    },
    yxqChange(value){
      console.log(value)
    },
    nextOne() {
      if(this.coupons_name == ""){
        this.$message.error("请输入优惠券名称")
        return;
      }
      if(this._dynamic_id != 1){
        let _fixed_id=[]
        let _dynamic_id=[]
        this.activePersons.forEach((item)=>{
          if(item.id.includes("1_")){
            _fixed_id.push(item.id)
          }else{
            _dynamic_id.push(item.id)
          }
        })
        this.post_obj._fixed_id = _fixed_id.join(",")
        this.post_obj._dynamic_id = _dynamic_id.join(",")
      }
      this.post_obj.coupons_name = this.coupons_name
      this.post_obj.activity_type = this.activity_type
      this.post_obj.volume_type = this.volume_type
      if(this.amount_type == 2){
        if(this.sjMin == "" || this.sjMax == ""){
          this.$message.error("请输入随机金额范围")
          return;
        }
      }
      if(this.amount_type == 1){
        if(this.gdjeValue == "" ){
          this.$message.error("请输入固定金额")
          return;
        }
      }
      
      this.post_obj.min = this.sjMin
      this.post_obj.max = this.sjMax
      // 券有效期
      this.post_obj.validity_type = this.validity_type 
      if(this.validity_type == 1 && this.yxqValue.length == 0){
        this.$message.error("请输入选择有效期")
        return;
      }
      this.post_obj.total_data=[
        {
            "tart_time":this.yxqValue[0],//起止时间
            "end_time":this.yxqValue[1]//结束时间
        }]
      console.log(this.post_obj)
      this.step=1
      
    },
    nextTwo(){
     if(this.coupons_limit.length == 2){
       this.post_obj.coupons_limit = 3
     }
     if(this.coupons_limit.length == 1){
       this.post_obj.coupons_limit = this.coupons_limit[0]
     }
     if(this.coupons_limit.length == 0){
       this.$message.error("请选择使用限制")
       return
     }
    },
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true });
      });
    },
    changeTime(now) {
      let time = new Date(now._d)
      console.log(time);
      let d = new Date(time);
      let dateValue = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      return dateValue;
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
