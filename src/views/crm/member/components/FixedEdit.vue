<template>

    <a-layout-content
      class="fixed_level_page"
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title" v-if="type=='add'">
        新增基础设置
      </div>
      <div class="head-title" v-else>
        编辑基础设置
      </div>

      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        layout="inline" 
        class="form-wrap">

        <a-form-model-item 
          label="等级名称" 
          prop="level_name"
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">
          <a-input v-model="form.level_name" :maxLength="8" placeholder="请输入等级名称" style="width: 200px;"/><span style="margin-left: -30px; color: rgb(199, 199, 199); position: relative;">{{form.level_name.length}}/8</span>
        </a-form-model-item>

        <a-form-model-item 
          label="等级模板" 
          prop="template_icon"
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">
          <a-radio-group name="radioGroup" v-model="templateType" @change="onChangeTemIcon(templateType)">
            <a-radio :value="1"> 默认 </a-radio>
            <a-radio :value="2"> 自定义 </a-radio>
          </a-radio-group>

          <div class="template-list-wrapper">

            <ul class="template-list template-list" v-show="templateType==1">
              <li class="active">
                <img :src="form.template_icon" alt="等级模板">
              </li>
            </ul>
            <div class="upload-wrapper" v-show="templateType==2">
              <div class="uploadOnceContainer upload-content">
                <a-upload
                  class="uploadOnceContainer_main"
                  name="file"
                  list-type="picture-card"
                  :show-upload-list="false"
                  action="https://oiljava.ldyxx.com:4435/goods/FileImg"
                  @change="handleChange"
                >
                  <img v-if="form.template_icon" :src="form.template_icon">
                  <div v-if="form.template_icon" class="update-tips">重新上传</div>
                  <div v-else>
                    <a-icon :type="'plus'" style="font-size:20px;color: #9696a0;"/>
                  </div>
                </a-upload>

                <div haserror="true" class="uploadOnceContainer_prompt">图片建议尺寸850像素*350像素，大小不超过1M</div>
              </div>
              <div class="upload-demo">
                示例：
                <img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/25b67c1677b9a0dc609b780a63d0.png" alt="示例图">
              </div>
            </div>
          </div>

        </a-form-model-item>

        <a-form-model-item 
          label="生效油站" 
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">
          {{userInfo.group_name}}
        </a-form-model-item>

        <a-form-model-item 
          label="优惠方式" 
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">
          <a-radio-group name="radioGroup" v-model="form.discount_type">
            <a-radio :value="1"> 金额优惠 </a-radio>
            <a-radio :value="2"> 折扣优惠 </a-radio>
          </a-radio-group>

          <div class="discount-rule-list">
            <a-form-model-item 
              v-for="(item, index) in form.grade"
              :key="index">
              <div class="offer-wrap">
                <div class="offer-content">
                  <span>消费油品</span>

                  <el-select 
                    multiple 
                    collapse-tags 
                    v-model="item.oils_id" 
                    @change="(val)=>selectAllOil(val,index)" 
                    placeholder="请选择油品类型" 
                    style="width: 200px; margin: 0px 10px; background-color: rgb(255, 255, 255);color: rgb(200, 200, 210);">
                    <el-option 
                      v-for="(it, i) in oilList" 
                      :key="i" 
                      :label="it.oils_name" 
                      :disabled="oilDisabled(index,i,it.id)"
                      :value="it.id">
                    </el-option>
                  </el-select>

                  <span v-if="form.discount_type==1">每升优惠</span>
                  <span v-else>享</span>

                  <a-input-number 
                    :min="0"
                    :max="10"
                    :precision="2"
                    :step="0.01"
                    v-model="item.discount"
                    :placeholder="form.discount_type==1?'金额':'折扣'"
                    style="width: 90px; margin: 0px 10px;"/>

                  <span v-if="form.discount_type==1">元</span>
                  <span v-else>折</span>

                </div>
                <div style="position: absolute; right: 0px; transform: translateX(100%); display: flex;">
                  <a-icon 
                    @click="delRule(index)"
                    v-show="form.grade.length>1" 
                    type="minus-circle" 
                    class="item-icon"/>

                  <a-popover v-if="form.discount_type==2&&item.discount<8" :visible="true" placement="right" content="优惠力度过大，请谨慎提交">
                    <a-icon 
                      type="exclamation-circle" 
                      style="color: rgb(247, 182, 2); font-size: 16px; margin-left: 8px;"/>
                  </a-popover>
                  
                </div>
              </div> 
            </a-form-model-item>
            <div class="handle-btn-add-wrapper" v-if="addBtnShow()">
              <a-button @click="addRule" class="handle-btn-add" icon="plus" type="dashed">
                继续添加
              </a-button>
            </div>
          </div>
          

        </a-form-model-item>

        <div class="advanced-setting-container">
          <div class="advanced-setting-header">
            <div class="title">高级设置</div>
            <div class="handle" @click="highSettingShow=!highSettingShow">
              {{highSettingShow?'收起':'展开'}}
            </div>
          </div>
          <div class="advanced-setting" v-show="highSettingShow">
            <a-form-model-item 
              label="等级有效期" 
              :labelCol="{md: {span: 2}}" 
              :wrapperCol="{md: {span: 20}}">
              <a-radio-group name="radioGroup" v-model="form.level_status" @change="onChangeTme(form.level_status)">
                <a-radio :value="1"> 永久 </a-radio>
                <a-radio :value="2"> 有效天数 </a-radio>
                <a-radio :value="3"> 过期时间 </a-radio>
              </a-radio-group>
              <div class="advanced-setting-deadline" style="margin-bottom: -24px;">
                <a-form-model-item 
                  prop="expired_time"
                  ref="expired_time"
                  :autoLink="false"
                  v-if="form.level_status==2">
                  <span style="margin-left: 24px; margin-right: 16px;">有效天数</span>
                  <span>自获得等级之日</span>
                  <a-input-number 
                    :min="0"
                    :precision="0"
                    v-model="form.expired_time"
                    placeholder="整数" 
                    @blur="() => {$refs.expired_time.onFieldBlur()}"
                    @change="() => {$refs.expired_time.onFieldChange()}"
                    />
                  <span>天内有效</span>
                </a-form-model-item>
                <a-form-model-item 
                  v-if="form.level_status==3">
                  <span style="margin-left: 24px; margin-right: 16px;">有效期</span>
                  <a-date-picker
                    v-model="form.expired_time"
                    format="YYYY-MM-DD HH:mm:ss"
                    :disabled-date="disabledDate"
                  />
                </a-form-model-item>
              </div>
            </a-form-model-item>
            <a-form-model-item 
              label="审核方式" 
              :labelCol="{md: {span: 2}}" 
              :wrapperCol="{md: {span: 20}}">

              <a-radio-group name="radioGroup" v-model="form.review_status">
                <a-radio :value="1"> 人工审核 </a-radio>
                <a-radio :value="2"> 免审核 </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item 
              label="审核信息" 
              :labelCol="{md: {span: 2}}" 
              :wrapperCol="{md: {span: 20}}">

              <a-checkbox-group
                v-model="checkboxValue"
                name="checkboxgroup"
                :options="plainOptions"
              />
            </a-form-model-item>

          </div>

        </div>

        <a-form-model-item 
          label="    " 
          :colon="false"
          class="handle-btn-group"
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">

          <a-button @click="save" type="primary" style="margin-right: 10px;"> 确定 </a-button>
          <a-button @click="exit"> 取消 </a-button>

        </a-form-model-item>

      </a-form-model>

    </a-layout-content>

