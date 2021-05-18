
<template>
  <div class="box">
    <div class="box_a">优惠券统计</div>
    <!-- <div class="box_b">
      <div class="box_b1">
        <coupon1 @quan='quan1'></coupon1>
      </div>
      <div class="box_b2">
        <coupon2 @name='quan2'></coupon2>
      </div>
       <div class="box_b3">
        <coupon-3></coupon-3>
      </div>
    </div> -->
    <div class="box_c">
        <times v-if="show" :lists='lists'></times>
    </div>
  </div>
</template>

<script>
import coupon1 from './components/coupon1'
import coupon2 from './components/coupon2'
// import coupon3 from './components/coupon3'
import times from './components/times'

import {discount} from '@/api/discount'
export default {
  name: 'Coupon',
  components: { coupon1, coupon2,times, },
  data() {
    return {
      lists:[],
	    show:false
    //   value1:'',
    //   value2:'',
    }
  },
  created(){
    this.discounts()
  },
  methods:{
      discounts(index,dateString){
        if(index == 5){
          let weekStarting_time = dateString[0]
          let weekEnd_time = dateString[1]
           return discount({time_status:5,weekStarting_time:weekStarting_time,weekEnd_time:weekEnd_time}).then(res =>{
            this.lists = res.data
            this.show = true
            console.log(this.lists)
          })
        }
        return discount({time_status:index?index:1}).then(res =>{
          this.lists = res.data
          this.show = true
          console.log(this.lists)
        })
      },
    //   quan1(value1){
    //     sessionStorage.setItem('value1',value1)
        
    //   },
    //   quan2(value2){
    //     sessionStorage.setItem('value2',value2)
        
    //   }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  background-color: #fff;
  .box_a {
    width: 95%;
    margin: 0 auto;
    height: 56px;
    font-size: 16px;
    font-weight: 700;
    color: rgb(30, 30, 40);
    line-height: 56px;
    border-bottom: 1px solid rgb(234, 234, 244);
  }
  .box_b {
    width: 95%;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
        .box_b2{
             margin-left: 40px;
        }
        .box_b3{
            margin-left: 40px;
        }
  }
  .box_c{
       width: 95%;
        margin: 0 auto;
        margin-top: 10px;
  }
}
</style>
