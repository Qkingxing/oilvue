
<template>
  <a-layout>
    <a-layout-content 
      v-if="!$route.query.activityId"
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '600px', position: 'relative' }">

      <a-tabs v-model="tabActive">
        <a-tab-pane :key="1" tab="进行中">
          <ActiveTable 
            v-if="tabActive==1"
            ref="ActiveTable"
            :status="1" />
        </a-tab-pane>
        <a-tab-pane :key="2" tab="审批中">
          <ActiveTable 
            v-if="tabActive==2"
            ref="ActiveTable"
            :status="2" />
        </a-tab-pane>
        <a-tab-pane :key="3" tab="待开始">
          <ActiveTable 
            v-if="tabActive==3"
            ref="ActiveTable"
            :status="3" />
        </a-tab-pane>
        <a-tab-pane :key="4" tab="被取消">
          <ActiveTable 
            v-if="tabActive==4"
            ref="ActiveTable"
            :status="4" />
        </a-tab-pane>
        <a-tab-pane :key="5" tab="已结束">
          <ActiveTable 
            v-if="tabActive==5"
            ref="ActiveTable"
            :status="5" />
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>


    <ActiveDetail 
      v-if="$route.query.activityId"
      ref="ActiveDetail" />
  </a-layout>
</template>

<script>


export default {
  name: 'EMlist',
  components: {
    ActiveTable: ()=>import('./list/ActiveTable'),
    ActiveDetail: ()=>import('./list/ActiveDetail'),
  },
  data () {
    return {
      tabActive: 1,

    }
  },
  created () {
    // console.log(this.$route.query)
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.head-title{
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}
.invoice-card-box{
  position: relative;
  height: 128px;
  width: 242px;
  display: inline-block;
  text-align: center;
  margin-right: 20px;
  margin-bottom: 16px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
  .box-title{
    position: absolute;
    top: 30px;
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    color: #3c3c46;
  }
  .box-content{
    position: absolute;
    top: 63px;
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 100%;
    .value{
      font-size: 34px;
      line-height: 34px;
      color: #040a46;
    }
    .unit {
      font-size: 12px;
      color: #040a46;
      margin-left: 5px;
      transform: translateY(-1px);
    }
  }
}
.customer-statistics{
  margin-top: 30px;
  width: 102%;
  .invoice-card-box{
    height: 108px;
    width: 271px;
    box-shadow: none;
    border: 1px solid #eaeaf4;
    .box-title{
      text-align: left;
      top: 24px;
      left: 24px;
    }
    .box-content{
      top: 49px;
      left: 24px;
      text-align: left;
      justify-content: start;
      .value{
        color: #7C7EE2;
      }
    }
  }
}

</style>
