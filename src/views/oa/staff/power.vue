<template>
  <div class="mainContainreBox">
    <div class="mainContainreBlock">
      <div class="container">
        <div class="group">
          <div class="title_model">
            <div class="main_label">员工角色操作权限管理</div>
            <span>根据员工的职能为账号赋予角色属性，根据角色进行权限设置，点击可查看</span>
            <a>员工列表</a>
          </div>
          <div class="content">
            <a-modal width="1300px" v-model="modal2Visible" centered :footer="null">
              <div class="fom">
                <div
                  class="fom_a"
                  style="width: 100%; display: flex; justify-content: space-between; margin-bottom: 15px"
                >
                  <div class="fom-a1" style="width: 150px; display: flex; justify-content: space-between">
                    <!-- <a-button>全选</a-button> -->
                    <!-- <a-button>删除</a-button> -->
                  </div>
                  <div style="width: 260px; margin-right: 60px">
                    <a-input style="height: 40px" v-model="account" placeholder="请输入员工姓名/账号" />
                  </div>
                </div>

                <div class="showDataForTable">
                  <s-table
                    v-if="modal2Visible"
                    ref="table"
                    size="default"
                    rowKey="id"
                    :columns="columns"
                    :data="loadData"
                    :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                  >
                  <span slot="account_type" slot-scope="text, record">
                    <span v-if="text == 0">集团账号</span>
                    <span v-if="text == 1">单站账号</span>
                    <span v-if="text == 2">片区账号</span>
                  </span>
                    
                    <span slot="action" slot-scope="text, record">
                      <template>
                        <a @click="delTag(record)">删除</a>
                      </template>
                    </span>
                  </s-table>
                </div>
                <div style="width: 100px; margin: 20px auto">
                  <a-button @click="modal2Visible = false">取消</a-button>
                </div>
              </div>
            </a-modal>
            <div class="contentBlock">
              <div class="contentMain">
                <div class="roles" v-for="(list, index) in lists" :key="index">
                  <template>
                    <a-card hoverable style="width: 300px; margin: 10px 10px">
                      <a @click="toModify(list)" style="padding-left: 190px; display: block; margin-top: -14px; color: #7C7EE2">修改权限</a>
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
                        <p>该角色目前已配置{{list.count}}个账号</p>
                      </div>

                      <div style="display: flex; justify-content: space-between">
                        <p>
                          角色权限
                          <span @click="showModal(list.id)" style="color: #7C7EE2">详情</span>
                          <a-modal :mask="datas" v-model="modal2Visibles" centered :footer="null">
                            <a-tree
                               :selectable="false"
                               v-model="modifyCheckKey"
                               checkable
                               :expanded-keys="expandedKeys1"
                               :auto-expand-parent="autoExpandParent"
                               :selected-keys="selectedKeys"
                               :tree-data="treeDatas1"
                               :replaceFields="{ children: 'treeList', title: 'menu_name', key: 'id' }"
                               @expand="onExpands"
                             />	
                          </a-modal>
                        </p>
                        <p>角色列表<a @click="roleInfo(list)" style="color: #7C7EE2">详情</a></p>
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
                    <span style="white-space:pre-wrap">配置自定义角色，并在该角色下配置员工账号，灵活管理员工账号权限</span>
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
                         <a-tree
                            v-model="checkedKeys1"
                            checkable
                            :expanded-keys="expandedKeys1"
                            :auto-expand-parent="autoExpandParent"
                            :selected-keys="selectedKeys"
                            :tree-data="treeDatas1"
                            :replaceFields="{ children: 'treeList', title: 'menu_name', key: 'id' }"
                            @expand="onExpands"
                            @select="onSelect"
                          />	
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
                <a-modal
                  width="1300px"
                  v-model="modifyVisible"
                  centered
                  :footer="null"
                  @ok="() => (modifyVisible = false)"
                >
                  <div style="width: 1000px; margin: 0 auto; display: flex">
                    <p style="width: 100px; padding-top: 5px">角色名称</p>
                    <a-input v-model="modifyInput" placeholder="" />
                  </div>
                  <div style="width: 1000px; margin: 0 auto; display: flex; margin-top: 20px">
                    <p style="width: 100px; padding-top: 5px">选择权限</p>
                    <div style="width: 950px">
                      <div>
                         <a-tree
                            v-model="modifyCheckKey"
                            checkable
                            :expanded-keys="expandedKeys1"
                            :auto-expand-parent="autoExpandParent"
                            :selected-keys="selectedKeys"
                            :tree-data="treeDatas1"
                            :replaceFields="{ children: 'treeList', title: 'menu_name', key: 'id' }"
                            @expand="onExpands"
                            @select="onSelect"
                          />	
                      </div>
                    </div>
                  </div>
                  <div style="width: 1000px; margin: 0 auto; display: flex; margin-top: 20px">
                    <p style="width: 100px; padding-top: 5px">权限说明</p>
                    <a-textarea v-model="modifyPermission" placeholder="请输入权限说明" :auto-size="{ minRows: 3, maxRows: 5 }" />
                  </div>
                  <div style="width: 200px; margin: 40px auto">
                    <a-button type="primary" @click="modifySubmit()"> 确定 </a-button>
                    <a-button style="margin-left: 20px" @click="modifyVisible = false">取消</a-button>
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


