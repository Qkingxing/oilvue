
<template>
  <div>
    <div class="set-common-wrap">
      <div class="header">
        支付设置
      </div>
      <div class="form-wrap">
        <a-tabs @change="tabChange">
          <a-tab-pane  key="1" tab="付款限制">
             <a-form
              v-bind="formItemLayout"
            >
            <a-form-item label="">
              <span style="padding-right:80px">支付次数</span>
              <span style="padding-right:14px">每个账号每</span>
             
              <a-input-number style="width:100px"  :min="0" v-model="paylimit.day_num" />
              <span style="padding-left:8px">天</span>
              <span style="padding:0 5px 0 3px">,可支付</span>
               <a-input-number style="width:100px" :min="0" v-model="paylimit.pay_num" />
              <span style="padding-left:4px">次</span>
            </a-form-item>
            <a-button @click="setPayastrictset" style="margin:80px 0 0 60px;" type="primary">
                保存
              </a-button>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="退款限制">
           <a-form
              v-bind="formItemLayout"
            >

            <a-form-item label="">
               <span style="padding-right:80px">退款有效期</span>
              <a-radio-group v-model="returnlimit.refund_period">
                <a-radio value="7">
                7天
                </a-radio>
                <a-radio value="30">
                30天
                </a-radio>
                <a-radio value="999">
                自定义
                </a-radio>
                 <a-input-number v-show="returnlimit.refund_period==999" style="margin:0 10px;width:100px" :min="0" :max="12" v-model="inputNum" />
                  <a-radio value="1">
                仅限当天退款
                </a-radio>
                  
              </a-radio-group>
            </a-form-item>
            

             <a-form-item label="">
               <span style="padding-right:10px">退款返券</span>
               <a-radio-group v-model="returnlimit.is_returnticket">
                <a-radio value="1">
                开启
                </a-radio>
                <a-radio value="0">
                关闭
                </a-radio>
               
               
                  
              </a-radio-group>
            </a-form-item>

             <a-form-item label="">
              <span style="padding-right:80px">退款次数</span>
              <span style="padding-right:14px">每个账号每</span>
             
              <a-input-number style="width:100px" :min="0"  v-model="returnlimit.day_num" />
              <span style="padding-left:8px">天</span>
              <span style="padding:0 5px 0 3px">,可退款</span>
               <a-input-number style="width:100px" :min="0" v-model="returnlimit.refund_num" />
              <span style="padding-left:4px">次</span>
            </a-form-item>
            <a-button @click="setRefundastrictset" style="margin:80px 0 0 60px;" type="primary">
      保存
    </a-button>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </div>
     
     
    </div>
  </div>
</template>

<script>
import api from '../../../api/set.js'
export default {
    name: 'refund',
     data: () => ({
       paylimit:{
        day_num: '',
        pay_num: ''
       },
       returnlimit:{

       },
       inputNum:'',
       
      formItemLayout: {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
      }
  }),
  mounted() {
    this.setPayastrictlist()
  },
  methods: {
    tabChange(e){
    
    if(e==1){
      this.setPayastrictlist()
    }else{
      this.setRefundastrictlist()
    }
     
    },
    setRefundastrictlist(){
      let that=this
      api.setRefundastrictlist().then(res=>{
       
        that.returnlimit=res.data
        if(that.returnlimit.refund_period!=7&&that.returnlimit.refund_period!=30&&that.returnlimit.refund_period!=1){
          that.inputNum=that.returnlimit.refund_period
          that.returnlimit.refund_period=999
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    setRefundastrictset(){
      let that=this
      let obj={
        day_num: that.returnlimit.day_num,
        id: that.returnlimit.id,
        is_returnticket: that.returnlimit.is_returnticket,
        refund_num: that.returnlimit.refund_num,
        refund_period: that.returnlimit.refund_period==999?that.inputNum:that.returnlimit.refund_period
      }
      api.setRefundastrictset(obj).then(res=>{
        if(res.code==200){
          that.$message.success(res.msg);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    setPayastrictset(){
      let that=this
      let obj={
        day_num:that.paylimit.day_num,
        id:that.paylimit.group_id,
        pay_num: that.paylimit.pay_num
      }
      api.setPayastrictset(obj).then(res=>{
        if(res.code==200){
          that.$message.success(res.msg);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    setPayastrictlist(){
      let that=this
      api.setPayastrictlist().then(res=>{
        
        that.paylimit=res.data
      }).catch(err=>{
        console.log(err)
      })
    },
     handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    normFile(e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
  }
}
</script>
<style scoped>
  .set-common-wrap{
    background:#fff;
    padding:10px 20px;
    margin:0px auto;
  }
  .header{
    height:80px;
    line-height:60px;
    font-size:18px;
    font-weight:bold;
    border-bottom:1px solid #ccc;
  }
  .ant-form-item{
    width:800px;
    margin-bottom:16px;
  }
  .form-wrap{
    padding:30px 0;
    padding-left:40px;
  }
</style>

