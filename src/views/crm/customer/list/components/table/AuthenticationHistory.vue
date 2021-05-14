<template>
  <s-table 
    ref="table" 
    rowKey="id" 
    :scroll="{ x: true }"
    :columns="columns" 
    :data="loadData">

    <span slot="identity_type" slot-scope="text, record">
      <template>
        {{identity_typesText(text)}}
      </template>
    </span>
    <span slot="identity_id" slot-scope="text, record">
      <template>
        {{identitySelectText(text)}}
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
import { identitySelect,identity_types } from '@/utils/enums'

export default {
  name: 'AuthenticationHistory',
  components: {
    STable
  },
  data(){
    return {
      identitySelect,
      identity_types,
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
          scopedSlots: { customRender: 'identity_type' },
        },
        {
          title: '车辆类型',
          dataIndex: 'identity_id',
          scopedSlots: { customRender: 'identity_id' },
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
            totalCount: res.countPage, // 列表总条数
            totalPage: res.pageSize // 列表总页数
          }
        })
      },
    }
  },
  created(){

  },
  methods: {
    identity_typesText(text){
      // console.log(text)
      let item = this.identity_types.find(e=>{
        return e.value === Number(text)
      })
      // console.log(item)
      return item.label
    },
    identitySelectText(text){
      // console.log(text)
      let item = this.identitySelect.find(e=>{
        return e.value === Number(text)
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