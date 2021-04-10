<template>
  <div class="biao">
    <div class="box">
      <div class="overflow_box" v-for="(list, index) in lists" :key="index">
        <div class="overflow_li">
          <div class="title">
            <span>{{list.top_up_order_name}}</span>
          </div>
          <div class="price_info">
            <span class="price">{{list.top_up_order_number}}</span>
            <span class="unit">人</span>
          </div>
          <div class="trend_info">
            <span>较上一周期</span>
            <span class="percente percent-up">{{list.day_before}}</span>
            <i class="trend">
              <a-icon type="arrow-down" />
            </i>
          </div>
          <i class="more_info anticon anticon-question-circle">
            <a-popover title="消费客户" overlayClassName="note">
              <template slot="content">
                <div class="" style="width: 200px">
                  <p>统计时间内，已消费人数合计</p>
                </div>
              </template>
              <span class="anticon">
                <a-icon type="question-circle" />
              </span>
            </a-popover>
          </i>
        </div>
      </div>
    </div>

    <div class="head_title">
      <span class="text">消费金额趋势</span>
      <div class="xiaofei">
        <a-popover placement="bottom">
          <template slot="content">
            <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
              <span @click="bba" style="cursor: pointer">消费金额趋势</span>
            </div>
          </template>

          <a-button>切换</a-button>
        </a-popover>
      </div>
    </div>
    <div class="trend-box" v-if="a == 1">
      <div class="canvas-boxs">
        <canvas_box6 :lineChart1='lineChart1' v-if="show"></canvas_box6>
      </div>
    </div>
    <div class="trend-box" v-if="a == 2">
      <div class="canvas-boxs">
        <canvas_box7 :lineChart2='lineChart2' v-if="show"></canvas_box7>
      </div>
    </div>
    <div class="pie-chart-box">
      <bing8 :cake='cake' v-if="show"></bing8>
      
    </div>
    <div  style="width:200px;margin: 0 259px;text-align: center;">消费类型占比</div>
  </div>
</template>

<script>
import {GasCardStatistics} from '@/api/data'
import canvas_box6 from './canvas_box6'
import canvas_box7 from './canvas_box7'
import bing8 from './bing8'
export default {
  components: { canvas_box6,canvas_box7,bing8 },
  props:['lists'],
  data() {
    return {
      a:1,
      lineChart1:{},
      lineChart2:{},
      cake:{},
      show:false
    }
  },
  created(){
    this.biao()
  },
  methods: {
     biao(){
       return GasCardStatistics({time_type:1}).then(res =>{
         this.lineChart1 = res.data.lineChart1
         this.lineChart2 = res.data.lineChart2
         this.cake = res.data.cake1
         this.show = true
         console.log(res)
       })
     },
     bba(){
       this.a = 2
     }
  },
}
</script>

<style lang='scss' scoped>
.ant-btn {
  border: 1px solid transparent; //自定义边框
  outline: none; //消除默认点击蓝色边框效果
  color: #7C7EE2;
  margin: 0;
  padding: 0;
  line-height: 59px;
}
.ant-btn:hover {
  background-color: #fff;
  border-color: #ffffff !important;
  color: #ffffff;
}
.a-popper {
  margin-top: 0;
  .text {
    color: red;
    margin-bottom: 3px;
    text-align: center;
    cursor: pointer;
  }
}
.biao {
  .head_title {
    height: 16px;
    margin: 16px 0 8px 0;
    line-height: 16px;
    display: flex;
    position: relative;
    .xiaofei {
      position: absolute;
      left: 97px;
      top: -22px;
      span {
        position: absolute;
        font-size: 12px;
        left: 100px;
      }
    }
    span {
      font-size: 16px;
      color: #040a46;
      font-weight: 500;
      margin-right: 14px;
    }
    .sub-title {
      font-size: 12px;
      color: #96a2be;
      font-family: PingFangSC-Regular, PingFang SC;
      margin: 0;
    }
  }
  .box {
       width: 100%;
    display: flex;
    position: relative;
    flex-wrap: wrap;
  }
  .overflow_box {
    width: 300px;
    height: 180px;
    background-image: url('./img/bei.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .overflow_li {
      width: 100%;
      height: 138px;
      text-align: left;
      position: relative;

      border-radius: 4px;
      .title {
        margin: 41px 0 21px 41px;
        font-size: 14px;
        color: #040a46;
        letter-spacing: 0;
        line-height: 14px;
      }
      .price_info {
        white-space: nowrap;
        margin-left: 35px;
        .price {
          font-size: 32px;
          font-weight: 700;
          color: #7C7EE2;
          line-height: 32px;
          margin-right: 2px;
        }
        .unit {
          font-size: 14px;
          color: #040a46;
        }
      }
      .trend_info {
        display: flex;
        align-items: center;
        margin: 17px 0 0 41px;
        font-size: 12px;

        .percente {
          color: #ff4646;
          font-weight: 700;
        }
        .trend {
          position: relative;
          font-size: 16px;
          left: 5px;
          top: 0;
          color: rgb(72, 198, 114);
        }
      }
      .more_info {
        font-size: 16px;
        color: #eaeaf4;
        position: absolute;
        right: 44px;
        top: 0;
        cursor: pointer;
      }
    }
  }
  .trend-box {
    display: flex;
    align-items: center;
    .canvas-boxs {
      user-select: none;
      position: relative;
      width: 100%;
      .canvas-boxs {
        width: 68%;
        height: 400px;
      }
    }
  }
  .pie-chart-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    margin-top: 16px;
    
    // .aac {
      
    // }
  }
}
</style>