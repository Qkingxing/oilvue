
<template>
  <a-layout>
    <a-layout-content :style="{ margin: '24px 0', padding: '24px', background: '#fff', minHeight: '280px' }">
      <div class="client-tab-btns">
        <a-radio-group v-model="radioValue">
          <a-radio-button value="old"> 已有客户 </a-radio-button>
          <a-radio-button value="new"> 新增客户 </a-radio-button>
        </a-radio-group>
      </div>
      <div class="screen-box" v-if="radioValue=='new'">
        <a-form layout="inline" >
          <a-row :gutter="48">
            <a-col :md="24" :sm="24">
              <a-form-item label="客户搜索" class="screen-item">
                <!-- <a-input v-model="queryParam.keywords" placeholder="请输入搜索内容" /> -->
                <a-input
                  style="width: 100%"
                  v-model="queryParam.keywords"
                  placeholder="请输入搜索内容"
                >
                  <a-select
                    slot="addonBefore"
                    style="width: 120px"
                    v-model="queryParam.keyType"
                  >
                    <a-select-option value="86"> 客户子单编号 </a-select-option>
                    <a-select-option value="87"> 手机号 </a-select-option>
                  </a-select>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item>
                <a-button type="primary" class="search-btn" style="min-width:82px;"> 搜索 </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 表格 -->
      <div class="showDataForTable">
        <div class="showSearchAndTotal">
          <span class="title">
            客户列表
            <span class="dec">
              符合当前条件客户共「
              <span class="themeColor">
                3
              </span>
              」位
              <span class="themeColor select-all">
                选择全部
              </span>
            </span>
          </span>
        </div>
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadData"
          :rowSelection="options.rowSelection"
        >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
        </s-table>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { STable } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'

export default {
  name: 'Clist',
  components: {
    STable
  },
  data () {
    return {
      radioValue: 'new',
      // 查询参数
      queryParam: {
        keyType: '86'
      },
      // 表头
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '规则编号',
          dataIndex: 'no'
        },
        {
          title: '描述',
          dataIndex: 'description'
        },
        {
          title: '服务调用次数',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: (text) => text + ' 次'
        },
        {
          title: '状态',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
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
.client-tab-btns{
  font-size: 14px;
}
.screen-box{
  padding: 27px 0 24px 0;
  .screen-item{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: #1e1e28;
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
    color: #1e1e28;
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
