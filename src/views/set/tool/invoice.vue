
<template>
  <main  class="ant-layout-content" showallsider="true">
    <div  showbreadcrumb="true" usedefault="true" class="mainContainreBox">
      <div  class="mainContainreBlock">
        <div   class="container animated fadeIn">
          <div  class="stepsBox">
            <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          </div>
       
    <div  class="contentContainer">
      <div  itstate="0" class="contentScroll">
        <div  class="contentBlock formOne">
          <a-form
            v-show="nowindex==1"
            :form="formOne"
            v-bind="formItemLayout"
          >
          <a-form-item  label="开票有效期">
          <a-radio-group   v-decorator="['valid_life', { rules: [{ required: true, message: '请选择开票有效期' }] }]" style="width: 100%;">
           
          <a-row class="item-wrap">
            <span style="opacity:0">开票有效期</span>
          <a-col :span="4">
            <a-radio value="1">
            1天
            </a-radio>
          </a-col>
          <a-col :span="4">
            <a-radio value="7">
            7天
          </a-radio>
         

          </a-col>
          <a-col :span="4">
            <a-radio value="30">
            30天
          </a-radio>
           
          </a-col>
          <a-col :span="4">
            <a-radio value="999">
            自定义
          </a-radio>
           
          </a-col>
        </a-row>
        </a-radio-group>
      </a-form-item>
       <a-form-item label="开票入口">
      <a-checkbox-group
        v-decorator="['invoice_entrance_', { rules: [{ required: true, message: '请选择开票入口' }] }]"
        style="width: 100%;"
      >
        <a-row class="item-wrap">
           <span style="opacity:0">开票入口</span>
          <a-col :span="4">
            <a-checkbox value="1">
              支付完成页
            </a-checkbox>
          </a-col>
          <a-col :span="4">
            <a-checkbox  value="2">
              订单详情页
            </a-checkbox>
          </a-col>
          <a-col :span="4">
            <a-checkbox value="3">
             支付小票
            </a-checkbox>
          </a-col>
          <a-col :span="4">
            <a-checkbox value="4">
             订单记录
            </a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
      </a-form-item>
      <a-form-item label="可开票类型">
      <a-radio-group
      
        v-decorator="['invoice_type', { rules: [{ required: true, message: '请选择可开票类型' }] }]"
        style="width: 100%;"
      >
        <a-row class="item-wrap">
         
          <span style="opacity:0">可开票类型</span>
          <a-col :span="4">
            <a-radio value="1">
              电票
            </a-radio>
          </a-col>
          <a-col :span="4">
            <a-radio  value="2">
              纸票
            </a-radio>
          </a-col>
         
        </a-row>
      </a-radio-group>
    </a-form-item>
     <a-form-item label="开票金额">
        <a-radio-group    v-decorator="['invoice_money', { rules: [{ required: true, message: '请选择开票金额' }] }]" style="width: 100%;">
          <a-row class="item-wrap">
            <span style="opacity:0">开票金额</span>
           
          <a-col :span="4">
            <a-radio value="1">
            实付金额
            </a-radio>
          </a-col>
          <a-col :span="4">
            <a-radio value="2">
            原价金额
          </a-radio>
          </a-col>
        </a-row>
        </a-radio-group>
      </a-form-item>
       <a-form-item label="加油卡开票余额">
        <a-radio-group   v-decorator="['invoice_balance', { rules: [{ required: true, message: '请选择加油卡开票余额' }] }]" style="width: 100%;">
          <a-row class="item-wrap">
            <span style="opacity:0">加油卡开票余额</span>
          <a-col :span="4">
            <a-radio value="0">
            关闭
            </a-radio>
          </a-col>
          <a-col :span="4">
            <a-radio value="1">
            开启
          </a-radio>
          </a-col>
        </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="油站法人"
      >
      <a-input  v-decorator="['site_principal_people', { rules: [{ required: true, message: '请输入油站法人姓名' }] }]" style="width:270px" placeholder="请输入油站法人姓名" />
      </a-form-item>
      <a-form-item
        label="营业执照"
      >


      <a-upload
        action="https://oiljava.ldyxx.com:4435/goods/FileImg"
        list-type="picture-card"
        :file-list="fileList"
        name="file"
        @change="handleChange"
      >
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
          <div class="ant-upload-text">
          </div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item label="提示">
      请上传营业执照，图片大小不超过3M（必填）
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button @click="nextPage(1)" type="primary">
        {{btnTxt}}
      </a-button>
    </a-form-item>
      </a-form>

     
      <a-tabs v-show="nowindex==2" v-model="activeKey">
        <a-tab-pane key="1" tab="电票规则设置">
          <a-form
            
            :form="formTwo"
            v-bind="formItemLayout"
          >
          <a-form-item  label="税盘类型">
            <a-radio-group v-decorator="['tax_type', { rules: [{ required: true, message: '请选择税盘类型' }] }]" style="width: 100%;">
            
              <a-row class="item-wrap">
                <span style="opacity:0">税盘类型</span>
                <a-col :span="4">
                  <a-radio value="1">
                  金税盘(航信)
                  </a-radio>
                </a-col>
                <a-col :span="4">
                  <a-radio value="2">
                  税控盘(百旺)
                  </a-radio>
                </a-col>
                <a-col :span="4">
                    <a-radio value="3">
                  税控服务器(百旺)
                  </a-radio>
                </a-col>
          </a-row>
          </a-radio-group>
        </a-form-item>
         <a-form-item
          label="分机号"
        >
        <a-input  v-decorator="['extension_num', { rules: [{ required: true, message: '请输入分机号' }] }]" style="width:270px" placeholder="请输入分机号" />
        </a-form-item>
        <a-form-item
          label="APP ID"
        >
        <a-input  v-decorator="['APPID', { rules: [{ required: true, message: '请输入APP ID' }] }]" style="width:270px" placeholder="请输入APP ID" />
        </a-form-item>
        <a-form-item
          label="密钥"
        >
          <a-input  v-decorator="['the_secret_key', { rules: [{ required: true, message: '请输入密钥' }] }]" style="width:270px" placeholder="请输入密钥" />
        </a-form-item>
        <a-form-item label="开票审核">
          <a-radio-group
          
            v-decorator="['audit_type', { rules: [{ required: true, message: '请选择开票审核' }] }]"
            style="width: 100%;"
          >
          <a-row class="item-wrap">
            <span style="opacity:0">开票审核</span>
            <a-col :span="4">
              <a-radio value="1">
                免审核
              </a-radio>
            </a-col>
            <a-col :span="4">
              <a-radio  value="0">
                人工审核
              </a-radio>
            </a-col>
          
          </a-row>
        </a-radio-group>
        </a-form-item>
        <a-form-item label="自助机电票打印">
        <a-radio-group
          v-decorator="['invoice_print', { rules: [{ required: true, message: '请选择自助机电票打印' }] }]"
          style="width: 100%;"
        >
          <a-row class="item-wrap">
          
            <span style="opacity:0">自助机电票打印</span>
            <a-col :span="4">
              <a-radio value="0">
                不支持
              </a-radio>
            </a-col>
            <a-col :span="4">
              <a-radio  value="1">
                支持
              </a-radio>
            </a-col>
          
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item
          label="开票方信息录入"
        >
        <div class="iSwitchBox">
         
          <a-form-item
          label="开票方名称"
        >
        <a-input  v-decorator="['the_name', { rules: [{ required: true, message: '请输入开票方名称' }] }]" style="width:270px" placeholder="请输入开票方名称" />
        </a-form-item>
        <a-form-item
          label="纳税人识别号"
        >
        <a-input  v-decorator="['taxpayer_num', { rules: [{ required: true, message: '请输入纳税人识别号' }] }]" style="width:270px" placeholder="请输入纳税人识别号" />
        </a-form-item>
        <a-form-item
          label="开户银行"
        >
        <a-input  v-decorator="['bank_name', { rules: [{ required: true, message: '请输入开户银行' }] }]" style="width:270px" placeholder="请输入开户银行" />
        </a-form-item>
        <a-form-item
          label="银行账号"
        >
        <a-input  v-decorator="['bank_account', { rules: [{ required: true, message: '请输入银行账号' }] }]" style="width:270px" placeholder="请输入银行账号" />
        </a-form-item>
        <a-form-item
          label="油站地址"
        >
        <a-input  v-decorator="['site_address', { rules: [{ required: true, message: '请输入油站地址' }] }]" style="width:270px" placeholder="请输入油站地址" />
        </a-form-item>
        <a-form-item
          label="油站电话"
        >
        <a-input  v-decorator="['site_tel', { rules: [{ required: true, message: '请输入油站电话' }] }]" style="width:270px" placeholder="请输入油站电话" />
        </a-form-item>
        <a-form-item
          label="收款人"
        >
        <a-input  v-decorator="['receipt_people', { rules: [{ required: true, message: '请输入收款人' }] }]" style="width:270px" placeholder="请输入收款人" />
        </a-form-item>
        <a-form-item
          label="开票人"
        >
        <a-input  v-decorator="['make_invoice_people', { rules: [{ required: true, message: '请输入开票人' }] }]" style="width:270px" placeholder="请输入开票人" />
        </a-form-item>
        <a-form-item
          label="复核人"
        >
        <a-input  v-decorator="['re_check_people', { rules: [{ required: true, message: '请输入复核人' }] }]" style="width:270px" placeholder="请输入复核人" />
        </a-form-item>
        
        </div>
        </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button @click="nextPage(3)" style="margin-right:20px">
          上一步
        </a-button>
        <a-button @click="nextPage(2)" type="primary">
          下一步
        </a-button>
      </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="纸票规则设置" force-render>
          <a-form
            
            :form="formThree"
            v-bind="formItemLayout"
          >

         <a-form-item  label="税盘类型">
            <a-radio-group v-decorator="['tax_type', { rules: [{ required: true, message: '请选择开票有效期' }] }]" style="width: 100%;">
            
              <a-row class="item-wrap">
                <span style="opacity:0">税盘类型</span>
                <a-col :span="4">
                  <a-radio value="1">
                  金税盘(航信)
                  </a-radio>
                </a-col>
                <a-col :span="4">
                  <a-radio value="2">
                  税控盘(百旺)
                  </a-radio>
                </a-col>
                <a-col :span="4">
                    <a-radio value="3">
                  税控服务器(百旺)
                  </a-radio>
                </a-col>
          </a-row>
          </a-radio-group>
        </a-form-item>
         <a-form-item
          label="分机号"
        >
        <a-input  v-decorator="['extension_num', { rules: [{ required: true, message: '请输入分机号' }] }]" style="width:270px" placeholder="请输入分机号" />
        </a-form-item>
        <a-form-item
          label="APP ID"
        >
        <a-input  v-decorator="['APPID', { rules: [{ required: true, message: '请输入APP ID' }] }]" style="width:270px" placeholder="请输入APP ID" />
        </a-form-item>
        <a-form-item
          label="密钥"
        >
          <a-input  v-decorator="['the_secret_key', { rules: [{ required: true, message: '请输入密钥' }] }]" style="width:270px" placeholder="请输入密钥" />
        </a-form-item>
        <a-form-item label="开票审核">
          <a-radio-group
            v-decorator="['audit_type', { rules: [{ required: true, message: '请选择开票审核' }] }]"
            style="width: 100%;"
          >
          <a-row class="item-wrap">
            <span style="opacity:0">开票审核</span>
            <a-col :span="4">
              <a-radio value="1">
                免审核
              </a-radio>
            </a-col>
            <a-col :span="4">
              <a-radio  value="0">
                人工审核
              </a-radio>
            </a-col>
          
          </a-row>
        </a-radio-group>
        </a-form-item>
        <a-form-item label="自助机电票打印">
        <a-radio-group
          v-decorator="['invoice_print', { rules: [{ required: true, message: '请选择自助机电票打印' }] }]"
          style="width: 100%;"
        >
          <a-row class="item-wrap">
          
            <span style="opacity:0">自助机电票打印</span>
            <a-col :span="4">
              <a-radio value="0">
                不支持
              </a-radio>
            </a-col>
            <a-col :span="4">
              <a-radio  value="1">
                支持
              </a-radio>
            </a-col>
          
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-form-item
          label="开票方信息录入"
        >
