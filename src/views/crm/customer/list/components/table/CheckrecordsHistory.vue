<template>
  <s-table 
    ref="table" 
    rowKey="id" 
    :scroll="{ x: true }"
    :columns="columns" 
    :data="loadData">

    <span slot="type" slot-scope="text, record">
      <template>
        {{text==1?'充值':'消费'}}
      </template>
    </span>
    <span slot="order_status" slot-scope="text, record">
      <template>
        {{orderStatusText(text)}}
      </template>
    </span>

    <!-- <span slot="identity_type" slot-scope="text, record">
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
    </span> -->

  </s-table>
</template>

<script>
import { STable } from '@/components'
import { getUserCheckrecordsHistory } from '@/api/crm'
import { orderStatus } from '@/utils/enums'

export default {
  name: 'CheckrecordsHistory',
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
          dataIndex: 'order_no',
          fixed: 'left'
        },
        {
          title: '订单时间',
          dataIndex: 'create_time',
          // scopedSlots: { customRender: 'identity_type' },
        },
        {
          title: '类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' },
        },
        {
          title: '应付金额',
          dataIndex: 'y_pay_money',
        },
        {
          title: '实付金额',
          dataIndex: 's_pay_money',
        },
        {
          title: '减免方式',
          dataIndex: 'jm_type',
        },
        {
          title: '优惠金额',
          dataIndex: 'jm_money',
        },
        {
          title: '支付方式',
          dataIndex: 'pay_type_time',
        },
        {
          title: '支付状态',
          dataIndex: 'order_status',
          scopedSlots: { customRender: 'order_status' },
          fixed: 'right'
        },
        
        // {
        //   title: '充值金额',
        //   // dataIndex: 'plate_number',
        // },
        // {
        //   title: '赠送金额',
        //   // dataIndex: 'plate_number',
        // },
        // {
        //   title: '积分抵扣',
        //   // dataIndex: 'plate_number',
        // },
        // {
        //   title: '消费金额',
        //   // dataIndex: 'plate_number',
        // },
        // {
        //   title: '消费订单优惠金额',
        //   // dataIndex: 'plate_number',
        // },
        // {
        //   title: '余额',
        //   // dataIndex: 'plate_number',
        // },
        // {
        //   title: '加油卡号',
        //   // dataIndex: 'plate_number',
        // },
        // {
        //   title: '关联油站',
        //   dataIndex: 'site_name',
        //   fixed: 'right'
        // },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          user_id: this.$route.query.id
        }
        return getUserCheckrecordsHistory(Object.assign(params)).then(res => {
          // 自定义出参
          // console.log(res.data.data)

          return {
            data: res.data.data, // 列表数组
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
    orderStatusText(text){
      // console.log(text)
      let item = this.orderStatus.find(e=>{
        return e.value === Number(text)
      })
      // console.log(item)
      if (item) {
        return item.label
      }else{
        return '-'
      }
      
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