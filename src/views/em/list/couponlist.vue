
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
        <a-input-search placeholder="input search text" style="width: 200px" />
      </div>
      <div class="list">
        <div class="page-block">
          <div class="head-title">
            优惠券列表
          </div>
          <div class="page-content">
            <div class="screen-item">
              <div class="label">券状态</div>
              <a-select default-value="lucy" style="width: 200px" >
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled" disabled>
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </div>
            <div class="screen-item">
              <div class="label">券类型</div>
              <a-select default-value="lucy" style="width: 200px" >
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled" disabled>
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </div>
            <div class="screen-item">
              <div class="label">是否过期</div>
              <a-select default-value="lucy" style="width: 200px" >
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled" disabled>
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </div>
            <div class="search-btn">
              <a-button type="primary">搜索</a-button>
            </div>
            <div class="growth-level">
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
  name: 'Couponlist',
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
.screen-item{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .label{
    width: 60px;
    text-align: right;
    margin-right: 16px;
  }
}
.search-btn{
  padding: 4px 0 0 72px;
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
