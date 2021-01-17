
<template>
  <a-layout>
    <a-layout-content
      :style="{
        margin: '24px 0',
        padding: '0 24px 24px 24px',
        background: '#fff',
        minHeight: '280px',
        position: 'relative'
      }"
    >
      <div class="add-rule">
        <a-button> 返回上一页 </a-button>
      </div>
      <div class="list">
        <div class="page-block">
          <div class="head-title">
            客户详情
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
                <s-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData">
                  <span slot="watch" slot-scope="text, record">
                    <template>
                      <a @click="delTag(record)">认证列表</a>
                      <a-divider type="vertical" />
                      <a @click="delTag(record)">用户列表</a>
                    </template>
                  </span>
                  <span slot="action" slot-scope="text, record">
                    <template>
                      <a @click="delTag(record)">编辑</a>
                      <a-divider type="vertical" />
                      <a @click="delTag(record)">删除</a>
                      <a-divider type="vertical" />
                      <a @click="delTag(record)">下载等级码</a>
                    </template>
                  </span>
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

import { getRoleList, getServiceList } from '@/api/manage'

export default {
  name: 'CrmDetail',
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
          title: '等级模板',
          dataIndex: 'no'
        },
        {
          title: '等级名称',
          dataIndex: 'description'
        },
        {
          title: '生效油站',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '等级优惠',
          dataIndex: 'time',
          needTotal: true
        },
        {
          title: '等级有效期',
          // dataIndex: 'status',
          needTotal: true
        },
        {
          title: '最近修改人',
          // dataIndex: 'status',
          needTotal: true
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
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  created () {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
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
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log()
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
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
