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
      <div class="zidingyi">
        <a-range-picker format="YYYY-MM-DD HH:mm:ss" @change="onChange" v-if="dateKey == '5'" />
      </div>
    </div>
    <div v-if="dateKey == '1'">
      <times :nums="nums" :index="dateKey" :lists="lists"></times>
    </div>
    <div class="time" v-if="dateKey == '2'">
      <times1 :nums="nums" :index="dateKey" :lists="lists"></times1>
    </div>

    <div v-if="dateKey == '3'">
      <times2 :nums="nums" :index="dateKey" :lists="lists"></times2>
    </div>
    <div v-if="dateKey == '4'">
      <times3 :nums="nums" :index="dateKey" :lists="lists"></times3>
    </div>
    <div v-if="dateKey == '5'">
      <times4 :nums="nums" :time="time" :index="dateKey" :lists="lists"></times4>
    </div>
  </div>
</template>

<script>
import G2 from '../components/G2'
import times from '../times'
import times1 from '../times1'
import times2 from '../times2'
import times3 from '../times3'
import times4 from '../times4'
import NumberCard from '../components/numberCard'
import LineCharts from '../components/LineCharts'
import { analysiss1 } from '@/api/data'
import { dashboard } from '@/api/data'
export default {
  props: ['lists'],
  name: 'Dashboard',
  components: {
    times,
    times1,
    times2,
    times3,
    times4,
    NumberCard,
    LineCharts,
    G2,
  },

  data() {
    return {
      line: 1,
      vivew: 'times',
      dates: [
        { key: '1', name: '今天' },
        { key: '2', name: '昨天' },
        { key: '3', name: '本周' },
        { key: '4', name: '本月' },
        { key: '5', name: '自定义' },
      ],
      key: '1',
      noTitleKey: 'quanbu',
      dateKey: '1',
      show: false,
      nums: {},
      lists1: [],
      lineChart1: {},
      oilsMoney: {},
      oilsNumber: {},
      paysMoney: {},
      paysNumber: {},
      time: [],
    }
  },

  mounted() {},
  created() {
    this.analysis()
  },
  methods: {
    analysis(index) {
      if (index) {
        let weekStarting = index[0]
        let weekEnd_time = index[1]
        return analysiss1({ time_status: 5, weekStarting: weekStarting, weekEnd_time: weekEnd_time }).then((res) => {
          this.lineChart1 = res.data.lineChart1
          this.oilsMoney = res.data.oilsMoney
          this.oilsNumber = res.data.oilsNumber
          this.paysMoney = res.data.paysMoney
          this.paysNumber = res.data.paysNumber
          this.lists1.push(this.oilsMoney, this.oilsNumber, this.paysMoney, this.paysNumber)
          this.show = true
        })
        return
      }
      return analysiss1({ time_status: 1 }).then((res) => {
        this.lineChart1 = res.data.lineChart1
        this.oilsMoney = res.data.oilsMoney
        this.oilsNumber = res.data.oilsNumber
        this.paysMoney = res.data.paysMoney
        this.paysNumber = res.data.paysNumber
        this.lists1.push(this.oilsMoney, this.oilsNumber, this.paysMoney, this.paysNumber)
        this.show = true
      })
    },
    setDatas(index, type, dateString) {
      if ((index, type, dateString)) {
           if(type){
                let type = type
            }else{
                type = ''
            }
        let weekEnd_time = dateString[0]
        let weekStarting = dateString[1]
        return dashboard({ time_type: index, type: type, weekEnd_time: weekEnd_time, weekStarting: weekStarting }).then(
          (res) => {
           
            this.lists = res.data
          }
        )
      }
      return dashboard({ time_type: index, type: type }).then((res) => {
        
        this.lists = res.data
      })
    },
    changeDate(key) {
      this.dateKey = key
      if (key == '1') {
        this.setDatas(1, sessionStorage.getItem('type'))
      }
      if (key == '2') {
        this.setDatas(2, sessionStorage.getItem('type'))
      }
      if (key == '3') {
        this.setDatas(3, sessionStorage.getItem('type'))
      }
      if (key == '4') {
        this.setDatas(4, sessionStorage.getItem('type'))
      }

      sessionStorage.setItem('key', key)
    },
    onChange(date, dateString) {
      this.setData(dateString, 1)
      this.analysis(dateString)
      this.setDatas(5, dateString)
    },

    setData(index, time) {
      this.time = index
    },
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
    // changeDate(key) {
    //   this.dateKey = key
    //   console.log(key, '哈哈哈')
    //   sessionStorage.setItem('key', key)
    // },
  },
}
</script>

<style lang="less" scoped>
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
      color: #7c7ee2;
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
.saleall_1 {
  display: flex;
  // flex-direction: column;
  flex-wrap: wrap;
  padding-bottom: 10px;

  .saleall-container {
    margin: -10px;
    width: 20%;
    // flex-wrap: wrap;

    .number-card {
      width: 100%；;
      display: flex;
      // flex: 1 1 20%;
      // max-width: 20%;
      background-image: url('./img/bei.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>