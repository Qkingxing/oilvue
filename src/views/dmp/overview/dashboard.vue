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
            <component :is="view"></component>
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
export default {
  name: 'Dashboard',
  components: {
    all,
    oils,
    bianlidian,
    shanfu,
    tuanyou
  },

  data() {
    return {
      view:'all',
     
      tabList: [
        { key: 'quanbu', tab: '全部' },
        { key: 'youpin', tab: '油品'},
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
        switch(key){
            case 'quanbu':
                this.view = 'all'
                break
            case 'youpin':
                this.view = 'oils'
                break
            case 'shanfu':
                this.view = 'shanfu'
                break
            case 'tuanyou':
                this.view = 'tuanyou'
                break
            case 'bianlidian':
                this.view = 'bianlidian'
                break
            default:
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

<style lang="less">
.ant-card-head{
    padding: 0;
}

.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e1e28;
  height: 55px;
  line-height: 41px;
  line-height: 60px;
  display: flex;
}

</style>
