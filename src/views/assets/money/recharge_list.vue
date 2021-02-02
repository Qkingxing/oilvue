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
                    style="margin-left: 10px;"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledRangeTime"
                    :show-time="{
                      hideDisabledOptions: true,
                      defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                    }"
                    format="YYYY-MM-DD HH:mm:ss"
                   />
                   <span style="margin: 0 10px;">订单状态：</span>
                   <a-select default-value="lucy" style="width: 120px">
                     <a-select-option value="jack">
                       Jack
                     </a-select-option>
                     <a-select-option value="lucy">
                       Lucy
                     </a-select-option>
                   </a-select>
                   <a-input placeholder="请输入订单号后四位" style="width: 200px;margin-left: 10px;"></a-input>
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
              充值记录
            </span>
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
      </a-modal>
    <router-view />
  </div>
</template>

<script>
import moment from 'moment';
import { STable } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'
export default {
  name: 'RechargeList',
  components: {
    STable
  },
  data () {
    return {
      setVisible:false,
      setConfirmLoading: false,
      searchType:'高级搜索',
      diyDate:false,
      orderTime:'',
      radioValue: 'new',
      value:'',
      // 查询参数
      queryParam: {
        keyType: '86'
      },
      // 表头
      columns: [
        {
          title: '充值单号',
          dataIndex: 'no'
        },
        {
          title: '充值金额（元）',
          dataIndex: 'description'
        },
        {
          title: '充值时间',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '到帐时间',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '优惠金额',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '充值方式',
          // dataIndex: 'status',
          needTotal: true
        },
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
    console.log(this.$route.name)
    this.tableOption()
    getRoleList({ t: new Date() })
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
  color: #3b85ff;
}
.select-all{
  margin-left: 16px;
  cursor: pointer;
}

</style>
