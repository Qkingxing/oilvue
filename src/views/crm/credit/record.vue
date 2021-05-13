
<template>
  <a-layout>
    <a-layout-content v-if="pageType=='list'" :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">
      <div class="head-title">
        客户积分记录
        <a-button type="primary" @click="pageType='add'">手动新增积分</a-button>
      </div>
      <div class="customer-statistics">
        <div class="invoice-card-box" v-for="(card,key) in headCardList" :key="key">
          <div class="box-title"><span>{{cardText[key]}}</span></div>
          <div class="box-content">
            <countTo
              class="value"
              :startVal="0"
              :endVal="card"
              :duration="3000"
            ></countTo>
            <span class="unit"></span>
          </div>
        </div>
      </div>
      <a-tabs v-model="type" size="large">
        <a-tab-pane key="1" tab="积分变动记录">
          <div class="search-wrap">
            <timePicker @change="onChangeTime"/>
            <div>
              <a-input-search 
                @search="$refs.table.refresh()"
                v-model="sreach"
                placeholder="请输入手机号/客户编号" style="width: 200px" />
              <a-button class="current-exprot">导出数据</a-button>
            </div>
          </div>
          <s-table
            ref="table"
            size="default"
            rowKey="id"
            :scroll="{ x: true }"
            :columns="columns"
            :data="loadData"
          >
            <span slot="type" slot-scope="text">
              <template>
                {{typeListText(text).text}}
              </template>
            </span>

          </s-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="积分获取记录">
          <div class="search-wrap">
            <timePicker @change="onChangeTime"/>
            <div>
              <a-input-search 
                @search="$refs.table.refresh()"
                v-model="sreach"
                placeholder="请输入手机号/客户编号" style="width: 200px" />
              <a-button class="current-exprot">导出数据</a-button>
            </div>
          </div>
          <s-table
            ref="table"
            size="default"
            rowKey="id"
            :scroll="{ x: true }"
            :columns="columns"
            :data="loadData"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="delTag(record)">撤回</a>
              </template>
            </span>
          </s-table>
        </a-tab-pane>
        <a-tab-pane key="3" tab="积分消耗记录">
          <div class="search-wrap">
            <timePicker @change="onChangeTime"/>
            <div>
              <a-input-search 
                @search="$refs.table.refresh()"
                v-model="sreach"
                placeholder="请输入手机号/客户编号" style="width: 200px" />
              <a-button class="current-exprot">导出数据</a-button>
            </div>
          </div>
          <s-table
            ref="table"
            size="default"
            rowKey="id"
            :scroll="{ x: true }"
            :columns="columns"
            :data="loadData"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="delTag(record)">撤回</a>
              </template>
            </span>
          </s-table>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>

    <AddRecord 
      ref="AddRecord" 
      v-if="pageType=='add'" 
      @back="pageType='list'"
      @godetail="godetail"/>
    
    <DetailRecord 
      ref="DetailRecord"
      v-if="pageType == 'detail'"
      @back="pageType='list'"
      :user_id="itemID"/>

  </a-layout>
</template>

<script>
import { STable } from '@/components'
import { typeList } from '@/utils/enums'
import { getIntegralrecordlist,getIntegralStatistics } from '@/api/crm'

export default {
  name: 'Record',
  components: {
    STable,
    timePicker:()=>import('./record/components/timePicker'),
    AddRecord: ()=>import('./record/Add'),
    DetailRecord: ()=>import('./record/Detail'),
  },
  data () {
    return {
      pageType: 'list',
      headCardList: {},
      cardText: {
        grant_integral: '累计发放积分',
        surplus_integral: '剩余有效积分',
        consume_integral: '累计消耗积分',
        expire_integral: '累计过期积分',
        else_expire_integral: '积分跨站消耗',
        Add_manually: '手动新增积分',
        Manual_deduction: '手动减扣积分',
      },
      typeList,
      type:'1',
      time: {
        time_type: 1
      },
      sreach: '',
      // 表头
      columns: [
        {
          title: '客户子编号',
          dataIndex: 'sonnumber'
        },
        {
          title: '手机号',
          dataIndex: 'mobile'
        },
        {
          title: '类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '兑换商品',
          dataIndex: 'goods_name',
        },
        {
          title: '积分变动',
          dataIndex: 'integral',
        },
        {
          title: '积分总数',
          dataIndex: 'user_integral',
        },
        {
          title: '积分变更油站',
          dataIndex: 'site_name',
        },
        {
          title: '时间',
          dataIndex: 'create_time',
        },
        {
          title: '关联订单',
          dataIndex: 'order_id',
        },
        {
          title: '备注',
          dataIndex: 'remark',
        },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          type: this.type,
          sreach: this.sreach,
          time_type: this.time.time_type,
          starting_time: this.time.time_type===5?this.time.time[0]:'',
          end_time: this.time.time_type===5?this.time.time[1]:'',
        }

        // console.log(this.time)
        return getIntegralrecordlist(Object.assign(params))
          .then(res => {
            // console.log(res)
            return {
              data: res.data.data, // 列表数组
              pageNo: parameter.pageNo,  // 当前页码
              pageSize: parameter.pageSize,  // 每页页数
              totalCount: res.data.total, // 列表总条数
              totalPage: res.data.current_page // 列表总页数
            }
          })
      },
      itemID: null,
      
    }
  },
  created () {
    // 拉取头部卡片数据
    getIntegralStatistics().then((res=>{
      // console.log(res.data)
      this.headCardList = res.data
    }))

  },
  methods: {
    godetail(item){
      // console.log(item)
      this.itemID = item.id
      this.pageType = 'detail'
    },
    typeListText(value){
      let item = this.typeList.filter(e=>{
        return e.value === value
      })[0]
      // console.log(item)
      return item
    },
    onChangeTime(value){
      // console.log(value)
      this.time = value
      this.$refs.table.refresh()
    },

  }
}
</script>
<style lang="less" scoped>
.head-title{
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.invoice-card-box{
  position: relative;
  height: 128px;
  width: 242px;
  display: inline-block;
  text-align: center;
  margin-right: 8px;
  margin-bottom: 8px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
  .box-title{
    position: absolute;
    top: 30px;
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    color: #3c3c46;
  }
  .box-content{
    position: absolute;
    top: 63px;
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 100%;
    .value{
      font-size: 34px;
      font-weight: 700;
      line-height: 34px;
      color: #040a46;
    }
    .unit {
      font-size: 12px;
      color: #040a46;
      margin-left: 5px;
      transform: translateY(-1px);
    }
  }
}
.customer-statistics{
  margin-top: 16px;
  width: 102%;
  .invoice-card-box{
    height: 108px;
    width: 271px;
    box-shadow: none;
    border: 1px solid #eaeaf4;
    .box-title{
      text-align: left;
      top: 24px;
      left: 24px;
    }
    .box-content{
      top: 49px;
      left: 24px;
      text-align: left;
      justify-content: start;
      .value{
        color: #7C7EE2;
      }
    }
  }
}
.search-wrap{
  display: flex;
  justify-content: space-between;
  
}
.current-exprot{
  margin-left: 15px;
}
</style>
