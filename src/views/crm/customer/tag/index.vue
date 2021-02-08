
<template>
  <div>
    <a-layout v-if="$route.name=='tag'">
      <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
        <div class="head-title">
          <span style="margin-right:5px;">客户标签</span>
          <a-popover placement="rightTop">
            <template slot="content">
              <div>标签数据每小时更新一次)</div>
            </template>
            <a-icon style="color: rgb(153, 153, 153);" type="question-circle" />
          </a-popover>
        </div>
        <div class="actionBtns">
          <a-button type="primary" @click="showEditTag('add')"> 新增标签 </a-button>
          <router-link :to="{ name: 'activity_add' }">
            <a-button> 创建营销活动 </a-button>
          </router-link>
          <a-button icon="export" v-if="selectedRows.length>0"> 导出数据 </a-button>
          <a-button v-if="selectedRows.length>0" @click="delAll"> 删除 </a-button>
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

            <span slot="name" slot-scope="text, record">
              <template>
                <router-link :to="{name:'CrmTagDetail',query:{id:record.id}}">{{text}}</router-link>
              </template>
            </span>

            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="delTag(record)">删除</a>
              </template>
            </span>
          </s-table>
        </div>
      </a-layout-content>
      <EditTag ref="EditTag" @save="resetList"></EditTag>
    </a-layout>
    <router-view />
  </div>
</template>

<script>
import { STable } from '@/components'
import EditTag from '../components/EditTag'

import { getlabellist, labeldel } from '@/api/crm'

export default {
  name: 'Tag',
  components: {
    STable,
    EditTag
  },
  data () {
    return {
      // 查询参数
      queryParam: { },
      // 表头
      columns: [
        {
          title: '标签名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '人数',
          dataIndex: 'count',
        },
        // 暂时不做
        // {
          // title: '应用活动（次）',
          // dataIndex: 'status',
        // },
        {
          title: '创建时间',
          dataIndex: 'create_time',
        },
        {
          title: '标签数据更新时间',
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
          size: parameter.pageSize, // 每页页数
        }
        return getlabellist(Object.assign(params)).then((res)=>{
          console.log(res.data.data)
          // 自定义出参
          // console.log(res.data.list)
          this.oldTotal = res.data.total
          return {
            data: res.data.data, // 列表数组
            pageNo: res.data.current_page,  // 当前页码
            pageSize: res.data.per_page,  // 每页页数
            totalCount: res.data.total, // 列表总条数
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
      optionAlertShow: false
    }
  },
  created () {
    this.tableOption()
  },
  methods: {
    resetList(){
      this.$refs.table.refresh(true)
      
    },
    delAll(){
      let that = this
      // console.log(this.selectedRows)
      let id = this.selectedRows.map(e=>{
        return e.id
      })
      // console.log(id)
      this.$confirm({
        title: '温馨提示',
        content: '删除会清除标签全部信息，是否删除？',
        onOk () {
          // console.log(item)
          labeldel(id).then(res=>{
            // console.log(res)
            that.selectedRowKeys = []
            that.selectedRows = []
            that.$message.success('删除成功')
            that.resetList()
          })
        },
        onCancel () {}
      })

    },
    delTag (item) {
      let that = this
      this.$confirm({
        title: '温馨提示',
        content: '删除会清除标签全部信息，是否删除？',
        onOk () {
          // console.log(item)
          labeldel([item.id]).then(res=>{
            // console.log(res)
            that.$message.success('删除成功')
            that.resetList()
          })
        },
        onCancel () {}
      })
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
.head-title{
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  border-bottom: 1px solid #eaeaf4;
  display: flex;
  align-items: center;
}

.actionBtns{
  display: flex;
  align-items: center;
  margin: 16px 0;
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
