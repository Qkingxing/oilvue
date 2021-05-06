<template>
  <div>
    <a-layout v-if="$route.name=='recharge_list'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
         <div class="screen-box">
          <a-form layout="inline" >
            <a-row :gutter="48">
              <a-col :md="24" :sm="24">
                <a-form-item label="充值时间" class="screen-item">
                  <a-range-picker
                    v-model="dateRange"
                    @change="timeChange()"
                    style="margin-left: 10px;"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledRangeTime"
                    format="YYYY-MM-DD"
                   />
                   <span style="margin: 0 10px;">订单状态：</span>
                   <a-select default-value="" v-model="params.tradeStatus" style="width: 120px">
                     <a-select-option value="">
                       全部
                     </a-select-option>
                     <a-select-option value="0">
                       待支付
                     </a-select-option>
                     <a-select-option value="1">
                       支付成功
                     </a-select-option>
                   </a-select>
                   <a-input placeholder="请输入订单号后四位" v-model="params.order_number" style="width: 200px;margin-left: 10px;"></a-input>
                </a-form-item>
                  
              </a-col>
              <a-col :md="24" :sm="24">
                <a-form-item>
                  <a-button type="primary" @click="search()" class="search-btn" style="min-width:82px;"> 搜索 </a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- 表格 -->
        <div class="showDataForTable">
          <div class="showSearchAndTotal">
            <span class="title">
              充值记录
            </span>
          </div>
          <a-table ref="table" :columns="columns"  :rowKey='record=>record.id' :data-source="recordList" :scroll="{ x: 1300 }">
            <span slot="zf_type" slot-scope="text,record" href="javascript:;">
             <span v-if="text.zf_type==1">对公转账</span>
             <span v-if="text.zf_type==2">微信支付</span>
            </span>
            <span slot="tradeStatus" slot-scope="text,record" href="javascript:;">
             <span v-if="text.tradeStatus==0">待支付</span>
             <span v-if="text.tradeStatus==1">支付成功</span>
            </span>
            
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
    <router-view />
  </div>
</template>

<script>
import moment from 'moment';
import { STable } from '@/components'
import { getMoneyTransfer } from '@/api/finance'
export default {
  name: 'RechargeList',
  components: {
    STable
  },
  data () {
    return {
      setVisible:false,
      setConfirmLoading: false,
      value:'',
      dateRange:[],
      recordList:[],
      // 表头
      columns: [
        {
          title: '充值单号',
          dataIndex: 'tradeNo'
        },
        {
          title: '充值金额（元）',
          dataIndex: 'totalAmount'
        },
        {
          title: '充值时间',
          dataIndex: 'gmtCreate',
        },
        {
          title: '到帐时间',
          dataIndex: 'update_time',
        },
        {
          title: '充值方式',
          scopedSlots: { customRender: 'zf_type' },
        },
        {
          title: '订单状态',
          scopedSlots: { customRender: 'tradeStatus' },
        },
      ],
      selectedRowKeys: [],
      selectedRows: [],
      params:{
        starting_time:'',
        end_time:'',
        order_number:'',
        tradeStatus:'',
        page:1,
        limit:1000,
      }
    }
  },
  created () {
    this.loadRechargeList()
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
    search(){
     getMoneyTransfer(this.params).then(res => {
       this.recordList = res.data
     })
    },
    loadRechargeList(){
      getMoneyTransfer(this.params).then(res => {
        this.recordList = res.data
      })
    },
    timeChange (value, dateString) {
      this.params.starting_time = moment(this.dateRange[0]._d).format('YYYY-MM-DD')
      this.params.end_time = moment(this.dateRange[1]._d).format('YYYY-MM-DD')
    },
    disabledDate(current) {
      return current && current > moment().endOf('day');
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
