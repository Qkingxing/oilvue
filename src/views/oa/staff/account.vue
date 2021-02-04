
<template>
  <div class="mainContainreBox">
    <div class="mainContainreBlock">
      <div class="container animated fadeIn">
        <div class="head-right-box">
          <a-button type="primary">新增账号</a-button>
          <a-input-search placeholder="请输入员工姓名/账号" v-model="input" style="width: 200px" @search="onSearch" />
        </div>
      </div>
      <div class="box">
      
        <!-- 表格 -->
        <div class="showDataForTable">
          <s-table
            ref="table"
            size="default"
            rowKey="id"
            :columns="columns"
            :data="loadData"
           
          >
            <span slot="update_time" slot-scope="text, record">
              <template>
                <p v-if="record.account_type == 0">集团账户</p>
				<p v-if="record.account_type == 1">单站账户</p>
				<p v-if="record.account_type == 2">片区账户</p>
              </template>
            </span>
			
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="delTag(record)">删除</a>
              </template>
            </span>
          </s-table>
        </div>

       <EditTag ref="EditTag" @save="resetList"></EditTag>
      </div>
	  
    </div>
	 
  </div>
</template>

<script>
import { userinfolist } from '@/api/work'
import { STable } from '@/components'
import EditTag from '../../crm/customer/components/EditTag'
export default {
  name: 'Account',
  components: {
    STable,
    EditTag,
  },
  data() {
    return {
      pageSize: 20,
      current: 4,
      visible: false,
      input: '',
      lists: {},
      num: {},
    
     
      columns: [
        {
          title: '账号',
          dataIndex: 'account',
        },
        {
          title: '员工姓名',
          dataIndex: 'user_name',
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
        },
        {
          title: '账号类型',
		  dataIndex: 'update_time',
		  scopedSlots: { customRender: 'update_time' },
		},
		 {
          title: '负责油站-员工角色',
          dataIndex: 'youzhan',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loadData: (parameter) => {
        let params = {
          page: parameter.pageNo, // 页码
		  size: parameter.pageSize, // 每页页数
		  account:this.input
        }
        return userinfolist(Object.assign(params)).then((res) => {
          console.log(res.data.data)
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
    }
  },
  created() {
    // this.list()
  },
  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log()
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetList() {
      this.$refs.table.refresh(true)
    },
    delTag() {
		this.$confirm({
        title: '温馨提示',
        content: '删除会清除标签全部信息，是否删除？',
        onOk () {
          return new Promise((resolve, reject) => {
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
	},
    // list(index) {
    //   if (index) {
    //     return userinfolist({ is_del: index }).then((res) => {
    //       this.lists = res.data.data
    // 	  console.log(this.lists)
    // 	  this.num = res.data
    //     })
    //   } else {
    //     return userinfolist({ account: this.input }).then((res) => {
    //       this.lists = res.data.data
    // 	  console.log(this.lists)
    // 	   this.num = res.data
    //     })
    //   }
    // },
    onSearch(value) {
      this.$refs.table.refresh(true)
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize)
    },
    // showModal(index) {
    //   this.lists[index].bull = false
    //   this.visible = true
    // },
    // handleOk(e) {
    //   this.list(1)
    //   this.visible = false
    // },
    // showConfirm(index, list) {
    //   this.lists[index].bull = false
    //   this.$confirm({
    //     title: '系统温馨提示',
    //     content: `请问是否删除${list.user_name}的账号`,
    //     onOk() {},
    //     onCancel() {
    //       console.log('Cancel')
    //     },
    //     class: 'test',
    //   })
    // },
  },
  watch: {
    pageSize(val) {
      console.log('pageSize', val)
    },
    current(val) {
      console.log('current', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.mainContainreBox {
  .mainContainreBlock {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 25px;
    background: #fff;
    min-width: 1004px;
    overflow: auto;
    .container {
      display: flex;
      flex: 1;
      height: 100%;
      padding-bottom: 0;
      .head-right-box {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin: 20px 0 20px auto;
      }
    }
    .box {
      width: 100%;
      .box_1 {
        display: flex;
        height: 54px;
        align-items: center;
        justify-content: space-between;
        background-color: #fafafa;
        border: 1px solid #e8e8e8;
        .a {
          padding-left: 30px;
          width: 180px;
        }
        .b {
          width: 164px;
          text-align: center;
        }
        .c {
          width: 214px;
          text-align: center;
        }
        .d {
          width: 163px;
          text-align: center;
        }
        .e {
          width: 278px;
          text-align: center;
        }
        .f {
          text-align: center;
          width: 112px;
        }
      }
      .box_2 {
        display: flex;
        height: 54px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e8e8e8;
        border-right: 1px solid #e8e8e8;
        border-left: 1px solid #e8e8e8;
        .a {
          padding-left: 30px;
          width: 180px;
        }
        .b {
          width: 164px;
          text-align: center;
        }
        .c {
          width: 214px;
          text-align: center;
        }
        .d {
          width: 163px;
          text-align: center;
        }
        .e {
          width: 278px;
          text-align: center;
        }
        .f {
          text-align: center;
          width: 112px;
          color: #37f;
          cursor: pointer;
        }
      }
      .box_3 {
        text-align: center;
        padding: 20px 0;
      }
    }
  }
}
</style>