<template>
  <s-table 
    ref="table" 
    rowKey="id" 
    :scroll="{ x: true }"
    :columns="columns" 
    :data="loadData">

    <span slot="type" slot-scope="text, record">
      <template>
        {{IntegralHistoryTypeText(text)}}
      </template>
    </span>
    <span slot="order_no" slot-scope="text, record">
      <template>
        <router-link :to="{path:'/oms/overview',query:{id:text}}">{{text}}</router-link>
      </template>
    </span>

  </s-table>
</template>

<script>
import { STable } from '@/components'
import { getUserAuthenticationHistory } from '@/api/crm'
import { IntegralHistoryType } from '@/utils/enums'

export default {
  name: 'AuthenticationHistory',
  components: {
    STable
  },
  data(){
    return {
      IntegralHistoryType,
      // 表头
      columns: [
        {
          title: '认证时间',
          dataIndex: 'create_time',
          fixed: 'left'
        },
        {
          title: '身份类型',
          dataIndex: 'identity_type',
          // scopedSlots: { customRender: 'zf_number' },
        },
        {
          title: '车辆类型',
          dataIndex: 'identity_id',
          // scopedSlots: { customRender: 'zf_number' },
        },
        {
          title: '车牌号',
          dataIndex: 'plate_number',
        },
        {
          title: '入口油站',
          dataIndex: 'site_name',
          fixed: 'right'
        },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        let params = {
          page: parameter.pageNo, // 页码
          limit: parameter.pageSize, // 每页页数
          id: this.$route.query.id
        }
        return getUserAuthenticationHistory(Object.assign(params)).then(res => {
          // 自定义出参
          console.log(res)

          return {
            data: res.data, // 列表数组
            pageNo: parameter.pageNo,  // 当前页码
            pageSize: parameter.pageSize,  // 每页页数
            totalCount: res.data.total, // 列表总条数
            totalPage: res.data.current_page // 列表总页数
          }
        })
      },
    }
  },
  created(){

  },
  methods: {
    IntegralHistoryTypeText(text){
      // console.log(text)
      let item = this.IntegralHistoryType.find(e=>{
        return e.value === text
      })
      // console.log(item)
      return item.label
    },
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