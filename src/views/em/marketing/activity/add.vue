
<template>
  <a-layout-content :style="{padding: '0 0 24px', minHeight: '280px' }">
    <a-card class="head-card" style="margin-bottom: 10px;">
      <a-steps :current="step">
        <a-step>
          <template slot="title">
            活动基础设置
          </template>
        </a-step>
        <a-step title="活动规则设置" />
        <a-step title="完成" />
      </a-steps>
    </a-card>
    <a-card v-show="step == 0">
      <div class="head-title"><span>基础设置</span></div>
      <div class="mainContent_block">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          style="min-width:700px;"
          :rules="rules">
          <a-form-model-item label="优惠券名称" :colon="false" prop="activity_name">
            <a-input v-model="form.activity_name" placeholder="请输入" :max-length="12"/>
          </a-form-model-item>
          <a-form-model-item label="生效油站" :colon="false" prop="site_ids" style="position:relative;">
            <el-select
              multiple
              collapse-tags
              v-model="form.site_ids"
              @change="val => selectAll(val)"
              placeholder="请选择"
              style="width: 240px;"
              size="medium"
            >
              <el-option
                v-for="item in siteList"
                :key="item.id"
                :label="item.site_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <div class="mSelectErrorTips" v-if="showSiteError">
              <a-icon type="info-circle" theme="filled" style="color:#ff2a2a; display:inline-block;margin: 2px 5px 0 0;" />
              <span>抱歉，您必须选择活动生效的油站</span>
            </div>
          </a-form-model-item>
          <a-form-model-item label="活动时间" :colon="false" prop="activity_time">
            <a-range-picker
              :show-time="{ format: 'HH:mm' }"
              v-model="form.activity_time"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['请选择活动开始时间', '请选择活动结束时间']"
            />
          </a-form-model-item>
          <a-form-model-item label="活动人群" :colon="false" prop="person">
            <a-radio-group v-model="form.person_type">
              <a-radio value="all">
                所有客户
                <a-popover title="所有客户">
                  <template slot="content">
                    <div>所有线上客户（所有可以获取用户信息的客户）</div>
                    <div>+线下客户（POS机、双屏机不进行用户登录的客户</div>
                  </template>
                  <a-icon type="question-circle" style="color:rgb(218, 218, 218)" />
                </a-popover>
              </a-radio>
              <a-radio value="allOnline">
                所有线上客户
                <a-popover title="所有线上客户">
                  <template slot="content">
                    <div>所有可以获取用户信息的客户</div>
                  </template>
                  <a-icon type="question-circle" style="color:rgb(218, 218, 218)" />
                </a-popover>
              </a-radio>
              <a-radio value="partAllow">部分可参与</a-radio>
              <a-radio value="partNotAllow">部分不可参与</a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 3 }">
            <a-button type="primary" @click="checkForm(1)" style="margin-top:60px;">
              下一步
            </a-button>
            <a-button style="margin-left: 10px;" @click="back">
              返回
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>

    </a-card>
  </a-layout-content>
</template>
<script>
import { getAllSiteList } from '@/api/support'
export default {
  data () {
    return {
      showSiteError: false,
      step: 0,
      labelCol: { span: 3 },
      wrapperCol: { span: 5 },
      siteList: [],
      form: {
        activity_name: '',
        site_ids: [],
        activity_time: null,
        person_type: 'all'
      },
      rules: {
        activity_name: [
          { required: true, message: '请输入1-12个字的营销活动名称', trigger: 'blur' }
        ],
        activity_time: [
          { required: true, message: '请营销活动时间', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    getAllSiteList().then(response => {
      this.siteList = response.data.data
    })
  },
  methods: {
    selectAll (val) {
      const allValues = this.siteList.map(item => {
        return item.id
      })
      // 若选择全部
      if (val.includes('')) {
        this.form.site_ids = allValues
      }
      if (val.length) {
        this.showSiteError = false
      }
    },
    checkForm (step) {
      if (step === 0) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            if (this.form.site_ids.length) {
              this.step = step
              this.showSiteError = false
            } else {
              this.showSiteError = true
            }
          } else {
            this.$message.error('请将错误改正，再次提交')
            return false
          }
        })
      }
    },
    back () {
      this.$emit('back')
    }
  }
}
</script>
<style lang="scss" scoped>
.head-card {
  // width:90%;
}

.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e1e28;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  margin: -20px 0 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mainContent_block {
  width: 100%;
  margin-top: 44px;
  box-sizing: border-box;
}
.mSelectErrorTips {
  display: flex;
  align-items: center;
  position: absolute;
  right: -100%;
  top: 0;
  color: #ff2a2a;
  line-height: 18px;
  font-size: 14px;
}
/deep/ .ant-form-item-required::before {
  display:none;
}
</style>
