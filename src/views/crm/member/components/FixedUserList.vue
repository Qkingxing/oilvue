
<template>

    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="head-title">
        <span>
          免审核用户列表
        </span>
        <a-button @click="exit"> 返回上一页 </a-button>
      </div>


      <div class="table-header">
        
        <div class="searchBox">
          <a-input-search placeholder="请输入会员手机号" style="width: 200px" />
        </div>
        <div class="sub-title"></div>
      </div>

      <!-- 表格 -->
      <div class="showDataForTable">
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadData"
        >
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
import { getServiceList } from '@/api/manage'

export default {
  name: 'FixedUserList',
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
          title: '客户子编号',
          dataIndex: 'no'
        },
        {
          title: '手机号',
          // dataIndex: 'no'
        },
        {
          title: '姓名',
        //   dataIndex: 'status',
        },
        {
          title: '车牌号',
        //   dataIndex: 'status',
        },
        {
          title: '获取等级渠道',
          dataIndex: 'description'
        },
        {
          title: '获取等级时间',
          dataIndex: 'status',
        },
        {
          title: '到期时间',
        //   dataIndex: 'time',
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

</style>
