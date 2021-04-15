<template>
  <div class="screen">
    <div 
      class="screen-li"
      :class="{'active': i===index}"
      v-for="(item,i) in list"
      :key="i"
      @click="changeType(i)"
      >{{item.name}}</div>

    <a-range-picker
      v-if="index==3"
      :disabled-date="disabledDate"
      v-model="date"
      @change="onChangeTime"
      :show-time="{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
      }">
    </a-range-picker>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'timePicker',
  data(){
    return {
      list: [
        { name: '今日', type: 1 },
        { name: '本周', type: 3 },
        { name: '本月', type: 4 },
        { name: '自定义', type: 5 },
      ],
      index: 0,
      date: [],
    }
  },
  created(){},
  methods: {
    moment,
    changeType(i){
      this.index = i
      if (i!==3) {
        this.$emit('change',{
          time_type: this.list[i].type,
          time: null
        })
      }
      
    },
    onChangeTime(date,text){
      
      if (date.length) {
        // console.log(text)
        this.$emit('change',{
          time_type: 5,
          time: text
        })
      }else{
        console.log(text)
      }
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().endOf('day');
    },
  }
}
</script>

<style lang="less" scped>
.screen{
    font-size: 12px;
    line-height: 22px;
    min-height: 40px;
    display: flex;
    align-items: center;
    .screen-li {
      display: inline-block;
      width: 48px;
      height: 24px;
      line-height: 24px;
      margin-right: 20px;
      text-align: center;
      color: #040a46;
      font-size: 12px;
      cursor: pointer;
      &.active{
        background-color: #e7e7ff;
        border-radius: 3px;
        color: #7c7ee2;
      }
    }
  }
</style>