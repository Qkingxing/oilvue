<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="head-title">
        <a-radio-group @change="onChange">
          <a-radio-button value="nowMonth">本月</a-radio-button>
          <a-radio-button value="preThreeMonth">近三月</a-radio-button>
        </a-radio-group>
        <a-range-picker style="margin-left: 10px;" />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Record',
  data () {
    return {
      params: {

      }
    }
  },
  created () {
  },
  methods: {
    onChange (e) {
      console.log(`checked = ${e.target.value}`)
      const value = e.target.value
      if (value === 'nowMonth') {
        const nowMonthStartDate = moment().startOf('month').format('YYYY MM DD')
        const nowMonthEndDate = moment().endOf('month').format('YYYY MM DD')
      } else {
        const preThreeMonthDate = moment().subtract(3, 'months').format('YYYY MM DD')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}
</style>
