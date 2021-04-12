<template>
  <a-modal
    title="编辑客户信息"
    centered
    :width="680"
    :visible="visible"
    :confirm-loading="confirmLoading"
    :bodyStyle="{
      padding: '24px 30px 68px'
    }"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="user-info">
      <div class="panel-list">
        <div class="panel">
          <div class="panel-label">原系统会员编号</div>
          <div class="panel-content">-</div>
        </div>
        <div class="panel">
          <div class="panel-label">姓名</div>
          <div class="panel-content">刘无鸣</div>
        </div>
        <div class="panel">
          <div class="panel-label">手机号</div>
          <div class="panel-content">
            13260587999
            <a-popover trigger="click" v-model="phoneVisible">
              <template slot="content">
                <div class="phone-edit">
                  新手机号
                  <a-form>
                    <a-form-item>
                      <a-input placeholder="请输入新手机号"/>
                    </a-form-item>
                    <div class="btn-group">
                      <a-button size="small" @click="phoneVisible=false"> 取消 </a-button>
                      <a-button type="primary" size="small" style="margin-left: 8px;"> 确认 </a-button>
                    </div>
                  </a-form>
                </div>
              </template>

              <a-button type="link"> 修改 </a-button>
            </a-popover>
            
          </div>
        </div>
        <div class="panel">
          <div class="panel-label">车牌号</div>
          <div class="panel-content">-</div>
        </div>
        <div class="panel">
          <div class="panel-label">余额</div>
          <div class="panel-content">-</div>
        </div>
        <div class="panel">
          <div class="panel-label">积分</div>
          <div class="panel-content">2888</div>
        </div>
        <div class="panel">
          <div class="panel-label">成长值</div>
          <div class="panel-content">-</div>
        </div>
        <div class="panel">
          <div class="panel-label">固定等级</div>
          <div class="panel-content">钻石会员卡</div>
        </div>
        <div class="panel">
          <div class="panel-label">注册时间</div>
          <div class="panel-content">-</div>
        </div>
        <div class="panel">
          <div class="panel-label">状态</div>
          <div class="panel-content">未授权</div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'EditUserModal',
  data() {
    return {

      visible: false,
      
      confirmLoading: false,

      phoneVisible: false,
    };
  },
  methods: {
    show(item) {
      console.log(item)
      this.visible = true;
    },
    handleOk(e) {

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
.user-info{
  .panel-list{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    border-top: 1px solid #eaeaf4;
    border-left: 1px solid #eaeaf4;
  }
  .panel{
    width: 50%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 14px;
    font-size: 14px;
    color: #1e1e28;
    .panel-label{
      padding: 17px 15px 17px 0;
      width: 120px;
      background-color: #f9fafc;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      border-right: 1px solid #eaeaf4;
      border-bottom: 1px solid #eaeaf4;
    }
    .panel-content{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      border-right: 1px solid #eaeaf4;
      border-bottom: 1px solid #eaeaf4;
      padding: 17px 11px 17px 15px;
      width: 190px;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      word-break: break-all;
      .ant-btn{
        height: 14px;
        line-height: 14px;
        padding: 0;
      }
    }
  }
}
.phone-edit{
  color: #1e1e28;
  .ant-form-item{
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .btn-group{
    margin-top: 8px;
    text-align: right;
    .ant-btn{
      line-height: 26px;
      height: 26px;
      min-width: 50px;
      padding: 0;
    }
  }
}
</style>