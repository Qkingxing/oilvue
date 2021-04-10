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
      <div class="shijian">
        <a-range-picker @change="onChange" />
      </div>
    </div>

    <div v-if="dateKey == 'jintian'">
      
    </div>
    <div v-if="dateKey == 'zuotian'">
       
    </div>
    <div v-if="dateKey == 'benzhou'">
        
    </div>
    <div v-if="dateKey == 'benyue'">
       
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateKey: 'jintian',
      dates: [
        { key: 'jintian', name: '今日' },
        { key: 'zuotian', name: '本周' },
        { key: 'benzhou', name: '本月' },
        { key: 'benyue', name: '上月' },
      ],
    }
  },
  
  methods: {
    changeDate(key) {
       if(key == 'benyue'){
           this.keys = 1
       }
       console.log(this.keys)
      this.dateKey = key
    },
    onChange(date, dateString) {
      console.log( dateString)
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