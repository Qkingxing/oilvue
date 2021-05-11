
<template>
  <div class="overview">
    <a-layout v-if="$route.name=='detailed'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <h3 class="o-title">班结</h3>
        <a-divider />
        <div class="screen-box">
          <a-form layout="inline" >
            <a-row :gutter="48">
              <a-col :md="24" :sm="24">
                <a-form-item>
                  <a-select v-model="queryParam.id" style="width: 200px">
                    <a-select-option :value="item.id" v-for="(item,index) in bjIdList" :key="index">
                      {{item.name}}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" class="search-btn" style="min-width:82px;" @click="toSearch()"> 搜索 </a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- 表格 -->
        <div class="showDataForTable">
          <div class="showSearchAndTotal">
            <span class="title">
              数据更新时间：2021-02-06 11:04:34
            </span>
          </div>
          <a-table ref="table" :columns="columns"  :rowKey='record=>record.id' :data-source="bjList" :scroll="{ x: 1300 }">
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
    <router-view />
  </div>
</template>

<script>
import { deleteNullAttr } from '@/utils/lzz.js'
import moment from 'moment'
import { STable } from '@/components'
import { getBjList, getBjIdList } from '@/api/finance'
export default {
  name: 'Detailed',
  components: {
    STable
  },
  data () {
    return {
      setVisible: false,
      setConfirmLoading: false,
      bjIdList:[],
      bjList:[],
      queryParam:{
        id:''
      },
      value: '',
      // 表头
      columns: [
        {
          title: '上班时间',
          dataIndex: 'to_work_time'
        },
        {
          title: '下班时间',
          dataIndex: 'off_work_time',
        },
        {
          title: '实收金额',
          dataIndex:'actually_paid',
        },
        {
          title: '应收金额',
          dataIndex: 'original_amount'
        },
        {
          title: '订单笔数',
          dataIndex: 'order_number',
        },
        {
          title: '订单升数',
          dataIndex: 'order_liter',
        },
        {
          title: '优惠金额',
          dataIndex: 'count_discount'
        },
        {
          title: '优惠券优惠',
          dataIndex: 'coupon_discount',
        },
        {
          title: '上班状态',
          dataIndex: 'work_type',
          customRender: function (text) {
            if (text == 1) {
              return '上班'
            } else if (text == 2) {
              return '下班'
            }
          }
        },
      ],
      // 加载数据方法 必须为 Promise 对象
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
    // this.tableOption()
    this.loadBjList()
    this.loadBjSelectList()
  },
  methods: {
    moment,
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    loadBjSelectList(){
      getBjIdList().then(res=>{
        this.bjIdList = res.data
      })
    },
    loadBjList(){
      getBjList(this.queryParam).then(res=>{
        this.bjList = res.data
      })
    },
    toSearch () {
      getBjList(this.queryParam).then(res=>{
        this.bjList = res.data
      })
    },
    disabledDate (current) {
      return current && current < moment().endOf('day')
    },
  }
}
</script>
<style lang="less" scoped>
.o-title{
  font-weight: 600;
}
.item-title{
  width: 60px;
  margin-right: 10px;
  display: inline-block;
  text-align: right;
}
.screen-box{
  padding: 0px 0 24px 0;
  .screen-item{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: #040a46;
  }
  .screen-item-inline{
    display: inline-block;
    margin-bottom: 16px;
    color: #040a46;
  }
}
.search-btn{
  margin-left: 72px;
  margin-top: 8px;
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
    border-top: 1px solid #eaeaf4;
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
