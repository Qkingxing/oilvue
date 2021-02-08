<template>
  <div class="overview">
    <a-layout v-if="$route.name=='balance'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <a-divider />
        <div class="screen-box">
          <a-form layout="inline" >
            <a-row :gutter="48">
              <a-col :md="24" :sm="24">
                <a-form-item class="screen-item-inline">
                  <span class="item-title">统计类型</span>
                  <a-radio-group>
                    <a-radio value="a">
                      实结金额统计
                    </a-radio>
                    <a-radio value="b">
                      受理方式统计
                    </a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :md="24" :sm="24">
                <a-form-item class="screen-item-inline">
                  <span class="item-title">统计方式</span>
                  <a-radio-group>
                    <a-radio value="a">
                      班次统计
                    </a-radio>
                    <a-radio value="b">
                      自然日统计
                    </a-radio>
                    <a-radio value="c">
                      时间段统计
                    </a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :md="24" :sm="24">
                <a-form-item label="统计时间" class="screen-item">
                  <!-- <a-input v-model="queryParam.keywords" placeholder="请输入搜索内容" /> -->
                  <a-radio-group v-model="form.time_type" @change="onChange">
                    <a-radio :value="1">
                      今日
                    </a-radio>
                    <a-radio :value="2">
                      昨日
                    </a-radio>
                    <a-radio :value="3">
                      本周
                    </a-radio>
                    <a-radio :value="4">
                      本月
                    </a-radio>
                    <a-radio :value="5">
                      自定义
                    </a-radio>
                  </a-radio-group>
                  <a-range-picker
                    v-show="diyDate"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledRangeTime"
                    :show-time="{
                      hideDisabledOptions: true,
                      defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                    }"
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="24" :sm="24">
                <a-form-item class="screen-item-inline">
                  <span class="item-title">业务类型</span>
                  <a-select mode="multiple" default-value="lucy" style="width: 120px" @change="handleChange">
                    <a-select-option value="jack">
                      Jack
                    </a-select-option>
                    <a-select-option value="lucy">
                      Lucy
                    </a-select-option>
                    <a-select-option value="disabled">
                      Disabled
                    </a-select-option>
                    <a-select-option value="Yiminghe">
                      yiminghe
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="24" :sm="24">
                <a-form-item>
                  <a-button type="primary" class="search-btn" style="min-width:82px;" @click="toSearch()"> 搜索 </a-button>
                  <a-button style="min-width:82px;margin-left: 10px;"> 导出 </a-button>
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
          <s-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns"
            :data="loadData"
            :scroll="{ x: 'calc(100%)' }"
          >
          </s-table>
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
import { getOrderList } from '@/api/order'
export default {
  name: 'Balance',
  components: {
    STable
  },
  data () {
    return {
      setVisible: false,
      setConfirmLoading: false,
      searchType: '高级搜索',
      diyDate: false,
      form: {
        handle_starting: '',
        handle_end: '',
        paid_starting: '',
        paid_end: '',
        page: 1,
        limit: 10,
        time_type: ''
      },
      radioValue: 'new',
      tableOptionChoose: ['优惠金额', '实付金额', '支付方式', '状态时间'],
      value: '',
      // 查询参数
      queryParam: {
        keyType: '86'
      },
      // 表头
      columns: [
        {
          title: '油站名称',
          dataIndex: 'oils_id'
        },
        {
          title: '日期',
          dataIndex: 'order_status'
        },
        {
          title: '全部',
          children: [
            {
              title: '应结金额',
              dataIndex: 'order_total'
            },
            {
              title: '实结金额',
              dataIndex: 'order_total'
            },
            {
              title: '手续费',
              dataIndex: 'order_total'
            },
            {
              title: '移动支付实结金额',
              dataIndex: 'order_total'
            }
          ]
        },
        {
          title: '油品',
          children: [
            {
              title: '应结金额',
              dataIndex: 'order_total'
            },
            {
              title: '实结金额',
              dataIndex: 'order_total'
            },
            {
              title: '手续费',
              dataIndex: 'order_total'
            },
            {
              title: '移动支付实结金额',
              dataIndex: 'order_total'
            }
          ]
        },
        {
          title: '闪付',
          children: [
            {
              title: '应结金额',
              dataIndex: 'order_total'
            },
            {
              title: '实结金额',
              dataIndex: 'order_total'
            },
            {
              title: '手续费',
              dataIndex: 'order_total'
            },
            {
              title: '移动支付实结金额',
              dataIndex: 'order_total'
            }
          ]
        },
        {
          title: '应结金额',
          dataIndex: 'count_discount',
          needTotal: true
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getOrderList(deleteNullAttr(this.form))
          .then(res => {
            return {
              data: res.data, // 列表数组
              pageNo: this.form.page, // 当前页码
              pageSize: this.form.limit, // 每页页数
              totalCount: res.countPage, // 列表总条数
              totalPage: res.pageSize // 列表总页数
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
    // this.tableOption()
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
    onChangeTableOption () {

    },
    toSearch () {
      getOrderList(deleteNullAttr(this.form)).then(res => {
        console.log(res)
      })
    },
    handleSetOk (e) {
      this.setConfirmLoading = true
      setTimeout(() => {
        this.setVisible = false
        this.setConfirmLoading = false
      }, 2000)
    },
    disabledDate (current) {
      return current && current < moment().endOf('day')
    },
    disabledRangeTime (_, type) {
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56]
        }
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56]
      }
    },
    handleSetCancel (e) {
      this.setVisible = false
    },
    advanceSearchChange () {
      this.searchType == '高级搜索' ? this.searchType = '点击收起' :　this.searchType = '高级搜索'
    },
    disabledDate (current) {
      return current && current < moment().endOf('day')
    },
    disabledRangeTime (_, type) {
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56]
        }
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56]
      }
    },
    onChange (value) {
      value.target.value == 5 ? this.diyDate = true : this.diyDate = false
    },
    showEditTag (type) {
      this.$refs['EditTag'].show(type)
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
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
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
