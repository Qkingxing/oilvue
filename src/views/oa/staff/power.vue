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
                      <a style="padding-left: 190px; display: block; margin-top: -14px; color: #37f">修改权限</a>
                      <div style="display: flex; flex-direction: column">
                        <div style="margin: 32px auto">
                          <div
                            style="width: 50px; height: 50px; border: 1px solid; margin: 0 auto; border-radius: 30px"
                          ></div>
                          <div style="margin: 20px 0 30px 0; text-align: center">加油员</div>
                        </div>
                      </div>

                      <div style="margin-bottom: 60px">
                        <span>权限说明：拥有油站下的全部数据查看</span>
                        <span>权限及功能修改权限</span>
                        <p>该角色目前已配置16个账号</p>
                      </div>

                      <div style="display: flex; justify-content: space-between">
                        <p>
                          角色权限
                          <a-popover placement="right">
                            <template slot="content">
                              <a-tree show-line :default-expanded-keys="['0-0-0']" @select="onSelect">
                                <a-icon slot="switcherIcon" type="down" />
                                <a-tree-node key="0-0" title="商户平台">
                                  <a-tree-node key="0-0-3" title="首页"> </a-tree-node>
                                  <a-tree-node key="0-0-0" title="数据">
                                    <a-tree-node key="0-0-0-0" title="员工绩效" />
                                    <a-tree-node key="0-0-0-1" title="加油统计" />
                                    <a-tree-node key="0-0-0-2" title="充值统计" />
                                    <a-tree-node key="0-0-0-3" title="关注统计" />
                                  </a-tree-node>
                                  <a-tree-node key="0-0-1" title="概览">
                                    <a-tree-node key="0-0-1-0" title="实时概览" />
                                    <a-tree-node key="0-0-1-1" title="整体看板">
                                      <a-tree-node key="0-0-2-0" title="查看整体看板" />
                                      <a-tree-node key="0-0-2-1" title="查看订单概览" />
                                      <a-tree-node key="0-0-2-2" title="导出报表" />
                                    </a-tree-node>
                                  </a-tree-node>
                                  <a-tree-node key="0-0-2" title="营销">
                                    <a-tree-node key="0-0-2-0" title="实时概览" />
                                    <a-tree-node key="0-0-2-1" title="活动统计" />
                                  </a-tree-node>
                                </a-tree-node>
								<a-tree-node key="0-1" title="商户POS端">
									 <a-tree-node key="0-1-1" title="首页"> </a-tree-node>
                                </a-tree-node>
								<a-tree-node key="0-2" title="商户小程序(商户端)">
									 <a-tree-node key="0-2-1" title="首页"> </a-tree-node>
                                </a-tree-node>
								<a-tree-node key="0-3" title="OS">
									 <a-tree-node key="0-3-1" title="首页"> </a-tree-node>
                                </a-tree-node>
                              </a-tree>
                            </template>
                            <span style="color: #37f">详情</span>
                          </a-popover>
                        </p>
                        <p>角色列表<a style="color: #37f">详情</a></p>
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
  methods: {
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
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
