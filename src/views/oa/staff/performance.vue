
<template>
  <div class="mainContainreBox">
      <div class="mainContainreBlock">
          <div class="container">
              <div class="group">
                  <div class="title_model">
                       <div class="main_label">绩效管理</div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Operformance',
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
    .mainContainreBox{
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        .mainContainreBlock{
            padding-left: 24px;
            padding-right: 24px;
            padding-bottom: 25px;
            background: #fff;
            min-width: 1004px;
            height: 787px;
            .container{
                box-sizing: border-box;
                  .group{
                    box-sizing: border-box;
                    .title_model{
                        position: relative;
                        padding: 24px 0 16px;
                        border-bottom: 1px solid #eaeaf4;
                        display: flex;
                        align-items: center;
                        vertical-align: bottom;
                        .main_label{
                            font-size: 16px;
                            margin-right: 16px;
                            font-weight: 700;
                            color: #1e1e28;
                        }
                        
                    }
                }
            }
        }
    }
</style>
