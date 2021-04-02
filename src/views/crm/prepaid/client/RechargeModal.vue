<template>
  <a-modal
    title="加油卡充值"
    centered
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="modal-box">
      <span>充值金额</span>
      <a-input-number 
        style="width: 120px; margin-left: 20px;"
        :min="0"
        :precision="2"
        placeholder="金额"
      />
      <span style="margin-left: 10px;">元</span>
    </div>
    <div class="box-radio-group">
      <span>付款方式</span>
      <div class="radio-group">
        <a-radio-group class="groupFlex" name="radioGroup" :default-value="1">
          <a-radio :value="1">
            现金
          </a-radio>
          <a-radio :value="2">
            支付宝个人码
          </a-radio>
          <a-radio :value="3">
            微信个人码
          </a-radio>
          <a-radio :value="4">
            其他
          </a-radio>
        </a-radio-group>
      </div>

    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'RechargeModal',
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    };
  },
  methods: {
    show(id) {
      console.log(id)
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
  },
}
</script>

<style lang="less" scoped>
.modal-box{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  margin-left: 40px;
}
.box-radio-group{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 20px 50px 0 40px;
  span{
    white-space: nowrap;
    width: 56px;
    height: 40px;
    font-size: 14px;
    font-weight: 400;
  }
  .radio-group{
    width: 500px;
    margin-left: 16px;
    .groupFlex {
      display: grid;
      grid-template-columns: 120px 120px 120px;
      grid-template-rows: 35px 35px;
    }
  }
}
.ant-radio-wrapper {
  margin: 0;
  margin-right: 8px;
}
</style>