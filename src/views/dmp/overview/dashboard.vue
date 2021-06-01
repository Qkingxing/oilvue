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
          <component ref="all" :lists="lists" :is="view"></component>
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
    setData(index) {
      if (index) {
        return dashboard({time_type:1, type: index }).then((res) => {
          this.lists = res.data
        })
        
      }
          return dashboard({ time_type:1 }).then((res) => {
          this.lists = res.data
        })
    },
    onTabChange(key, type) {
      if (key == 'quanbu') {
          this.setData()
          
        this.view = 'all'
        sessionStorage.setItem('key',1)
        sessionStorage.setItem('type','')

      } else if (key == 'youpin') {

        this.view = 'oils'
        this.setData(1)
        sessionStorage.setItem('key',1)
         sessionStorage.setItem('type',1)

      } else if (key == 'shanfu') {
        this.view = 'shanfu'
        this.setData(2)
        sessionStorage.setItem('key',1)
         sessionStorage.setItem('type',2)

      } else if (key == 'tuanyou') {
        this.view = 'tuanyou'
      } else if (key == 'bianlidian') {
          
        this.view = 'bianlidian'
        this.setData(3)
        sessionStorage.setItem('key',1)
         sessionStorage.setItem('type',3)
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
