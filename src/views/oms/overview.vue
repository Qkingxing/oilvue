<template>
  <div class="overview">
    <a-layout v-if="$route.name=='Ooverview'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <h3 class="o-title">订单查询</h3>
        <a-divider />
        <div class="screen-box">
          <a-form layout="inline" >
            <a-row :gutter="48">
              <a-col :md="24" :sm="24">
                <a-form-item label="订单时间" class="screen-item">
                  <a-radio-group v-model="form.time_type" @change="timeRadioChange">
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
                    :show-time="{
                      hideDisabledOptions: true,
                      defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                    }"
                    v-model="diyTime"
                    @change="timeChange()"
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="24" :sm="24">
                <a-form-item label="应付金额" class="screen-item-inline">
                  <a-input-number placeholder="数字" v-model="form.handle_starting" />
                  <span style="margin: 0 10px;">至</span>
                  <a-input-number placeholder="数字" v-model="form.handle_end" />
                </a-form-item>
                <a-form-item label="实付金额" class="screen-item-inline">
                  <a-input-number placeholder="数字" v-model="form.paid_starting" />
                  <span style="margin: 0 10px;">至</span>
                  <a-input-number placeholder="数字" v-model="form.paid_end" />
                </a-form-item>
              </a-col>
              <div v-show="searchType != '高级搜索'">
                <a-col :md="24" :sm="24">
                  <a-form-item label="油品型号" class="screen-item-inline">
                    <a-select style="width: 200px" v-model="form.oils_id">
                      <a-select-option :value="item.id" v-for="(item,index) in oilList" :key="item.id">
                        {{ item.oils_name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="枪号" class="screen-item-inline">
                    <a-select style="width: 200px">
                      <a-select-option :value="item.id" v-for="(item,index) in gunList" :key="item.id">
                        {{ item.gun_name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="24" :sm="24">
                  <a-form-item label="订单状态" class="screen-item-inline">
                    <a-select v-model="form.order_status" style="width: 200px">
                      <a-select-option value="0">
                        交易成功
                      </a-select-option>
                      <a-select-option value="1">
                        已支付
                      </a-select-option>
                      <a-select-option value="2">
                        待支付
                      </a-select-option>
                      <a-select-option value="3">
                        退款中
                      </a-select-option>
                      <a-select-option value="4">
                        已退款
                      </a-select-option>
                      <a-select-option value="5">
                        已取消
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="订单类型" class="screen-item-inline">
                    <a-select default-value="0" style="width: 200px">
                      <a-select-option value="0">
                        全部
                      </a-select-option>
                      <a-select-option value="1">
                        油品
                      </a-select-option>
                      <a-select-option value="2">
                        便利店
                      </a-select-option>
                      <a-select-option value="3">
                        个人卡
                      </a-select-option>
                      <a-select-option value="4">
                        车队卡
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="订单来源" class="screen-item-inline">
                    <a-select default-value="0" style="width: 200px">
                      <a-select-option value="0">
                        全部
                      </a-select-option>
                      <a-select-option value="1">
                        快捷加油
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="24" :sm="24">
                  <a-form-item label="支付方式" class="screen-item-inline">
                    <a-select style="width: 200px" v-model="form.order_type">
                      <a-select-option :value="item.code" v-for="(item,index) in payList" :key="item.code">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="加油员" class="screen-item-inline">
                    <a-select style="width: 200px" v-model="form.user_id">
                      <a-select-option :value="item.id" v-for="item in depotslist" :key="item.id">
                        {{ item.role_name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </div>
              <a-col :md="24" :sm="24">
                <a-form-item>
                  <a-button type="primary" class="search-btn" style="min-width:82px;" @click="toSearch()"> 搜索 </a-button>
                </a-form-item>
                <a-form-item>
                  <span @click="advanceSearchChange" style="cursor: pointer;vertical-align: middle;color: #1890ff;">{{ searchType }}</span>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- 表格 -->
        <div class="showDataForTable">
          <div class="showSearchAndTotal">
            <span class="title">
              订单列表
            </span>
            <div>
              <a-button style="margin-left: 8px;">导出报表</a-button>
            </div>
          </div>
          <a-table ref="table" :columns="columns"  :rowKey='record=>record.id' :data-source="orderList" :scroll="{ x: 1300 }">
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
import { getOrderList, getOilSetList, getGunList, getPayList, getDepotslist } from '@/api/order'
export default {
  name: 'Ooverview',
  data () {
    return {
      oilList: [],
      gunList: [],
      payList: [],
      searchType: '高级搜索',
      diyDate: false,
      diyTime: null,
      orderList:[],
      form: {
        handle_starting: '',
        handle_end: '',
        paid_starting: '',
        paid_end: '',
        page: 1,
        limit: 1000,
        time_type: 1,
        starting_time: '',
        end_time: '',
        oils_id: '',
        oils_gunId: '',
        user_id: '',
        order_status: '0',
        order_type:''
      },
      radioValue: 'new',
      value: '',
      // 表头
      columns: [
        {
          title: '订单号',
          dataIndex: 'id'
        },
        {
          title: '订单状态',
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
          title: '订单类型',
          customRender: function (text) {
            if (text.product_type == 1) {
              return '油品'
            } else if (text.product_type == 2) {
              return '商品'
            }
          }
        },
        {
          title: '应付金额',
          dataIndex: 'order_total'
        },
        {
          title: '优惠金额',
          dataIndex: 'count_discount',
          needTotal: true
        },
        {
          title: '实付金额',
          dataIndex: 'actually_paid',
          needTotal: true
        },
        {
          title: '支付方式',
          dataIndex:'order_type_name'
        },
        {
          title: '状态时间',
          dataIndex: 'transaction_time',
          needTotal: true
        }
      ],
      selectedRowKeys: [],
      selectedRows: [],
      depotslist: []
    }
  },
  created () {
    this.loadOrderList()
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
    timeChange (value, dateString) {
      this.form.starting_time = moment(this.diyTime[0]._d).format('YYYY-MM-DD')
      this.form.end_time = moment(this.diyTime[1]._d).format('YYYY-MM-DD')
    },
    loadDepotslist () {
      getDepotslist().then(res => {
        console.log(res.data.data)
        this.depotslist = res.data.data
      })
    },
    loadOrderList(){
      getOrderList(deleteNullAttr(this.form)).then(res=>{
        this.orderList = res.data
      })
    },
    loadPayList () {
      getPayList().then(res => {
        this.payList = res.data
      })
    },
    loadGunList () {
      getGunList().then(res => {
        this.gunList = res.data
      })
    },
    loadOilList () {
      getOilSetList().then(res => {
        this.oilList = res.data
      })
    },
    async toSearch () {
      if (this.form.time_type != 5) {
        this.form.starting_time = ''
        this.form.end_time = ''
      }
      this.loadOrderList()
    },
    handleSetOk (e) {
      this.setConfirmLoading = true
      setTimeout(() => {
        this.setVisible = false
        this.setConfirmLoading = false
      }, 2000)
    },
    handleSetCancel (e) {
      this.setVisible = false
    },
    advanceSearchChange () {
      this.searchType == '高级搜索' ? this.searchType = '点击收起' :　this.searchType = '高级搜索'
      if (this.searchType == '点击收起') {
        this.loadOilList()
        this.loadGunList()
        this.loadPayList()
        this.loadDepotslist()
      }
    },
    timeRadioChange (value) {
      value.target.value == 5 ? this.diyDate = true : this.diyDate = false
    },
    showEditTag (type) {
      this.$refs['EditTag'].show(type)
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
