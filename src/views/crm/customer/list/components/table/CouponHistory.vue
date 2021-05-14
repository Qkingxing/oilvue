<template>
  <s-table 
    ref="table" 
    rowKey="id" 
    :scroll="{ x: true }"
    :columns="columns" 
    :data="loadData">

    <span slot="zf_type" slot-scope="text, record">
      <template>
        {{text==1?'未使用':'使用'}}
      </template>
    </span>
    <span slot="volume_type" slot-scope="text, record">
      <template>
        {{text==1?'油品券':'商品券'}}
      </template>
    </span>
    <span slot="way_type" slot-scope="text, record">
      <template>
        {{way_typeText(text)}}
      </template>
    </span>
  </s-table>
</template>

<script>
import { STable } from '@/components'
import { getUserCouponHistory } from '@/api/crm'
import { orderStatus, way_type } from '@/utils/enums'

export default {
  name: 'CouponHistory',
  components: {
    STable
  },
  data(){
    return {
      orderStatus,
      way_type,
      //  "site_name": "世外桃源油站",//关联油站
      //   "volume_type": "1",//券类型  1:油品卷，2：商品卷
      //   "create_time": "2021-03-04 17:10:41",//变更时间
      //   "coupons_name": "测试卷",//券名称
      //   "way_type": "-",//获取途径
      //   "zf_type": "1",//类型 zf_type
      //   "coupons_amount": "12.74"//券面额
      // 表头
      columns: [
        {
          title: '变更时间',
          dataIndex: 'create_time',
          // scopedSlots: { customRender: 'zf_number' },
          fixed: 'left'
        },
        {
          title: '类型',
          dataIndex: 'zf_type',
          scopedSlots: { customRender: 'zf_type' },
        },
        {
          title: '券名称',
          dataIndex: 'coupons_name',
        },
        {
          title: '券类型',
          dataIndex: 'volume_type',
          scopedSlots: { customRender: 'volume_type' },
        },
        {
          title: '券面额',
          dataIndex: 'coupons_amount'
        },
        {
          title: '获取途径',
          dataIndex: 'way_type',
          scopedSlots: { customRender: 'way_type' },
        },
        {
          title: '关联油站',
          dataIndex: 'site_name'
        },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        let params = {
          page: parameter.pageNo, // 页码
          limit: parameter.pageSize, // 每页页数
          id: this.$route.query.id
        }
        return getUserCouponHistory(Object.assign(params)).then(res => {
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
    way_typeText(text){
      // console.log(text)
      let item = this.way_type.find(e=>{
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