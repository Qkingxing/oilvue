
<template>
  <a-layout>
    <a-layout-content 
      v-if="pageType=='list'"
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">
      <div class="addRuleBtn">
        <a-button type="primary" @click="addRule">
          新增积分规则
        </a-button>
      </div>
      <a-tabs default-active-key="1" size="large" @change="onChangeTab">
        <a-tab-pane key="1" tab="进行中">
          <s-table
            ref="table"
            size="default"
            rowKey="id"
            :columns="columns"
            :data="loadData"
          >
            <div slot="time" slot-scope="item, row">
              <template>
                {{row.start_time}} 至 {{row.end_time}}
              </template>
            </div>
            <div slot="site_ids" slot-scope="item, row">
              <template>
                <div
                  v-for="(it,index) in item"
                  :key="index">
                  {{it.site_name}}
                </div>
              </template>
            </div>

            <div slot="id" slot-scope="item, row">
              <template>
                <a @click="watch(row)">查看</a>
              </template>
            </div>

            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="stop(record)">结束</a>
              </template>
            </span>
          </s-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="待开始">
          <s-table
            ref="table"
            size="default"
            rowKey="id"
            :columns="columns"
            :data="loadData2"
          >
            <div slot="time" slot-scope="item, row">
              <template>
                {{row.start_time}} 至 {{row.end_time}}
              </template>
            </div>
            <div slot="site_ids" slot-scope="item, row">
              <template>
                <div
                  v-for="(it,index) in item"
                  :key="index">
                  {{it.site_name}}
                </div>
              </template>
            </div>

            <div slot="id" slot-scope="item, row">
              <template>
                <a @click="watch(row)">查看</a>
              </template>
            </div>

            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="editRule(record)">编辑</a>
                <a @click="stop(record)">删除</a>
              </template>
            </span>
          </s-table>
        </a-tab-pane>
        <a-tab-pane key="3" tab="已结束">
          <s-table
            ref="table"
            size="default"
            rowKey="id"
            :columns="columns3"
            :data="loadData3"
          >
            <div slot="time" slot-scope="item, row">
              <template>
                {{row.start_time}} 至 {{row.end_time}}
              </template>
            </div>
            <div slot="site_ids" slot-scope="item, row">
              <template>
                <div
                  v-for="(it,index) in item"
                  :key="index">
                  {{it.site_name}}
                </div>
              </template>
            </div>

            <div slot="id" slot-scope="item, row">
              <template>
                <a @click="watch(row)">查看</a>
              </template>
            </div>

          </s-table>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>

    <RuleDetail v-if="pageType=='detail'" :pageType="pageType" @back="pageType='list'"/>
    
    <RuleEdit 
      v-if="pageType=='edit'||pageType=='add'" 
      :pageType="pageType" 
      :itemData="itemData"
      @back="pageType='list'"/>
  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { getServiceList } from '@/api/manage'
import { getIntegralrulelist } from '@/api/crm'
import { mapGetters } from 'vuex'

export default {
  name: 'Rule',
  components: {
    STable,
    RuleDetail: ()=>import('./rule/detail'),
    RuleEdit: ()=>import('./rule/edit')
  },
  data () {
    return {
      pageType: 'list',
      // 表头
      columns: [
        {
          title: '活动时间',
          scopedSlots: { customRender: 'time' }
        },
        {
          title: '活动油站',
          dataIndex: 'site_ids',
          scopedSlots: { customRender: 'site_ids' }
        },
        {
          title: '积分规则',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '操作人',
          dataIndex: 'user_name',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      columns3: [
        {
          title: '活动时间',
          scopedSlots: { customRender: 'time' }
        },
        {
          title: '活动油站',
          dataIndex: 'site_ids',
          scopedSlots: { customRender: 'site_ids' }
        },
        {
          title: '积分规则',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '操作人',
          dataIndex: 'user_name',
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          type: 1
        }
        return getIntegralrulelist(Object.assign(params)).then(res=>{
          // console.log(res.data.list)
          // 自定义出参

          return {
            data: res.data.list, // 列表数组
            pageNo: res.data.pageNo,  // 当前页码
            pageSize: res.data.pageSize,  // 每页页数
            totalCount: res.data.totalCount, // 列表总条数
            totalPage: res.data.totalPage // 列表总页数
          }
        })
      },
      loadData2: parameter => {
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          type: 2
        }
        return getIntegralrulelist(Object.assign(params)).then(res=>{
          // console.log(res.data.list)
          // 自定义出参

          return {
            data: res.data.list, // 列表数组
            pageNo: res.data.pageNo,  // 当前页码
            pageSize: res.data.pageSize,  // 每页页数
            totalCount: res.data.totalCount, // 列表总条数
            totalPage: res.data.totalPage // 列表总页数
          }
        })
      },
      loadData3: parameter => {
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          type: 3
        }
        return getIntegralrulelist(Object.assign(params)).then(res=>{
          // console.log(res.data.list)
          // 自定义出参

          return {
            data: res.data.list, // 列表数组
            pageNo: res.data.pageNo,  // 当前页码
            pageSize: res.data.pageSize,  // 每页页数
            totalCount: res.data.totalCount, // 列表总条数
            totalPage: res.data.totalPage // 列表总页数
          }
        })
      },
      itemData:{}

    }
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  created () {
    console.log(this.userInfo)
  },
  methods: {
    editRule(item){
      this.itemData = item
      this.pageType = 'edit'
    },
    // 新增规则
    addRule(){  
      this.pageType = 'add'
    },
    onChangeTab(type){
      // console.log(type)
    },
    watch(item){
      // console.log(item)
      this.itemData = item
      this.pageType = 'detail'
    },
    // 结束规则
    stop(){
      this.$confirm({
        title: '温馨提示',
        content: '积分规则停用后将不再生效，是否确认停用',
        onOk () {
          return new Promise((resolve, reject) => {
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    }

  }
}
</script>
<style lang="less" scoped>
.addRuleBtn{
  position: absolute;
  right: 24px;
  top: 12px;
  z-index: 70;
}
a{
  margin: 0 5px;
}
</style>
