<template>
  <div class="mainContainreBox">
    <div class="mainContainreBlock">
      <div class="container">
        <div class="group">
          <div class="title_model">
            <div class="main_label">员工角色操作权限管理</div>
            <span>根据员工的职能为账号赋予角色属性，根据角色进行权限设置，点击可查看</span>
            <a href="https://mp.nlsaas.com/oa/staff/account">员工列表</a>
          </div>
          <div class="content">
            <div class="contentBlock">
              <div class="contentMain">
                <div class="roles" v-for="a in 9" :key="a">
                  <template>
                    <a-card hoverable style="width: 300px; margin: 10px 10px">
                      <a style="padding-left: 190px;display: block;margin-top: -14px;">修改权限</a>
                      <div style="display: flex; flex-direction: column">
                        <div style="margin: 32px auto;">
                          <div style="width:50px;height:50px;border: 1px solid;margin: 0 auto;border-radius: 30px;">
                          </div>
                          <div style="margin: 20px 0 30px 0;text-align: center;">加油员</div>
                        </div>
                      </div>

                      <div style="margin-bottom: 60px;">
                          <span>权限说明：拥有油站下的全部数据查看</span>
                          <span>权限及功能修改权限</span>
                          <p>该角色目前已配置16个账号</p>
                      </div>

                      <div style="display: flex;justify-content: space-between;">
                        <p>角色权限<a>详情</a></p>
                        <p>角色列表<a>详情</a></p>
                      </div>
                    </a-card>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Operformance',
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.mainContainreBox {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  .mainContainreBlock {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 25px;
    background: #fff;
    min-width: 1004px;
    min-height: 787px;
    .container {
      box-sizing: border-box;
      .group {
        box-sizing: border-box;
        .title_model {
          position: relative;
          padding: 24px 0 16px;
          border-bottom: 1px solid #eaeaf4;
          display: flex;
          align-items: center;
          vertical-align: bottom;
          .main_label {
            font-size: 16px;
            margin-right: 16px;
            font-weight: 700;
            color: #040a46;
            span {
              font-size: 14px;
              color: #9696a0;
              margin-left: 20px;
            }
          }
        }
        .content {
          padding: 3rem 2rem;
          display: flex;
          .contentBlock {
            display: block;
            width: 100%;
            .contentMain {
              display: flex;
              flex-wrap: wrap;
              width: calc(100% + 21px);
            }
          }
        }
      }
    }
  }
}
.roles {
  display: flex;
//   flex: 1;
  flex-wrap: wrap;
  margin: 0px;

  .item {
    height: 400px;
    width: 33%;
    display: flex;
    
  }

  .itemContent {
    display: flex;
    flex: 1;
    margin: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 0 14px #eee;
    position: relative;

    > * {
      margin: 0;
      margin-bottom: 10px;
    }

    .setpower {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .powername {
      margin-bottom: 20px;
      color: 16px;
      font-weight: bold;
    }

    img {
      border: 1px solid red;
      width: 50px;
      height: 50px;
      border-radius: 50px;
    }

    > p {
      width: 70%;
      text-align: left;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      padding: 10px;

      p {
        margin: 0;
      }
    }
  }
}
</style>
