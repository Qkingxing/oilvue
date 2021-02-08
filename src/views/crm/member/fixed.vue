<template>
  <a-layout>
    <a-layout-content
      v-if="page=='level_list'"
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title">
        固定等级会员
      </div>
      <div class="actionBtns">
        <a-button type="primary" @click="page='add'"> 新增会员等级 </a-button>
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

          <div slot="discount_list" slot-scope="discount_list">
            <template>
              <div 
                v-for="(item,index) in discount_list" 
                :key="index">{{item.oils_name}}</div>
            </template>
          </div>

          <span slot="watch" slot-scope="text, record">
            <template>
              <a @click="openCertificationList(record)">认证列表</a>
              <a-divider type="vertical" />
              <a @click="openUserList(record)">用户列表</a>
            </template>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="openEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="delTag(record)">删除</a>
              <a-divider type="vertical" />
              <a @click="delTag(record)">下载等级码</a>
            </template>
          </span>

        </s-table>
      </div>
    </a-layout-content>

    <FixedEdit 
      v-if="page=='add'||page=='edit'"
      @exit="page='level_list'"
      :type="page"></FixedEdit>

    <FixedCertificationList 
      v-if="page=='certification_list'"
      @exit="page='level_list'"></FixedCertificationList>

    <FixedUserList 
      v-if="page=='user_list'"
      @exit="page='level_list'"></FixedUserList>

  </a-layout>
</template>

<script>
import { STable } from '@/components'


import { queryFixedLevel } from '@/api/crm'

export default {
  name: 'Fixed',
  components: {
    STable,
    FixedEdit: ()=>import('./components/FixedEdit'),
    FixedCertificationList: ()=>import('./components/FixedCertificationList'),
    FixedUserList: ()=>import('./components/FixedUserList'),
  },
  data () {
    return {
      page: 'level_list',
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '等级模板',
          dataIndex: 'template_icon'
        },
        {
          title: '等级名称',
          dataIndex: 'level_name'
        },
        {
          title: '生效油站',
          dataIndex: 'group_id',
        },
        {
          title: '等级优惠',
          key: 'discount_list',
          dataIndex: 'discount_list',
          scopedSlots: { customRender: 'discount_list' },
        },
        {
          title: '等级有效期',
          dataIndex: 'level_status',
        },
        {
          title: '最近修改人',
          dataIndex: 'userId',
        },
        {
          title: '查看',
          dataIndex: 'watch',
          scopedSlots: { customRender: 'watch' }
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
        return queryFixedLevel({}).then((res)=>{
          console.log(res.data)
          return {
            data: res.data, // 列表数组
          }
        })

      }
    }
  },
  created () { },
  methods: {
    openEdit(item){
      this.page = 'edit'
    },
    openUserList(item){
      this.page = 'user_list'
    },
    openCertificationList(item){
      this.page = 'certification_list'
    },
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
  // justify-content: flex-end;
  margin: 16px 0;
  button {
    margin-right: 8px;
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
