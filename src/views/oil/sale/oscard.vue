
<template>
  <div class="overview">
    <a-layout v-if="$route.name=='oscard'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
       <h3 class="o-title">IC卡汇总</h3>
        <a-divider />
         <div class="screen-box">
          <a-form layout="inline" >
            <a-row :gutter="48">
              <a-col :md="24" :sm="24">
                <a-form-item class="screen-item-inline">
                  <span class="item-title">卡类型</span>
                  <a-radio-group>
                     <a-radio-button value="a">
                       员工卡
                     </a-radio-button>
                     <a-radio-button value="b">
                       客户卡
                     </a-radio-button>
                     <a-radio-button value="b">
                       验泵卡
                     </a-radio-button>
                   </a-radio-group>
                </a-form-item> 
              </a-col>
              <a-col :md="24" :sm="24">
                <a-form-item class="screen-item-inline">
                  <span class="item-title">统计方式</span>
                  <a-radio-group>
                     <a-radio-button value="a">
                       按班次
                     </a-radio-button>
                     <a-radio-button value="b">
                       按时间
                     </a-radio-button>
                   </a-radio-group>
                </a-form-item> 
              </a-col>
               <a-col :md="24" :sm="24">
                 <a-form-item class="screen-item">
                   <span class="item-title">统计班次</span>
                    <a-date-picker />
                 </a-form-item>
               </a-col>
               <a-col :md="24" :sm="24">
                 <a-form-item class="screen-item">
                   <span class="item-title">IC卡号</span>
                    <a-input style="width: 200px;"></a-input>
                 </a-form-item>
               </a-col>
              <a-col :md="24" :sm="24">
                <a-form-item>
                  <a-button type="primary" class="search-btn" style="min-width:82px;" @click="toSearch()"> 搜索 </a-button>
                  <a-button style="min-width:82px;"> 导出报表 </a-button>
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
  name: 'oscard',
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
          title: '班次',
          dataIndex: 'oils_id'
        },
        {
          title: 'IC卡号',
          dataIndex: 'order_status',
          customRender:function(text){
            if(text==1){
              return "交易成功"
            }else if(text==2){
              return "待支付"
            }else if(text==3){
              return "支付失败"
            }
          }
        },
        {
          title: '员工',
          customRender:function(){
            return "未找到"
          }
        },
        {
          title: '加油笔数',
          dataIndex: 'order_total',
        },
        {
          title: '销售量(升)',
          dataIndex: 'count_discount',
          needTotal: true
        },
        {
          title: '销售金额（元',
          dataIndex: 'actually_paid',
          needTotal: true
        },
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
