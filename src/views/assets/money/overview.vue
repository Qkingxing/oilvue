<template>
  <div>
    <a-layout v-if="$route.name=='Aoverview'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <h3 class="o-title">账户概览</h3>
         <a-divider />
         <div class="account-box">
           <p>账户可用余额（元）</p>
           <span>9070.00</span><a-button type="primary" class="abutton">充值</a-button>
         </div>
      </a-layout-content>
    </a-layout>
    </div>
</template>
<script>
export default {
    name: 'Aoverview'
}
</script>
<style lang="less" scoped="scoped">
  .account-box{
    box-sizing: border-box;
    width: 554px;
    height: 138px;
    padding: 24px 24px 24px 24px;
    background: #fafafa;
    span{
      font-size: 52px;
      font-family: Helvetica-Bold,Helvetica;
      font-weight: 700;
      color: #040a46;
      line-height: 52px;
      height: 40px;
      display: inline-block;
    }
    .abutton{
      margin-left: 200px;
      min-width: 96px;
      height: 40px;
      vertical-align: top;
    }
  }
</style>