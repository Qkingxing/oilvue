<template>
  <a-layout>
    <a-layout-content :style="{ margin: '24px 0', padding: '0 24px 24px 24px', background: '#fff' }">
      <a-card :bordered="false" class="dashboard">
        <a-card
          :tabList="tabList"
          :bordered="false"
          :active-tab-key="key"
          @tabChange="(key) => onTabChange(key, 'key')"
        >
          <div class="search">
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
          <div class="head-title">销售总数据</div>
          <div class="saleall">
            <div class="saleall-container">
              <number-card></number-card>
              <number-card></number-card>
              <number-card></number-card>
              <number-card></number-card>
              <number-card></number-card>
              <number-card></number-card>
              <number-card></number-card>
              <number-card></number-card>
              <number-card></number-card>
              <number-card></number-card>
              <number-card></number-card>
              <number-card> </number-card>
              <number-card></number-card>
            </div>
          </div>
          <div class="head-title">销售总数据</div>
          <a-row>
            <a-col :span="20">
              <line-charts></line-charts>
            </a-col>
          </a-row>
          <div class="head-title">点比分析</div>
          <el-row style="margin: '0 auto'; width: 100%; display: flex; flex-wrap: wrap">
            <div class="tab_1">
              <el-col :span="40" style="width:900px">
                <div class="grid-content bg-purple">
                  <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="first">
                      <Interval></Interval>
                       <div class="texts">
                            <span>销售额</span>
                            <p>6802.89元</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="扫呗-微信" name="a">
                      <Interval></Interval>
                    </el-tab-pane>
                    <el-tab-pane label="团油 - 微信" name="b">
                      <Interval></Interval>
                    </el-tab-pane>
                    <el-tab-pane label="团油 - 微信小程序支付" name="c">
                      <Interval></Interval>
                    </el-tab-pane>
                    <el-tab-pane label="团油" name="d">
                      <Interval></Interval>
                    </el-tab-pane>
                    <el-tab-pane label="加油卡" name="e">
                      <Interval></Interval>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-col>
            </div>

            <div class="tab_2">
              <el-col :span="40" style="width: 900px; margin-left: 20px;">
                <div class="grid-content bg-purple-light">
                  <el-tabs type="border-card" v-model="activeNames" @tab-click="handleClicks">
                    <el-tab-pane label="全部" name="first">
                      <Interval></Interval>
                      <div class="texts">
                            <span>销售额</span>
                            <p>6802.89元</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="92#" name="a">
                      <Interval></Interval>
                    </el-tab-pane>
                    <el-tab-pane label="0#" name="b">
                      <Interval></Interval>
                    </el-tab-pane>
                    <el-tab-pane label="95#" name="c">
                      <Interval></Interval>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-col>
            </div>
          </el-row>

          <el-row style="margin: '0 auto'; width: 100%; display: flex; flex-wrap: wrap">
            <div class="tab_1">
              <el-col :span="40" style="width:900px">
                <div class="grid-content bg-purple">
                  <el-tabs type="border-card" v-model="activeName3" @tab-click="handleClick3">
                    <el-tab-pane label="全部" name="first">
                      <Interval></Interval>
                      <div class="texts">
                            <span>销量</span>
                            <p>6802.89升</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="扫呗-微信" name="a">
                      <Interval></Interval>
                    </el-tab-pane>
                    <el-tab-pane label="团油 - 微信" name="b">
                      <Interval></Interval>
                    </el-tab-pane>
                    <el-tab-pane label="团油 - 微信小程序支付" name="c">
                      <Interval></Interval>
                    </el-tab-pane>
                     <el-tab-pane label="团油" name="d">
                      <Interval></Interval>
                    </el-tab-pane>
                    <el-tab-pane label="加油卡" name="e">
                      <Interval></Interval>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-col>
            </div>

            <div class="tab_2">
              <el-col :span="20" style="width: 900px;margin-left: 20px;">
                <div class="grid-content bg-purple-light">
                  <el-tabs type="border-card" v-model="activeNames4" @tab-click="handleClicks4">
                    <el-tab-pane label="全部" name="first">
                      <Interval></Interval>
                      <div class="texts">
                            <span>销量</span>
                            <p>6802.89升</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="92#" name="a">
                      <Interval></Interval>
                    </el-tab-pane>
                    <el-tab-pane label="0#" name="b">
                      <Interval></Interval>
                    </el-tab-pane>
                    <el-tab-pane label="95#" name="c">
                      <Interval></Interval>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-col>
            </div>
          </el-row>
        </a-card>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
import NumberCard from './components/numberCard'
import Charts from './components/charts'
import LineCharts from './components/LineCharts'
import Interval from './components/Interval'
export default {
  name: 'Dashboard',
  components: {
    NumberCard,
    Charts,
    LineCharts,
    Interval,
  },

  data() {
    return {
      activeName: 'first',
      activeNames: 'first',
      activeName3: 'first',
      activeNames4: 'first',
      tabList: [
        { key: 'quanbu', tab: '全部' },
        { key: 'youpin', tab: '油品' },
        { key: 'shanfu', tab: '闪付' },
        { key: 'tuanyou', tab: '团油' },
        { key: 'bianlidian', tab: '便利店' },
      ],
      dates: [
        { key: 'jintian', name: '今天' },
        { key: 'zuotian', name: '昨天' },
        { key: 'benzhou', name: '本周' },
        { key: 'benyue', name: '本月' },
        { key: 'zidingyi', name: '自定义' },
      ],
      lineData: [
        { year: '10/20', value: 30 },
        {
          year: '10/21',
          value: 40,
        },
        {
          year: '10/22',
          value: 30.5,
        },
        {
          year: '10/23',
          value: 50,
        },
        {
          year: '10/24',
          value: 40.9,
        },
        {
          year: '10/25',
          value: 60,
        },
        {
          year: '10/26',
          value: 70,
        },
        {
          year: '10/27',
          value: 90,
        },
        {
          year: '10/28',
          value: 63,
        },
      ],
      key: 'quanbu',
      noTitleKey: 'quanbu',
      dateKey: 'jintian',
    }
  },

  methods: {
    onTabChange(key, type) {
      console.log(key, type)
      this[type] = key
    },

    changeDate(key) {
      this.dateKey = key
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleClicks(tab, event) {
      console.log(tab, event)
    },
    handleClick3(tab, event) {
      console.log(tab, event)
    },
    handleClicks4(tab, event) {
      console.log(tab, event)
    },
  },
}
</script>

<style lang="less">

.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e1e28;
  height: 55px;
  line-height: 41px;
  line-height: 60px;
  display: flex;
}
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
    color: #1e1e28;
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
.tab_1 {
  min-width: 700px;
  margin-bottom: 20px;
    .texts{
        width: 100px;
        position: relative;
        top: -227px;
        left: 247px;
        text-align: center;
            p{
                font-size: 20px;
                color: #1e1e28;
                line-height: 34px;
            }
    }
}
.tab_2{
   
    .texts{
        width: 100px;
        position: relative;
        top: -227px;
        left: 247px;
        text-align: center;
            p{
                font-size: 20px;
                color: #1e1e28;
                line-height: 34px;
            }
    }
}
</style>
