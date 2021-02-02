
<template>
  <div class="mainContainreBox">
    <div class="mainContainreBlock">
      <div class="container">
        <div class="group" v-if="show == 1">
          <div class="title_model">
            <div class="main_label">绩效管理</div>
          </div>
          <div class="guild_block">
            <section class="block_item">
              <div class="block_pic">
                <img
                  class="pic_class"
                  src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/09/02/10/4ba82ea0805c3ea180dd9271dfc1.png"
                  alt=""
                />
              </div>
              <div class="block_operate">
                <div class="operate_text">
                  <div class="text_title">加油引导</div>
                  <div class="text_dec">统计员工服务客户次数</div>
                </div>
                <div class="operate_btn">
                  <button @click="showTime(1)" class="common_btn ant-btn">
                    <span>修改</span>
                  </button>
                  <button class="common_btn ant-btn">
                    <span>查看统计</span>
                  </button>
                </div>
              </div>
            </section>
            <section class="block_item">
              <div class="block_pic">
                <img
                  class="pic_class"
                  src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/09/02/10/676b526c2a5d0ec839569412bd6d.png"
                  alt=""
                />
              </div>
              <div class="block_operate">
                <div class="operate_text">
                  <div class="text_title">加油引导</div>
                  <div class="text_dec">统计员工服务客户次数</div>
                </div>
                <div class="operate_btn">
                  <button @click="showTime(2)" class="common_btn ant-btn">
                    <span>修改</span>
                  </button>
                  <button class="common_btn ant-btn">
                    <span>查看统计</span>
                  </button>
                </div>
              </div>
            </section>
            <section class="block_item">
              <div class="block_pic">
                <img
                  class="pic_class"
                  src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/09/02/10/04c8653015ebec5912f3a6e84e56.png"
                  alt=""
                />
              </div>
              <div class="block_operate">
                <div class="operate_text">
                  <div class="text_title">加油引导</div>
                  <div class="text_dec">统计员工服务客户次数</div>
                </div>
                <div class="operate_btn">
                  <button @click="showTime(3)" class="common_btn ant-btn">
                    <span>修改</span>
                  </button>
                  <button class="common_btn ant-btn">
                    <span>查看统计</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="group" v-else>
          <div class="title_model">
            <div class="main_label">加油卡充值引导</div>
            <div class="is_open">
              <a-switch size="small" default-checked @change="onChange" />
            </div>
            <div class="subtitle_model">已启用</div>
            <div class="turn_back">
              <button @click="showTime(4)" class="common_btn ant-btn">
                <span>返回上一页</span>
              </button>
            </div>
          </div>
          <div class="guide_content">
            <div class="oil_detail" v-if="shows2">
              <div class="radio_css" >
                <a-radio-group v-model="size">
                  <a-radio-button value="large"> 规则设置 </a-radio-button>
                  <a-radio-button value="default"> 参与人员 </a-radio-button>
                </a-radio-group>
              </div>
              <div class="page_setting" v-if="size == 'large'">
                <div class="setting_block">
                  <div class="block_left">引导入口</div>
                  <div class="block_right">
                    <a-checkbox-group
                      class="ccs"
                      v-model="value"
                      name="checkboxgroup"
                      :options="plainOptions"
                      @change="onChanges"
                    />
                  </div>
                </div>
                <div class="setting_block" v-if="shows">
                  <div class="block_left">引导时间</div>
                  <div class="block_right">
                    <a-radio-group :options="plainOptions1" :default-value="value1" @change="onChange1" />
                  </div>
                </div>

                <div class="setting_block">
                  <div class="block_left"></div>
                  <div class="block_right">
                    <a-button type="primary"> 保存 </a-button>
                  </div>
                </div>
              </div>
              <div class="page_person" v-if="size == 'default'">
                <div class="person_list">
                  <div class="person_head">
                    <div class="head_left">
                      <span>参与人员</span>
                      <span>参与加油卡充值引导共「2」人</span>
                      <span @click="start" type="checkbox ">选择全部</span>
                    </div>
                    <div class="head_right">
                      <a-button class="save_btn">删除</a-button>
                      <a-button class="save_btn">下载二维码</a-button>
                      <a-button class="save_btn" type="primary">添加成员</a-button>
                      <a-input-search placeholder="请输入员工姓名/账号" style="width: 200px" @search="onSearch" />
                    </div>
                  </div>
                  <div class="person_content">
                    <a-table :loading="loading" :columns="columns" :data-source="data" :row-selection="rowSelection" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="guide_content" v-if="shows1">
            <div class="oil_detail">
              <div class="page_person">
                <div class="person_list">
                  <div class="person_head">
                    <div class="head_left">
                      <span>参与人员</span>
                      <span>参与加油卡充值引导共「2」人</span>
                      <span @click="start" type="checkbox ">选择全部</span>
                    </div>
                    <div class="head_right">
                      <a-button class="save_btn">删除</a-button>
                      <a-button class="save_btn">下载二维码</a-button>
                      <a-button class="save_btn" type="primary">添加成员</a-button>
                      <a-input-search placeholder="请输入员工姓名/账号" style="width: 200px" @search="onSearch" />
                    </div>
                  </div>
                  <div class="person_content">
                    <a-table :loading="loading" :columns="columns" :data-source="data" :row-selection="rowSelection" />
                  </div>
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
const plainOptions = ['公众号', 'POS机', '二维码']
const plainOptions1 = ['任意时间', '上班时间']
const columns = [
  {
    title: '编号',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '账号',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '姓名',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '员工角色',
    dataIndex: 'yuangong',
    key: 'yuangong',
  },
  {
    title: '二维码',
    dataIndex: 'erweima',
    key: 'erweima',
  },
  {
    title: '操作',
    dataIndex: 'caozuo',
    key: 'caozuo',
  },
]

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
]
const data = [
  {
    key: 1,
    name: '1',
    age: 'fujianceshi2',
    address: 'New York No. 1 Lake Park',
    phone: '19959779836',
    yuangong: '管理员',
    erweima: '二维码',
    caozuo: '操作',
  },
  {
    key: 2,
    name: '2',
    age: 'maoyuanjyz009',
    address: 'Sidney No. 1 Lake Park',
    phone: '19959779836',
    yuangong: '管理员',
    erweima: '二维码',
    caozuo: '操作',
  },
]
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  },
}
export default {
  name: 'Operformance',
  data() {
    return {
      show: 1,
      size: 'large',
      plainOptions,
      plainOptions1,
      value: [],
      data,
      columns,
      rowSelection,
      loading: false,
      value1: '任意时间',
      shows: false,
      shows1: false,
      shows2: 0,
    }
  },

  methods: {
    showTime(index) {
      console.log(11)
      if (index == 1) {
        this.show = 2
        this.shows = true
        this.shows1 = false
        this.shows2 = 1
      } else if (index == 2) {
        this.show = 2
        this.shows = false
        this.shows1 = false
        this.shows2 = 1
      } else if (index == 3) {
        this.show = 2
        this.shows1 = true
        this.shows2 = 0
      } else if (index == 4) {
        this.show = 1
      }
    },
    a() {
      console.log(111)
    },
    onChange(checked) {
      console.log(`a-switch to ${checked}`)
    },
    onChanges(checkedValues) {
      console.log('checked = ', checkedValues)
      console.log('value = ', this.value)
    },
    onChange1(e) {
      console.log('radio1 checked', e.target.value)
    },
    start() {
      console.log(1)
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    onSearch() {},
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
    height: 787px;
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
          .is_open {
            margin-right: 4px;
            display: flex;
            align-content: center;
            .ant-switch {
              width: 32px;
              height: 16px;
              min-width: unset;
              box-sizing: border-box;
              .ant-switch-inner {
                display: block;
                margin-right: 6px;
                margin-left: 24px;
                color: #fff;
                font-size: 12px;
              }
            }
          }
          .subtitle_model {
            color: #9696a0;
            font-size: 12px;
            display: inline-block;
            font-weight: 400;
          }
          .turn_back {
            position: absolute;
            right: 0;
          }
          .main_label {
            font-size: 16px;
            margin-right: 16px;
            font-weight: 700;
            color: #040a46;
          }
        }
        .guild_block {
          display: flex;
          justify-content: center;
          margin-top: 16px;
          padding-bottom: 20px;
          .block_item {
            margin-right: 8px;
            flex: 1;
            height: 260px;
            .block_pic {
              height: 180px;
              border-radius: 10px 10px 0 0;
              overflow: hidden;
              text-align: center;
              background-color: #f8f8f8;
              .pic_class {
                height: 100%;
                background-position: 50%;
              }
            }
            .block_operate {
              height: 80px;
              box-sizing: border-box;
              padding: 23px 16px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              border: 1px solid #eaeaf4;
              border-radius: 0 0 10px 10px;
              position: relative;
              .operate_text {
                flex: 1;
                position: absolute;
                top: 23px;
                left: 16px;
                width: 40%;
                line-height: 14px;
                .text_title {
                  font-weight: 700;
                  color: #040a46;
                }
                .text_dec {
                  margin-top: 8px;
                  font-size: 12px;
                  color: #9696a0;
                }
              }
              .operate_btn {
                display: flex;
                .common_btn {
                  width: 74px;
                  min-width: unset;
                  padding: 0;
                  text-align: center;
                  margin-right: 8px;
                }
              }
            }
          }
        }
        .guide_content {
          padding-top: 12px;
          .oil_detail {
            box-sizing: border-box;
            .radio_css {
              padding-bottom: 24px;
            }
            .page_setting {
              padding-top: 24px;
              padding-left: 64px;

              .setting_block {
                display: flex;
                align-items: center;

                .block_left {
                  line-height: 14px;
                  padding-right: 16px;
                  min-width: 72px;
                }

                .block_right {
                  line-height: 14px;
                  flex: 1;
                  .ant-btn {
                    margin-top: 20px;
                  }
                }
              }
              .setting_block:nth-child(2) {
                margin-top: 26px;
                .block_left {
                  line-height: 14px;
                  padding-right: 16px;
                  min-width: 72px;
                  .block_right {
                    line-height: 14px;
                    flex: 1;
                    .ant-btn {
                      min-width: 74px;
                      font-size: 14px;
                      padding: 0 16px;
                      height: 32px;
                      line-height: 30px;
                    }
                  }
                }
              }
            }
            .page_person {
              box-sizing: border-box;
              .person_list {
                box-sizing: border-box;
                .person_head {
                  margin-bottom: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  .head_left {
                    line-height: 14px;
                    span {
                      display: inline-block;
                      margin-right: 8px;
                    }
                    span:nth-of-type(1) {
                      font-weight: 700;
                      color: #040a46;
                    }
                    span:nth-of-type(2) {
                      color: #9696a0;
                      font-size: 12px;
                    }
                    span:nth-of-type(3) {
                      color: #37f;
                      font-size: 12px;
                      cursor: pointer;
                    }
                  }
                  .head_right {
                    display: flex;
                    align-items: flex-end;
                    .save_btn {
                      padding: 0;
                      text-align: center;
                      min-width: 96px;
                      margin-right: 8px;
                    }
                  }
                }
                .person_content {
                  box-sizing: border-box;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
