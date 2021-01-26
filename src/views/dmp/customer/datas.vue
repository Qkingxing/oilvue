<template>
  <div class="shijian">
    <a-menu v-model="current" mode="horizontal" selectable>
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
            <!-- <div class="dates">
                <a-date-picker @change="onChange">
                    <a-icon slot="suffixIcon" type="smile" />
                </a-date-picker>
            </div> -->
        </span>
      </a-menu-item>
      <a-menu-item key="6">
        <span style="font-size: 16px">周</span>
      </a-menu-item>
      <a-menu-item key="7">
        <span style="font-size: 16px">月</span>
      </a-menu-item>
    </a-menu>
    <div
      v-if="
        current == 1 || current == 2 || current == 3 || current == 4 || current == 5 || current == 6 || current == 7
      "
    >
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
      current: ['1'],
    }
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  },
}
</script>

<style lang='scss'>
.shijian {
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
    top: -49px;
    left: 29px;
    height: 0;
  }
  .dev1 {
    position: relative;
    height: 0;
    top: -49px;
    left: 36px;
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