
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="head-title">
        <span>
          标签详情&nbsp;
          <a-popover placement="rightTop">
            <template slot="content">
              <div>标签数据每小时更新一次)</div>
            </template>
            <a-icon style="color: rgb(153, 153, 153);" type="question-circle" />
          </a-popover>
        </span>
        <a-button @click="$router.go(-1)"> 返回上一页 </a-button>
      </div>
      <div class="label-info">
        <div class="info-item">
          <div class="title">标签名称</div>
          <div class="content">{{name}}</div>
          <a @click="showEditTag('editTag')">修改名称</a>
        </div>
        <div class="info-item">
          <div class="title">客户人数</div>
          <div class="content">{{count}}</div>
        </div>
        <div class="info-item">
          <div class="title">应用活动</div>
          <div class="content">开发中...</div>
        </div>
      </div>
      <div class="table-title">客户列表</div>

      <!-- 表格 -->
      <div class="showDataForTable tag_detail">
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
        >
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="delTag(record)">修改</a>
              <a-divider type="vertical" />
              <a @click="delTag(record)">移除</a>
            </template>
          </span>
        </s-table>
      </div>
    </a-layout-content>
    <EditTag ref="EditTag" @save="resetList"></EditTag>
  </a-layout>
</template>

<script>
import { STable } from '@/components'
import EditTag from '../components/EditTag'

import { getServiceList } from '@/api/manage'
import { getLabeldetails } from '@/api/crm'

export default {
  name: 'CrmTagDetail',
  components: {
    STable,
    EditTag
  },
  data () {
    return {
      name: '',
      count: 0,
      // 表头
      columns: [
        {
          title: '客户子编号',
          dataIndex: 'sonnumber'
        },
        {
          title: '手机号',
          dataIndex: 'mobile'
        },
        {
          title: '会员等级',
          dataIndex: 'level_name'
        },
        {
          title: '客户身份',
          // dataIndex: 'level_name'
        },
        {
          title: '油品偏好',
          dataIndex: 'oils_name'
        },
        {
          title: '车牌号',
          // dataIndex: 'level_name'
        },
        {
          title: '最近加油时间',
          dataIndex: 'last_time'
        },
        {
          title: '近30天加油（升）',
          // dataIndex: 'level_name'
        },
        {
          title: '偏好油站',
          dataIndex: 'site_name'
        },
        // {
        //   title: '应用活动（次）',
        //   dataIndex: 'status',
        //   needTotal: true
        // },

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
          id: this.$route.query.id
        }
        return getLabeldetails(Object.assign(params)).then(res => {
          console.log(res.data)
          let { name, count } = res.data
          this.name = name
          this.count = count
          // 自定义出参
          // console.log(res.data.list)
          this.oldTotal = res.data.userinfo.total
          return {
            data: res.data.userinfo.data, // 列表数组
            pageNo: res.data.userinfo.current_page,  // 当前页码
            pageSize: res.data.userinfo.per_page,  // 每页页数
            totalCount: res.data.userinfo.total, // 列表总条数
            // totalPage: res.data.totalPage // 列表总页数
          }
        })
      },
    }
  },
  created () {
    console.log(this.$route.query.id)

  },
  methods: {
    resetList(){
      this.$refs.table.refresh(true)
    },
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
      this.$refs['EditTag'].show(type, this.$route.query.id, this.name)
    },
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
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.label-info{
  margin-bottom: 40px;
  .info-item{
    display: flex;
    line-height: 40px;
    position: relative;
    .title{
      width: 76px;
      text-align: right;
      color: #3c3c46;
      margin-right: 24px;
    }
    .content{
      color: #040a46;
      margin-right: 24px;
    }
  }
}
.table-title{
  font-size: 16px;
  color: #040a46;
  margin-bottom: 16px;
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
<style lang="less">
.showDataForTable{
  &.tag_detail{
    .ant-table{
      font-size: 12px;
    }
  }
  
}
</style>