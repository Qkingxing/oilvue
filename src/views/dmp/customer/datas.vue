<template>
  <div class="shijian">
    <a-card
      style="width: 100%"
      :tab-list="tabList"
      :active-tab-key="key"
      loading
      @tabChange="(key) => onTabChange(key, 'key')"
    >
      <span slot="customRender" slot-scope="item">
        {{ item.key }}
      </span>
    </a-card>
    <div class="dev1">
      <i class="more_info anticon anticon-question-circle">
        <a-popover overlayClassName="note">
          <template slot="content">
            <div class="" style="width: 200px">
              <p>往前7天（不包含今日）</p>
            </div>
          </template>
          <span class="anticon">
            <a-icon type="question-circle" />
          </span>
        </a-popover>
      </i>
    </div>
    <div class="dev">
      <i class="more_info anticon anticon-question-circle">
        <a-popover overlayClassName="note">
          <template slot="content">
            <div class="" style="width: 200px">
              <p>往前30天（不包含今日）</p>
            </div>
          </template>
          <span class="anticon">
            <a-icon type="question-circle" />
          </span>
        </a-popover>
      </i>
    </div>

    <div
      v-if="
        key === 'tab1' ||
        key === 'tab2' ||
        key === 'tab3' ||
        key === 'tab4' ||
        key === 'tab5' ||
        key === 'tab6' ||
        key === 'tab7'
      "
    >
      <div class="content">
        <div class="head_title">
          <span class="">会员总数据</span>
        </div>
        <div class="overflow_box">
          <biao1 :arrs='arrs'></biao1>
        </div>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import biao1 from '../customer/biao1'
export default {
  components: { biao1 },
  props:['arrs'],
  created(){
      console.log(this.arrs)
  },
//   watch:{
// 	  arrs:{
// 		  handler(value){
// 			  this.lists = value
// 		  },
// 		  immediate:true,
// 		  deep:true
// 	  },
//   },
  data() {
    return {
		lists:[],
      tabList: [
        {
          key: 'tab1',
          tab: '今日',
          scopedSlots: { tab: 'customRender' },
        },
        {
          key: 'tab2',
          tab: '昨日',
        },
        {
          key: 'tab3',
          tab: '本周',
        },
        {
          key: 'tab4',
          tab: '本月',
        },
        
      ],
      key: 'tab1',
      style: { width: '200px' },
    }
  },
  methods: {
    onTabChange(key, type) {
    
      this[type] = key
      if(this[type] == 'tab1'){
          
           this.$parent.members(1)
      }
      if(this[type] == 'tab2'){
          console.log(this.$parent)
          this.$parent.members(2)
      }
      if(this[type] == 'tab3'){
          this.$parent.members(3)
      }
      if(this[type] == 'tab4'){
          this.$parent.members(3)
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.shijian {
  .ant-card {
	  
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid #e8e8e8;
    overflow: hidden;
  }
  .dates {
    width: 0;
    height: 0;
    position: relative;
    top: -20px;
  }
  .ant-menu {
    .ant-menu-item {
      padding-left: 25px;
    }
  }
  .dev {
    position: relative;
    top: -38px;
    left: 359px;
    height: 0;
    margin-left: 7px;
    font-size: 12px;
    color: #cbcbcb;
    cursor: pointer;
  }
  .dev1 {
    position: relative;
    height: 0;
    top: -38px;
    left: 264px;
    margin-left: 7px;
    font-size: 12px;
    color: #cbcbcb;
    cursor: pointer;
  }
  .content {
    box-sizing: border-box;
    .head_title {
      height: 20px;
      margin: 20px 0;
    }
    .overflow_box {
      border: none;
    }
  }
}
</style>