const treeDatas1 = [
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

import { rolemenu,getRoleDetail,modifyRole } from '@/api/work'
import { rolelist } from '@/api/work'
import { STable } from '@/components'
import { rolesave } from '@/api/work'
import { groupmenulistt, userinfolist } from '@/api/work'
import { getlabellist, labeldel } from '@/api/crm'
import { isEmpty } from '@/utils/lzz.js'
export default {
  name: 'Operformance',
  components: {
    STable,
  },
  data() {
    return {
      obj: {},
      powerId:'',
      account:'',
      expandedKeys: ['数据'],
      expandedKeys1:[],
      autoExpandParent: false,
      modifyVisible:false,
      checkedKeys: [],
      checkedKeys1:[],
      selectedKeys: [],
      modifyCheckKey:[],
      modifyInput:'',
      modifyPermission:'',
      treeDatas,
      treeDatas1,
      datas: false,
      modal2Visibles: false,
      input: '',
      value: '',
      groupId:'',
      siteId:'',
      modal2Visible1: false,
      selectedRowKeys: [],
      selectedRows: [],
      defaultProps: {
        children: 'treeList',
        label: 'menu_title_code'
      },
      // 表头
      columns: [
        {
          title: '员工姓名',
          dataIndex: 'user_name',
        },
        {
          title: '账号',
          dataIndex: 'account',
        },
        {
          title: '账号类型',
          dataIndex: 'account_type',
          scopedSlots: { customRender: 'account_type' },
        },
        {
          title: '角色权限',
          dataIndex: 'role_name',
        },
        {
          title: '所属油站',
          dataIndex: 'youzhan',
        },
        {
          title: '绑定时间',
          dataIndex: 'create_time',
        },
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   scopedSlots: { customRender: 'action' }
        // }
       
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        let params = {
          account:this.account,
          role_id:this.powerId,
          group_id:this.groupId,
          site_id:this.siteId,
          page: 1, // 页码
          size: 10, // 每页页数
        }
        return userinfolist(Object.assign(params)).then((res) => {
          return {
            data: res.data.data, // 列表数组
            pageNo: res.data.current_page, // 当前页码
            pageSize: res.data.per_page, // 每页页数
            totalCount: res.data.total, // 列表总条数
            totalPage: res.data.last_page // 列表总页数
          }
        })
      },
      lists: {},
      imgs: '',
      modal2Visible: false,
      arrs:[],
    }
  },
  created() {
    this.rolelist()
    this.loadTree()
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
      this.arrs = val
    },
    account(val){
      this.$refs.table.refresh()
    }
  },
  methods: {
    modifySubmit(){
      let _obj={
        id:this.powerId,	
        role_name:this.modifyInput,
        introduce:this.modifyPermission,
        menu:this.modifyCheckKey
      }
      modifyRole(_obj).then(res=>{
        this.$message.success('修改成功')
        this.modifyVisible = false;
        this.powerId = '';
        this.modifyInput = '';
        this.modifyPermission = '';
        this.modifyCheckKey = [];
        this.rolelist()
      })
    },
    roleInfo(item){
      this.groupId = item.group_id
      this.siteId = item.site_id
      this.powerId = item.id
      this.modal2Visible = true
    },
    loadTree(){
      groupmenulistt({}).then((res) => {
        this.treeDatas1 = res.data.data
      })
    },
    toModify(item){
      getRoleDetail({ id: item.id }).then(res=>{
        this.powerId = res.data.id
        this.modifyInput = res.data.role_name
        this.modifyPermission = res.data.introduce
      })
      rolemenu({ role_id: item.id }).then(res=>{
        this.modifyCheckKey = []
        for(let i in res.data){
          if(res.data[i].checked == 1){
            for(let j in res.data[i].treeList){
              for(let m in res.data[i].treeList[j].treeList){
                this.modifyCheckKey.push(res.data[i].treeList[j].treeList[m].menu_id)
              }
              if(!res.data[i].treeList[j].treeList){
                this.modifyCheckKey.push(res.data[i].treeList[j].menu_id)
              }
            }
          }else{
            for(let j in res.data[i].treeList){
              if(res.data[i].treeList[j].checked == 1){
                for(let m in res.data[i].treeList[j].treeList){
                  this.modifyCheckKey.push(res.data[i].treeList[j].treeList[m].menu_id)
                }
              }else{
                for(let m in res.data[i].treeList[j].treeList){
                  if(res.data[i].treeList[j].treeList[m].checked==1){
                    this.modifyCheckKey.push(res.data[i].treeList[j].treeList[m].menu_id)
                  }
                }
              }
            }
          }
        }
      })
      console.log(this.modifyCheckKey)
      this.modifyVisible = true;
    },
    showModal(id) {
      rolemenu({ role_id: id }).then((res) => {
        this.modifyCheckKey = []
        for(let i in res.data){
          if(res.data[i].checked == 1){
            for(let j in res.data[i].treeList){
              for(let m in res.data[i].treeList[j].treeList){
                this.modifyCheckKey.push(res.data[i].treeList[j].treeList[m].menu_id)
              }
              if(!res.data[i].treeList[j].treeList){
                this.modifyCheckKey.push(res.data[i].treeList[j].menu_id)
              }
            }
          }else{
            for(let j in res.data[i].treeList){
              if(res.data[i].treeList[j].checked == 1){
                for(let m in res.data[i].treeList[j].treeList){
                  this.modifyCheckKey.push(res.data[i].treeList[j].treeList[m].menu_id)
                }
              }else{
                for(let m in res.data[i].treeList[j].treeList){
                  if(res.data[i].treeList[j].treeList[m].checked==1){
                    this.modifyCheckKey.push(res.data[i].treeList[j].treeList[m].menu_id)
                  }
                }
              }
            }
          }
        }
        this.treeDatas = res.data;
        this.modal2Visibles = true;
      })
    },
    onSelect(selectedKeys, info) {
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
	onExpands(expandedKeys) {
      // or, you can remove all expanded children keys.
      this.expandedKeys1 = expandedKeys
      this.autoExpandParent = false
    },
    yes() {
      let data = {
        role_name: this.input,
        introduce: this.value,
        menu: this.arrs,
        role_image:'https://oilphp.ldyxx.com/images/fc58b4c0f928a76b797c5c687ea8fbdf.png'
      }
      return rolesave(data).then((res) => {
      this.rolelist()
      this.modal2Visible1 = false
      })
    },
    no() {
      this.modal2Visible1 = false
    },
    tianjia() {
      this.modal2Visible1 = true
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
