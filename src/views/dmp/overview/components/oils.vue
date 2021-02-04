<template>
  <div>
    <div class="search" style="margin-top: 15px">
      <div
        class="search-li"
        :key="item.key"
        v-for="item in dates"
        :class="`${item.key == dateKey ? 'active' : ''}`"
        @click="changeDate(item.key)"
      >
        {{ item.name }}
      </div>
      <a-range-picker v-if="dateKey == 'zidingyi'" />
    </div>
    <div v-if="dateKey == 'jintian'">
      <component :is="vivew"></component>
    </div>
    <div class="time" v-if="dateKey == 'zuotian'">
      <div class="head-title">销售总数据</div>
      <div class="saleall">
        <div class="saleall-container">
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
        </div>
      </div>

      <div class="sales">
        <div class="head-title">销售收入趋势</div>
        <a-popover placement="bottom">
        <template slot="content">
          <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
          <span @click="income(1)" style="margin-bottom: 10px; cursor: pointer">销售收入趋势</span>
          <span @click="income(2)" style="margin-bottom: 10px; cursor: pointer">订单趋势</span>
          <span @click="income(3)" style="cursor: pointer">客单价趋势</span>
        </div>
        </template>
       
        <a-button>切换</a-button>
      </a-popover>
      </div>
      <a-row>
        <a-col :span="20" v-if="line == 1">
          <line-charts></line-charts>
        </a-col>
        <a-col :span="20" v-if="line == 2">
          <line-charts></line-charts>
          哈哈我出来了
        </a-col>
        <a-col :span="20" v-if="line == 3">
          <line-charts></line-charts>
          哈哈我也出来了
        </a-col>
      </a-row>

      <div class="head-title">点比分析</div>
      <a-row style="width: 100%; display: flex; margin-bottom: 20px">
        <a-card style="min-width: 700px" class="box-card">
          <G2></G2>
          <div class="box">
            <span class="span">油品销售占比</span>
          </div>
        </a-card>
        <a-card style="min-width: 700px; margin-left: 20px" class="box-card">
          <G2></G2>
          <div class="box">
            <!-- <span class="span">加油升数按油品类型占比</span> -->
          </div>
        </a-card>
      </a-row>
      <a-row style="width: 100%; display: flex">
        <a-card style="min-width: 700px" class="box-card">
          <G2></G2>
          <div class="box">
            <span class="span">油品销售占比</span>
          </div>
        </a-card>
      </a-row>
    </div>

    <div v-if="dateKey == 'benzhou'">
         <component :is="vivew"></component>
    </div>
    <div v-if="dateKey == 'benyue'">
         <component :is="vivew"></component>
    </div>
    <div v-if="dateKey == 'zidingyi'">
         <component :is="vivew"></component>
    </div>
  </div>
</template>

<script>
import G2 from '../components/G2'
import times from '../times'
import NumberCard from '../components/numberCard'
import LineCharts from '../components/LineCharts'
export default {
  name: 'Dashboard',
  components: {
    times,
    NumberCard,
    LineCharts,
    G2,
  },

  data() {
    return {
      line: 1,
      vivew: 'times',
      dates: [
        { key: 'jintian', name: '今天' },
        { key: 'zuotian', name: '昨天' },
        { key: 'benzhou', name: '本周' },
        { key: 'benyue', name: '本月' },
        { key: 'zidingyi', name: '自定义' },
      ],
      key: 'quanbu',
      noTitleKey: 'quanbu',
      dateKey: 'jintian',
    }
  },
  mounted() {},
  methods: {
    income(index) {
      if (index == 1) {
        this.line = 1
        return
      }
      if (index == 2) {
        this.line = 2
        return
      }
      if (index == 3) {
        this.line = 3
        return
      }
    },
    changeDate(key) {
      this.dateKey = key
    },
  },
}
</script>

<style lang="less">
.search {
  height: 40px;
  display: flex;
  align-items: center;

  .search-li {
    width: 48px;
    height: 24px;
    line-height: 24px;
    margin-right: 20px;
    text-align: center;
    color: #040a46;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      color: #37f;
      transition: all 0.5s;
    }

    &.active {
      color: #3c85ff;
      background: #ecf3ff;
    }
  }
}
.box {
  width: 100px;
  margin: 0 auto;
  .span {
    color: #040a46;
  }
}

// 销售总数据
.saleall {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;

  .saleall-container {
    margin: -10px;
    display: flex;
    flex-wrap: wrap;

    /deep/.number-card {
      display: flex;
      flex: 1 1 20%;
      max-width: 20%;
    }
  }
}
</style>