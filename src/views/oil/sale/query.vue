<template>
  <div class="overview">
    <a-layout v-if="$route.name=='query'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
       <h3 class="o-title">销售明细</h3>
        <a-divider />
         <div class="screen-box">
          <a-form layout="inline" >
            <a-row :gutter="48">
               <a-col :md="24" :sm="24">
                 <a-form-item label="统计时间" class="screen-item">
                   <a-radio-group v-model="form.time_type">
                     <a-radio-button :value="1">
                       今天
                     </a-radio-button>
                     <a-radio-button :value="2" >
                       昨天
                     </a-radio-button>
                     <a-radio-button :value="3" >
                       本周
                     </a-radio-button>
                     <a-radio-button :value="4" >
                       本月
                     </a-radio-button>
                     <a-radio-button :value="5" >
                       自定义
                     </a-radio-button>
                   </a-radio-group>
                   <a-range-picker
                     style="margin-left: 10px;"
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
                 <a-form-item label="加油金额" class="screen-item-inline">
                   <a-input-number id="inputNumber" placeholder="数字" v-model="form.moneyleft" :min="0"/>
                   <span style="margin: 0 10px;">至</span>
                   <a-input-number id="inputNumber" placeholder="数字" v-model="form.moneyright" :min="0"/>
                 </a-form-item>
               </a-col>
                <a-col :md="24" :sm="24">
                  <a-form-item label="油品型号" class="screen-item-inline">
                    <a-select style="width: 200px" v-model="form.oil_id">
                      <a-select-option :value="item.id" v-for="(item,index) in oilList" :key="item.id">
                        {{ item.oils_name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="枪号" class="screen-item-inline">
                    <a-select style="width: 200px" v-model="form.gun_id">
                      <a-select-option :value="item.id" v-for="(item,index) in gunList" :key="item.id">
                        {{ item.gun_name }}
                      </a-select-option>
                    </a-select>
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
              销售明细列表
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
import { deleteNullAttr, isEmpty } from '@/utils/lzz.js'
import moment from 'moment';
import { STable } from '@/components'
import { getSelldetailList } from '@/api/oa'
import { getOilSetList,getGunList} from '@/api/order'
export default {
  name: 'query',
  components: {
    STable
  },
  data () {
    return {
      setVisible:false,
      setConfirmLoading: false,
      searchType:'高级搜索',
      gunList:[],
      oilList:[],
      diyDate:false,
      diyTime:null,
      form:{
        moneyleft:'',
        moneyright:'',
        start_time:'',
        end_time:'',
        time_type:'',
        oil_id:'',
        gun_id:''
      },
      value:'',
      // 表头
      columns: [
        {
          title: '订单编号',
          dataIndex: 'zf_number'
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
          title: '订单支付方式',
          customRender: function (text) {
            if (text.order_type == 118) {
              return '支付宝（商户被扫）'
            } else if (text.order_type == 108) {
              return '微信（商户主扫）'
            } else if (text.order_type == 109) {
              return '微信（小程序）'
            } else if (text.order_type == 117) {
              return '支付宝（商户主扫）'
            } else if (text.order_type == 9) {
              return '现金支付'
            } else if (text.order_type == 10) {
              return '银行卡支付'
            } else if (text.order_type == 5) {
              return '加油卡支付'
            }
          }
        },
        {
          title: '销售金额(元)',
          dataIndex: 'order_total',
        },
        {
          title: '总优惠金额',
          dataIndex: 'count_discount',
        },
        {
          title: '实际金额(元)',
          dataIndex: 'actually_paid',
        },
        {
          title: '油品销售量升数',
          dataIndex: 'order_liter',
        },
        {
          title: '油品名称',
          dataIndex: 'oils_name',
        },
        {
          title: '枪号id',
          dataIndex: 'oils_gunId',
        },
        {
          title: '枪号名称',
          dataIndex: 'oils_gunName',
        },
        {
          title: '油品单价',
          dataIndex: 'oils_money',
        },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        let _params = {
          page:1,
          size:10
        }
        return getSelldetailList(deleteNullAttr(this.form,_params))
          .then(res => {
            console.log(res.data.data)
            return {
              data: res.data.data, // 列表数组
              pageNo: parameter.pageNo,  // 当前页码
              pageSize:  parameter.pageSize,  // 每页页数
              totalCount: res.data.total, // 列表总条数
              totalPage: res.data.last_page // 列表总页数
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
    this.loadGunList()
    this.loadOilList()
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
    loadGunList () {
      getGunList().then(res => {
        this.gunList = res.data
      })
    },
    loadOilList () {
      getOilSetList().then(res => {
        this.oilList = res.data.data
      })
    },
    toSearch(){
      if(this.form.time_type != 5){
        this.form.star_time = '';
        this.form.end_time = '';
      }
      if(this.form.time_type == 5){
        if(isEmpty(this.form.start_time)||isEmpty(this.form.end_time)){
          this.$message.error("自定义时间不能为空");
          return;
        }
      }
      this.$refs.table.refresh()
    },
    timeChange (value, dateString) {
      this.form.start_time = moment(this.diyTime[0]._d).format('YYYY-MM-DD')
      this.form.end_time = moment(this.diyTime[1]._d).format('YYYY-MM-DD')
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
  color: #7c7ee2;
}
.select-all{
  margin-left: 16px;
  cursor: pointer;
}

</style>
