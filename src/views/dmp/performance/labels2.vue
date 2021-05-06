<template>
  <div class="biao">
    <div class="box">
      <div class="overflow_box" v-for="(list, index) in lists" :key="index">
        <div class="overflow_li">
          <div class="title">
            <span>{{list.new_attention_name}}</span>
          </div>
          <div class="price_info">
            <span class="price">{{list.new_attention_number}}</span>
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
  </div>
</template>

<script>
export default {
  props:['lists'],
  data() {
    return {}
  },
  methods: {
    income() {},
  },
}
</script>

<style lang='scss' scoped>
.biao {
  .head_title {
    height: 16px;
    margin: 16px 0 8px 0;
    line-height: 16px;
    display: flex;
    position: relative;
    .xiaofei {
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
  }
  .overflow_box {
    width: 300px;
    height: 180px;
    background-image: url('./img/bei.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .overflow_li {
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
       .more_info {
          font-size: 16px;
          color: #eaeaf4;
          position: absolute;
          right: 44px;
          top: 0;
          cursor: pointer;
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
    }
  }
  .trend-box {
    display: flex;
    align-items: center;
    .canvas-boxs {
      user-select: none;
      position: relative;
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
    .aac {
      min-width: 670px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 6px 0;
      border-radius: 2px;
      border: 1px solid;
      height: 400px;
    }
  }
}
</style>