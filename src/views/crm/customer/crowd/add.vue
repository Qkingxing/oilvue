
<template>
  <a-layout>
    <a-layout-content :style="{ margin: '24px 0', padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="head-title">
        <span>
          基础信息
        </span>
      </div>
      <div class="select-info">
        <div class="label">客群名称</div>
        <a-form layout="inline">
          <a-form-item>
            <a-input :maxLength="10" placeholder="请输入标签名称" style="width:300px;"/>
            <span style="margin-left: -45px; color: rgb(199, 199, 199); position: relative;">10/10</span>
          </a-form-item>
        </a-form>
      </div>
      <div class="select-info">
        <div class="label">
          客群类型&nbsp;
          <a-popover placement="rightTop">
            <template slot="content">
              <div>固定人群：创建分群后人群数量固定不变，只有手动刷新才会更新数据（数据截止到昨日24点)</div>
              <div>条件人群：创建分群后人群数量会自动更新（实时数据）</div>
            </template>
            <a-icon style="color: rgb(153, 153, 153);" type="question-circle" />
          </a-popover>
        </div>
        <a-radio-group name="radioGroup" :default-value="1" style="line-height: 40px;">
          <a-radio :value="1" style="margin-right: 70px;">
            固定人群
          </a-radio>
          <a-radio :value="2">
            条件人群
          </a-radio>
        </a-radio-group>
      </div>
      <div class="head-title" style="margin-top: 20px;"><span>筛选条件</span></div>

      <div class="table-header">
        <div class="sub-title">客群信息</div>
        <div class="searchBox">
          <a-input-search placeholder="请输入手机号/客户编号" style="width: 200px" />
        </div>
      </div>

      <!-- 表格 -->
      <div class="showDataForTable">
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadData"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="delTag(record)">删除</a>
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
  name: 'CrmCrowdAdd',
  components: {
    STable
  },
  data () {
    return {
      // 查询参数
      queryParam: { },
      // 表头
      columns: [
        {
          title: '标签名称',
          dataIndex: 'no'
        },
        {
          title: '人数',
          dataIndex: 'description'
        },
        {
          title: '应用活动（次）',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '创建时间',
          dataIndex: 'time',
          needTotal: true
        },
        {
          title: '标签数据更新时间',
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
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
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
    showEditTag (type) {

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

.head-title{
  font-size: 14px;
  line-height: 44px;
  font-weight: 500;
  border-bottom: 1px solid #eaeaf4;
  margin-bottom: 24px;
  margin-top: 8px;
}
.select-info{
  display: flex;
  margin-bottom: 16px;
  .label{
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    margin-right: 20px;
    color: #1e1e28;
    font-size: 14px;
  }
}
.table-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 16px;
  .sub-title{
    color: #1e1e28;
    font-weight: 500;
  }
  .searchBox{
    display: flex;
    align-items: center;
  }
}
.showDataForTable{
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 60px;
  overflow: hidden;
  .showSearchAndTotal{
    height: 63px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{
    font-size: 16px;
    font-weight: 500;
    color: #1e1e28;
    line-height: 24px;
    padding: 23px 0 16px 0;
  }
  .dec{
    color: #3c3c46;
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
  }
}
.themeColor{
  color: #3b85ff;
}
.select-all{
  margin-left: 16px;
  cursor: pointer;
}

</style>
