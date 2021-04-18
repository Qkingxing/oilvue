
<template>
  <a-layout-content :style="{padding: '0 0 24px', minHeight: '280px' }">
    <a-card class="head-card" style="margin-bottom: 10px;">
      <a-steps :current="step" style="width:70%;margin: 0 auto;">
        <a-step>
          <template slot="title">
            活动基础设置
          </template>
        </a-step>
        <a-step title="活动规则设置" />
        <a-step title="完成" />
      </a-steps>
    </a-card>
    <a-card v-if="step == 0">
      <div class="head-title"><span>基础设置</span></div>
      <div class="mainContent_block">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          style="min-width:700px;"
          :rules="rules">
          <a-form-model-item label="活动名称" :colon="false" prop="activity_name">
            <a-input v-model="form.activity_name" placeholder="请输入" :max-length="12" style="width:280px;"/>
          </a-form-model-item>
          <a-form-model-item label="生效油站" :colon="false" prop="site_ids" style="position:relative;;">
            <el-select
              multiple
              collapse-tags
              v-model="form.site_ids"
              @change="val => selectAll(val)"
              placeholder="请选择"
              style="width: 280px;"
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
              v-model="form.activity_time"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['请选择活动开始时间', '请选择活动结束时间']"
              :show-time="{
                hideDisabledOptions: true,
                defaultValue: [
                  moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')
                ],
              }"
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
    <a-card v-if="step == 1">
      <a-form-model
        ref="activityRuleForm"
        :model="activityRuleForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        style="min-width:700px;"
      >
        <a-form-model-item label="立减方式" :colon="false" prop="discount_way">
          <a-radio-group v-model="activityRuleForm.discount_way">
            <a-radio value="money">金额立减</a-radio>
            <a-radio value="discount">折扣立减</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="次数限制" :colon="false" prop="times_limit">
          <a-radio-group v-model="activityRuleForm.times_limit">
            <a-radio value="1">不限制</a-radio>
            <a-radio value="2">限制</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="支付限制" :colon="false" prop="pay_way">
          <el-cascader
            v-model="form.pay_way"
            :options="options"
            :props="{ multiple: true }"
            collapse-tags
            clearable
          >
          </el-cascader>
        </a-form-model-item>
        <a-form-model-item label="重复方式" :colon="false" prop="repeat_way">
          <a-radio-group v-model="activityRuleForm.repeat_way">
            <a-radio value="1">活动期间</a-radio>
            <a-radio value="2">每天重复</a-radio>
            <a-radio value="3">每周重复</a-radio>
            <a-radio value="4">每月重复</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="立减规则" :colon="false">
          <div class="activity-detail-group-wrapper">
            <div class="activity-detail-group activity-detail-group-small">
              <div class="form-item">
                <div class="form-label">规则时间</div>
                <div class="form-wrapper">
                  <el-checkbox-group class="checkbox-group" v-if="activityRuleForm.repeat_way==3" v-model="activityRuleForm.month_threshold" style="width:500px;">
                    <el-checkbox-button v-for="i in weekList" :label="i" :key="i"><span v-show="i<10" style="margin-right: -4px;">0</span> {{ i }}</el-checkbox-button>
                  </el-checkbox-group>
                  <el-checkbox-group class="checkbox-group" v-if="activityRuleForm.repeat_way==4" v-model="activityRuleForm.month_threshold" style="width:500px;">
                    <el-checkbox-button v-for="i in 31" :label="i" :key="i"><span v-show="i<10" style="margin-right: -4px;">0</span> {{ i }}</el-checkbox-button>
                  </el-checkbox-group>
                  <a-time-picker v-model="activityRuleForm.limit_timer1"></a-time-picker>
                  <a-time-picker v-model="activityRuleForm.limit_timer2" style="margin-left: 20px;"></a-time-picker>
                </div>
              </div>
              <div class="form-item">
                <div class="form-label">消费油品</div>
                <div class="form-wrapper">
                  <a-select
                    mode="multiple"
                    v-model="activityRuleForm.oilChooseList"
                    placeholder="请选择油品"
                    style="width: 200px;"
                  >
                    <a-select-option v-for="item in oilList" :key="item.id">
                      {{ item.oils_name }}
                    </a-select-option>
                  </a-select>
                </div>
              </div>
              <div class="form-item">
                <div class="form-label">立减门槛</div>
                <div class="form-wrapper">
                  <span>消费</span>
                  <a-select style="width: 80px;margin-left: 10px;" v-model="activityRuleForm.cut_threshold" >
                    <a-select-option value="1">原价</a-select-option>
                    <a-select-option value="2">升数</a-select-option>
                  </a-select>
                  <a-input-number
                    class="input-number"
                    v-model="activityRuleForm.count_available"
                    :placeholder="activityRuleForm.cut_threshold == 1?'元': '折'"
                  />
                  {{ activityRuleForm.cut_threshold == 1?'元': '折' }}
                </div>
              </div>
              <div class="form-item">
                <template v-if="activityRuleForm.discount_way=='money'">
                  <div class="form-label">立减金额</div>
                  <div class="form-wrapper">
                    每升立减
                    <a-input-number
                      class="input-number"
                      v-model="activityRuleForm.count_available"
                      placeholder="金额"
                      :min="0"
                      :precision="2"
                    ></a-input-number>元
                  </div>
                </template>
                <template v-if="activityRuleForm.discount_way=='discount'">
                  <div class="form-label">立减折扣</div>
                  <div class="form-wrapper">
                    每升立享
                    <a-input-number
                      class="input-number"
                      v-model="activityRuleForm.count_available"
                      placeholder="折扣"
                      :min="0"
                      :precision="2"
                    ></a-input-number>折
                  </div>
                </template>
              </div>
            </div>
          </div>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 3 }">
          <a-button @click="step = 0" style="margin-top:60px;">
            上一步
          </a-button>
          <a-button type="primary" @click="checkForm(2)" style="margin-left: 10px;">
            创建
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-result
      v-if="step == 2"
      status="success"
      title="创建成功"
    >
      <template #extra>
        <a-button @click="goList">返回</a-button>
        <a-button type="primary" @click="goDetail">立即查看</a-button>
      </template>
    </a-result>
  </a-layout-content>
