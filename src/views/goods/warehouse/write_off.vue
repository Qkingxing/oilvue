<template>
  <div class="WriteOff">
    <a-layout v-if="$route.name=='write_off'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
       <h3 class="o-title">核销记录</h3>
        <a-divider />
         <div class="screen-box">
          <a-form layout="inline" >
            <a-row :gutter="48">
              <a-col :md="24" :sm="24">
                <a-form-item label="订单时间" class="screen-item">
                  <a-radio-group v-model="params.time_type" @change="onChange">
                    <a-radio-button :value="1">
                      今日
                    </a-radio-button>
                    <a-radio-button :value="2" style="margin-left: 10px;">
                      昨日
                    </a-radio-button>
                    <a-radio-button :value="3" style="margin-left: 10px;">
                      本周
                    </a-radio-button>
                    <a-radio-button :value="4" style="margin-left: 10px;">
                      本月
                    </a-radio-button>
                  </a-radio-group>
                  <!-- <a-range-picker
                    style="margin-left: 10px;"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledRangeTime"
                    :show-time="{
                      hideDisabledOptions: true,
                      defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                    }"
                    v-model="diyTime"
                    @change="timeChange()"
                    format="YYYY-MM-DD HH:mm:ss"
                   /> -->
                   <a-input v-model="params.search" placeholder="请输入客户子编号/手机号" style="width: 200px;margin-left: 10px;"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="24" :sm="24">
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
              订单列表
            </span>
            <div>
              <a-button style="margin-left: 8px;">导出报表</a-button>
              <!-- <a-button style="margin-left: 8px;" @click="setVisible=true" icon="setting"/> -->
            </div>
          </div>
          <a-table ref="table" :columns="columns"  :rowKey='record=>record.id' :data-source="orderList" :scroll="{ x: 1300 }">
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
   <!-- <a-modal
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
      </a-modal> -->
    <router-view />
  </div>
</template>

<script>
import { deleteNullAttr } from '@/utils/lzz.js'
import moment from 'moment';
import { STable } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'
import { getOrderList } from '@/api/order'
export default {
  name: 'write_off',
  components: {
    STable
  },
  data () {
    return {
      setVisible:false,
      setConfirmLoading: false,
      diyDate:false,
      orderTime:'',
      radioValue: 'new',
      orderList:[],
      params:{
        page: 1,
        limit:1000,
        time_type:4,
        product_type:'2',
        search:''
      },
      tableOptionChoose:['优惠金额','实付金额','支付方式','状态时间'],
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
            console.log(text)
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
    this.loadOrderList()
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
      
    },
    loadOrderList(){
      getOrderList(deleteNullAttr(this.params)).then(res=>{
        console.log(res.data)
        this.orderList = res.data
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
      console.log()
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
  color: #7c7ee2;
}
.select-all{
  margin-left: 16px;
  cursor: pointer;
}

</style>
