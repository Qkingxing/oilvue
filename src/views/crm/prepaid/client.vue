
<template>
  <a-layout>
    <a-layout-content
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title">
        加油卡客户
      </div>
      <div class="header-search">
        <div class="search-box">
          <div class="select-item">
            <div class="label">卡搜索</div>
            <a-input
              style="width: 100%"
              v-model="cardNumber"
              placeholder="请输入搜索内容"
            >
              <a-select
                slot="addonBefore"
                style="width: 93px"
                v-model="searchCardKey"
              >
                <a-select-option value="card_no"> 卡号 </a-select-option>
                <a-select-option value="card_face"> 卡面号 </a-select-option>
                <a-select-option value="mobile"> 手机号 </a-select-option>
              </a-select>
            </a-input>
          </div>
          <div class="select-item">
            <div class="label">卡类型</div>
            <a-select
              slot="addonBefore"
              style="width: 240px"
              default-value="85"
            >
              <a-select-option value="85"> 个人卡 </a-select-option>
            </a-select>
          </div>
          <div class="select-item">
            <div class="label">卡名称</div>
            <a-select
              slot="addonBefore"
              style="width: 240px"
              default-value="85"
            >
              <a-select-option value="85"> 全部 </a-select-option>
              <a-select-option value="86"> 卡面号 </a-select-option>
              <a-select-option value="87"> 手机号 </a-select-option>
            </a-select>
          </div>
          <div class="select-item">
            <div class="label">开卡时间</div>
            <a-range-picker 
              v-model="date" 
              style="width: 240px"
              @change="onChangeDate"/>
          </div>
        </div>
        <div class="action-btns">
          <a-button type="primary" class="search-btn" @click="search">查询</a-button>
          <a-button>导出</a-button>
        </div>
      </div>
      <div class="table-line">客户列表</div>

      <!-- 表格 -->
      <div class="showDataForTable">
        <s-table 
          ref="table" 
          :scroll="{ x: true }"
          rowKey="card_no" 
          :columns="columns" 
          :data="loadData">

          <span slot="card_status" slot-scope="text">
            <template>
              {{text==1?'正常':'已销户'}}
            </template>
          </span>
          
          <span slot="action" slot-scope="text, record">
            <template>
              <!-- <span 
                @click="Recharge(record)"
                style="margin-right: 10px; color: #7c7ee2; cursor: pointer;">
                充值</span> -->
              <span 
                @click="frozen(record)"
                style="margin-right: 10px; color: #7c7ee2; cursor: pointer;">
                冻结</span>
              <!-- <span 
                @click="cancellation(record)"
                style="margin-right: 10px; color: #7c7ee2; cursor: pointer;">
                销户</span> -->
            </template>
          </span>

        </s-table>
      </div>
    </a-layout-content>
    <RechargeModal ref="RechargeModal"/>
  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { oneselfcardlist, freeze } from '@/api/crm'

export default {
  name: 'Client',
  components: {
    STable,
    RechargeModal:()=>import('./client/RechargeModal')
  },
  data () {
    return {
      searchCardKey: 'card_no',
      cardNumber: undefined,
      date: [],
      // 查询参数
      queryParam: {
        card_no: undefined,
        //[string]	是	卡号		
        card_face: undefined,	
        //[string]	是	卡面号		
        mobile: undefined,	
        //[string]	是	手机号		
        card_id: undefined,	
        //[string]	是	卡名称 传递过来是ID		
        create_time1: undefined,	
        //[string]	是	开卡时间（小）		
        create_time2: undefined,	
        //[string]	是	开卡时间（大）
      },
      // 表头
      columns: [
        {
          title: '卡号',
          dataIndex: 'card_no'
        },
        {
          title: '卡面号',
          dataIndex: 'card_face'
        },
        {
          title: '卡名称',
          // dataIndex: 'status',
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
        },
        {
          title: '姓名',
          // dataIndex: 'status',
        },
        {
          title: '卡内余额',
          dataIndex: 'money',
        },
        {
          title: '赠送余额',
          // dataIndex: 'status',
        },
        {
          title: '开卡时间',
          dataIndex: 'create_time',
        },
        {
          title: '状态',
          dataIndex: 'card_status',
          scopedSlots: { customRender: 'card_status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        // console.log(this.searchCardKey)
        // console.log(this.cardNumber)
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          create_time1: this.queryParam.create_time1,
          create_time2: this.queryParam.create_time2,
        }
        params[this.searchCardKey] = this.cardNumber

        return oneselfcardlist(Object.assign(params))
        .then(res => {
          console.log(res.data.list)
          return {
            data: res.data.list, // 列表数组
            pageNo: parameter.pageNo,  // 当前页码
            pageSize: parameter.pageSize,  // 每页页数
            totalCount: res.data.totalCount, // 列表总条数
            totalPage: 1 // 列表总页数
          }
        })
      },
    }
  },
  created () {

  },
  methods: {
    // 更换时间
    onChangeDate(date,text){
      // console.log(date)
      // console.log(text)
      if (date.length) {
        this.queryParam.create_time1 = text[0]
        this.queryParam.create_time2 = text[1]
      }else{
        this.queryParam.create_time1 = undefined
        this.queryParam.create_time2 = undefined
      }
    },
    // 搜索
    search(){
      this.$refs.table.refresh()
    },
    // 充值
    Recharge(item){
      this.$refs['RechargeModal'].show(item.id)
    },
    // 冻结
    frozen (item) {
      let that = this

      this.$confirm({
        centered: true,
        title: '温馨提示',
        content: (
          <div>
            <p style="margin: 0px;">加油卡冻结后，将无法再进行支付</p>
            <p>是否确认冻结该加油卡</p>
          </div>
        ),
        onOk () {
          freeze(item.id).then(res=>{
            that.$refs.table.refresh()
          })
        },
        onCancel () {}
      })
    },
    // 注销
    cancellation (item) {
      let that = this

      this.$confirm({
        centered: true,
        title: '温馨提示',
        content: (
          <div>
            <p style="margin: 0px;">加油卡销户后，用户的加油卡将被删除</p>
            <p>是否确认继续操作</p>
          </div>
        ),
        onOk () {
          return new Promise((resolve, reject) => {
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },

   
  }
}
</script>
<style lang="less" scoped>
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}
.header-search{
  background-color: #f5f5fa;
  padding: 18px 0 16px 0;
  .search-box{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .select-item{
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      .label{
        width: 80px;
        text-align: right;
        color: #040a46;
        margin-right: 16px;
      }
    }
  }
  .action-btns{
    display: flex;
    align-items: center;
    margin-left: 80px;
    margin-top: 12px;
    .search-btn{
      margin-right: 8px;
    }
  }
}
.table-line{
  margin: 16px 0 8px 0;
  font-size: 14px;
  font-weight: 500;
  color: #040a46;
  line-height: 20px;
}
.showDataForTable {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 60px;
  overflow: hidden;
  .showSearchAndTotal {
    height: 63px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #040a46;
    line-height: 24px;
    padding: 23px 0 16px 0;
  }
  .dec {
    color: #3c3c46;
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
  }
}
.themeColor {
  color: #7c7ee2;
}
.select-all {
  margin-left: 16px;
  cursor: pointer;
}
</style>
