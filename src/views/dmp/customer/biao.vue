<template>
  <div class="biao">
    <div class="head_title">
      <span class="">数据统计</span>
      <span class="sub-title">
        统计时间：
        <span class="sub-title">2021-01-17至</span>
        2021-01-23
      </span>
    </div>
    <div class="box">
      <div class="overflow_box" v-for="(list, index) in lists" :key="index">
        <div class="overflow_li">
          <div class="title">
            <span>{{ list.name }}</span>
          </div>
          <div class="price_info">
            <span class="price">{{ list.value }}</span>
            <span class="unit">{{list.unit}}</span>
          </div>
          <div class="trend_info">
            <span>{{list.value}}</span>
            <span class="percente percent-up">{{list.compared|before}}</span>
           <i class="trend">
              <a-icon v-show="list.compared < 0"  type="arrow-down"/>
              <a-icon v-show="list.compared >= 0" :style="{ color: 'red' }" type="arrow-up"/>
            </i> 
          </div>
          <i class="more_info anticon anticon-question-circle">
            <a-popover :title="list.name" overlayClassName="note">
              <template slot="content">
                <div class="" style="width: 200px">
                  <p>{{list.info_content}}</p>
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

 

    <span>图表分析111</span>
    <div class="head_title">
      <div class="trend-box">
        <div class="canvas-boxs">
          <canvas_box :lineChart="lineChart" ></canvas_box>
        </div>
      </div>
    </div>

    <div class="pie-chart-box">
      <div class="a">
        <div class="div">
          <span>{{cake1.name}}</span>
        </div>
        <div class="pie-chart-canvas">
          <bing :cake1="cake1"></bing>
        </div>
      </div>
      <div class="a">
        <div class="div">
          <span>{{cake2.name}}</span>
        </div>
        <div class="pie-chart-canvas">
          <bing1 :cake2="cake2"></bing1>
        </div>
      </div>
      <div class="a">
        <div class="div">
          <span>{{cake3.name}}</span>
        </div>
        <div class="pie-chart-canvas">
          <bing2 :cake3="cake3" v-if="show"></bing2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import canvas_box from './canvas_box'
import bing from './bing'
import bing1 from './bing1'
import bing2 from './bing2'
export default {
  components: { canvas_box, bing,bing1,bing2 },
  props: ['lists', 'arr'],
  data() {
    return {
      lineChart: [],
      cake: [],
      legends: [],
      show: false,
      item: [],
      cake1: {},
      cake2: {},
      cake3: {},
      items:[]
    }
  },
  created(){
     
  },
  watch: {
    arr: {
      immediate: true,
      handler(newV, oldV) {
        this.lineChart = newV.lineChart1
        this.cake = newV
        this.cake1 = newV.cake1
        this.cake2 = newV.cake2
        this.cake3 = newV.cake3
        this.item.push(this.cake1,this.cake2,this.cake3)
        let arr = []
        let arr1 = []
        let arr2 = []
        arr.push(this.cake1)
        arr1.push(this.cake2)
        arr2.push(this.cake3)
        this.items.push(arr,arr1,arr2)
        this.show = tru
        console.log(this.lineChart)
      },
      deep: true,
    },
    

  },
}
</script>

<style lang='scss' scoped>
.biao {
  .head_title {
    position: relative;
    margin: 16px 0 8px 0;
    line-height: 16px;
    border: 1px solid #eaeaf4;
    width: 100%;
    span {
      font-size: 14px;
      color: #040a46;
      font-weight: 500;
      margin-right: 14px;
      padding: 10px;
      line-height: 5px;
    }
    .sub-title {
      font-size: 12px;
      color: #96a2be;
      font-family: PingFangSC-Regular, PingFang SC;
      margin: 0;
    }
  }
  .box {
    display: flex;
    position: relative;
    width: 100%;
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
      // border: 1px solid #eaeaf4;

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
    // box-sizing: border-box;
    .canvas-boxs {
      user-select: none;
      position: relative;
      padding: 15px;
      // height: 460px;
      // border: 1px solid #eaeaf4;
      // border-radius: 4px;

      // .trend{
      //     position: absolute;
      //     top: 24px;data
      //     left: 24px;
      // }
      border: none;
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
    .div {
      width: 150px;
      height: 50px;
      line-height: 50px;
      text-align: center;
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