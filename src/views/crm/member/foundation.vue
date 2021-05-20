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

          <span slot="member_type" slot-scope="text">
            <template>
              {{text==1?'支付即会员':'授权手机号'}}
            </template>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="editItem(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="delItem(record)">删除</a>
            </template>
          </span>
          
        </s-table>
      </div>
    </a-layout-content>

    <FoundationAdd 
      v-if="type=='add'||type=='edit'" 
      :type="type"
      :total="total"
      :itemData="itemData"
      @exit="type='list'"></FoundationAdd>
    
  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { getUserBasicslist,delBasicsset } from '@/api/crm'

export default {
  name: 'Foundation',
  components: {
    STable,
    FoundationAdd: ()=> import('./foundation/FoundationAdd')
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
          dataIndex: 'member_type',
          scopedSlots: { customRender: 'member_type' }
        },
        {
          title: '初始会员等级',
          dataIndex: 'level_name'
        },
        {
          title: '初始等级有效期',
          dataIndex: 'initial_day',
        },
        {
          title: '最近修改人',
          dataIndex: 'user_name',
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
          console.log(res.data.list)
          this.total = res.data.list.length
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
      itemData: null,
      total: 0,

    }
  },
  created () {},
  methods: {
    delItem (item) {
      let that = this
      this.$confirm({
        title: '操作提示',
        content: '删除不可恢复，请确认是否继续',
        onOk () {
          delBasicsset(item.id).then(()=>{
            that.$refs.table.refresh()
          })
        },
        onCancel () {}
      })
    },
    editItem(item){
      // console.log(item)
      this.itemData = item
      this.type = 'edit'
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
  color: #7c7ee2;
}
.select-all {
  margin-left: 16px;
  cursor: pointer;
}
</style>
