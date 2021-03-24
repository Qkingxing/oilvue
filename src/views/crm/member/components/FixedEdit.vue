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
        :model="form"
        layout="inline" 
        class="form-wrap">

        <a-form-model-item 
          label="等级名称" 
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">
          <a-input v-model="form.level_name" :maxLength="8" placeholder="请输入等级名称" style="width: 200px;"/><span style="margin-left: -30px; color: rgb(199, 199, 199); position: relative;">{{form.level_name.length}}/8</span>
        </a-form-model-item>

        <a-form-model-item 
          label="等级模板" 
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">
          <a-radio-group name="radioGroup" v-model="templateType">
            <a-radio :value="1">
              默认
            </a-radio>
            <a-radio :value="2">
              自定义
            </a-radio>
          </a-radio-group>

          <div class="template-list-wrapper">

            <ul class="template-list template-list" v-show="templateType==1">
              <li class="active">
                <img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/25b67c1677b9a0dc609b780a63d0.png" alt="等级模板">
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
                >
                  <div>
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
          鹰眼集团
        </a-form-model-item>

        <a-form-model-item 
          label="优惠方式" 
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">
              金额优惠
            </a-radio>
            <a-radio :value="2">
              折扣优惠
            </a-radio>
          </a-radio-group>

          <div class="discount-rule-list">
            <div>嵌套子表单</div>
            <div class="handle-btn-add-wrapper">
              <a-button class="handle-btn-add" icon="plus" type="dashed">继续添加</a-button>
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
              <a-radio-group name="radioGroup" :default-value="1">
                <a-radio :value="1">
                  永久
                </a-radio>
                <a-radio :value="2">
                  有效天数
                </a-radio>
                <a-radio :value="2">
                  过期时间
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item 
              label="审核方式" 
              :labelCol="{md: {span: 2}}" 
              :wrapperCol="{md: {span: 20}}">

              <a-radio-group name="radioGroup" :default-value="1">
                <a-radio :value="1">
                  人工审核
                </a-radio>
                <a-radio :value="2">
                  免审核
                </a-radio>
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

          <a-button type="primary" style="margin-right: 10px;"> 确定 </a-button>
          <a-button @click="exit"> 取消 </a-button>

        </a-form-model-item>

      </a-form-model>

    </a-layout-content>

</template>

<script>
import { STable } from '@/components'

import { getUserBasicslist } from '@/api/crm'

const plainOptions = ['姓名', '车牌号']

export default {
  name: 'FixedEdit',
  components: {
    STable
  },
  props:{
    type:{
      type: String
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
        template_icon: null,	
        //[string]	是	固定等级模板		
        discount_type: 1,	
        //[string]	是	优惠方式1：金额优惠，2：折扣优惠
        grade: [
          {
            discount: 1,	
            //[string]	是	1是金额优惠金额2折扣优惠百分比，根据discount_type做判断		
            oils_id: []	
            //[string]	是	油品id
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
      }

    }
  },
  created () {},
  methods: {
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
  }
}
</style>