<div class="iSwitchBox">
        <a-form-item
          label="开票方名称"
        >
        <a-input  v-decorator="['the_name', { rules: [{ required: true, message: '请输入开票方名称' }] }]" style="width:270px" placeholder="请输入开票方名称" />
        </a-form-item>
        <a-form-item
          label="纳税人识别号"
        >
        <a-input  v-decorator="['taxpayer_num', { rules: [{ required: true, message: '请输入纳税人识别号' }] }]" style="width:270px" placeholder="请输入纳税人识别号" />
        </a-form-item>
        <a-form-item
          label="开户银行"
        >
        <a-input  v-decorator="['bank_name', { rules: [{ required: true, message: '请输入开户银行' }] }]" style="width:270px" placeholder="请输入开户银行" />
        </a-form-item>
        <a-form-item
          label="银行账号"
        >
        <a-input  v-decorator="['bank_account', { rules: [{ required: true, message: '请输入银行账号' }] }]" style="width:270px" placeholder="请输入银行账号" />
        </a-form-item>
        <a-form-item
          label="油站地址"
        >
        <a-input  v-decorator="['site_address', { rules: [{ required: true, message: '请输入油站地址' }] }]" style="width:270px" placeholder="请输入油站地址" />
        </a-form-item>
        <a-form-item
          label="油站电话"
        >
        <a-input  v-decorator="['site_tel', { rules: [{ required: true, message: '请输入油站电话' }] }]" style="width:270px" placeholder="请输入油站电话" />
        </a-form-item>
        <a-form-item
          label="收款人"
        >
        <a-input  v-decorator="['receipt_people', { rules: [{ required: true, message: '请输入收款人' }] }]" style="width:270px" placeholder="请输入收款人" />
        </a-form-item>
        <a-form-item
          label="开票人"
        >
        <a-input  v-decorator="['make_invoice_people', { rules: [{ required: true, message: '请输入开票人' }] }]" style="width:270px" placeholder="请输入开票人" />
        </a-form-item>
        <a-form-item
          label="复核人"
        >
        <a-input  v-decorator="['re_check_people', { rules: [{ required: true, message: '请输入复核人' }] }]" style="width:270px" placeholder="请输入复核人" />
        </a-form-item>
        </div>
        </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button @click="nextPage(3)" style="margin-right:20px">
          上一步
        </a-button>
        <a-button @click="nextPage(4)" type="primary">
          保存
        </a-button>
      </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
