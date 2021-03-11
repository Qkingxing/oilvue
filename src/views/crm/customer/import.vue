<template>
  <a-layout>
    <ImportCreat v-if="$route.query.isCreate == 1"/>
    <a-layout-content
      v-else
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title">
        客户导入
      </div>
      <div class="actionBtns">
        <router-link :to="{ path: '/crm/customer/import',query:{ isCreate: 1 } }">
          <a-button type="primary"> 导入 </a-button>
        </router-link>
        
      </div>

      <!-- 表格 -->
      <div class="showDataForTable">
        <s-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData">
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="delTag(record)">下载错误数据</a><br>
              <a @click="delTag(record)">撤回</a>
            </template>
          </span>
        </s-table>
      </div>
    </a-layout-content>
    
  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'
import { getImportlist } from '@/api/crm'

export default {
  name: 'Import',
  components: {
    STable,
    ImportCreat: ()=>import('./import/creat')
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '文件名称',
          dataIndex: 'report_name'
        },
        {
          title: '操作人',
          dataIndex: 'userId'
        },
        {
          title: '成功数',
          dataIndex: 'status',
        },
        {
          title: '失败数',
          dataIndex: 'time',
        },
        {
          title: '总积分',
          // dataIndex: 'status',
        },
        {
          title: '总余额',
          // dataIndex: 'status',
        },
        {
          title: '加油卡名称',
          // dataIndex: 'status',
        },
        {
          title: '导入状态',
          // dataIndex: 'status',
        },
        {
          title: '导入时间',
          dataIndex: 'generate_time',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        let params = {
          page: parameter.pageNo, // 页码
          limit: parameter.pageSize, // 每页页数
        }

        return getImportlist(Object.assign(params))
        .then((res)=>{
          // 自定义出参
          // console.log(res.data)
          return {
            data: res.data, // 列表数组
            pageNo: parameter.pageNo,  // 当前页码
            pageSize: parameter.pageSize,  // 每页页数
            totalCount: res.pageSize, // 列表总条数
            totalPage: res.countPage // 列表总页数
          }
        })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  created () {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  methods: {
    delTag () {
      this.$confirm({
        title: '操作提示',
        content: '撤回后将删除本次导入的客户数据，用户已授权的数据不会删除，请确认是否继续',
        onOk () {
          return new Promise((resolve, reject) => {
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log()
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
<style lang="less" scoped>
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}

.actionBtns {
  display: flex;
  align-items: center;
  margin: 16px 0;
  button {
    margin-right: 8px;
  }
}
.screen-box {
  padding: 27px 0 24px 0;
  .screen-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: #040a46;
  }
}
.search-btn {
  margin-left: 72px;
  margin-top: 8px;
}
.showDataForTable {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 60px;
  overflow: hidden;
  .showSearchAndTotal {
    height: 63px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #040a46;
    line-height: 24px;
    padding: 23px 0 16px 0;
  }
  .dec {
    color: #3c3c46;
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
  }
}
.themeColor {
  color: #3b85ff;
}
.select-all {
  margin-left: 16px;
  cursor: pointer;
}
</style>
