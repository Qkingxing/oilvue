<template>
  <a-layout>
    <a-layout-content
      :style="{
       
        padding: '0 24px 24px 24px',
        background: '#fff',
        minHeight: '280px',
        position: 'relative'
      }"
    >
      <div class="add-rule">
        <a-button type="primary"> 新增会员规则 </a-button>
      </div>
      <div class="list">
        <div class="page-block">
          <div class="head-title">
            成长值设置
            <span class="rule-status">生效中</span>
          </div>
          <div class="page-content">
            <div class="growth-setting">
              <div class="setting-item">
                <div class="setting-title">生效时间</div>
                <div class="setting-content">2021-01-14 00:00:00</div>
              </div>
              <div class="setting-item">
                <div class="setting-title">生效油站</div>
                <div class="setting-content">鹰眼集团</div>
              </div>
              <div class="setting-item">
                <div class="setting-title">成长值累积门槛</div>
                <div class="setting-content">订单实付金额大于9.90元时，才计算成长值</div>
              </div>
              <div class="setting-item">
                <div class="setting-title">成长值累积规则</div>
                <div class="setting-content">
                  <div style="line-height: 1em; padding-top: 16px;">油品不限，每消费1元获得2.00个成长值</div>
                </div>
              </div>
            </div>
            <div class="growth-level">
              <div class="level-title">会员规则设置</div>
              <div class="level-content">
                <s-table 
                  ref="table" 
                  size="default" 
                  rowKey="id" 
                  :showPagination="false"
                  :columns="columns" 
                  :data="loadData">

                </s-table>
              </div>
            </div>
          </div>
          <div class="page-foot">
            <a-button> 立即停用 </a-button>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { STable } from '@/components'


import { queryMemberSpalevel } from '@/api/crm'

export default {
  name: 'Grow',
  components: {
    STable
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '等级',
          dataIndex: 'level',
          key: 'level'
        },
        {
          title: '等级模板',
          dataIndex: 'level_icon',
          key: 'level_icon'
        },
        {
          title: '等级名称',
          dataIndex: 'level_name',
          key: 'level_name',
        },
        {
          title: '所需成长值',
          dataIndex: 'growth_start',
          key: 'growth_start',
        },
        {
          title: '扣减周期',
          dataIndex: 'deductions_deductions',
          key: 'deductions_deductions',
        },
        {
          title: '扣减值',
          dataIndex: 'deductions',
          key: 'deductions',
        },
        {
          title: '等级优惠',
          // dataIndex: 'status',
        },
        {
          title: '操作人',
          // dataIndex: 'watch',
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        return queryMemberSpalevel({}).then(res=>{
          console.log(res.data)
          return {
            data: res.data, // 列表数组
            pageNo: 1,  // 当前页码
            pageSize: 99,  // 每页页数
            totalCount: 99, // 列表总条数
            totalPage: 99 // 列表总页数
          }
          // return res.data
        })

      }
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
    }
  }
}
</script>
<style lang="less" scoped>
.add-rule {
  position: absolute;
  right: 24px;
  top: 10px;
}
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e1e28;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}
.rule-status {
  padding-left: 10px;
  color: #1890ff;
}
.page-content {
  margin-top: 30px;
}
.growth-setting {
  .setting-item {
    display: flex;
    .setting-title {
      line-height: 45px;
      width: 128px;
      margin-right: 20px;
      text-align: right;
    }
    .setting-content {
      line-height: 45px;
    }
  }
}
.growth-level {
  margin-top: 15px;
  .level-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 60px;
    color: #1e1e28;
  }
}
.page-foot {
  text-align: center;
  margin-top: 50px;
  button {
    margin-right: 20px;
  }
}
</style>
