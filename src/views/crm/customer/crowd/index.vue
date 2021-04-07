
<template>
  <div>
    <a-layout v-if="$route.name=='crowd'&&pageType=='list'">
      <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
        <div class="actionBtns">
          <div class="left-btns">
            <a-button type="primary" @click="openAdd()"> 新增客户分群 </a-button>
            <router-link :to="{ name: 'activity_add' }">
              <a-button> 创建营销活动 </a-button>
            </router-link>
            <a-button disabled> 创建短信 </a-button>
          </div>
          <div class="right-btns" v-if="selectedRows.length>0">
            <a-button @click="delAll"> 删除 </a-button>
            <a-button @click="exportAll"> 导出数据 </a-button>
          </div>
          
        </div>

        <!-- 表格 -->
        <div class="showDataForTable">
          <s-table
            ref="table"
            size="default"
            rowKey="id"
            :columns="columns"
            :data="loadData"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          >
            <span slot="grouping_name" slot-scope="text, record">
              <template>
                <router-link :to="{name:'CrmCrowdDetail',query:{id:record.id}}">{{text}}</router-link>
              </template>
            </span>
            <span slot="grouping_type" slot-scope="text">
              <template>
                {{text==0?'固定':'条件'}}
              </template>
            </span>
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="RefreshGrouping(record)">刷新</a>
                <a-divider type="vertical" />
                <a @click="edit(record)">编辑</a>
                <a-divider type="vertical" />
                <a @click="delGroup(record)">删除</a>
              </template>
            </span>
          </s-table>
        </div>
      </a-layout-content>

    </a-layout>
    <router-view @back="pageType='list'"/>

    <CrmCrowdAdd 
      v-if="pageType=='edit'"
      @back="pageType='list'"
      :itemId="itemId"
      :pageType="pageType" />

  </div>
</template>

<script>
import { STable } from '@/components'

import { getGroupinglist,delGrouping,RefreshGrouping } from '@/api/crm'

export default {
  name: 'Crowd',
  components: {
    STable,
    CrmCrowdAdd: ()=>import('./add')
  },
  data () {
    return {
      pageType: 'list',
      // 查询参数
      queryParam: { },
      // 表头
      columns: [
        {
          title: '客户群ID',
          dataIndex: 'id',
        },
        {
          title: '客户群名称',
          dataIndex: 'grouping_name',
          scopedSlots: { customRender: 'grouping_name' }
        },
        {
          title: '人数',
          dataIndex: 'peo_count',
        },
        {
          title: '类型',
          dataIndex: 'grouping_type',
          scopedSlots: { customRender: 'grouping_type' }
        },
        // 暂时不做
        // {
        //   title: '应用活动次数',
        //   dataIndex: 'status',
        // },
        {
          title: '客户群创建时间',
          dataIndex: 'create_time',
        },
        {
          title: '数据刷新时间',
          dataIndex: 'update_time',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        let params = {
          page: parameter.pageNo, // 页码
          limit: parameter.pageSize, // 每页页数
        }
        return getGroupinglist(Object.assign(params)).then(res => {
          console.log(res.data)
          // 自定义出参
          // console.log(res.data.list)
          this.oldTotal = res.countPage
          return {
            data: res.data, // 列表数组
            pageNo: parameter.pageNo,  // 当前页码
            pageSize: parameter.pageSize,  // 每页页数
            totalCount: res.countPage, // 列表总条数
            // totalPage: res.data.totalPage // 列表总页数
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
      optionAlertShow: false,
      itemId:null,
    }
  },
  created () {
    this.tableOption()
  },
  methods: {
    edit(item){
      this.itemId = item.id
      this.pageType = 'edit'
    },
    // 批量导出
    exportAll(){
      let id = this.selectedRows.map(e=>{
        return e.id
      })
      let that = this
      this.$confirm({
        title: '提示',
        content: (
          <div>
            <p class="text">报表已生成，请到数据——下载列表中下载</p>
          </div>
        ),
        okText: '去下载',
        onOk () {

          that.$router.push({
            path: '/dmp/report/download'
          })
        },
        onCancel () {}
      })

    },
    // 刷新
    RefreshGrouping(item){
      RefreshGrouping(item.id).then(()=>{
        this.$message.success('刷新成功')
        this.$refs.table.refresh()
      })
    },
    // 批量删除
    delAll(){
      
      let id = this.selectedRows.map(e=>{
        return e.id
      })

      let that = this
      this.$confirm({
        title: '温馨提示',
        content: '删除会清除群组全部信息，是否删除？',
        onOk () {
          delGrouping(id).then(()=>{
            that.$refs.table.refresh()
          })
        },
        onCancel () {}
      })
    },
    // 删除群组
    delGroup (item) {
      let that = this
      this.$confirm({
        title: '温馨提示',
        content: '删除会清除群组全部信息，是否删除？',
        onOk () {
          delGrouping([item.id]).then(()=>{
            that.$refs.table.refresh()
          })
        },
        onCancel () {}
      })
    },
    openAdd () {
      this.pageType = 'add'
      this.$router.push({
        name: 'CrmCrowdAdd'
      })
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
.head-title{
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}

.actionBtns{
  display: flex;
  align-items: center;
  margin: 16px 0;
  .right-btns{
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  button{
    margin-right: 8px;
  }
}
.screen-box{
  padding: 27px 0 24px 0;
  .screen-item{
    display: flex;
    align-items: center;
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
