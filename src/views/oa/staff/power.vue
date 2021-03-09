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
            <a-modal width="1300px" v-model="modal2Visible" centered @ok="() => (modal2Visible = false)" :footer="null">
              <div class="fom">
                <div
                  class="fom_a"
                  style="width: 100%; display: flex; justify-content: space-between; margin-bottom: 15px"
                >
                  <div class="fom-a1" style="width: 150px; display: flex; justify-content: space-between">
                    <a-button>全选</a-button>
                    <a-button>删除</a-button>
                  </div>
                  <div style="width: 260px; margin-right: 60px">
                    <a-input style="height: 40px" placeholder="请输入员工姓名/账号" />
                  </div>
                </div>

                <div class="showDataForTable">
                  <s-table
                    ref="table"
                    size="default"
                    rowKey="id"
                    :columns="columns"
                    :data="loadData"
                    :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                  >
                    <span slot="name" slot-scope="text, record">
                      <template>
                        <router-link :to="{ name: 'CrmTagDetail', query: { id: record.id } }">{{ text }}</router-link>
                      </template>
                    </span>

                    <span slot="action" slot-scope="text, record">
                      <template>
                        <a @click="delTag(record)">删除</a>
                      </template>
                    </span>
                  </s-table>
                </div>
                <div style="width: 100px; margin: 20px auto">
                  <a-button>取消</a-button>
                </div>
              </div>
            </a-modal>
            <div class="contentBlock">
              <div class="contentMain">
                <div class="roles" v-for="(list, index) in lists" :key="index">
                  <template>
                    <a-card hoverable style="width: 300px; margin: 10px 10px">
                      <a style="padding-left: 190px; display: block; margin-top: -14px; color: #37f">修改权限</a>
                      <div style="display: flex; flex-direction: column">
                        <div style="margin: 32px auto">
                          <div style="width: 50px; height: 50px; margin: 0 auto; border-radius: 30px">
                            <img :src="list.role_image" alt="" style="width: 50px; height: 50px; border-radius: 30px" />
                          </div>
                          <div style="margin: 20px 0 30px 0; text-align: center">{{ list.role_name }}</div>
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
                          <span @click="showModal(list.id)" style="color: #37f">详情</span>
                          <a-modal :mask="datas" v-model="modal2Visibles" centered :footer="null">
                            <a-tree
                              v-model="checkedKeys"
                              checkable
                              :expanded-keys="expandedKeys"
                              :auto-expand-parent="autoExpandParent"
                              :selected-keys="selectedKeys"
                              :tree-data="treeDatas"
                              :replaceFields="{ children: 'treeList', title: 'menu_title_code', key: 'menu_id' }"
                              @expand="onExpand"
                              @select="onSelect"
                            />
                          </a-modal>
                        </p>
                        <p>角色列表<a @click="xiang" style="color: #37f">详情</a></p>
                      </div>
                    </a-card>
                  </template>
                </div>
                <a-card hoverable style="width: 300px; margin: 10px 10px">
                  <div style="display: flex; flex-direction: column">
                    <div @click="tianjia" style="margin: 32px auto">
                      <a-icon style="font-size: 60px; color: #c7c7c7; cursor: pointer; margin: 35px 0" type="plus" />
                      <div style="margin: 20px 0 30px 0; text-align: center"></div>
                    </div>
                  </div>

                  <div style="margin-bottom: 60px">
                    <span>配置自定义角色，并在该角色下配置员工账号，灵活管理员工账号权限</span>
                  </div>

                  <div style="display: flex; justify-content: space-between">
                    <a-button @click="tianjia" style="margin: auto 75px 4px">添加角色</a-button>
                  </div>
                </a-card>
                <a-modal
                  width="1300px"
                  v-model="modal2Visible1"
                  centered
                  :footer="null"
                  @ok="() => (modal2Visible = false)"
                >
                  <div style="width: 1000px; margin: 0 auto; display: flex">
                    <p style="width: 100px; padding-top: 5px">角色名称</p>
                    <a-input v-model="input" placeholder="" />
                  </div>
                  <div style="width: 1000px; margin: 0 auto; display: flex; margin-top: 20px">
                    <p style="width: 100px; padding-top: 5px">选择权限</p>
                    <div style="width: 950px">
                      <div>
                    
                      </div>
                    </div>
                  </div>
                  <div style="width: 1000px; margin: 0 auto; display: flex; margin-top: 20px">
                    <p style="width: 100px; padding-top: 5px">权限说明</p>
                    <a-textarea v-model="value" placeholder="请输入权限说明" :auto-size="{ minRows: 3, maxRows: 5 }" />
                  </div>
                  <div style="width: 200px; margin: 40px auto">
                    <a-button type="primary" @click="yes"> 确定 </a-button>
                    <a-button style="margin-left: 20px" @click="no">取消</a-button>
                  </div>
                </a-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const treeDatas = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
]