</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import moment from 'moment';
import { addFixedLevel } from '@/api/crm'
import { getGroupolilist } from '@/api/oil'

const plainOptions = ['姓名', '车牌号']

export default {
  name: 'FixedEdit',
  components: {
    STable
  },
  props:{
    type:{
      type: String
    },
    formData: {
      type: Object
    }
  },
  data () {
    return {
      queryParam:{},
      plainOptions,
      checkboxValue: plainOptions,
      highSettingShow: false,
      templateType: 1,
      form: {
        level_name: '',	
        //[string]	是	固定等级名称		
        template_icon: 'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/25b67c1677b9a0dc609b780a63d0.png',	
        //[string]	是	固定等级模板		
        discount_type: 1,	
        //[string]	是	优惠方式1：金额优惠，2：折扣优惠
        grade: [
          {
            discount: null,	
            //[string]	是	1是金额优惠金额2折扣优惠百分比，根据discount_type做判断		
            oils_id: [],
            //[string]	是	油品id
            oldChooseData: [], // 全选下拉用的
          }
        ],
        level_status: 1,	
        //[string]	是	等级有效期，1：永久，2：有效天数，3：过期时间		
        expired_time: null,	
        //[string]	是	过期时间		
        review_status: 1,	
        //[string]	是	审核方式：1：人工审核，2：免审核		
        information_status: 3
        //[string]	是	审核信息状态，1：姓名，2：车牌号，3：全选，0：都没选
      },
      rules: {
        level_name: [
          { required: true, message: '请输入等级名称', trigger: 'blur' },
        ],
        template_icon: [
          { required: true, message: '请上传等级模板', trigger: 'blur' },
        ],
        expired_time: [
          { required: true, message: '请设置有效天数', trigger: 'blur' },
        ],
      },
      oilList: [],//油品下拉

    }
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  created () {
    // console.log(this.userInfo)
    // 获取油品列表
    getGroupolilist().then((res)=>{
      // console.log(res.data)
      this.oilList = res.data
      this.oilList.unshift({
        id: 'ALL_SELECT',
        oils_name: '全选',
      })
      // console.log(this.oilList)
      if (this.type === 'edit') {
        console.log(this.formData)
      }
    })
  },
  methods: {
    moment,
    save(){
      let that = this
      // console.log(this.form)
       this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert('submit!');
          that.checkRule().then((form)=>{
            // console.log(form)
            if (that.type === 'add') {
              addFixedLevel(form).then(()=>{
                that.exit()
              })
            }
            
          }).catch(()=>{})
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 变更有效期类型时
    onChangeTme(val){
      this.form.expired_time = null
    },
    // 禁止选择日期
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day');
    },
    // 表单校验
    checkRule(){
      return new Promise((resolve,reject)=>{
        let isError = false
        let ErroeText = '请将错误改正，再次提交'
        let form = _.cloneDeep(this.form)

        this.form.grade.forEach((ele,index)=>{
          form.grade[index].oils_id = ele.oils_id.filter((e,i)=>{
            return e !== 'ALL_SELECT'
          })
          if (!form.grade[index].oils_id.length&&!isError) {
            ErroeText = '请选择油品种类'
            isError = true
          }
          if (form.discount_type===1&&!form.grade[index].discount&&!isError) {
            ErroeText = '请输入金额'
            isError = true
          }
          if (form.discount_type===2&&!form.grade[index].discount&&!isError) {
            ErroeText = '请输入折扣'
            isError = true
          }
        })
        if (form.level_status!==1&&!form.expired_time&&!isError) {
          ErroeText = '请设置等级有效期'
          isError = true
        }

        // 审核信息处理
        // 1：姓名，2：车牌号，3：全选，0：都没选
        if (this.form.information_status.length===0) {
          form.information_status = 0
        }
        if (this.form.information_status.length===2) {
          form.information_status = 3
        }
        if (this.form.information_status.length===1) {
          form.information_status = this.form.information_status[0]
        }

        if(isError){
          this.$message.error(ErroeText)
          reject()
        }else{
          resolve(form)
        }

      })
    },
    // 是否显示继续添加按钮
    addBtnShow(){
      for (let o = 0; o < this.form.grade.length; o++) {
        const e = this.form.grade[o];
        if (e.oils_id.includes('ALL_SELECT')) {
          return false
        }
      }
      return true
    },
    // 禁用选项
    oilDisabled(index,i,id){
      // 如果该油品被选择过，禁用
      for (let o = 0; o < this.form.grade.length; o++) {
        const e = this.form.grade[o];
        // 除了当前规则，如果重复了禁用
        if (e.oils_id.includes(id) && index!==o) {
          return true
        }
      }
      return false
    },
    // 删除一条规则
    delRule(index){
      this.form.grade.splice(index, 1)
      if (this.form.grade.length ===1) {
        this.oilList.unshift({
          id: 'ALL_SELECT',
          oils_name: '全选',
        })
      }
    },
    // 增加一条规则
    addRule(){
      let obj = {
        discount: null,	
        //[string]	是	1是金额优惠金额2折扣优惠百分比，根据discount_type做判断		
        oils_id: [],
        //[string]	是	油品id
        oldChooseData: [], // 全选下拉用的
      }
      this.checkRule().then(()=>{
        this.form.grade.push(obj)
        if (this.form.grade.length>1) {
          let arr = this.oilList.map((e)=>{
            return e.id
          })
          if (arr.includes('ALL_SELECT')) {
            this.oilList.splice(0,1)
          }
        }
      }).catch(()=>{})

    },
    // 全选油品
    selectAllOil(val, index){

      const allValues = this.oilList.map(item => {
        return item.id;
      });
      // 用来储存上一次选择的值，可进行对比
      const oldVal = this.form.grade[index].oldChooseData.length > 0 ? this.form.grade[index].oldChooseData : [];
 
      // 若选择全部
      if (val.includes('ALL_SELECT')) {
        this.form.grade[index].oils_id = allValues;
      }
      // console.log(oldVal)
      // 取消全部选中， 上次有， 当前没有， 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        this.form.grade[index].oils_id = [];
      }
 
      // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT');
        val.splice(index, 1); // 排除全选选项
        this.form.grade[index].oils_id = val;
      }
 
      // 全选未选，但是其他选项都全部选上了，则全选选上
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) {
          this.form.grade[index].oils_id = ['ALL_SELECT'].concat(val);
        }
      }

      // 储存当前选择的最后结果 作为下次的老数据
      this.form.grade[index].oldChooseData = this.form.grade[index].oils_id;
    },
    // 切换模板
    onChangeTemIcon(val){
      // console.log(val)
      if (val===1) {
        this.form.template_icon = 'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/25b67c1677b9a0dc609b780a63d0.png'
      }else{
        this.form.template_icon = null
      }
    },
    // 上传图片回调
    handleChange(info){
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
        let url = info.file.response.data
        // console.log(url)
        this.form.template_icon = url
      }
      if (info.file.status === 'done') {
        this.$message.success(`上传成功`);
      } else if (info.file.status === 'error') {
        this.$message.error(`上传失败`);
      }
    },
    // 取消
    exit(){
      this.$emit('exit')
    }
  }
}
</script>
<style lang="less" scoped>
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}

