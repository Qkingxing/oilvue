
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="list">
        <div class="page-block">
          <div class="head-title">
            积分设置
          </div>
          <div class="deploy-item">
            <div class="label">积分过期</div>
            <a-radio-group v-model="time_type" style="display:flex;">
              <a-radio :style="radioStyle" :value="1">
                永久有效
              </a-radio>
              <a-radio :style="radioStyle" :value="2">
                统一过期，每年&nbsp;&nbsp;
                <a-date-picker
                  v-if="!loading"
                  :default-value="moment(form.expiration_time, dateFormat)"
                  :format="dateFormat"
                  @change="onChangeTime">
                </a-date-picker>
              </a-radio>
              

            </a-radio-group>
          </div>

          <div class="deploy-item">
            <div class="label">享受优惠不可获积分</div>
            <a-checkbox-group
              v-model="checkboxValue"
              name="checkboxgroup"
              :options="plainOptions"
              @change="onChangeRadio"
              style="display:flex;flex-direction: column;"
            />
          </div>
          <div class="btn-box">
            <a-button type="primary" :disabled="loading" @click="submit"> 修改 </a-button>
          </div>
        </div>
      </div>
    </a-layout-content>

  </a-layout>
</template>

<script>
import moment from 'moment';

import { getIntegrallist, getCannotintegral, postIntegralset } from '@/api/crm'

export default {
  name: 'Setting',
  components: {

  },
  data () {
    return {
      time_type: 1,
      dateFormat: 'MM-DD',
      plainOptions: [],
      checkboxValue: [],
      radioStyle: {
        display: 'block',
        height: '40px',
        lineHeight: '40px',
        marginBottom: '20px'
      },
      form:{
        expiration_time: new Date(),
        //[string]	是	过期时间 如果前端传递的是1的话，那么就是永久		
        cannot_cause: undefined,
        //[string]	是	享受优惠不可获积分		
        id: undefined, //复制
        //[string]		修改的时候使用
      },
      loading: true,
    }
  },
  created () {
    this.init()
    

  },
  methods: {
    moment,
    async init(){
      this.loading = true
      let options = await getCannotintegral()

      this.plainOptions = options.data.map(e=>{
        return {
          label: e.name,
          value: e.id
        }
      })

      let res = await getIntegrallist()

      
      let { expiration_time, cannot_cause, id } = res.data
      this.form = {
        expiration_time: expiration_time!=1?moment(expiration_time):new Date(),
        cannot_cause,
        id
      }

      this.time_type = expiration_time==1?1:2

      // console.log(cannot_cause)

      this.checkboxValue = cannot_cause?cannot_cause.split(',').map(Number):[];
      // console.log(this.checkboxValue)
      this.loading = false

    },
    submit(){
      // console.log(this.form)
      // console.log(this.time_type)

      let params = {
        id: this.form.id,
        cannot_cause: this.form.cannot_cause,
        expiration_time: this.time_type==1?1:this.form.expiration_time
      }
      // console.log(params)
      // return

      postIntegralset(params).then((res)=>{
        console.log(res)
        this.$message.success('保存成功');
        this.init()
      })
    },
    onChangeTime(date, dateString){
      // console.log(date)
      // console.log(dateString)
      this.form.expiration_time = dateString
    },
    onChangeRadio(){
      // console.log(this.checkboxValue)
      // 数组转字符串
      let str = this.checkboxValue.toString()

      // console.log(str)
      this.form.cannot_cause = str
    }
  }
}
</script>
<style lang="less" scoped>

.head-title{
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
  margin-bottom: 50px;
}
.deploy-item{
  display: flex;
  margin-bottom: 16px;
  .label{
    width: 126px;
    text-align: right;
    margin-right: 20px;
    line-height: 40px;
  }
  .ant-checkbox-group{
    line-height: 40px;
  }
}
.btn-box{
  margin-top: 50px;
  padding-left: 146px;
}
.page-content{
  margin-top: 30px;
}
.growth-setting{
  .setting-item{
    display: flex;
    .setting-title{
      line-height: 45px;
      width: 128px;
      margin-right: 20px;
      text-align: right;
    }
    .setting-content{
      line-height: 45px;
    }
  }
}
.growth-level{
  margin-top: 15px;
  .level-title{
    font-size: 16px;
    font-weight: 600;
    line-height: 60px;
    color: #040a46;
  }
}
.page-foot{
  text-align: center;
  margin-top: 50px;
  button{
    margin-right: 20px;
  }
}

</style>
