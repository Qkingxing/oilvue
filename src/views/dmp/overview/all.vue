<template>
        <div>
          <div class="search" style=" margin-top: 15px;">
            <div
              class="search-li"
              :key="item.key"
              v-for="item in dates"
              :class="`${item.key == dateKey ? 'active' : ''}`"
              @click="changeDate(item.key)"
            >
              {{ item.name }}
            </div>
            <a-range-picker v-if="dateKey == 'zidingyi'" />
			
          </div>
		  <div v-if="dateKey == 'jintian'">
			  <component  :is='vivew'></component>
		  </div>
		  <div v-if="dateKey == 'zuotian'">
			  22
		  </div>
		  <div v-if="dateKey == 'benzhou'">
			  33
		  </div>
		  <div v-if="dateKey == 'benyue'">
			  44
		  </div>
		<div v-if="dateKey == 'zidingyi'">
			55
		</div>
        </div>

</template>

<script>
import times from './times'

export default {
  name: 'Dashboard',
  components: {
    times
  },

  data() {
    return {
	  line:1,
	  vivew:'times',
      dates: [
        { key: 'jintian', name: '今天' },
        { key: 'zuotian', name: '昨天' },
        { key: 'benzhou', name: '本周' },
        { key: 'benyue', name: '本月' },
        { key: 'zidingyi', name: '自定义' },
      ],
    
      key: 'quanbu',
      noTitleKey: 'quanbu',
      dateKey: 'jintian',
    }
  },

  methods: {
	
	changeDate(key) {
		this.dateKey = key
	},
  },
}
</script>

<style lang="less">



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
    color: #1e1e28;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      color: #37f;
      transition: all 0.5s;
    }

    &.active {
      color: #3c85ff;
      background: #ecf3ff;
    }
  }
}

// 销售总数据
.saleall {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;

  .saleall-container {
    margin: -10px;
    display: flex;
    flex-wrap: wrap;

    /deep/.number-card {
      display: flex;
      flex: 1 1 20%;
      max-width: 20%;
    }
  }
}

</style>