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
                <a-form-item label="应付金额" class="screen-item-inline">
                  <a-input-number id="inputNumber" placeholder="数字" v-model="form.handle_starting" @change="onChange" />
                  <span style="margin: 0 10px;">至</span>
                  <a-input-number id="inputNumber" placeholder="数字" v-model="form.handle_end" @change="onChange" />
                </a-form-item>
                <a-form-item label="实付金额" class="screen-item-inline">
                  <a-input-number id="inputNumber" placeholder="数字" v-model="form.paid_starting" @change="onChange" />
                  <span style="margin: 0 10px;">至</span>
                  <a-input-number id="inputNumber" placeholder="数字" v-model="form.paid_end" @change="onChange" />
                </a-form-item>
              </a-col>
              <div v-show="searchType != '高级搜索'">
                <a-col :md="24" :sm="24">
                  <a-form-item label="油品型号" class="screen-item-inline">
                    <a-select default-value="lucy" style="width: 200px">
                      <a-select-option value="jack">
                        Jack
                      </a-select-option>
                      <a-select-option value="lucy">
                        Lucy
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="枪号" class="screen-item-inline">
                    <a-select default-value="lucy" style="width: 200px">
                      <a-select-option value="jack">
                        Jack
                      </a-select-option>
                      <a-select-option value="lucy">
                        Lucy
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="24" :sm="24">
                  <a-form-item label="订单状态" class="screen-item-inline">
                    <a-select default-value="1" style="width: 200px">
                      <a-select-option value="1">
                        交易成功
                      </a-select-option>
                      <a-select-option value="2">
                        待支付
                      </a-select-option>
                      <a-select-option value="3">
                        支付失败
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="订单类型" class="screen-item-inline">
                    <a-select default-value="lucy" style="width: 200px">
                      <a-select-option value="jack">
                        Jack
                      </a-select-option>
                      <a-select-option value="lucy">
                        Lucy
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="订单来源" class="screen-item-inline">
                    <a-select default-value="lucy" style="width: 200px">
                      <a-select-option value="jack">
                        Jack
                      </a-select-option>
                      <a-select-option value="lucy">
                        Lucy
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="24" :sm="24">
                  <a-form-item label="支付方式" class="screen-item-inline">
                    <a-select default-value="1" style="width: 200px">
                      <a-select-option value="1">
                        微信
                      </a-select-option>
                      <a-select-option value="2">
                        支付宝
                      </a-select-option>
                      <a-select-option value="3">
                        对公转账
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="加油员" class="screen-item-inline">
                    <a-select default-value="lucy" style="width: 200px">
                      <a-select-option value="jack">
                        Jack
                      </a-select-option>
                      <a-select-option value="lucy">
                        Lucy
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
                  <span @click="advanceSearchChange" style="cursor: pointer;vertical-align: middle;color: #1890ff;">{{searchType}}</span>
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
              <a-button style="margin-left: 8px;" @click="setVisible=true" icon="setting"/>
            </div>
          </div>
          <s-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns"
            :data="loadData"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          >
          </s-table>
        </div>
      </a-layout-content>
    </a-layout>
    <a-modal
        title="自定义展示"
        :visible="setVisible"
        :confirm-loading="setConfirmLoading"
        @ok="handleSetOk"
        @cancel="handleSetCancel"
      >
      <div style="display: flex;">
        <span style="flex: 1;">可选字段</span>
        <a style="flex: 0 0 50px;">重置</a>
        <a style="flex: 0 0 60px;">恢复默认</a>
      </div>
      <a-divider />
      <div>
        <a-checkbox-group @change="onChangeTableOption" :value="tableOptionChoose">
            <a-row>
              <a-col :span="6" v-for="(item,index) in tableOptions" :key="index" style="margin-bottom: 10px;">
                <a-checkbox :value="item.value" :disabled="item.disabled">
                  {{item.label}}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
      </div>
      </a-modal>
    <router-view />
  </div>
</template>

<script>
import { deleteNullAttr } from '@/utils/lzz.js'
import moment from 'moment';
import { STable } from '@/components'
import { getOrderList } from '@/api/order'
const tableOptions = [
  { label: '订单号', value: '订单号', disabled: true },
  { label: '订单状态', value: '订单状态', disabled: true },
  { label: '订单类型', value: '订单类型', disabled: true },
  { label: '应付金额', value: '应付金额', disabled: true },
  { label: '优惠金额', value: '优惠金额' },
  { label: '实付金额', value: '实付金额' },
  { label: '支付方式', value: '支付方式' },
  { label: '状态时间', value: '状态时间' },
  { label: '手机号', value: '手机号' },
  { label: '会员等级', value: '会员等级' },
];
export default {
  name: 'Clist',
  components: {
    STable
  },
  data () {
    return {
      tableOptions,
      setVisible:false,
      setConfirmLoading: false,
      searchType:'高级搜索',
      diyDate:false,
      form:{
        handle_starting:'',
        handle_end:'',
        paid_starting:'',
        paid_end:'',
        page:1,
        limit:10,
        time_type:''
      },
      radioValue: 'new',
      tableOptionChoose:['优惠金额','实付金额','支付方式','状态时间'],
      value:'',
      // 查询参数
      queryParam: {
        keyType: '86'
      },
      // 表头
      columns: [
        {
          title: '订单号',
          dataIndex: 'oils_id'
        },
        {
          title: '订单状态',
          dataIndex: 'order_status'
        },
        {
          title: '订单类型',
          dataIndex: 'order_type',
        },
        {
          title: '应付金额',
          dataIndex: 'order_total',
        },
        {
          title: '优惠金额',
          dataIndex: 'original_amount',
          needTotal: true
        },
        {
          title: '实付金额',
          dataIndex: 'actually_paid',
          needTotal: true
        },
        {
          title: '支付方式',
          dataIndex: 'oils_gunName',
        },
        {
          title: '状态时间',
          dataIndex: 'zf_number',
          needTotal: true
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getOrderList(deleteNullAttr(this.form))
          .then(res => {
            return {
              data: res.data, // 列表数组
              pageNo: this.form.page,  // 当前页码
              pageSize:  this.form.limit,  // 每页页数
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
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    onChangeTableOption(){
      
    },
    toSearch(){
      getOrderList(deleteNullAttr(this.form)).then(res=>{
        console.log(res)
      })
    },
    handleSetOk(e) {
      this.setConfirmLoading = true;
      setTimeout(() => {
        this.setVisible = false;
        this.setConfirmLoading = false;
      }, 2000);
    },
    handleSetCancel(e) {
      this.setVisible = false;
    },
    advanceSearchChange(){
      this.searchType == "高级搜索" ? this.searchType="点击收起" :　this.searchType="高级搜索" 
    },
    disabledDate(current) {
      return current && current < moment().endOf('day');
    },
    disabledRangeTime(_, type) {
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56],
      };
    },
    onChange(value){
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
