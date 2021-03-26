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
          :scroll="{ x: 1300 }"
          ref="table" 
          size="default" 
          rowKey="id" 
          :showPagination="false"
          :columns="columns" 
          :data="loadData">

          <span slot="template_icon" slot-scope="item, row">
            <template>
              <img :src="item" style="max-width: 104px; height: 55px; cursor: pointer;">
            </template>
          </span>

          <div slot="group_name" >
            <template>
              {{userInfo.group_name}}
            </template>
          </div>
          <div 
            class="public_global_scroll"
            style="max-height: 7.6em; overflow: auto;"
            slot="discount_list" 
            slot-scope="discount_list,row">
            <template>
              <div 
                v-for="(item,index) in discount_list" 
                :key="index">
                <span v-if="row.discount_type==1">{{item.oils_name}} 每升优惠{{item.oils_money}}元</span>
                <span v-if="row.discount_type==2">{{item.oils_name}} 享{{item.oils_discount}}折</span>
              </div>
            </template>
          </div>

          <div slot="level_status" slot-scope="item, row">
            <template>
              <div v-if="item===1">永久</div>
              <div v-if="item===2">{{row.expired_time}}天</div>
              <div v-if="item===3">{{row.expired_time | moment}}过期</div>
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
              <a @click="delFixedLevel(record)">删除</a>
              <a-divider type="vertical" />
              <a @click="download(record)">下载等级码</a>
            </template>
          </span>

        </s-table>
      </div>
    </a-layout-content>

    <FixedEdit 
      v-if="page=='add'||page=='edit'"
      @exit="page='level_list'"
      :formData="item"
      :type="page"></FixedEdit>

    <FixedCertificationList 
      :itemData="item"
      v-if="page=='certification_list'"
      @exit="page='level_list'"></FixedCertificationList>

    <FixedUserList 
      :itemData="item"
      v-if="page=='user_list'"
      @exit="page='level_list'"></FixedUserList>

  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { mapGetters } from 'vuex'
import { queryFixedLevel,delFixedLevel } from '@/api/crm'

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
          dataIndex: 'template_icon',
          scopedSlots: { customRender: 'template_icon' },
          width: 160
        },
        {
          title: '等级名称',
          dataIndex: 'level_name',
          width: 160
        },
        {
          title: '生效油站',
          scopedSlots: { customRender: 'group_name' },
          width: 160
        },
        {
          title: '等级优惠',
          key: 'discount_list',
          dataIndex: 'discount_list',
          scopedSlots: { customRender: 'discount_list' },
          width: 160
        },
        {
          title: '等级有效期',
          dataIndex: 'level_status',
          scopedSlots: { customRender: 'level_status' },
          width: 160
        },
        {
          title: '最近修改人',
          dataIndex: 'user_name',
          width: 160
        },
        {
          title: '查看',
          dataIndex: 'watch',
          scopedSlots: { customRender: 'watch' },
          fixed: 'right'
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
        return queryFixedLevel({}).then((res)=>{
          // console.log(res.data)
          return {
            data: res.data, // 列表数组
          }
        })
      },
      item: {},
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () { 
    console.log(this.userInfo)
  },
  methods: {
    openEdit(item){
      this.item = item
      this.page = 'edit'
    },
    openUserList(item){
      this.item = item
      this.page = 'user_list'
    },
    openCertificationList(item){
      this.item = item
      this.page = 'certification_list'
    },
    delFixedLevel (item) {
      let that = this
      this.$confirm({
        title: '请注意',
        content: '删除后该等级用户将转化为动态等级会员',
        onOk () {
          delFixedLevel(item.id).then((res)=>{
            that.$message.success('删除成功')
            that.$refs.table.refresh()
          })
        },
        onCancel () {}
      })
    },
    download (item) {
      this.$confirm({
        title: '操作提示',
        content: '开发中...',
        onOk () {
          return new Promise((resolve, reject) => {
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
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
