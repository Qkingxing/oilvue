
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="list">
        <div class="page-block">
          <div class="head-title">
            积分设置
          </div>
          <div class="deploy-item">
            <div class="label">积分过期</div>
            <a-radio-group v-model="value">
              <a-radio :style="radioStyle" :value="1">
                统一过期，每年&nbsp;&nbsp;
                <a-date-picker />
              </a-radio>
              <a-radio :style="radioStyle" :value="2">
                永久有效
              </a-radio>

            </a-radio-group>
          </div>
          <div class="deploy-item">
            <div class="label">享受优惠不可获积分</div>
            <a-checkbox-group
              v-model="checkboxValue"
              name="checkboxgroup"
              :options="plainOptions"
            />
          </div>
          <div class="btn-box">
            <a-button type="primary"> 修改 </a-button>
          </div>
        </div>
      </div>
    </a-layout-content>

  </a-layout>
</template>

<script>

const plainOptions = ['优惠券优惠', '会员等级优惠', '价立减优惠', '满减优惠']

export default {
  name: 'Setting',
  components: {

  },
  data () {
    return {
      value: 1,
      plainOptions,
      checkboxValue: plainOptions,
      radioStyle: {
        display: 'block',
        height: '40px',
        lineHeight: '40px',
        marginBottom: '20px'
      }
    }
  },
  created () {

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
  margin-bottom: 50px;
}
.deploy-item{
  display: flex;
  .label{
    width: 126px;
    text-align: right;
    margin-right: 20px;
    line-height: 40px;
  }
  .ant-checkbox-group{
    line-height: 40px;
  }
}
.btn-box{
  margin-top: 50px;
  padding-left: 146px;
}
.page-content{
  margin-top: 30px;
}
.growth-setting{
  .setting-item{
    display: flex;
    .setting-title{
      line-height: 45px;
      width: 128px;
      margin-right: 20px;
      text-align: right;
    }
    .setting-content{
      line-height: 45px;
    }
  }
}
.growth-level{
  margin-top: 15px;
  .level-title{
    font-size: 16px;
    font-weight: 600;
    line-height: 60px;
    color: #040a46;
  }
}
.page-foot{
  text-align: center;
  margin-top: 50px;
  button{
    margin-right: 20px;
  }
}

</style>
