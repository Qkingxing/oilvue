
<template>
  <a-layout>
    <a-layout-content
      :style="{
        padding: '0 24px 24px 24px',
        background: '#fff',
        minHeight: '700px',
        position: 'relative'
      }"
    >
      <div class="add-rule">
        <a-button >下载核销码</a-button>
      </div>
      <div class="list">
        <div class="page-block">
          <div class="head-title">
            优惠券列表
          </div>
          <div class="page-content">
            <a-row :gutter="16">
              <a-col :span="8">
                <div class="screen-item">
                  <div class="label">搜索</div>
                  <a-input-search 
                    v-model="q.coupons_name"
                    placeholder="请输入券id/券名称" 
                    style="width: 200px" @search="$refs.table.refresh()" />
                </div>
              </a-col>
              <a-col :span="8">
                <div class="screen-item">
                  <div class="label">券状态</div>
                  <a-select v-model="q.activation_type" style="width: 200px" >
                    <a-select-option value="-1">
                      全部
                    </a-select-option>
                    <a-select-option value="1">
                      已激活
                    </a-select-option>
                    <a-select-option value="0">
                      未激活
                    </a-select-option>

                  </a-select>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="screen-item">
                  <div class="label">券类型</div>
                  <a-select v-model="q.volume_type" style="width: 200px" >
                    <a-select-option value="-1">
                      全部
                    </a-select-option>
                    <a-select-option value="1">
                      油品券
                    </a-select-option>
                    <a-select-option value="2">
                      非油品券
                    </a-select-option>

                  </a-select>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="screen-item">
                  <div class="label">是否过期</div>
                  <a-select v-model="q.is_expired" style="width: 200px" >
                    <a-select-option value="3">
                      全部
                    </a-select-option>
                    <a-select-option value="1">
                      未过期
                    </a-select-option>
                    <a-select-option value="2">
                      已过期
                    </a-select-option>
                  </a-select>
                </div>
              </a-col>
            </a-row>
            

            <div class="search-btn">
              <a-button type="primary" @click="$refs.table.refresh()">搜索</a-button>
            </div>

            <div class="growth-level">
              <div class="level-content">
                <s-table 
                  ref="table" 
                  size="default" 
                  rowKey="id" 
                  :columns="columns" 
                  :data="loadData">

                  <div slot="coupons_amount" slot-scope="text, record">
                    <template>
                      {{text}}元
                    </template>
                  </div>

                  <div slot="validity_type" slot-scope="text, record">
                    <template>
                      <span v-if="text==1">
                        自领取日{{record.effective_day}}天内有效!	
                      </span>
                      <span v-if="text==2">
                        {{record.start_time}}至{{record.end_time}}
                      </span>
                    </template>
                  </div>
                  
                  <div slot="action" slot-scope="text, record" class="showDataForOperation">
                    <template>
                      <a type="link" @click="delTag(record)">详情</a>
                      <a type="link" @click="delTag(record)">激活</a>
                      <a type="link" @click="delTag(record)">删除</a>

                    </template>
                  </div>
                </s-table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { STable } from '@/components'


import { getCoupons } from '@/api/em'

export default {
  name: 'Couponlist',
  components: {
    STable
  },
  data () {
    return {
      // 查询参数
      q: {
        coupons_name: "",// 也可以coupons_name查询优惠券名称和优惠券id
        is_expired: "3", // 是否过期 1:已过期，2：未过期，null：全部
        activation_type: "-1",// 激活状态 1：激活，0：未激活, -1
        volume_type: "-1",// 1:油品卷，2：商品卷 -1
      },
      // 表头
      columns: [
        {
          title: '券ID',
          dataIndex: 'id'
        },
        {
          title: '券名称',
          dataIndex: 'coupons_name'
        },
        {
          title: '券金额',
          dataIndex: 'coupons_amount',
          scopedSlots: { customRender: 'coupons_amount' }
        },
        {
          title: '券有效期',
          dataIndex: 'validity_type',
          scopedSlots: { customRender: 'validity_type' }
        },
        {
          title: '生效活动',
          dataIndex: 'status',
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
        },
        {
          title: '激活时间',
          dataIndex: 'update_time',
        },
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
          limit: parameter.pageSize, // 每页页数
          coupons_name: this.q.coupons_name,
          is_expired: this.q.is_expired==='3'?null:this.q.is_expired,
          activation_type: this.q.activation_type==='-1'?null:this.q.activation_type,
          volume_type: this.q.volume_type==='-1'?null:this.q.volume_type,
        }

        return getCoupons(Object.assign(params)).then(res => {
          // console.log(res.data)
          return {
            data: res.data, // 列表数组
            pageNo: parameter.pageNo,  // 当前页码
            pageSize: parameter.pageSize,  // 每页页数
            totalCount: res.data.length, // 列表总条数
            totalPage: res.countPage // 列表总页数
          }
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
.showDataForOperation{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  a{
    display: block;
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
  }
}

</style>