.form-wrap{
  margin-top: 50px;
  width: 100%;
  .ant-form-item{
    width: 100%;
    color: #1e1e28;
    margin-bottom: 16px;
  }
  .tips{
    margin-left: 16px;
    color: #9696a0;
    font-size: 14px;
  }
  .template-list-wrapper{
    .template-list{
      display: flex;
      flex-wrap: wrap;
      padding-left: 0;
      margin-bottom: 0;
      li{
        width: 122px;
        height: 72px;
        overflow: hidden;
        margin-right: 14px;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid transparent;
        cursor: pointer;
        transition: all .1s linear;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f5f5fa;
        &.active{
          border-color: #37f;
        }
        &:hover{
          border-color: #37f;
        }
        img{
          border-radius: 4px;
          width: 100%;
          display: block;
        }
      }
    }
  } 
  .offer-wrap{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .offer-content{
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: flex;
      align-items: center;
      padding: 20px;
      line-height: 32px;
      background-color: #f5f5fa;
    }
    .item-icon{
      width: 16px;
      height: 16px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin-left: 8px;
      cursor: pointer;
      color: #9696a0;
      font-size: 16px;
    }
  }
  .discount-rule-list{
    margin-top: 8px;
    width: 600px;

    .handle-btn-add-wrapper{
      .handle-btn-add{
        margin-bottom: 10px;
        width: 100%;
        display: block;
        box-sizing: border-box;
        text-align: left;
        height: 56px;
        line-height: 56px;
      }
    }
    
  }
  .advanced-setting-container{
    .advanced-setting-header{
      display: flex;
      height: 48px;
      border-bottom: 1px solid #e4e7f0;
      align-items: flex-end;
      padding-bottom: 12px;
      .title{
        color: #040a46;
        font-weight: 500;
        margin-right: 16px;
      }
      .handle{
        color: #37f;
        cursor: pointer;
      }
    }
    .advanced-setting{
      margin-top: 3px;
      padding-top: 15px;
      
    }
  }
  .advanced-setting{
    .ant-input-number{
      margin: 0 8px;
    }
  }
  .advanced-setting-deadline{
    width: 600px;
    background: #f5f5fa;
    .ant-form-item{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 68px;
    }
  }
  
}
.item_wrap{
  display: flex;
  align-items: center;
}
.handle-btn-group{
  padding-top: 56px;
}
.fixed_level_page{
  .upload-wrapper{
    position: relative;
    width: 600px;
    .uploadOnceContainer_prompt{
      color: #9696a0;
    }
    .upload-demo{
      position: absolute;
      right: 0;
      top: 0;
      background-color: #f5f5fa;
      width: 200px;
      height: 100px;
      font-size: 14px;
      line-height: 20px;
      padding-top: 8px;
      padding-left: 8px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 2px;
      overflow: hidden;
      color: #3c3c46;
      img{
        display: inline-block;
        max-width: 140px;
        vertical-align: top;
      }
    }
  }
}

.uploadOnceContainer_main{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.uploadOnceContainer_prompt{
  display: block;
  font-size: 12px;
  color: #9696a0;
  margin-top: 5px;
  line-height: 2;
  &[haserror=true]{
    color: #ff4646;
  }
}
.uploadOnceContainer{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  position: relative;
}
.update-tips{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  color: #fff;
  background-color: rgba(0,0,0,.6);
  text-align: center;
  overflow: hidden;
}
</style>
<style lang="less">
.fixed_level_page{
  .upload-wrapper{
    .ant-upload{
      width: 122px;
      height: 72px;
      padding: 0px;
      background-color: #f5f5fa;
      position: relative;
      min-width: 180px;
      min-height: 100px;
      background: #fff;
      background-color: #f5f5fa;
    }
    .upload-content{
      img{
        width: 100%;
        max-height: 100%;
        display: block;
      }
    }
  }
}
</style>