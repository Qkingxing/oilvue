<template>
  <div class="biao">
    <div class="box">
      <div class="overflow_box" v-for="(list, index) in arrs" :key="index">
        <div class="overflow_li">
          <div class="title">
            <span>{{list.number_members_name}}</span>
          </div>
          <div class="price_info">
            <span class="price">{{list.number_members_number}}</span>
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
      <span>图表分析</span>
    </div>
    <div class="trend-box">
      <div class="canvas-box">
        <canvas_box1 :lineChart='lineChart' v-if="show"></canvas_box1>
      </div>
      <div class="ranking-trend">
        <div class="rankingTrendText">
          油站消费排行
          <i class="more_info anticon anticon-question-circle">
            <a-popover title="会员人数" overlayClassName="note">
              <template slot="content">
                <div class="" style="width: 200px">
                  <p>查询时间内的累计会员人数（没有去除查询时间内会员等级失效的人数）</p>
                </div>
              </template>
              <span class="anticon">
                <a-icon type="question-circle" />
              </span>
            </a-popover>
          </i>
        </div>
        <div class="ranking-trend-box public_global_scroll">
          <div class="ranking-trend-lists">
            <div class="ranking-trend-top">1</div>
            <div class="aad">鹰眼第一加油站</div>
            <div class="aac">0</div>
          </div>
          <div class="ranking-trend-lists">
            <div class="ranking-trend-top">2</div>
            <div class="aad">鹰眼第一加油站</div>
            <div class="aac">0</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pie-chart-box">
      <div class="a">
        <div class="pie-chart-canvas">
          <!-- <span>图像</span> -->
          <bing3 :cake1='cake1' v-if="show"></bing3>
         
        </div>
        <div style="width:200px;margin: 0 auto;text-align: center;">
           <span>{{cake1.name}}</span>
        </div>
      </div>
      <div class="a">
        <div class="pie-chart-canvas">
          <!-- <span>图像</span> -->
          <bing5 :cake2='cake2' v-if="show"></bing5>
        </div>
        <div style="width:200px;margin: 0 auto;text-align: center;">
          <span>{{cake2.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {customerMemberStatistic} from '@/api/data'
import canvas_box1 from './canvas_box1'
import bing3 from './bing3'
import bing5 from './bing5'
export default {
  props:['arrs'],
  components: { canvas_box1 ,bing3,bing5},
  data() {
    return {
      lists:[],
      lineChart:{},
      show:false,
      cake1:{},
      cake2:{}
    }
  },
  // watch:{
  //   lists:{
  //     handler(value){
  //       this.lists = value
  //     },
  //     immediate:true,
  //     deep:true
  //   }
  // },
  created(){
      this.biao()
  },
  methods:{
     biao(){
       return customerMemberStatistic({ time_type:1}).then(res =>{
          
          this.lineChart = res.data.lineChart1
          this.cake1 = res.data.cake1
          this.cake2 = res.data.cake2
          console.log(this.cake1)
          this.show = true
       })
     }
  }
}
</script>

<style lang='scss' scoped>
.biao {
  .head_title {
    height: 16px;
    margin: 16px 0 8px 0;
    line-height: 16px;
    span {
      font-size: 14px;
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
          color: #48c672;
          font-weight: 700;
        }
           .trend{
         position: relative;
         font-size: 16px;
         left: 5px;
         top: 0;
         color:rgb(72, 198, 114);
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
    box-sizing: border-box;
    .canvas-box {
      width: 80%;
      user-select: none;
      position: relative;
      
    }
    .ranking-trend {
      display: flex;
      width: 20%;
      flex-direction: column;
      align-items: center;
      margin-left: 3rem;
      height: 400px;
      .ranking-trend-box {
        // overflow-y: auto;
        .ranking-trend-lists {
          font-size: 14px;
          color: #3c3c46;
          width: 100%;
          height: 20px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          margin-top: 20px;
          .ranking-trend-top {
            margin-right: 20px;
            min-width: 20px;
            min-height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            background-color: #7C7EE2;
          }
          .aad {
            margin-right: 20px;
          }
          .aac {
            margin-right: 20px;
          }
        }
      }
      .rankingTrendText {
        font-size: 20px;
        color: #000;
        font-weight: 600;
      }
      .more_info {
        position: relative;
        top: -4px;
        font-size: 16px;
        color: rgb(203, 203, 203);
      }
    }
  }
  .pie-chart-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    margin-top: 16px;
    .a {
      border-radius: 2px;
      border: 1px solid #eaeaf4;
    }
    .pie-chart-canvas {
      width: 100%;
      height: 420px;
      min-width: 440px;
      text-align: center;
      span {
        line-height: 420px;
      }
    }
  }
}
</style>