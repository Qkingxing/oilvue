<template>
  <s-table 
    ref="table" 
    rowKey="id" 
    :scroll="{ x: true }"
    :columns="columns" 
    :data="loadData">
    <span slot="zf_number" slot-scope="text, record">
      <template>
        <router-link :to="{path:'/oms/overview',query:{id:text}}">{{text}}</router-link>
      </template>
    </span>
    <span slot="product_type" slot-scope="text, record">
      <template>
        {{text==1?'油品':'商品'}}
      </template>
    </span>
    <span slot="order_status" slot-scope="text, record">
      <template>
        {{orderStatusText(text)}}
      </template>
    </span>
  </s-table>
</template>

<script>
import { STable } from '@/components'
import { getUserConsumptionHistory } from '@/api/crm'
import { orderStatus } from '@/utils/enums'

export default {
  name: 'ConsumptionHistory',
  components: {
    STable
  },
  data(){
    return {
      orderStatus,
      // 表头
      columns: [
        {
          title: '订单号',
          dataIndex: 'zf_number',
          scopedSlots: { customRender: 'zf_number' },
          fixed: 'left'
        },
        {
          title: '订单时间',
          dataIndex: 'create_time'
        },
        {
          title: '订单类型',
          dataIndex: 'product_type',
          scopedSlots: { customRender: 'product_type' },
        },
        {
          title: '订单状态',
          dataIndex: 'order_status',
          scopedSlots: { customRender: 'order_status' },
        },
        {
          title: '油品升数',
          dataIndex: 'order_liter'
        },
        {
          title: '应付金额',
          dataIndex: 'order_total'
        },
        {
          title: '优惠金额',
          dataIndex: 'count_discount'
        },
        {
          title: '实付金额',
          dataIndex: 'actually_paid'
        },
        // {
        //   title: '加油卡余额',
        //   // dataIndex: 'status'
        // },
        // {
        //   title: '可用积分',
        //   // dataIndex: 'status'
        // },
        // {
        //   title: '会员等级',
        //   dataIndex: 'watch',
        // },
        // {
        //   title: '消费油站',
        //   dataIndex: 'action',
        //   fixed: 'right'
        // }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        let params = {
          page: parameter.pageNo, // 页码
          limit: parameter.pageSize, // 每页页数
          user_id: this.$route.query.id
        }
        return getUserConsumptionHistory(Object.assign(params)).then(res => {
          // 自定义出参
          console.log(res.data)

          return {
            data: res.data, // 列表数组
            pageNo: parameter.pageNo,  // 当前页码
            pageSize: parameter.pageSize,  // 每页页数
            totalCount: res.countPage, // 列表总条数
            totalPage: res.data.pageSize // 列表总页数
          }
        })
      },
    }
  },
  created(){

  },
  methods: {
    orderStatusText(text){
      // console.log(text)
      let item = this.orderStatus.find(e=>{
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