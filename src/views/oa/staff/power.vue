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
                <div class="roles">
                   <template>
                    <a-card hoverable style="width: 300px;margin: 10px 10px;">
                      <img
                        slot="cover"
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                      <template slot="actions" class="ant-card-actions">
                        <a-icon key="setting" type="setting" />
                        <a-icon key="edit" type="edit" />
                        <a-icon key="ellipsis" type="ellipsis" />
                      </template>
                      <a-card-meta title="Card title" description="This is the description">
                        <a-avatar
                          slot="avatar"
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                      </a-card-meta>
                    </a-card>
                  </template>
                  <!-- <div class="item">
                    <div class="itemContent">
                      <a class="setpower">修改权限</a>
                      <img src="" alt="" srcset="" />
                      <span class="powername">加油员</span>
                      <p>权限说明: 拥有油站下的部分数据查看及编辑的权限</p>
                      <p>该角色目前已经配置12个账号</p>
                      <div class="buttons">
                        <p>角色权限<a>详情</a></p>
                        <p>角色列表<a>详情</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="itemContent">
                      <a class="setpower">修改权限</a>
                      <img src="" alt="" srcset="" />
                      <span class="powername">加油员</span>
                      <p>权限说明: 拥有油站下的部分数据查看及编辑的权限</p>
                      <p>该角色目前已经配置12个账号</p>
                      <div class="buttons">
                        <p>角色权限<a>详情</a></p>
                        <p>角色列表<a>详情</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="itemContent">
                      <a class="setpower">修改权限</a>
                      <img src="" alt="" srcset="" />
                      <span class="powername">加油员</span>
                      <p>权限说明: 拥有油站下的部分数据查看及编辑的权限</p>
                      <p>该角色目前已经配置12个账号</p>
                      <div class="buttons">
                        <p>角色权限<a>详情</a></p>
                        <p>角色列表<a>详情</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="itemContent">
                      <a class="setpower">修改权限</a>
                      <img src="" alt="" srcset="" />
                      <span class="powername">加油员</span>
                      <p>权限说明: 拥有油站下的部分数据查看及编辑的权限</p>
                      <p>该角色目前已经配置12个账号</p>
                      <div class="buttons">
                        <p>角色权限<a>详情</a></p>
                        <p>角色列表<a>详情</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="itemContent">
                      <a class="setpower">修改权限</a>
                      <img src="" alt="" srcset="" />
                      <span class="powername">加油员</span>
                      <p>权限说明: 拥有油站下的部分数据查看及编辑的权限</p>
                      <p>该角色目前已经配置12个账号</p>
                      <div class="buttons">
                        <p>角色权限<a>详情</a></p>
                        <p>角色列表<a>详情</a></p>
                      </div>
                    </div>
                  </div> -->
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
  data () {
    return {}
  }
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
  flex: 1;
  flex-wrap: wrap;
  margin: -10px;

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
