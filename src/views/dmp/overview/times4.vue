<template>
  <div class="boxs">
    <div class="head-title">销售总数据</div>
    <div class="saleall_4">
      <div class="saleall-container" v-for="(list, index) in lists" :key="index">
        <NumberCard  :list="list"></NumberCard>
        
      </div>
    </div>

    <div class="sales">
      <div class="head-title">销售收入趋势</div>
      <a-popover placement="bottom">
        <template slot="content">
          <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
            <span v-for="(item,index) in this.lineChart1" :key="index" @click="income(index)" style="margin-bottom: 10px; cursor: pointer">{{item.legend}}</span>
          </div>
        </template>

        <a-button>切换</a-button>
      </a-popover>
    </div>

    <a-row>
      <a-col :span="20" v-if="line == 1">
        <LineCharts v-if="show" :lineChart1='lineChart1'></LineCharts>
      </a-col>
      <a-col :span="20" v-if="line == 2">
        <LineCharts v-if="show" :lineChart1='lineChart1'></LineCharts>
        22
      </a-col>
      <a-col :span="20" v-if="line == 3">
        <LineCharts v-if="show" :lineChart1='lineChart1'></LineCharts>
        33
      </a-col>
    </a-row>

    <div class="head-title">点比分析</div>
    <div class="content">
        <div class="pie-chart-box" v-for="(item,index) in lists1" :key="index">
        <div class="tab_1">
            <a-tabs>
            <a-tab-pane v-for="(it,index) in item" :key="index" :tab="it.type">
                <G2 v-if='show' :it='it.data' ></G2>
                <div class="sale-ratio-name">
                    <span >{{it.name}}</span>
                </div>
            </a-tab-pane>
            </a-tabs>
        </div>
        </div>
    </div>

  </div>
</template>

<script>
import G2 from './components/G2'
import NumberCard from './components/numberCard'
import NumberCard1 from './components/numberCard1'
import NumberCard2 from './components/numberCard2'
import NumberCard3 from './components/numberCard3'
import NumberCard4 from './components/numberCard4'
import Charts from './components/charts'
import LineCharts from './components/LineCharts'
import {revenue} from '@/api/data'
import {analysiss1} from '@/api/data'
export default {
  props: ['lists','index'],
  name: 'Dashboard',
  components: {
    NumberCard,
    Charts,
    LineCharts,
    G2,
    NumberCard1,
    NumberCard2,
    NumberCard3,
    NumberCard4
  },

  data() {
    return {
      line: 1,
      show:false,
      activeName: 'first',
      activeNames: 'first',
      activeName3: 'first',
      activeNames4: 'first',
      text1: '销售收入趋势',
      text2: '订单趋势',
      text3: '客单价趋势',

      key: 'quanbu',
      noTitleKey: 'quanbu',
      dateKey: 'jintian',
      num:{},
      nums:{},
      lists1:[],
      lineChart1:{},
      oilsMoney:{},
      oilsNumber:{},
      paysMoney:{},
      paysNumber:{}
    }
  },
  created() {
      this.analysis()
  },
  methods: {
    analysis(index){
        console.log(this.time)
        return analysiss1({time_status:this.index}).then(res=>{
          this.lineChart1 = res.data.lineChart1
          this.oilsMoney = res.data.oilsMoney
          this.oilsNumber = res.data.oilsNumber
          this.paysMoney = res.data.paysMoney
          this.paysNumber = res.data.paysNumber
          this.lists1.push(this.oilsMoney,this.oilsNumber,this.paysMoney,this.paysNumber)
         this.show = true
        })
    },
    income(index) {
        console.log(index)
      if (String(index) == '0') {
        this.line = 1
        return
      }
      if (String(index) == '1') {
        this.line = 2
        return
      }
  
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

<style lang="less" scoped>

.sale-ratio-name{
    font-size: 16px;
    color: #1e1e28;
    margin: 20px auto;
    text-align: center;
}
.content{
    display: flex;
    .pie-chart-box{
        margin-right: 10px;
        width: 700px;
        display: grid;
        grid-template-columns: 1fr;
            grid-gap: 20px;
        .tab_1{
            min-width: 680px;
            display: flex;
            flex-direction: column;
            
        }
    }
}


 

.head-title {
  font-size: 16px;
  //   font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  line-height: 60px;
  display: flex;
}

.li {
  float: left;
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
    color: #040a46;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      color: #7C7EE2;
      transition: all 0.5s;
    }

    &.active {
      color: #3c85ff;
      background: #ecf3ff;
    }
  }
}

// 销售总数据
.saleall_4 {
  display: flex;
  // flex-direction: column;
  flex-wrap: wrap !important;
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
.tab_1 {
  min-width: 700px;
  margin-bottom: 20px;
  .texts {
    width: 100px;
    position: relative;
    top: -216px;
    left: 249px;
    // // height: 0;
    // top: 170px;
    // left: 274px;
    text-align: center;
  }
}
.tab_2 {
  .texts {
    width: 100px;
    position: relative;
    top: -216px;
    left: 249px;
    // // height: 0;
    // top: 170px;
    // left: 274px;
    text-align: center;
  }
}
.sales {
  display: flex;
  width: 200px;
  height: 55px;

  .ant-btn {
    border: 1px solid transparent; //自定义边框
    outline: none; //消除默认点击蓝色边框效果
    color: #7C7EE2;
    margin: 0;
    padding: 0;
    line-height: 59px;
  }
  .ant-btn:hover {
    background-color: #fff;
    border-color: #ffffff !important;
    color: #ffffff;
  }
  .a-popper {
    margin-top: 0;
    .text {
      color: red;
      margin-bottom: 3px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>