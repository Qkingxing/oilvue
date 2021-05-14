<template>
  <div class="boxs">
    <div class="head-title">销售总数据</div>
    <div class="saleall_4">
      <div class="saleall-container" v-for="(list, index) in lists" :key="index">
        <NumberCard :list="list"></NumberCard>
        
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
        22
      </a-col>
      <a-col :span="20" v-if="line == 3">
        <line-charts></line-charts>
        33
      </a-col>
    </a-row>

    <div class="head-title">点比分析</div>
    <div class="pie-chart-box">
      <div class="tab_1">
        <a-tabs>
          <a-tab-pane key="1" tab="全部">
            <G2 :nums='nums' v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="2" tab="扫呗-微信">
            <G2 :nums='nums' ></G2>
          </a-tab-pane>
          <a-tab-pane key="3" tab="扫呗-微信付款码">
            <G2 :nums='nums'  ></G2>
          </a-tab-pane>
          <a-tab-pane key="4" tab="团油 - 微信">
            <G2 :nums='nums'  ></G2>
          </a-tab-pane>
          <a-tab-pane key="5" tab="团油 - 微信小程序支付">
            <G2 :nums='nums' ></G2>
          </a-tab-pane>
          <a-tab-pane key="6" tab="团油">
            <G2 :nums='nums' ></G2>
          </a-tab-pane>
          <a-tab-pane key="7" tab="加油卡">
            <G2 :nums='nums' ></G2>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="tab_1">
        <a-tabs>
          <a-tab-pane key="1" tab="全部">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="2" tab="92#">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="3" tab="0#">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="4" tab="95#">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="tab_1">
        <a-tabs>
          <a-tab-pane key="1" tab="全部">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="2" tab="扫呗-微信">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="3" tab="扫呗-微信付款码">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="4" tab="团油 - 微信">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="5" tab="团油 - 微信小程序支付">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="6" tab="团油">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="7" tab="加油卡">
            <G2 :nums='nums' v-if="show"></G2>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="tab_1">
        <a-tabs>
          <a-tab-pane key="1" tab="全部">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="2" tab="92#">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="3" tab="0#">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="4" tab="95#">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="tab_1">
        <a-tabs>
          <a-tab-pane key="1" tab="Tab 1">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Tab 2">
            <G2 :nums='nums'  v-if="show"></G2>
          </a-tab-pane>
          <a-tab-pane key="3" tab="Tab 3">
            <G2 :nums='nums' v-if="show"></G2>
          </a-tab-pane>
        </a-tabs>
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
  props: ['lists','nums','a'],
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
      show:true,
      show1:false,
      show2:false,
      show3:false,
      show4:false,
	//   nums:{}
    }
  },
  created() {
      this.analysis()
    // console.log(this.nums)
    
  },
  watch:{
      nums:{
          handler(value){
            //   this.num = value
              this.show = true
          },
          deep:true,
          immediate:true
      }
  },
  methods: {
     
	 analysis(){

		 return analysiss1({time_status:1}).then(res=>{
             console.log(item)
			res.data.map(item =>{
                this.nums = item;
                
            })
            this.show = true
		 })
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
        returny
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
.boxs {
  .pie-chart-box {
    // display: grid;
    // grid-template-columns: 1fr 1fr;
    // grid-gap: 20px;
    .tab_1 {
      min-width: 680px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 6px 0;
      border-radius: 2px;
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