
<template>
  <a-layout>
    <a-layout-content
      v-if="pageType=='list'"
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title">
        加油卡列表
      </div>
      <div class="actionBtns">
        <a-button type="primary" @click="pageType='creat'"> 新增加油卡 </a-button>
      </div>

      <!-- 表格 -->
      <div class="showDataForTable">
        <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData">
          <span slot="card_type" slot-scope="text">
            <template>
              {{cardTypeList[text].label}}
            </template>
          </span>
          <span slot="oilsinfo" slot-scope="text">
            <template>
              已选{{text.length}}个
            </template>
          </span>
          <span slot="refill" slot-scope="text, record">
            <template>
              {{record.min_refill}}-{{record.max_refill}}元
            </template>
          </span>
          <div slot="givemoney" slot-scope="text, record">
            <template>
              <p 
                v-for="(item, index) in record.giveruleinfo"
                :key="index">
                {{item.refillmoney}}元
              </p>
            </template>
          </div>
          <div slot="giveruleinfo" slot-scope="text, record">
            <template>
              <p 
                v-for="(item, index) in record.giveruleinfo"
                :key="index">
                充值{{item.refillmoney}}元{{giveMoneyTypeList[item.type].label}}{{item.givemoney}}元
              </p>
              <p v-if="!record.giveruleinfo.length">无优惠</p>
            </template>
          </div>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="delTag(record)" style="margin: 0 4px;">编辑</a>
              <a @click="delTag(record)" style="margin: 0 4px;" v-if="record.card_status">禁用</a>
              <a @click="delTag(record)" style="margin: 0 4px;" v-else>启用</a>
              <a @click="delTag(record)" style="margin: 0 4px;">删除</a>

            </template>
          </span>
        </s-table>
      </div>
    </a-layout-content>
    <PrepaidEdit v-if="pageType == 'creat'" :pageType="pageType" @back="pageType='list'"/>
  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'
import { getGasfillingcardlist } from '@/api/crm'
import {cardTypeList,giveMoneyTypeList} from '@/utils/select'

export default {
  name: 'Plist',
  components: {
    STable,
    PrepaidEdit: ()=>import('./list/edit')
  },
  data () {
    return {
      cardTypeList,
      giveMoneyTypeList,
      pageType: 'list',
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '加油卡名称',
          dataIndex: 'card_name'
        },
        {
          title: '可用油站',
          dataIndex: 'site_name'
        },
        {
          title: '卡类型',
          dataIndex: 'card_type',
          scopedSlots: { customRender: 'card_type' }
        },
        {
          title: '可用油品',
          dataIndex: 'oilsinfo',
          scopedSlots: { customRender: 'oilsinfo' }
        },
        {
          title: '充值限制',
          dataIndex: 'refill',
          scopedSlots: { customRender: 'refill' }
        },
        {
          title: '充值金额',
          scopedSlots: { customRender: 'givemoney' }
        },
        {
          title: '充值优惠',
          scopedSlots: { customRender: 'giveruleinfo' }
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
        }

        return getGasfillingcardlist(Object.assign(params))
        .then((res)=>{
          // 自定义出参
          console.log(res.data.data)
          return {
            data: res.data.data, // 列表数组
            pageNo: parameter.pageNo,  // 当前页码
            pageSize: parameter.pageSize,  // 每页页数
            totalCount: res.data.total, // 列表总条数
            totalPage: res.data.total // 列表总页数
          }
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
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log()
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
<style lang="less" scoped>
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}

.actionBtns {
  display: flex;
  align-items: center;
  margin: 16px 0;
  button {
    margin-right: 8px;
  }
}
.screen-box {
  padding: 27px 0 24px 0;
  .screen-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: #040a46;
  }
}
.search-btn {
  margin-left: 72px;
  margin-top: 8px;
}
.showDataForTable {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 60px;
  overflow: hidden;
  .showSearchAndTotal {
    height: 63px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #040a46;
    line-height: 24px;
    padding: 23px 0 16px 0;
  }
  .dec {
    color: #3c3c46;
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
  }
}
.themeColor {
  color: #3b85ff;
}
.select-all {
  margin-left: 16px;
  cursor: pointer;
}
</style>
