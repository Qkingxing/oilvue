
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">
      <div class="head-title">
        客户积分记录
      </div>
      <div class="customer-statistics">
        <div class="invoice-card-box" v-for="(card,index) in 6" :key="index">
          <div class="box-title"><span>剩余有效积分</span></div>
          <div class="box-content">
            <!-- <span decimals="0" class="value">269,383</span> -->
            <countTo
              class="value"
              :startVal="0"
              :endVal="269383"
              :duration="3000"
            ></countTo>
            <span class="unit"></span>
          </div>
        </div>
      </div>
      <a-tabs default-active-key="1" size="large">
        <a-tab-pane key="1" tab="积分变动记录">
          <div class="search-wrap">
            <div class="screen">
              <div class="screen-li active">今日</div>
              <div class="screen-li">本周</div>
              <div class="screen-li">本月</div>
              <div class="screen-li">自定义</div>
              <a-range-picker show-time></a-range-picker>
            </div>
            <div>
              <a-input-search placeholder="请输入手机号/客户编号" style="width: 200px" />
              <a-button class="current-exprot">导出数据</a-button>
            </div>
          </div>
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
        <a-tab-pane key="2" tab="积分获取记录">
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
        <a-tab-pane key="3" tab="积分消耗记录">
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
  name: 'Record',
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
.head-title{
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}
.invoice-card-box{
  position: relative;
  height: 128px;
  width: 242px;
  display: inline-block;
  text-align: center;
  margin-right: 20px;
  margin-bottom: 16px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
  .box-title{
    position: absolute;
    top: 30px;
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    color: #3c3c46;
  }
  .box-content{
    position: absolute;
    top: 63px;
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 100%;
    .value{
      font-size: 34px;
      line-height: 34px;
      color: #040a46;
    }
    .unit {
      font-size: 12px;
      color: #040a46;
      margin-left: 5px;
      transform: translateY(-1px);
    }
  }
}
.customer-statistics{
  margin-top: 30px;
  width: 102%;
  .invoice-card-box{
    height: 108px;
    width: 271px;
    box-shadow: none;
    border: 1px solid #eaeaf4;
    .box-title{
      text-align: left;
      top: 24px;
      left: 24px;
    }
    .box-content{
      top: 49px;
      left: 24px;
      text-align: left;
      justify-content: start;
      .value{
        color: #7C7EE2;
      }
    }
  }
}
.search-wrap{
  display: flex;
  justify-content: space-between;
  .screen{
    font-size: 12px;
    line-height: 22px;
    min-height: 40px;
    display: flex;
    align-items: center;
    .screen-li {
      display: inline-block;
      width: 48px;
      height: 24px;
      line-height: 24px;
      margin-right: 20px;
      text-align: center;
      color: #040a46;
      font-size: 12px;
      cursor: pointer;
      &.active{
        background-color: #ecf3ff;
        border-radius: 3px;
        color: #3c85ff;
      }
    }
  }
}
.current-exprot{
  border-color: #81a8f7;
  color: #81a8f7;
  margin-left: 15px;
}
</style>
