
<template>
  <div class="soft-ware">
    <div class="head-title">
      短信购买
    </div>
    <a-form ref="form" :form="form">
      <div class="content-item">
        <div class="content-left">商品</div>
        <div class="content-right">通知短信</div>
      </div>
      <div class="content-item">
        <div class="content-left">购买数量</div>
        <div class="content-right">
          <div class="more-wrap">
            <div class="more-item">
              <div class="">油站</div>
              <div class=""></div>
            </div>
            <div class="more-item">
              <div class="">数量</div>
              <div class="">油站</div>
            </div>
          </div>
        </div>
      </div>
    </a-form>

  </div>
</template>

<script>
export default {
  name: 'Software',
  data() {
    return { 
      form: this.$form.createForm(this, { name: 'form' })
    }
  },
  create() {

  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.soft-ware {
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 25px;
  background: #fff;
  min-width: 1004px;
  overflow: auto;
  background-color:#fff;
  .head-title {
    display: flex;
    justify-content: space-between;
    padding: 20px 0 10px 0;
    font-size: 14px;
    color: #1e1e28;
    white-space: nowrap;
    border-bottom: 1px solid #eaeaf4;
    margin-bottom: 28px;
  }

  .content-item {
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    .content-left {
      width: 112px;
      text-align: right;
      color: #1e1e28;
      margin-right: 16px;
    }
    .content-right {
      width: 100%;
      color: #1e1e28;
    }

    .more-wrap {
      position: relative;
      width: 800px;
      padding: 24px;
      box-sizing: border-box;
      background: #f5f5fa;
      margin-bottom: 8px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      flex-direction: column;
      .more-item {
        display: flex;
        margin-bottom: 16px;
        align-items: center;
      }
    }
  }
}
</style>
