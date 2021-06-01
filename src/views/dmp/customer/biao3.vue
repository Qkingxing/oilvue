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
            <span >{{list.unit}}</span>
           
          </div>
          <div class="trend_info">
            <span>{{list.compared_name}}</span>
            <span class="percente percent-up"> 降{{ list.compared | num }}% </span>
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


    <span>趋势图</span>
       <div class="head_title">
      <span class="text">消费金额趋势</span>
      <div class="xiaofei">
        <a-popover placement="bottom">
          <template slot="content">
            <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
              <span @click="bba" style="cursor: pointer">消费金额趋势</span>
            </div>
          </template>

          <div class="qie">切换</div>
        </a-popover>
      </div>
    </div>
    <div class="trend-box" v-if="a">
      <div class="canvas-boxs">
        <canvas_box8 :lineChart1='lineChart1' v-if='show'></canvas_box8>
      </div>
    </div>
    <div class="trend-box" v-if="!a">
      <div class="canvas-boxs">
        <canvas_box9 :lineChart2='lineChart2' v-if='show'></canvas_box9>
      </div>
    </div>
  </div>
</template>

<script>
import canvas_box8 from './canvas_box8'
import canvas_box9 from './canvas_box9'
import canvas_box5 from './canvas_box'
import {customerIntegralStatistics} from '@/api/data'
export default {
  components: { canvas_box5 ,canvas_box8,canvas_box9},
  props: ['lists','index','dateString','index'],
  data() {
    return {
      lineChart1:{},
      lineChart2:{},
      show:false,
      a:true
    }
  },
   created(){
      if(this.index){
          this.biaos(this.index)
      }
   },
   filters:{
       num(val){
           return Math.abs(val) 
       }
   },
   methods:{
       biaos(index,dateString){
           if(index,dateString){
               
               let weekStarting_time = dateString[0]
              let weekEnd_time = dateString[1]
              return customerIntegralStatistics({time_type:5,weekStarting_time:weekStarting_time,weekEnd_time:weekEnd_time}).then(res =>{
             this.lineChart1 = res.data.lineChart1
             this.lineChart2 = res.data.lineChart2
             this.show = true
               console.log(res)
           })
           }
           return customerIntegralStatistics({time_type:index?index:1}).then(res =>{
             this.lineChart1 = res.data.lineChart1
             this.lineChart2 = res.data.lineChart2
             this.show = true
               console.log(res)
           })
       },
       bba(){
         this.a = !this.a
       }
   }

}
</script>

<style lang='scss' scoped>
.biao {
  .head_title {
    position: relative;
    margin: 16px 0 8px 0;
    line-height: 16px;
    width: 100%;
     .xiaofei {
      position: absolute;
      left: 97px;
      top: -22px;
      span {
        position: absolute;
        font-size: 12px;
        left: 100px;
      }
      .qie{
        margin-top: 21px;
      }
    }
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