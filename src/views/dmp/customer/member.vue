
<template>
  <div class="member">
    <div class="mainContainreBlock">
      <div class="container animated fadeIn">
        <datas></datas>
      </div>
    </div>
  </div>
</template>

<script>
// import { component } from 'node_modules/vue/types/umd'
import datas from './datas'
export default {
  name: 'Member',
  components: { datas },
}
</script>
<style lang="scss" scoped>
.member {
  margin: 0px 0px;
  .mainContainreBlock {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 25px;
    background: #fff;
    min-width: 1004px;
    .container {
      position: relative;
      padding-top: 24px;
      .devs {
        .dev {
          position: relative;
          height: 0;
          width: 0;
          top: -1400px;
          left: 236px;
        }
        .dev1 {
          position: relative;
          top: -1400px;
          left: 334px;
          width: 0;
          height: 0;
        }
      }
    }
  }
}
</style>
