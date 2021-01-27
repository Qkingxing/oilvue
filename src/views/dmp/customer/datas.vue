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
            <a-popover  overlayClassName="note">
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
            <a-popover  overlayClassName="note">
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
    <!-- <a-menu v-model="current" mode="horizontal" selectable>
      <a-menu-item key="1">
        <span style="font-size: 16px">今日</span>
      </a-menu-item>
      <a-menu-item key="2">
        <span style="font-size: 16px">昨日</span>
      </a-menu-item>
      <a-menu-item key="3">
        <span style="font-size: 16px">7天</span>
        <div class="dev">
          <i class="more_info anticon anticon-question-circle">
            <a-popover title="" overlayClassName="note">
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
      </a-menu-item>
      <a-menu-item key="4">
        <span style="font-size: 16px">30天</span>
        <div class="dev1">
          <i class="more_info anticon anticon-question-circle">
            <a-popover title="" overlayClassName="note">
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
      </a-menu-item>
      <a-menu-item key="5">
        <span style="font-size: 16px">日
      
        </span>
      </a-menu-item>
      <a-menu-item key="6">
        <span style="font-size: 16px">周</span>
      </a-menu-item>
      <a-menu-item key="7">
        <span style="font-size: 16px">月</span>
      </a-menu-item>
    </a-menu> -->
    <div v-if="key === 'tab1' || key === 'tab2' || key === 'tab3' || key === 'tab4' || key === 'tab5' || key === 'tab6' || key === 'tab7'">
      <div class="content">
        <div class="head_title">
          <span class="">会员总数据</span>
        </div>
        <div class="overflow_box">
          <biao1></biao1>
        </div>
      </div>
    </div>

    <div>
      
    </div>
  </div>
</template>

<script>
import biao1 from '../customer/biao1'
export default {
  components: { biao1 },
  data() {
    return {
      tabList: [
        {
          key: 'tab1',
          tab:'今日',
          scopedSlots: { tab: 'customRender' },
        },
        {
          key: 'tab2',
          tab: '昨日',
        },
        {
          key: 'tab3',
          tab: '7天',
        },
        {
          key: 'tab4',
          tab: '30天',
        },
        {
          key: 'tab5',
          tab: '日',
        },
         {
          key: 'tab6',
          tab: '周',
        },
         {
          key: 'tab7',
          tab: '月',
        },
      ],
       key: 'tab1',
      style: { width: '200px' },
    }
  },
  methods: {
    onTabChange(key, type) {
      console.log(key, type)
      this[type] = key
    },
  },
}
</script>

<style lang='scss' scoped>
.shijian {
   .ant-card{
        border-top: none;
        border-right: none;
        border-left: none;
        border-bottom: 1px solid #e8e8e8;
        overflow: hidden;
    }
    .dates{
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
    left: 349px;
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
    left: 253px;
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
    .overflow_box{
        border: none;
    }
  }
}
</style>