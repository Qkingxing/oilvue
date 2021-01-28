
<template>
  <div>
    <a-layout v-if="$route.name=='crowd'">
      <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
        <div class="actionBtns">
          <a-button type="primary" @click="showEditTag('add')"> 新增客户分群 </a-button>
          <router-link :to="{ name: 'activity_add' }">
            <a-button> 创建营销活动 </a-button>
          </router-link>
          <a-button disabled> 创建短信 </a-button>
        </div>

        <!-- 表格 -->
        <div class="showDataForTable">
          <s-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns"
            :data="loadData"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="delTag(record)">刷新</a>
                <a-divider type="vertical" />
                <a @click="delTag(record)">编辑</a>
                <a-divider type="vertical" />
                <a @click="delTag(record)">删除</a>
              </template>
            </span>
          </s-table>
        </div>
      </a-layout-content>

    </a-layout>
    <router-view />
  </div>
</template>

<script>
import { STable } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'

export default {
  name: 'Crowd',
  components: {
    STable
  },
  data () {
    return {
      // 查询参数
      queryParam: { },
      // 表头
      columns: [
        {
          title: '客户群ID',
          dataIndex: 'no'
        },
        {
          title: '客户群名称',
          dataIndex: 'description'
        },
        {
          title: '人数',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '类型',
          dataIndex: 'time',
          needTotal: true
        },
        {
          title: '应用活动次数',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '客户群创建时间',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '数据刷新时间',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
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
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  methods: {
    delTag () {
      this.$confirm({
        title: '温馨提示',
        content: '删除会清除标签全部信息，是否删除？',
        onOk () {
          return new Promise((resolve, reject) => {
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },
    showEditTag (type) {

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
  color: #1e1e28;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
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
    color: #1e1e28;
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
    color: #1e1e28;
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
