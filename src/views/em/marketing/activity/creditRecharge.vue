
<template>
  <a-layout-content :style="{padding: '0 0 24px', minHeight: '280px' }">
    <div class="head-title">积分抵充值</div>
    <div class="rules-edit-container-ele">
      <div class="content">
        <div class="row-item flex">
          <div class="row-title" style="margin-top: 37px;">抵扣规则</div>
          <div class="row-content">
            <div class="ruleWrap flex" v-for="(item, i) in form.deductionRules" :key="i">
              {{ item.value }}
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
import moment from 'moment'

export default {
  data () {
    return {
      moment,
      showSiteError: false,
      status: 0,
      siteList: [],
      oilList: [],
      form: {
        activity_name: '',
        site_ids: [],
        activity_time: [ moment().startOf('day'), moment().endOf('day') ],
        deductionRules: [ // 抵扣规则
          {
            value: 0,
            value2: 2,
            value3: 3
          }
        ]
      },
      weekList: ['日', '一', '二', '三', '四', '五', '六']
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
    .row-title{
      font-size: 14px;
      margin-right: 20px;
      padding-left: 36px;
    }
  }
  .ruleWrap{
    border: 1px solid #eaeaf4;
    width: 740px;
    padding-top: 20px;
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
      top: 36px;
    }
  }
  .addRuleSet{
    width: 740px;
    height: 56px;
    line-height: 56px;
    background: #fff;
    border: 1px dashed #cad5e9;
    margin-top: 16px;
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
}
</style>
