<template>
  <div class="number-card">
    <div class="item" >
      <span>{{list.orderName}}</span>
      <div class="money">
         <countTo
              class="value"
              :startVal="0"
              :endVal="list.number"
              :duration="3000"
            ></countTo>
        <span class="unte">元</span>
      </div>
      <div class="info">
          <span>{{list.comparedName}} </span>   
          <span>降{{list.Compared}}%</span>
          <i class="trend">
              <a-icon type="arrow-down"/>
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
</template>

<script>
import IconSelector from '@/components/IconSelector'

export default {
  props:['list'],
  components: { IconSelector },
  data() {
    return {
      data: [],
    }
  },
  created(){
    this.mapDate()
  },
  methods: {
    mapDate(){
      console.log(this.list)
    }
  },
}
</script>

<style lang="scss">
.item {
  flex: 1;
  height: 150px;
  display: flex;
  margin: 8px 10px;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  


  .money {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .value{
        font-size: 30px;
        color: #040a46;
        line-height: 34px;
        margin-right: 5px;
    }
  }

  > span:not(.anticon) {
    margin-top: 20px;
    font-size: 14px;
    color: #3c3c46;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 14px;
    text-align: center;
  }

  .info {
    height: 16px;
    margin-left: 30px;
    margin-bottom: 18px;
    display: flex;
    justify-content: flex-start;

    > span {
      font-size: 12px;
       padding-left: 10px;
      color: #3c3c46;
    }
    .trend{
         position: relative;
         font-size: 16px;
         left: 10px;
         top: -3px;
         color:rgb(72, 198, 114);
    }
  }

     .more_info {
          font-size: 16px;
          color: #eaeaf4;
          position: absolute;
          right: 38px;
          top: 18px;
          cursor: pointer;
        }
}

// 卡片类名
.note {
  width: 350px;
}
</style>
