<template>
  <div class="times">
    <div style=" display: flex;">
      <div class="searchs" style="margin-top: 15px">
        <div
          class="search-lis"
          :key="item.key"
          v-for="item in dates"
          :class="`${item.key == dateKey ? 'actives' : ''}`"
          @click="changeDate(item.key)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="shijian" v-if="show1">
        <a-range-picker format="YYYY-MM-DD HH:mm:ss"  @change="onChange" />
      </div>
    </div>

    <div v-if="dateKey == 'jintian'">
      <bao2  :index='index' :lineChart1='lineChart1' :lineChart2='lineChart2' :lists='lists'></bao2>
    </div>
    <div v-if="dateKey == 'zuotian'">
       <bao3 :index='index' :lineChart1='lineChart1' :lineChart2='lineChart2' :lists='lists'></bao3>
    </div>
    <div v-if="dateKey == 'benzhou'">
        <bao4  :index='index' :lineChart1='lineChart1' :lineChart2='lineChart2' :lists='lists'></bao4>
    </div>
    <div v-if="dateKey == 'benyue'">
       <bao5  :index='index' :lineChart1='lineChart1' :lineChart2='lineChart2' :lists='lists'></bao5>
    </div>
    <div v-if="dateKey == 'zidingyi'">
        <bao6 :index='index' ref="time"  :lineChart1='lineChart1' :lineChart2='lineChart2'  :lists='lists' ></bao6>
    </div>
  </div>
</template>

<script>
import bao2 from './biao2'
import bao3 from './biao3'
import bao4 from './biao4'
import bao5 from './biao5'
import bao6 from './biao6'
export default {
    components:{bao2,bao3,bao4,bao5,bao6},
    props:['lists','lineChart1','lineChart2'],
  data() {
    return {
        dateString:[],
        index:1
,      dateKey: 'jintian',
      show1:false,
      dates: [
        { key: 'jintian', name: '今日' },
        { key: 'zuotian', name: '本周' },
        { key: 'benzhou', name: '本月' },
        { key: 'benyue', name: '上月' },
        { key: 'zidingyi', name: '自定义' },
      ],
    }
  },

  methods: {
    changeDate(key) {
       if(key == 'jintian'){
		   this.show1 = false
           this.index = 1
		   this.$parent.biao(1)
           
       }
       if(key == 'zuotian'){
	    this.show1 = false
        this.index = 2
         this.$parent.biao(2)
       
       }
        if(key == 'benzhou'){
		this.show1 = false
        this.index = 3
        this.$parent.biao(3)
       }
        if(key == 'benyue'){
		this.show1 = false
        this.index = 4
         this.$parent.biao(4)
        
       }
	   if(key == 'zidingyi'){
		   this.show1 = true
           this.index = 5
	   }
      this.dateKey = key
    },
    onChange(date, dateString) {

       console.log(this.$refs)
       this.$refs.time.biaos(5,dateString)
        this.$parent.biao(5,dateString)
      
    },
  },
}
</script>

<style lang='scss' >
.times {
  .shijian {
    .ant-calendar-picker {
      width: 360px;
      padding-top: 15px;
      padding-left: 10px;
      .ant-input {
        display: block;
        height: 40px;
      }
    }
  }
}

.searchs {
  width: 300px;
  height: 40px;
  border: 1px solid #eaeaf4;
  display: flex;
  align-items: center;

  .search-lis {
    width: 100px;
    border-right: 1px solid #eaeaf4;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #040a46;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      color: #7C7EE2;
    }

    &.actives {
      //   width: ;100px
      width: 100px;
      color: #3c85ff;
      border: 1px solid;
      background: #ecf3ff;
    }
  }
}
</style>