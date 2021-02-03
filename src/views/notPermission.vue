<template>
  <a-layout>
    <a-layout-content
      :style="{
        padding: '0 24px 24px 24px',
        background: '#fff',
        minHeight: '777px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }"
    >
      <div class="container">
        <img
          src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/02/18/14/eea3bc7579d100092d1e5d80dd3e.png"
          class="error-image"
        />

        <div class="container-right">
          <!-- <div class="error-mainInfo">提示</div> -->
          <div class="error-mainInfoTwo">提示</div>
          <div class="error-subInfo">当前操作需要切换至集团</div>

          <a-button
            type="primary"
            size="large"
            style="margin-top: 30px">
            切换至集团
          </a-button>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: 'notPermission',
}
</script>

<style lang="less" scoped>
.container {
  display: flex !important;
  flex-direction: row !important;
  height: 100%;
  flex: auto;
  background-color: #fff;
  align-items: center !important;
  justify-content: center !important;
  .error-image {
    width: 152px;
    height: auto;
  }
  .container-right {
    display: flex;

    flex-direction: column;

    align-items: flex-start;
    justify-content: space-around;
    margin-left: 90px;
  }
  .error-mainInfo {
    font-size: 72px;
    font-weight: 700;
    color: #1e1e28;
  }
  .error-mainInfoTwo {
    font-size: 36px;
    font-weight: 700;
    color: #1e1e28;
  }
  .error-subInfo {
    font-size: 20px;
    text-align: center;
    color: #1e1e28;
  }
}
</style>