</div>
</div>
</div>
</div>
</div>
</div></main>
</template>

<script>
import api from '../../../api/set.js'
export default {
    name: 'invoice',
    data(){
      return{
         loading: false,
         subData:{
          p_invoice:[],
          e_invoice:[]
         },
        imageUrl: '',
        e_invoice:{
          tax_type:'',
          extension_num:'',
          APPID:'',
          the_secret_key:'',
          audit_type:'',
          invoice_print:'',
          the_name:'',
          taxpayer_num:'',
          bank_account:'',
          site_address:'',
          site_tel:'',
          receipt_people:'',
          make_invoice_people:'',
          re_check_people:'',
          bank_name:'',
          paper_type:''
        },
        p_invoice:{
         tax_type:'',
          extension_num:'',
          APPID:'',
          the_secret_key:'',
          audit_type:'',
          invoice_print:'',
          the_name:'',
          taxpayer_num:'',
          bank_account:'',
          site_address:'',
          site_tel:'',
          receipt_people:'',
          make_invoice_people:'',
          re_check_people:'',
          bank_name:'',
          paper_type:''
        },
        pageOne:{
          invoice_type:'',
          valid_life:'',
          invoice_entrance:'',
          invoice_money:'',
          invoice_balance:'',
          site_principal_people:'',
          business_license:''
        },
        activeKey:'1',
        nowindex:1,
        formFour:this.$form.createForm(this, { name: 'formFour' }),
        formThree:this.$form.createForm(this, { name: 'formThree' }),
        formTwo: this.$form.createForm(this, { name: 'formTwo' }),
        formOne: this.$form.createForm(this, { name: 'formOne' }),
        btnTxt:"下一步",
        fileList:[],
        formItemLayout: {
          labelCol: { span: 5 },
          wrapperCol: { span: 18 },
        },
        current: 0,
        steps: [
          {
            title: '设置基础信息',
            content: '设置基础信息',
          },
          {
            title: '使用规则设置',
            content: '使用规则设置',
          },
          {
            title: '完成',
            content: '完成',
          },
        ]
      }
    },
    methods:{
       handleChange({ file,fileList }) {
      this.fileList = fileList
      if(file.status=='error'){
        this.$message.error('上传失败');
        this.fileList = fileList.filter(item=>{
          return item.status=='done'
        });
      }
      if(file.status=='done'){
        this.$message.success(file.response.msg);
      }
      console.log(this.fileList)
      
    },
      nextPage(val){
       
        let that=this
        switch(val){
          case 1:
            this.formOne.validateFields((err,values) => {
              
              
              if (!err) {
                
                that.current=1
                that.nowindex=2
                let data=JSON.parse(JSON.stringify(values))
               
                data.invoice_entrance=data.invoice_entrance_.join(',')
                delete data.invoice_entrance_
                that.subData=data
                that.subData.p_invoice=[]
                that.subData.e_invoice=[]
                console.log(that.subData)
              }
            });
            break;
          case 2:
           
            this.formTwo.validateFields((err,values) => {
              if (!err) {
                  that.activeKey='2'
                  values.paper_type=2
                  that.subData.p_invoice.push(values)
                }
            });
            break;
          case 3:
            
            that.nowindex=1
            break;
            case 4:
            
            this.formThree.validateFields((err,values) => {
              if (!err) {
                 that.activeKey='2'
                 values.paper_type=1
                that.subData.e_invoice.push(values)
                api.setInvoiceset(that.subData)
                .then(res => {
                  console.log(res)
                }).catch(err=>{
                  console.log(err)
                })
              }
            });
            break;
        }
        
      }
    }
}
</script>
<style scoped>
  .stepsBox {
    padding:0 10%;
    height: 82px;
    background: #fff;
    display:flex;
    align-items: center;
    margin-bottom:20px;
    justify-content: center;
  }
  .contentContainer{
    padding:20px 0 30px 40px;
    background:#fff;
  }
  .iSwitchBox{
    background: #f5f5fa;
    padding: 18px 0 0 0;
    overflow: hidden;
    width: 600px;
  }
  /* .ant-form-item{
    display:flex;
    align-items: center;
  } */
  /* .item-wrap{
   padding-top:16px;
  } */
</style>
<style>
  .iSwitchBox .ant-form-explain{
    padding-left:128px;
  }
</style>
