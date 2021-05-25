<template>
  <div class="overview">
    <a-layout v-if="$route.name=='Ostatistics'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
       <h3 class="o-title">交班统计</h3>
        <a-divider />
         <div class="screen-box">
          <a-form layout="inline" >
            <a-row :gutter="48">
              <a-col :md="24" :sm="24">
                <a-form-item label="统计班次" class="screen-item-inline">
                  <a-date-picker v-model="form.time" @change="onChange" />
                </a-form-item>
              </a-col>
                <a-col :md="24" :sm="24">
                  <a-form-item label="油品型号" class="screen-item-inline">
                    <a-select style="width: 200px" v-model="form.oils_id">
                      <a-select-option :value="item.id" v-for="(item,index) in oilList" :key="item.id">
                        {{ item.oils_name }}
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
              汇总统计列表
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
import { getClassOrderList } from '@/api/oa'
import { getOilSetList,getGunList} from '@/api/order'
export default {
  name: 'Ostatistics',
  components: {
    STable
  },
  data () {
    return {
      setVisible:false,
      setConfirmLoading: false,
      searchType:'高级搜索',
      oilList:[],
      diyDate:false,
      diyTime:null,
      form:{
        time:null,
        oils_id:'',
      },
      value:'',
      // 表头
      columns: [
        {
          title: '班次',
          dataIndex: 'class_time'
        },
        {
          title: '加油员',
          dataIndex: 'class_user'
        },
        {
          title: '油单价',
          dataIndex: 'oils_money',
        },
        {
          title: '油名称',
          dataIndex: 'oils_name',
        },
        {
          title: '加油升数',
          dataIndex: 'total_liter',
        },
        {
          title: '销售总额',
          dataIndex: 'total_money',
        },
        {
          title: '优惠总额',
          dataIndex: 'yh_money',
        },
        {
          title: '实收总额',
          dataIndex: 'ss_money',
        },
        {
          title: '订单数量',
          dataIndex: 'order_count',
        },
        {
          title: '成功数量',
          dataIndex: 'order_success',
        },
        {
          title: '未支付数量',
          dataIndex: 'order_error',
        },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        let _params = {
          page:1,
          size:10
        }
        return getClassOrderList(deleteNullAttr(this.form,_params))
          .then(res => {
            console.log(res.data)
            return {
              data: res.data.data.list, // 列表数组
              pageNo: parameter.pageNo,  // 当前页码
              pageSize:  parameter.pageSize,  // 每页页数
              totalCount: res.data.data.totalCount, // 列表总条数
              totalPage: res.data.data.totalpage // 列表总页数
            }
          })
      },
    }
  },
  created () {
    this.loadOilList()
  },
  methods: {
    loadOilList () {
      getOilSetList().then(res => {
        this.oilList = res.data.data
      })
    },
    toSearch(){
      console.log(this.form)
      this.$refs.table.refresh()
    },
    onChange(value, dateString) {
      this.form.time = moment(this.form.time._d).format('YYYY-MM-DD')
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
