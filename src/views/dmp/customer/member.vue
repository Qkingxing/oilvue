
<template>
  <div class="member">
      <div class="mainContainreBlock">
          <div class="container animated fadeIn">
              <div class="date-tab-panes">
                 <datas></datas>
              </div>
             
          </div>
      </div>
  </div>
</template>

<script>
// import { component } from 'node_modules/vue/types/umd'
import datas from './datas'
export default {
    name: 'Member',
    components:{datas}
}
</script>
<style lang="scss" scoped>
    .member{
        padding-top: 54px;
        .mainContainreBlock{
            padding-left: 24px;
            padding-right: 24px;
            padding-bottom: 25px;
            background: #fff;
            min-width: 1004px;
            overflow: auto;
            .container{
                padding-top: 24px;
                .date-tab-panes{
                    position: relative;
                    padding-top: 5px;
                    display: flex;
                }
            }
        }
    }
</style>
