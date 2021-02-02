
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="head-title">
        <span>
          标签详情&nbsp;
          <a-popover placement="rightTop">
            <template slot="content">
              <div>标签数据每小时更新一次)</div>
            </template>
            <a-icon style="color: rgb(153, 153, 153);" type="question-circle" />
          </a-popover>
        </span>
        <a-button> 返回上一页 </a-button>
      </div>
      <div class="label-info">
        <div class="info-item">
          <div class="title">标签名称</div>
          <div class="content">测试</div>
          <a>修改名称</a>
        </div>
        <div class="info-item">
          <div class="title">客户人数</div>
          <div class="content">0</div>
        </div>
        <div class="info-item">
          <div class="title">应用活动</div>
          <div class="content">-</div>
        </div>
      </div>
      <div class="table-title">客户列表</div>

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
    <EditTag ref="EditTag"></EditTag>
  </a-layout>
</template>

<script>
import { STable } from '@/components'
import EditTag from '../components/EditTag'
import { getRoleList, getServiceList } from '@/api/manage'

export default {
  name: 'CrmTagDetail',
  components: {
    STable,
    EditTag
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
      this.$refs['EditTag'].show(type)
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
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.label-info{
  margin-bottom: 40px;
  .info-item{
    display: flex;
    line-height: 40px;
    position: relative;
    .title{
      width: 76px;
      text-align: right;
      color: #3c3c46;
      margin-right: 24px;
    }
    .content{
      color: #040a46;
      margin-right: 24px;
    }
  }
}
.table-title{
  font-size: 16px;
  color: #040a46;
  margin-bottom: 16px;
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
    color: #040a46;
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
