<template>
  <div class="number-card">
    <div class="item" >
      <span>{{list.orderName}}</span>
      <div class="money">
         <countTo
              class="value"
              :startVal="0"
              :endVal="Number(list.number)"
              :duration="3000"
            ></countTo>
        <span v-if="list.orderName=='便利店销售收入'" class="unte">分</span>
        <span v-else-if="list.orderName == '闪付订单数' ||list.orderName == '油品订单数' " class="unte">笔</span>
         <span v-else-if="list.orderName == '客单价'" class="unte">元/笔</span>
          <span v-else-if="list.orderName == '总加油量（升）'" class="unte">升</span>
          <span v-else class="unte">元</span>
      </div>
      <div class="info">
          <span>{{zhou}}</span>   
          <span>降{{list.Compared | str | str1}}%</span>
          <i class="trend">
              <a-icon type="arrow-down"/>
        </i> 
    </div>
      
      <i class="more_info anticon anticon-question-circle">
            <a-popover title="消费客户" overlayClassName="note">
              <template slot="content">
                <div class="" style="width: 200px">
                  <p>{{list.value}}</p>
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
      zhou:'',
     xiaoshou:''
    }
  },
  created(){
      
   setTimeout(()=>{
         this.mapDate()
   },100)
//     console.log(this.list)

  },
  methods: {
    mapDate(){
        if(sessionStorage.getItem('key')){
            if(sessionStorage.getItem('key') == '1'||sessionStorage.getItem('key') == '2'){
         
                this.zhou = '周同比'
            }else if(sessionStorage.getItem('key') == '3'){
                
                this.zhou = '周环比'
            }else if(sessionStorage.getItem('key') == '4'){
                
                this.zhou = '月环比'
            }else{
                this.zhou = '周同比'
            }
        }else{
            this.zhou = '周同比'
        }
    }
  },
  filters:{
      str(Compared){
         if(Compared == 'NaN'){
            return Compared = 0
         }
         return Compared
      },
      str1(value){
          if(value == 'Infinity'){
              return value = 0
          }
          return value
      }
  }
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
