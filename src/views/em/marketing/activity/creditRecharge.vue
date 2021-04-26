
<template>
  <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">
    <div class="head-title">积分抵充值</div>
    <div class="rules-edit-container-ele">
      <div class="content">
        <div class="row-item flex align-center">
          <div class="row-title">活动名称</div>
          <div class="row-content">
            <a-input v-model="form.activity_name" placeholder="请输入活动名称" :max-length="12" style="width:280px;"/>
          </div>
        </div>
        <div class="row-item flex align-center">
          <div class="row-title">生效油站</div>
          <div class="row-content">
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
          </div>
        </div>
        <div class="row-item flex">
          <div class="row-title" style="margin-top: 37px;">抵扣规则</div>
          <div class="row-content">
            <div class="ruleWrap" v-for="(item, i) in form.deductionRules" :key="i">
              <div class="flex mar_top16 align-center">
                <div class="row-title">加油卡充值</div>
                <el-cascader
                  v-model="form.pay_way"
                  :options="options"
                  :props="{ multiple: true }"
                  collapse-tags
                  clearable
                  size="medium"
                  style="height:32px;"
                  :disabled="!form.site_ids.length"
                >
                </el-cascader>
              </div>
              <div class="flex mar_top16 align-center">
                <div class="row-title">充值抵扣</div>
                <div>
                  <span>每</span>
                  <a-input-number style="width: 90px; margin: 0px 8px 0px 16px;" v-model="item.deduction_amount" placeholder="金额" :min="0" :precision="0"/>
                  <span>积分抵</span>
                  <a-input-number style="width: 90px; margin: 0px 8px 0px 16px;" v-model="item.deduction_amount" placeholder="金额" :min="0" :precision="0"/>
                  <span>元</span>
                </div>
              </div>
              <div class="flex mar_top16 align-center">
                <div class="row-title">抵扣限制</div>
                <div>
                  <a-radio-group v-model="item.deduction_type">
                    <a-radio :value="1">不限制</a-radio>
                    <a-radio :value="2">固定限制</a-radio>
                    <a-radio :value="3">梯度限制</a-radio>
                  </a-radio-group>
                  <div class="fixedLimit" v-if="item.deduction_type!=1">
                    <div v-if="item.deduction_type == 2">
                      <span>最大抵扣</span>
                      <a-input-number style="width: 90px; margin: 0px 8px 0px 16px;" v-model="item.deduction_amount" placeholder="金额" :min="0" :precision="0"/>
                      <span>元</span>
                    </div>
                    <div v-if="item.deduction_type == 3">
                      <span>充值</span>
                      <a-input-number style="width: 90px; margin: 0px 8px 0px 16px;" v-model="item.deduction_amount" placeholder="整数" :min="0" :precision="0"/>
                      <span>元，最大折扣</span>
                      <a-input-number style="width: 90px; margin: 0px 8px 0px 16px;" v-model="item.deduction_amount" placeholder="金额" :min="0" :precision="0"/>
                      <span>元</span>
                    </div>
                    <div class="handlePenel" v-if="item.deduction_type == 3">
                      <a-icon
                        type="plus-circle"
                        class="m_r_8 pointer addGetJf"/>
                      <a-icon type="delete" class="pointer"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row-item flex align-center">
          <div class="row-title"></div>
          <div class="addRuleSet">
            <div class="addbox" @click="addGiveintegral()">
              <a-icon type="plus" />
              <span class="addText">继续添加</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-result
      v-if="status == 2"
      status="success"
      title="创建成功"
    >
      <template #extra>
        <a-button @click="goList">返回</a-button>
      </template>
    </a-result>
  </a-layout-content>
</template>
<script>
import { getAllSiteList } from '@/api/support'
import { getOilSetList } from '@/api/order'

export default {
  data () {
    return {
      showSiteError: false,
      status: 0,
      siteList: [],
      oilList: [],
      form: {
        activity_name: '',
        site_ids: [],
        deductionRules: [ // 抵扣规则
          {
            value: 0,
            value2: 2,
            value3: 3,
            deduction_type: 1,
            deduction_amount: ''
          }
        ]
      },
      options: []
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
    addGiveintegral () {

    },
    checkForm () {

    },
    goList () {
      this.$router.push(`/em/list/list?activityId=39717`)
    },
    back () {
      this.$emit('back')
    }
  }
}
</script>
<style lang="scss" scoped>
.head-title {
  font-size: 14px;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
  margin-bottom: 28px;
}
.rules-edit-container-ele{
  margin: 40px 0 0 40px;
  .pay_type_box{
    width: 476px;
    margin: 8px 0 0 0;
  }
  .row-item{
    margin-bottom: 20px;
    .row-title{
      width: 110px;
      text-align: right;
      font-size: 14px;
      margin-right: 20px;
      padding-left: 36px;
    }
  }
  .ruleWrap{
    border: 1px solid #eaeaf4;
    width: 740px;
    padding: 8px 10px 24px;
    margin-bottom: 20px;
    .removeRuleWrap{
      position: absolute;
      right: -44px;
      cursor: pointer;
      top: 30px;
    }
    .ruleTimeBox{
      position: absolute;
      top: 82px;
    }
    .calcIntegral {
      display: flex;
      align-items: center;
      span{
        padding: 0 5px;
        display: inline-block;
        height: 40px;
        line-height: 42px;
      }
    }
    .getintegralBox{
      position: relative;
      .addGetJf{
        display: none;
      }
      &:last-child{
        .addGetJf{
          display: inline-block;
        }
      }
    }
    .integBox{
      padding: 24px 24px 0 24px;
    }
    .getintegral{
      background: #f9fafc;
      width: 540px;
      margin-bottom: 24px;
      padding-bottom: 24px;
    }
    .handlePenel{
      position: absolute;
      right: -45px;
      top: 0;
    }
  }
  .addRuleSet{
    width: 740px;
    height: 56px;
    line-height: 56px;
    background: #fff;
    border: 1px dashed #cad5e9;
    margin-top: -30px;
    .addbox{
      margin: 0 0 0 23px;
      color: #1e1e28;
      font-size: 14px;
      cursor: pointer;
      .addText{
        margin: 0 0 0 5px;
      }
    }
  }
  .fixedLimit {
    width: 480px;
    height: 80px;
    line-height: 80px;
    margin-top: 20px;
    padding-left:24px;
    margin-bottom:24px;
    background: #f5f5fa;
    position: relative;
  }

}
.flex{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.align-center {
  align-items: center;
}
.f_a_c{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.line_h40{
  line-height: 40px;
}
.mar_top16{
  margin-top: 20px;
}
.m_r_8{
  margin-right: 8px;
}
.m_r_15{
  margin-right: 15px;
}
.pointer{
  cursor: pointer;
}
a{
  margin: 0 5px;
}
</style>
