
<template>
  <a-layout>
    <a-layout-content :style="{ margin: '24px 0', padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">
      <div class="addRuleBtn">
        <a-button type="primary">
          新增积分规则
        </a-button>
      </div>
      <a-tabs default-active-key="1" size="large">
        <a-tab-pane key="1" tab="进行中">
          <s-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns"
            :data="loadData"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="delTag(record)">撤回</a>
              </template>
            </span>
          </s-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="待开始">
          <s-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns"
            :data="loadData"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="delTag(record)">撤回</a>
              </template>
            </span>
          </s-table>
        </a-tab-pane>
        <a-tab-pane key="3" tab="已结束">
          <s-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns"
            :data="loadData"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="delTag(record)">撤回</a>
              </template>
            </span>
          </s-table>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>

  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'

export default {
  name: 'rule',
  components: {
    STable
  },
  data () {
    return {
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
    }
  }
}
</script>
<style lang="less" scoped>
.addRuleBtn{
  position: absolute;
  right: 24px;
  top: 12px;
  z-index: 70;
}
</style>
