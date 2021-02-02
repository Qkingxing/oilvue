<template>

    <a-layout-content
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title" v-if="type=='add'">
        新增基础设置
      </div>
      <div class="head-title" v-else>
        编辑基础设置
      </div>

      <a-form layout="inline" class="form-wrap">

        <a-form-item 
          label="等级名称" 
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">
          <a-input placeholder="请输入等级名称" style="width: 200px;"/><span style="margin-left: -30px; color: rgb(199, 199, 199); position: relative;">0/8</span>
        </a-form-item>

        <a-form-item 
          label="等级模板" 
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">
              默认
            </a-radio>
            <a-radio :value="2">
              自定义
            </a-radio>
          </a-radio-group>

          <div class="template-list-wrapper">

            <ul class="template-list template-list">
              <li>
                <img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/25b67c1677b9a0dc609b780a63d0.png" alt="等级模板">
              </li>
            </ul>
          </div>

        </a-form-item>

        <a-form-item 
          label="生效油站" 
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">
          鹰眼集团
        </a-form-item>

        <a-form-item 
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
          

        </a-form-item>

        <div class="advanced-setting-container">
          <div class="advanced-setting-header">
            <div class="title">高级设置</div>
            <div class="handle" @click="highSettingShow=!highSettingShow">
              {{highSettingShow?'收起':'展开'}}
            </div>
          </div>
          <div class="advanced-setting" v-show="highSettingShow">
            <a-form-item 
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
            </a-form-item>
            <a-form-item 
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
            </a-form-item>
            <a-form-item 
              label="审核信息" 
              :labelCol="{md: {span: 2}}" 
              :wrapperCol="{md: {span: 20}}">

              <a-checkbox-group
                v-model="checkboxValue"
                name="checkboxgroup"
                :options="plainOptions"
              />
            </a-form-item>

          </div>

        </div>

        <a-form-item 
          label="    " 
          :colon="false"
          class="handle-btn-group"
          :labelCol="{md: {span: 2}}" 
          :wrapperCol="{md: {span: 20}}">

          <a-button type="primary" style="margin-right: 10px;"> 确定 </a-button>
          <a-button @click="exit"> 取消 </a-button>

        </a-form-item>

      </a-form>

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
      highSettingShow: false

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

</style>
