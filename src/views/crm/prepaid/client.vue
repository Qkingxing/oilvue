
<template>
  <a-layout>
    <a-layout-content
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title">
        加油卡客户
      </div>
      <div class="header-search">
        <div class="search-box">
          <div class="select-item">
            <div class="label">卡搜索</div>
            <a-input
              style="width: 100%"
              v-model="queryParam.keywords"
              placeholder="请输入搜索内容"
            >
              <a-select
                slot="addonBefore"
                style="width: 93px"
                default-value="86"
              >
                <a-select-option value="85"> 卡号 </a-select-option>
                <a-select-option value="86"> 卡面号 </a-select-option>
                <a-select-option value="87"> 手机号 </a-select-option>
              </a-select>
            </a-input>
          </div>
          <div class="select-item">
            <div class="label">卡类型</div>
            <a-select
              slot="addonBefore"
              style="width: 240px"
              default-value="86"
            >
              <a-select-option value="85"> 卡号 </a-select-option>
              <a-select-option value="86"> 卡面号 </a-select-option>
              <a-select-option value="87"> 手机号 </a-select-option>
            </a-select>
          </div>
          <div class="select-item">
            <div class="label">卡名称</div>
            <a-select
              slot="addonBefore"
              style="width: 240px"
              default-value="86"
            >
              <a-select-option value="85"> 卡号 </a-select-option>
              <a-select-option value="86"> 卡面号 </a-select-option>
              <a-select-option value="87"> 手机号 </a-select-option>
            </a-select>
          </div>
          <div class="select-item">
            <div class="label">开卡时间</div>
            <a-range-picker style="width: 240px"/>
          </div>
        </div>
        <div class="action-btns">
          <a-button type="primary" class="search-btn">查询</a-button>
          <a-button>导出</a-button>
        </div>
      </div>
      <div class="table-line">客户列表</div>

      <!-- 表格 -->
      <div class="showDataForTable">
        <s-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData">
          <span slot="action" slot-scope="text, record">
            <template>
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

export default {
  name: 'Client',
  components: {
    STable
  },
  data () {
    return {
      // 查询参数
      queryParam: {
        keywords: '',
        keyType: '86'
      },
      // 表头
      columns: [
        {
          title: '文件名称',
          dataIndex: 'no'
        },
        {
          title: '操作人',
          dataIndex: 'description'
        },
        {
          title: '成功数',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '失败数',
          dataIndex: 'time',
          needTotal: true
        },
        {
          title: '总积分',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '总余额',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '加油卡名称',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '导入状态',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '导入时间',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
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
  color: #1e1e28;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}
.header-search{
  background-color: #f5f5fa;
  padding: 18px 0 16px 0;
  .search-box{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .select-item{
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      .label{
        width: 80px;
        text-align: right;
        color: #1e1e28;
        margin-right: 16px;
      }
    }
  }
  .action-btns{
    display: flex;
    align-items: center;
    margin-left: 80px;
    margin-top: 12px;
    .search-btn{
      margin-right: 8px;
    }
  }
}
.table-line{
  margin: 16px 0 8px 0;
  font-size: 14px;
  font-weight: 500;
  color: #1e1e28;
  line-height: 20px;
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
    color: #1e1e28;
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
