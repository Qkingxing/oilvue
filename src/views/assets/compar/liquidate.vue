<template>
  <div class="overview">
    <a-layout v-if="$route.name=='liquidate'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <h3 class="o-title">加油卡清算</h3>
        <a-divider />
        <div class="screen-box">
          <a-form layout="inline" >
            <a-row :gutter="48">
              <a-col :md="24" :sm="24">
                <a-form-item label="订单时间" class="screen-item">
                  <!-- <a-input v-model="queryParam.keywords" placeholder="请输入搜索内容" /> -->
                  <a-radio-group v-model="form.time_type" @change="onChange">
                    <a-radio-button :value="1">
                      昨日
                    </a-radio-button>
                    <a-radio-button :value="2">
                      近7天
                    </a-radio-button>
                    <a-radio-button :value="3">
                      近30天
                    </a-radio-button>
                  </a-radio-group>
                  <a-range-picker
                    style="margin-left: 10px;"
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
            </a-row>
          </a-form>
        </div>
        <!-- 表格 -->
        <div class="showDataForTable">
          <div class="showSearchAndTotal">
            <span class="title">
              清算列表
            </span>
          </div>
          <s-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns"
            :data="loadData"
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
  name: 'Liquidate',
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
          title: '开卡油站',
          dataIndex: 'oils_id'
        },
        {
          title: '消费油站',
          dataIndex: 'order_status',
          customRender: function (text) {
            if (text == 1) {
              return '交易成功'
            } else if (text == 2) {
              return '待支付'
            } else if (text == 3) {
              return '支付失败'
            }
          }
        },
        {
          title: '总消费金额（元）',
          customRender: function () {
            return '未找到'
          }
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
  color: #7c7ee2;
}
.select-all{
  margin-left: 16px;
  cursor: pointer;
}

</style>
