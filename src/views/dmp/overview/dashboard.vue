<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 0 0 24px', background: '#fff' }">
      <a-card :bordered="false" class="dashboard">
        <a-card
          :tabList="tabList"
          :bordered="false"
          :active-tab-key="key"
          @tabChange="(key) => onTabChange(key, 'key')"
        >
        </a-card>

        <div>
          <component :lists="lists" :is="view"></component>
        </div>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
import all from './all'
import oils from './components/oils'
import bianlidian from './components/bianlidian'
import shanfu from './components/shanfu'
import tuanyou from './components/tuanyou'
import { dashboard } from '@/api/data'
export default {
  name: 'Dashboard',
  components: {
    all,
    oils,
    bianlidian,
    shanfu,
    tuanyou,
  },

  data() {
    return {
      view: 'all',

      tabList: [
        { key: 'quanbu', tab: '全部' },
        { key: 'youpin', tab: '油品' },
        { key: 'shanfu', tab: '闪付' },
        // { key: 'tuanyou', tab: '团油' },
        { key: 'bianlidian', tab: '便利店' },
      ],

      key: 'quanbu',
      dateKey: 'jintian',
      lists: {},
      
    }
  },
  created() {
    this.setData()
  },
  methods: {
    setData() {
      return dashboard({time_type:1}).then((res) => {
        var json = {
            "销售总收入":"今天截止此时的销售总收入",
            "实际销售收入":"今天截止此时的实际销售收入",
            "油品销售收入":"今天截止此时的油品销售收入",
            "闪付销售收入":"今天截止此时的闪付销售收入",
            "加油卡充值收入":"今天截止此时的加油卡充值收入",
            "便利店销售收入":"今天截止此时的便利店销售收入",
            "便利店积分收入":"今天截止此时的便利店积分收入",
            "订单总数":"今天截止此时的订单总数",
            "油品订单数":"今天截止此时的油品订单数",
            "闪付订单数":"今天截止此时的闪付订单数",
            "加油卡充值订单数":"今天截止此时的加油卡充值订单数",
            "便利店订单数":"今天截止此时的便利店订单数",
            "总加油量（升）":"今天截止此时的总加油量（升）",
            "营销成本":"今天截止此时的营销成本",
            "客单价":"今天截止此时的客单价"
            }
        this.lists = res.data.map((e,index)=>{
            let object = e
            for (const key in object) {   
                if(key != 'orderName' && key != 'comparedName' && key != 'Compared'){
                    object.number = object[key];
                    break
                }
            }
            // 在 lists 对象里面添加 json对象值
          e['value'] = json[object['orderName']]
            console.log(e)
          return object
        })
        console.log(this.lists)
      })
    },
    onTabChange(key, type) {
      if (key == 'quanbu') {
        this.view = 'all'
      } else if (key == 'youpin') {
        this.view = 'oils'
      } else if (key == 'shanfu') {
        this.view = 'shanfu'
      } else if (key == 'tuanyou') {
        this.view = 'tuanyou'
      } else if (key == 'bianlidian') {
        this.view = 'bianlidian'
      } else {
        this.view = 'all'
      }
  
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

<style lang="less" scoped>
.ant-card-head {
  padding: 0;
}

.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  line-height: 60px;
  display: flex;
}
</style>
