<template>
  <div class="overview">
    <a-layout v-if="$route.name=='Alist'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <h3 class="o-title">发票统计</h3>
        <a-divider />
        <div class="screen-box">
          <div class="list-item">
            <p>开发票总金额</p>
            <span>0.00</span>
            <span>元</span>
          </div>
          <div class="list-item">
            <p>开票订单数</p>
            <span>0</span>
            <span>笔</span>
          </div>
          <div class="list-item">
            <p>纸票余量</p>
            <span>0</span>
            <span>张</span>
          </div>
          <div class="list-item">
            <p>电票余量</p>
            <span>0</span>
            <span>张</span>
          </div>
        </div>
        <h3 class="o-title">发票列表</h3>
        <a-divider />
        <div class="screen-box">
          <a-form layout="inline" >
            <a-row :gutter="48">
              <a-col :md="24" :sm="24">
                <a-form-item label="订单时间" class="screen-item">
                  <!-- <a-input v-model="queryParam.keywords" placeholder="请输入搜索内容" /> -->
                  <a-radio-group v-model="form.time_type" @change="onChange">
                    <a-radio-button :value="1">
                      今天
                    </a-radio-button>
                    <a-radio-button :value="2">
                      本周
                    </a-radio-button>
                    <a-radio-button :value="3">
                      本月
                    </a-radio-button>
                    <a-radio-button :value="4">
                      上月
                    </a-radio-button>
                  </a-radio-group>
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
            rowKey="id"
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
import { getInvoiceList } from '@/api/finance'
export default {
  name: 'Alist',
  components: {
    STable
  },
  data () {
    return {
      setVisible: false,
      setConfirmLoading: false,
      diyDate: false,
      form: {
        page: 1,
        limit: 10,
        time_type: 3
      },
      value: '',
      // 查询参数
      queryParam: {
        keyType: '86'
      },
      // 表头
      columns: [
        {
          title: '开票时间',
          dataIndex: 'create_time'
        },
        {
          title: '订单号',
          dataIndex: 'zf_number'
        },
        {
          title: '油品',
          dataIndex: 'oils_name'
        },
        {
          title: '开票金额',
          dataIndex: 'actually_paid'
        },
        {
          title: '发票抬头',
          dataIndex: 'look_ticket_name'
        },
        
        {
          title: '纳税人识别号',
          dataIndex: 'look_ticket_ein'
        },
        {
          title: '开票类型',
          dataIndex: 'invoice_type'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getInvoiceList(deleteNullAttr(this.form))
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
    onChange (value) {
      this.$refs.table.refresh()
    },
    showEditTag (type) {
      this.$refs['EditTag'].show(type)
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
.list-item{
  display: inline-block;
  width: 200px;
  padding: 10px;
  border: 1px solid #eeeeee;
  margin-right: 20px;
}
.list-item p{
  font-size: 10px;
  margin-bottom: 10px;
}
.list-item span:nth-child(2){
  font-size: 34px;
  color: #7c7ee2;
  font-weight: 700;
  margin-right: 5px;
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
