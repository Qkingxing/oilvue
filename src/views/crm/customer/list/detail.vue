
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
        <a-button> 返回上一页 </a-button>
      </div>
      <div class="list">
        <div class="page-block">
          <div class="head-title">
            客户详情
          </div>
          <div class="base-info" style="border-right: none; border-bottom: none;">
            <div class="base-item">
              <div class="base-title">客户编号</div>
              <div class="base-val">-</div>
            </div>
            <div class="base-item">
              <div class="base-title">客户子编号</div>
              <div class="base-val">-</div>
            </div>
            <div class="base-item">
              <div class="base-title">手机号</div>
              <div class="base-val">-</div>
            </div>
            <div class="base-item rightBorder">
              <div class="base-title">昵称</div>
              <div class="base-val">-</div>
            </div>
            <div class="base-item">
              <div class="base-title">性别</div>
              <div class="base-val">-</div>
            </div>
            <div class="base-item">
              <div class="base-title">车牌号</div>
              <div class="base-val">-</div>
            </div>
            <div class="base-item">
              <div class="base-title">油品偏好</div>
              <div class="base-val">-</div>
            </div>
            <div class="base-item rightBorder">
              <div class="base-title">会员等级</div>
              <div class="base-val">1张</div>
              <a-button type="link" style="padding: 0px 8px 0px 0px;">修改</a-button>
            </div>
            <div class="base-item">
              <div class="base-title">客户身份</div>
              <div class="base-val">-</div>
            </div>
            <div class="base-item">
              <div class="base-title">现有积分</div>
              <div class="base-val">1张</div>
              <a-button type="link" style="padding: 0px 8px 0px 0px;">增加</a-button>
              <a-button type="link" style="padding: 0px 8px 0px 0px;">减少</a-button>
            </div>
            <div class="base-item">
              <div class="base-title">加油卡</div>
              <div class="base-val">1张</div>
              <a-button type="link" style="padding: 0px 8px 0px 0px;">查看</a-button>
            </div>
            <div class="base-item rightBorder">
              <div class="base-title">优惠券</div>
              <div class="base-val">1张</div>
              <a-button type="link" style="padding: 0px 8px 0px 0px;">查看</a-button>
              <a-button type="link" style="padding: 0px 8px 0px 0px;">发券</a-button>
            </div>
            <div class="base-item rightBorder">
              <div class="base-title">客户标签</div>
              <div class="base-val">
                <div class="label-box"><span>-</span></div>
                <a>修改</a>
              </div>
            </div>
            <div style="flex: 1 1 25%;"></div>
            <div style="flex: 1 1 25%;"></div>
            <div style="flex: 1 1 25%;"></div>
          </div>
          <a-tabs default-active-key="1" size="large">
            <a-tab-pane key="1" tab="Tab 1">
            </a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2" force-render>
            </a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3">
            </a-tab-pane>
          </a-tabs>

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
  color: #040a46;
  height: 55px;
  line-height: 41px;
  line-height: 24px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  padding: 22px 0 16px 0;
  border-bottom: 1px solid #eaeaf4;
}
.base-info{
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ededed;
  margin-bottom: 16px;
  .base-item{
    flex: 25%;
    min-height: 50px;
    border-bottom: 1px solid #ededed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #040a46;
    .base-title{
      width: 90px;
      background-color: #f8f8f9;
      padding-right: 10px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .base-val{
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 10px;
      text-align: left;
      .label-box{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        padding-top: 4px;
      }
      a{
        display: inline-block;
        width: 28px;
        font-size: 14px;
        margin-right: 16px;
      }
    }
    &.rightBorder{
      border-right: 1px solid #ededed;
    }
  }
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
    color: #040a46;
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
