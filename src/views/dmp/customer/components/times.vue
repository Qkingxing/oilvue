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
        <a-range-picker  @change="onChange" />
      </div>
    </div>

    <div v-if="dateKey == 'jintian'">
       <sheet :cake1='cake1' :lineChart1='lineChart1' :lineChart2='lineChart2' :lists='lists'></sheet>
    </div>
    <div v-if="dateKey == 'zuotian'">
        <sheet1 :cake1='cake1' :lineChart1='lineChart1' :lineChart2='lineChart2' :lists='lists'></sheet1>
    </div>
    <div v-if="dateKey == 'benzhou'">
        <sheet2 :cake1='cake1' :lineChart1='lineChart1' :lineChart2='lineChart2' :lists='lists'></sheet2>
    </div>
    <div v-if="dateKey == 'benyue'">
        <sheet3 :cake1='cake1' :lineChart1='lineChart1' :lineChart2='lineChart2'  :lists='lists' ></sheet3>
    </div>
	 <div v-if="dateKey == 'zidingyi'">
        <sheet4 :cake1='cake1' :lineChart1='lineChart1' :lineChart2='lineChart2'  :lists='lists' ></sheet4>
    </div>
  </div>
</template>

<script>
import sheet from './sheet'
import sheet1 from './sheet1'
import sheet2 from './sheet2'
import sheet3 from './sheet3'
import sheet4 from './sheet4'
export default {
  components:{sheet,sheet1,sheet2,sheet3,sheet4},
  props:['show','lists','arr'],
  data() {
    return {
      keys:0,
	  show1:false,
      dateKey: 'jintian',
      cake1:{},
      lineChart1:[],
      lineChart2:[],
      dates: [
        { key: 'jintian', name: '今日' },
        { key: 'zuotian', name: '本周' },
        { key: 'benzhou', name: '本月' },
        { key: 'benyue', name: '上月' },
		{ key: 'zidingyi', name: '自定义' },
      ],
    }
  },
  created(){
      console.log(this.cake1)
  },
  watch:{
      arr:{
          immediate:true,
          handler(arr){
            console.log(arr)
            this.cake1 = arr.cake1
            this.lineChart1 = arr.lineChart1
            this.lineChart2 = arr.lineChart2
          }
      },
      
      deep:true
  },
  methods: {
      
    changeDate(key) {
       if(key == 'jintian'){
		   this.show1 = false
		   this.$parent.customers(1)
       }
       if(key == 'zuotian'){
	    this.show1 = false
         this.$parent.customers(2)
       }
        if(key == 'benzhou'){
		this.show1 = false
         this.$parent.customers(3)
       }
        if(key == 'benyue'){
		this.show1 = false
         this.$parent.customers(4)
       }
	   if(key == 'zidingyi'){
		   this.show1 = true
	   }
	   
       
      this.dateKey = key
    },
    onChange(date, dateString) {

		this.$parent.customers(5,dateString)
    },
  },
}
</script>

<style lang='scss' >
.times {
  .shijian {
    .ant-calendar-picker {
      width: 240px;
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
  width: 400px;
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