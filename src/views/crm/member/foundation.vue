<template>
  <a-layout>
    <a-layout-content
      v-if="type=='list'"
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title">
        基础设置
      </div>
      <div class="actionBtns">
        <a-button type="primary" @click="type='add'"> 新增基础设置 </a-button>
      </div>

      <!-- 表格 -->
      <div class="showDataForTable">
        <s-table 
          ref="table" 
          size="default" 
          rowKey="id" 
          :showPagination="false"
          :columns="columns" 
          :data="loadData">

          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="editItem(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="delTag(record)">删除</a>
            </template>
          </span>
          
        </s-table>
      </div>
    </a-layout-content>

    <FoundationAdd 
      v-if="type=='add'" 
      :type="type"
      @exit="type='list'"></FoundationAdd>
    <FoundationAdd 
      v-if="type=='edit'" 
      :type="type"
      @exit="type='list'"></FoundationAdd>
    
  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'
import { getUserBasicslist } from '@/api/crm'

export default {
  name: 'Foundation',
  components: {
    STable,
    FoundationAdd: ()=> import('./components/FoundationAdd')
  },
  data () {
    return {
      type: 'list',
      // 表头
      columns: [
        {
          title: '生效油站',
          dataIndex: 'group_name'
        },
        {
          title: '会员注册',
          dataIndex: 'member_type'
        },
        {
          title: '初始会员等级',
          dataIndex: 'level_name',
          needTotal: true
        },
        {
          title: '初始等级有效期',
          dataIndex: 'initial_day',
          needTotal: true
        },
        {
          title: '最近修改人',
          dataIndex: 'user_name',
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
        // console.log(parameter)
        // 自定义入参
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize // 每页页数
        }

        return getUserBasicslist(Object.assign(params)).then(res=>{
          // console.log(res.data)
          // 自定义出参
          return {
            data: res.data.list, // 列表数组
            pageNo: res.data.pageNo,  // 当前页码
            pageSize: res.data.pageSize,  // 每页页数
            totalCount: res.data.totalCount, // 列表总条数
            totalPage: res.data.per_page // 列表总页数
          }
        })
      },

    }
  },
  created () {},
  methods: {
    delTag () {
      this.$confirm({
        title: '操作提示',
        content: '撤回后将删除本次导入的客户数据，用户已授权的数据不会删除，请确认是否继续',
        onOk () {
          return new Promise((resolve, reject) => {
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },
    editItem(item){
      console.log(item)
    }
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

.actionBtns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 16px 0;
  button {
    // margin-right: 8px;
  }
}
.screen-box {
  padding: 27px 0 24px 0;
  .screen-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: #040a46;
  }
}
.search-btn {
  margin-left: 72px;
  margin-top: 8px;
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
  color: #3b85ff;
}
.select-all {
  margin-left: 16px;
  cursor: pointer;
}
</style>
