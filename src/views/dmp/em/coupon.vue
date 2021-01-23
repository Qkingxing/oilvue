
<template>
  <div class="box">
    <div class="box_a">优惠券统计</div>
    <div class="box_b">
      <div class="box_b1">
        <coupon1></coupon1>
      </div>
      <div class="box_b2">
        <coupon2></coupon2>
      </div>
       <div class="box_b3">
        <coupon-3></coupon-3>
      </div>
    </div>
    <div class="box_c">
        <times></times>
    </div>
  </div>
</template>

<script>
import coupon1 from './components/coupon1'
import coupon2 from './components/coupon2'
import coupon3 from './components/coupon3'
import times from './components/times'
export default {
  name: 'Coupon',
  components: { coupon1, coupon2,coupon3,times },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  margin-top: 30px;
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
