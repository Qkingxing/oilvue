<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="head-title">
        <div>
          <a-radio-group @change="onChange">
            <a-radio-button value="nowMonth">本月</a-radio-button>
            <a-radio-button value="preThreeMonth">近三月</a-radio-button>
          </a-radio-group>
          <a-range-picker style="margin-left: 10px;" />
        </div>
        <a-input-search placeholder="请输入订单号" style="width: 200px;" @search="onSearch" />
      </div>
      <a-row :style="{ 'text-align': 'right', margin: '20px'}">
        <a-button disabled style="margin-right: 10px;">申请开票</a-button>
        <a-button disabled>开票记录</a-button>
      </a-row>
      <STable ref="table" size="default" rowKey="id" :columns="columns" :data="loadData">

      </STable>
    </a-layout-content>
  </a-layout>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getGasfillingcardlist } from '@/api/crm'

export default {
  name: 'Record',
  components: {
    STable
  },
  data () {
    return {
      params: {

      },
      columns: [
        {
          title: '订单号',
          dataIndex: 'orderNo'
        },
        {
          title: '产品',
          dataIndex: 'product'
        },
        {
          title: '订单金额',
          dataIndex: 'orderMount'
        },
        {
          title: '支付状态',
          dataIndex: 'pay_status',
          filters: [
            { text: '待支付', value: '0' },
            { text: '支付成功', value: '1' },
            { text: '支付失败', value: '2' }
          ]
        },
        {
          title: '实付金额',
          dataIndex: 'paymount'
        },
        {
          title: '支付时间',
          dataIndex: 'updateTime'
        },
        {
          title: '开票状态',
          dataIndex: 'invoice_status'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize // 每页页数
        }
        return getGasfillingcardlist(Object.assign(params)).then((res) => {
          // 自定义出参
          // console.log(res.data.data)
          return {
            data: res.data.data, // 列表数组
            pageNo: parameter.pageNo, // 当前页码
            pageSize: parameter.pageSize, // 每页页数
            totalCount: res.data.total, // 列表总条数
            totalPage: res.data.total // 列表总页数
          }
        })
      }
    }
  },
  created () {
  },
  methods: {
    onSearch (val) {

    },
    onChange (e) {
      console.log(`checked = ${e.target.value}`)
      const value = e.target.value
      if (value === 'nowMonth') {
        const nowMonthStartDate = moment().startOf('month').format('YYYY MM DD')
        const nowMonthEndDate = moment().endOf('month').format('YYYY MM DD')
      } else {
        const preThreeMonthDate = moment().subtract(3, 'months').format('YYYY MM DD')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.head-title {
  font-size: 14px;
  // font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