</template>
<script>
import { getAllSiteList } from '@/api/support'
import { getOilSetList } from '@/api/order'
import moment from 'moment'

export default {
  data () {
    return {
      moment,
      showSiteError: false,
      step: 0,
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
      siteList: [],
      oilList: [],
      form: {
        activity_name: '',
        site_ids: [],
        activity_time: [ moment().startOf('day'), moment().endOf('day') ],
        person_type: 'all'
      },
      activityRuleForm: {
        discount_way: 'money',
        times_limit: '1',
        pay_way: '',
        repeat_way: '1',
        week_threshold: [],
        month_threshold: [],
        count_available: '',
        cut_threshold: '1',
        oilChooseList: [],
        limit_timer1: '',
        limit_timer2: ''
      },
      weekList: ['日', '一', '二', '三', '四', '五', '六'],
      rules: {
        activity_name: [
          { required: true, message: '请输入1-12个字的营销活动名称', trigger: 'blur' }
        ],
        activity_time: [
          { required: true, message: '请营销活动时间', trigger: 'change' }
        ]
      },
      options: [{
          value: 1,
          label: '东南',
          children: [{
            value: 2,
            label: '上海',
            children: [
              { value: 3, label: '普陀' },
              { value: 4, label: '黄埔' },
              { value: 5, label: '徐汇' }
            ]
          }, {
            value: 7,
            label: '江苏',
            children: [
              { value: 8, label: '南京' },
              { value: 9, label: '苏州' },
              { value: 10, label: '无锡' }
            ]
          }, {
            value: 12,
            label: '浙江',
            children: [
              { value: 13, label: '杭州' },
              { value: 14, label: '宁波' },
              { value: 15, label: '嘉兴' }
            ]
          }]
        }, {
          value: 17,
          label: '西北',
          children: [{
            value: 18,
            label: '陕西',
            children: [
              { value: 19, label: '西安' },
              { value: 20, label: '延安' }
            ]
          }, {
            value: 21,
            label: '新疆维吾尔族自治区',
            children: [
              { value: 22, label: '乌鲁木齐' },
              { value: 23, label: '克拉玛依' }
            ]
          }]
        }]
    }
  },
  created () {
    this.loadOilList()
    getAllSiteList().then(response => {
      this.siteList = response.data.data
    })
  },
  methods: {
    loadOilList () {
      getOilSetList().then(res => {
        this.oilList = res.data
      })
    },
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
      if (step === 1) {
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
      } else if (step === 2) {
        this.$refs.activityRuleForm.validate(valid => {
          if (valid) {
            this.step = step
          } else {
            this.$message.error('请将错误改正，再次提交')
            return false
          }
        })
      }
    },
    back () {
      this.$emit('back')
    },
    goList () {
      this.$router.push('/em/list/list')
    },
    goDetail () {
      this.$router.push(`/em/list/list?activityId=39717`)
    }
  }
}
</script>
<style lang="scss" scoped>
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
.activity-detail-group {
  background-color: #fafafa;
  padding: 16px 24px;
  .form-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .form-label {
      width: 60px;
      margin-right: 15px;
      text-align: right;
      align-self: flex-start;
    }
    .checkbox-group {
      display: flex;
      flex-wrap: wrap;
    }
    .form-wrapper {
      .input-number {
        margin: 0 10px;
      }
    }
  }
}
/deep/ .ant-form-item-label {
  padding-right: 15px;
}
/deep/ .ant-form-item-required::before {
  display:none;
}
/deep/ .el-checkbox-button__inner {
  border: none !important;
  background-color: initial;
}
</style>
