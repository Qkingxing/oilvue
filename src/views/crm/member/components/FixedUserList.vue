
<template>

    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="head-title">
        <span>
          {{itemData.level_name}}用户列表
        </span>
        <a-button @click="exit"> 返回上一页 </a-button>
      </div>


      <div class="table-header">
        
        <div class="searchBox">
          <a-input-search v-model="mobile" @search="$refs.table.refresh()" placeholder="请输入会员手机号" style="width: 200px" />
        </div>
        <div class="sub-title"></div>
      </div>

      <!-- 表格 -->
      <div class="showDataForTable">
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
        >
          <div slot="id" slot-scope="text, record">
            <template>
              <div class="handle-btn" style="margin: 0px;">{{text}}</div>
            </template>
          </div>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="delTag(record)">删除</a>
            </template>
          </span>
        </s-table>
      </div>
    </a-layout-content>

</template>

<script>
import { STable } from '@/components'
import { queryUserList } from '@/api/crm'

export default {
  name: 'FixedUserList',
  components: {
    STable
  },
  props:{
    itemData:{
      type: Object
    }
  },
  data () {
    return {
      // 查询参数
      queryParam: { },
      mobile: '',
      // 表头
      columns: [
        {
          title: '客户子编号',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '手机号',
          dataIndex: 'mobile'
        },
        {
          title: '姓名',
          dataIndex: 'user_id',
        },
        {
          title: '车牌号',
          dataIndex: 'license_plate',
        },
        {
          title: '获取等级渠道',
          dataIndex: 'certification_name'
        },
        {
          title: '获取等级时间',
          dataIndex: 'create_time',
        },
        {
          title: '到期时间',
          // dataIndex: 'create_time',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log(this.itemData)
        let params = {
          mobile: this.mobile,
          level_id: this.itemData.id,
          page: parameter.pageNo, // 页码
          limit: parameter.pageSize, // 每页页数
        }
        return queryUserList(params)
          .then(res => {
            
            return {
              data: res.data, // 列表数组
              pageNo: parameter.pageNo,  // 当前页码
              pageSize: parameter.pageSize,  // 每页页数
              totalCount: res.countPage, // 列表总条数
              totalPage: res.pageSize // 列表总页数
            }
          })
      },
      
    }
  },
  created () {},
  methods: {
    exit(){
      this.$emit('exit')
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
.table-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 16px;
  .sub-title{
    color: #040a46;
    font-weight: 500;
  }
  .searchBox{
    display: flex;
    align-items: center;
  }
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
.handle-btn{
  margin: 0 8px;
  color: #7c7ee2;
  cursor: pointer;
}

</style>
