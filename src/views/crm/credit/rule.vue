
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">
      <div class="addRuleBtn">
        <a-button type="primary">
          新增积分规则
        </a-button>
      </div>
      <a-tabs default-active-key="1" size="large" @change="onChangeTab">
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

import { getServiceList } from '@/api/manage'
import { getIntegralrulelist } from '@/api/crm'

export default {
  name: 'Rule',
  components: {
    STable
  },
  data () {
    return {
      type: 1,
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
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          type: this.type
        }
        return getIntegralrulelist(Object.assign(params)).then(res=>{
          console.log(res)
          // 自定义出参
          // console.log(res.data.list)
          this.oldTotal = res.data.totalCount
          return {
            data: res.data.list, // 列表数组
            pageNo: res.data.pageNo,  // 当前页码
            pageSize: res.data.pageSize,  // 每页页数
            totalCount: res.data.totalCount, // 列表总条数
            totalPage: res.data.totalPage // 列表总页数
          }
        })
      },

    }
  },
  created () {

  },
  methods: {
    onChangeTab(type){
      console.log(type)
    },

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
