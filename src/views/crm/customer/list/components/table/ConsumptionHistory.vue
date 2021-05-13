<template>
  <s-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData">
    <span slot="watch" slot-scope="text, record">
      <template>
        <a @click="delTag(record)">认证列表</a>
        <a-divider type="vertical" />
        <a @click="delTag(record)">用户列表</a>
      </template>
    </span>
    <span slot="action" slot-scope="text, record">
      <template>
        <a @click="delTag(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="delTag(record)">删除</a>
        <a-divider type="vertical" />
        <a @click="delTag(record)">下载等级码</a>
      </template>
    </span>
  </s-table>
</template>

<script>
import { STable } from '@/components'
import { getServiceList } from '@/api/manage'

export default {
  name: 'ConsumptionHistory',
  components: {
    STable
  },
  data(){
    return {
      // 表头
      columns: [
        {
          title: '等级模板',
          dataIndex: 'no'
        },
        {
          title: '等级名称',
          dataIndex: 'description'
        },
        {
          title: '生效油站',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '等级优惠',
          dataIndex: 'time',
          needTotal: true
        },
        {
          title: '等级有效期',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '最近修改人',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '查看',
          dataIndex: 'watch',
          scopedSlots: { customRender: 'watch' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
    }
  },
  created(){

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
  }
}
</script>

<style lang="less" scoped>

</style>