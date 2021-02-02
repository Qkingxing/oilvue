<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff' }">
      <div class="head-title">油站月报&nbsp;<span>数据以T + 1 方式进行统计</span></div>
      <a-card :bordered="false" class="monthly">
        <a-form :form="form" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
          <a-form-item label="月报时间">
            <a-month-picker :format="'YYYY-MM'" v-decorator="['time']" style="width: 100" />
          </a-form-item>
          <a-form-item label="报表类型">
            <a-checkbox-group @change="onChange" :value="showType">
              <a-row style="width: 300px">
                <a-col :span="12">
                  <a-checkbox value="consumptionAnalysis">
                    油品消费分析
                  </a-checkbox>
                </a-col>
                <a-col :span="12">
                  <a-checkbox value="contributionAnalysis">
                    客户贡献分析
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>
          <a-row>
            <a-col :span="2" />
            <a-col :span="15">
              <div class="typeCard" v-if="isShow('consumptionAnalysis')">
                <a-card class="checkSelectBox">
                  <a-form-item label="油品消费分析维度" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                    <a-radio-group v-decorator="['consumption']">
                      <a-radio value="consumptionGrade">
                        会员等级
                      </a-radio>
                      <a-radio value="consumptionFrequency">
                        消费频次
                        <a-tooltip placement="right" title="标签数据每小时更新一次" overlayClassName="tooltip">
                          <a-icon style="color: rgb(153, 153, 153);" type="question-circle" />
                        </a-tooltip>
                      </a-radio>
                    </a-radio-group>
                  </a-form-item>

                  <a-form-item :wrapper-col="{ span: 24 }">
                    <a-checkbox-group v-decorator="['consumptionChildren']" style="width: 100%">
                      <a-row class="width: 100%">
                        <a-col :offset="4" :span="20">
                          <div class="childrenBox">
                            <a-checkbox-group>
                              <a-checkbox value="dongtaidengji"> 固态等级 </a-checkbox>
                              <a-checkbox value="dongtaidengji"> 动态等级 </a-checkbox>
                            </a-checkbox-group>
                          </div>
                        </a-col>
                      </a-row>
                    </a-checkbox-group>
                  </a-form-item>
                </a-card>
              </div>
              <div class="typeCard" v-if="isShow('contributionAnalysis')">
                <a-card class="checkSelectBox">
                  <a-form-item label="客户贡献分析维度" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                    <a-radio-group v-decorator="['contribution']">
                      <a-radio value="a">
                        会员等级
                      </a-radio>
                      <a-radio value="b">
                        消费频次
                        <a-tooltip placement="right" title="标签数据每小时更新一次" overlayClassName="tooltip">
                          <a-icon style="color: rgb(153, 153, 153);" type="question-circle" />
                        </a-tooltip>
                      </a-radio>
                    </a-radio-group>
                  </a-form-item>

                  <a-form-item :wrapper-col="{ span: 24 }">
                    <a-checkbox-group v-decorator="['consumptionChildren']" style="width: 100%">
                      <a-row class="width: 100%">
                        <a-col :offset="4" :span="20">
                          <div class="childrenBox">
                            <a-checkbox-group>
                              <a-checkbox value="dongtaidengji"> 固态等级 </a-checkbox>
                              <a-checkbox value="dongtaidengji"> 动态等级 </a-checkbox>
                            </a-checkbox-group>
                          </div>
                        </a-col>
                      </a-row>
                    </a-checkbox-group>
                  </a-form-item>
                </a-card>
              </div>
            </a-col>
          </a-row>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">
              导出报表
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { includes } from 'lodash'
export default {
  name: 'Monthly',

  data () {
    return {
      showType: ['contributionAnalysis', 'consumptionAnalysis'],
      rules: [{ type: 'object', required: true, message: '请选择时间!' }]
    }
  },

  beforeCreate () {
    this.form = this.$form.createForm(this, { name: '' })
  },

  methods: {
    onChange (value) {
      this.showType = value
    },
    isShow (type) {
      return includes(this.showType, type)
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style lang="less">
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
  display: flex;

  span {
    font-size: 12px;
    line-height: 65px;
    color: #999;
    margin-left: 8px;
  }
}

.monthly {
  /deep/.ant-form-item {
    margin-bottom: 10px;
  }
}

.typeCard {
  margin-bottom: 24px;
}

.childrenBox {
  width: 360px;
  padding: 24px 24px;
  background: #f9fafc;
}
</style>
