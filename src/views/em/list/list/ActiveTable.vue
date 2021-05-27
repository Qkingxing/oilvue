<template>
  <div v-loading="loading">
    <div class="filterContentContainer">
      <div class="screen">
        <!-- <a-range-picker show-time></a-range-picker> -->
      </div>
      <div>
        <a-input-search 
          v-model="activity_name" 
          placeholder="请输入活动名称" style="width: 200px" 
          @search="$refs.table.refresh(true)"/>
      </div>
    </div>
    <div class="showDataForTable">
      <s-table
        ref="table"
        rowKey="id"
        :columns="columns"
        :data="loadData"
      >
        <div slot="activity_name" slot-scope="text, record" class="optionBox">
          <template>
            <router-link
              :to="{path:`/em/list/list`,query:{activityId:record.id}}"
              >{{text}}</router-link>
          </template>
        </div>
        <div slot="type" slot-scope="text, record" class="optionBox">
          <template>
            {{activeTypeText(text)}}
          </template>
        </div>
        <div slot="site_names" slot-scope="text, record" class="optionBox">
          <template>
            <span v-if="text.length==1">{{text[0]}}</span>

            <a-popover placement="right" v-else-if="text.length>1">
              <template slot="content">
                <div class="total-info-title">生效油站</div>
                <div class="total-info-content">{{text.join(';')}}</div>
              </template>
              <span class="">已选<span class="total-info-num">{{text.length}}</span>个</span>
            </a-popover>

            <span v-else>-</span>
          </template>
        </div>
        <div slot="attribute" slot-scope="text, record" class="optionBox">
          <template>
            {{text==1?'集团活动':'单站活动'}}
          </template>
        </div>
        <div slot="time" slot-scope="text, record" class="optionBox">
          <template>
            {{record.start_time}} 至 {{record.end_time}}
          </template>
        </div>
        <div slot="action" slot-scope="text, record" class="optionBox">
          <template>
            <router-link
              v-if="status==1||status==5"
             :to="{path:'/dmp/em/statistics'}">活动统计</router-link>
            <!-- <a>发送通知</a> -->

            <router-link 
              v-if="status==3&&(record.type==1)"
              :to="{
                path:'/em/marketing/activity_add',
                query:{
                  activityType: 102,
                  editId: record.id,
                  isEdit: 'true'
                }
              }"
            >编辑</router-link>

            <a 
              v-if="status==2"
              @click="activityApproval(record)">审批</a>
            <a 
              v-if="status==3"
              @click="activitdel(record)">删除</a>
            
          </template>
        </div>
      </s-table>
    </div>
  </div>
</template>

<script>
import { STable } from '@/components'
import { activeType } from '@/utils/enums'
import { getActivitlist, activitdel,activityApproval } from '@/api/em'
 
export default {
  name: 'ActiveTable',
  components: {
    STable
  },
  props:{
    status:{
      type: Number,
      default: 1,
    }
  },
  data(){
    return {
      loading: false,
      activeType,
      activity_name: '',
      // 表头
      columns: [
        {
          title: '活动名称',
          dataIndex: 'activity_name',
          scopedSlots: { customRender: 'activity_name' }
        },
        {
          title: '活动类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '生效油站',
          dataIndex: 'site_names',
          scopedSlots: { customRender: 'site_names' }
        },
        {
          title: '活动属性',
          dataIndex: 'attribute',
          scopedSlots: { customRender: 'attribute' }
        },
        {
          title: '活动时间',
          dataIndex: 'time',
          scopedSlots: { customRender: 'time' }
        },
        {
          title: '创建人',
          dataIndex: 'userName',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        this.loading = true
        // console.log('loadData.parameter', parameter)
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          activity_name: this.activity_name==''?undefined:this.activity_name, // 关键字
          status: this.status, // 类型

        }
        return getActivitlist(Object.assign(params)).then(res => {
          // console.log(res.data.list)
          this.loading = false
          return {
            data: res.data.list, // 列表数组
            pageNo: parameter.pageNo,  // 当前页码
            pageSize: parameter.pageSize,  // 每页页数
            totalCount: res.data.totalCount, // 列表总条数
            totalPage: res.data.per_page // 列表总页数
          }
        })
      },
    }
  },
  methods:{
    activityApproval(item){
      activityApproval(item.id).then(res=>{
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      })
    },
    // 删除
    activitdel(item){
      let that = this

      this.$confirm({
        title: '操作提示',
        content: '删除不可恢复，请确认是否继续',
        onOk () {
          activitdel(item.id).then(()=>{
            that.$message.success('删除成功')
            that.$refs.table.refresh()
          })
        },
        onCancel () {}
      })
    },
    activeTypeText(text){
      // console.log(text)
      let item = this.activeType.find(e=>{
        return e.value === Number(text)
      })
      // console.log(item)
      return item.label
    }
  } 
}
</script>

<style lang="less" scoped>
.filterContentContainer{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .screen{
    font-size: 12px;
    line-height: 22px;
    min-height: 40px;
    display: flex;
    align-items: center;
    .screen-li {
      display: inline-block;
      width: 48px;
      height: 24px;
      line-height: 24px;
      margin-right: 20px;
      text-align: center;
      color: #040a46;
      font-size: 12px;
      cursor: pointer;
      &.active{
        background-color: #ecf3ff;
        border-radius: 3px;
        color: #3c85ff;
      }
    }
  }
}
.showDataForTable{
  position: relative;
  display: block;
  width: 100%;
  padding-bottom: 60px;
  margin-top: 20px;
}

.current-exprot{
  border-color: #81a8f7;
  color: #81a8f7;
  margin-left: 15px;
}

.optionBox{
  &>a{
    margin: 0 10px;
  }
}
.total-info-num{
  color: #7c7ee2;
}
.total-info-title{
  font-size: 14px;
  font-weight: 400;
  color: #3c3c46;
  max-width: 322px;
}
.total-info-content{
  color: #1e1e28;
  margin-top: 13px;
  max-width: 322px;
}
</style>