import { rolemenu } from '@/api/work'
import { rolelist } from '@/api/work'
import { STable } from '@/components'
import { rolesave } from '@/api/work'
import { groupmenulistt } from '@/api/work'
import { getlabellist, labeldel } from '@/api/crm'
export default {
  name: 'Operformance',
  components: {
    STable,
  },
  data() {
    return {
      obj: {},
      expandedKeys: ['数据'],
      autoExpandParent: false,
      checkedKeys: [],
      selectedKeys: [],
      treeDatas,
      datas: false,
      modal2Visibles: false,
      input: '',
      value: '',
      modal2Visible1: false,
      selectedRowKeys: [],
      selectedRows: [],
      // 表头
      columns: [
        {
          title: '员工姓名',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '账号',
          dataIndex: 'count',
        },
        {
          title: '账号类型',
          dataIndex: 'create_time',
        },
        {
          title: '角色权限',
          dataIndex: 'update_time',
        },
        {
          title: '所属油站',
          dataIndex: 'youzhan',
        },
        {
          title: '绑定时间',
          dataIndex: 'time',
        },
        {
          title: '操作',
          dataIndex: '操作',
        },

        // {
        //   title: '所属油站',
        //   dataIndex: 'action',
        //   scopedSlots: { customRender: 'action' },
        // },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        // console.log('loadData.parameter', parameter)
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
        }
        return getlabellist(Object.assign(params)).then((res) => {
          // 自定义出参
          // console.log(res.data.list)
          this.oldTotal = res.data.total
          return {
            data: res.data.data, // 列表数组
            pageNo: res.data.current_page, // 当前页码
            pageSize: res.data.per_page, // 每页页数
            totalCount: res.data.total, // 列表总条数
            // totalPage: res.data.totalPage // 列表总页数
          }
        })
      },
      lists: {},
      imgs: '',
      modal2Visible: false,
    }
  },
  created() {
    this.rolelist()
  },
  computed: {
    // treeData() {
    //     get:function(){
    //     }
    //   return handleTreeData(treeData, this.targetKeys)
    // },
  },
  watch: {
    checkedKeys1(val) {
      console.log('onCheck', val)
    },
  },
  methods: {
    showModal(id) {
      return rolemenu({ role_id: id }).then((res) => {
        this.treeDatas = res.data
        console.log(res.data)

        this.modal2Visibles = true
      })
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },

    onCheck(checkedKeys1) {
      console.log(111)
      this.checkedKeys1 = checkedKeys1
    },
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },

    

    yes() {
      let data = {
        id: '',
        role_name: this.input,
        introduce: this.value,
        menu: '',
      }
      return rolesave(data).then((res) => {
        console.log(res)
      })
    },
    no() {
      this.modal2Visible1 = false
    },
    tianjia() {
      return groupmenulistt({}).then((res) => {
        console.log(res.data.data)
        // this.treeData = res.data.data
        this.modal2Visible1 = true
      })
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    delTag(item) {
      let that = this
      this.$confirm({
        title: '温馨提示',
        content: '删除会清除标签全部信息，是否删除？',
        onOk() {
          // console.log(item)
          labeldel([item.id]).then((res) => {
            // console.log(res)
            that.$message.success('删除成功')
            that.resetList()
          })
        },
        onCancel() {},
      })
    },
    xiang() {
      this.modal2Visible = true
    },
    a() {
      console.log(111)
    },

    rolelist() {
      return rolelist({}).then((res) => {
        this.lists = res.data.data
        console.log(this.lists)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.tree-transfer .ant-transfer-list:first-child {
  width: 50%;
  flex: none;
}
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
          /deep/.ant-modal {
            width: 1300px;
          }
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
