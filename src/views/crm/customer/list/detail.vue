
<template>
  <a-layout>
    <a-layout-content
      v-if="pageType=='detail'"
      :style="{
       
        padding: '0 24px 24px 24px',
        background: '#fff',
        minHeight: '280px',
        position: 'relative'
      }"
    >
      <div class="add-rule">
        <a-button @click="$router.go(-1)"> 返回上一页 </a-button>
      </div>
      <div class="list">
        <div class="page-block">
          <div class="head-title">
            客户详情
          </div>
          <div class="base-info" style="border-right: none; border-bottom: none;" v-if="detail">
            <div class="base-item">
              <div class="base-title">客户编号</div>
              <div class="base-val">{{detail.id}}</div>
            </div>
            <div class="base-item">
              <div class="base-title">客户子编号</div>
              <div class="base-val">{{detail.sonnumber}}</div>
            </div>
            <div class="base-item">
              <div class="base-title">手机号</div>
              <div class="base-val">{{detail.mobile}}</div>
            </div>
            <div class="base-item rightBorder">
              <div class="base-title">昵称</div>
              <div class="base-val">{{detail.nickname}}</div>
            </div>
            <div class="base-item">
              <div class="base-title">性别</div>
              <div class="base-val">{{detail.sex}}</div>
            </div>
            <div class="base-item">
              <div class="base-title">车牌号</div>
              <div class="base-val">{{detail.plate_number}}</div>
              <a-button type="link" style="padding: 0px 8px 0px 0px;">编辑</a-button>
            </div>
            <div class="base-item">
              <div class="base-title">油品偏好</div>
              <div class="base-val">{{detail.oils_name}}</div>
            </div>
            <div class="base-item rightBorder">
              <div class="base-title">会员等级</div>
              <div class="base-val">{{detail.level_name}}</div>
              <a-button type="link" style="padding: 0px 8px 0px 0px;">修改</a-button>
            </div>
            <div class="base-item">
              <div class="base-title">客户身份</div>
              <div class="base-val">{{identityText(detail.identity_id)}}</div>
            </div>
            <div class="base-item">
              <div class="base-title">现有积分</div>
              <div class="base-val">{{detail.integral}}</div>
              <a-button type="link" style="padding: 0px 8px 0px 0px;" @click="openChangeIntegralModal('plus')">增加</a-button>
              <a-button type="link" style="padding: 0px 8px 0px 0px;" @click="openChangeIntegralModal('reduce')">减少</a-button>
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
              <a-button type="link" style="padding: 0px 8px 0px 0px;" @click="pageType='SendCoupon'">发券</a-button>
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
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="消费记录">
            </a-tab-pane>
            <a-tab-pane key="2" tab="加油卡记录">
            </a-tab-pane>
            <a-tab-pane key="3" tab="优惠券记录">
            </a-tab-pane>
            <a-tab-pane key="4" tab="等级记录">
            </a-tab-pane>
            <a-tab-pane key="5" tab="积分记录">
            </a-tab-pane>
            <a-tab-pane key="6" tab="身份认证记录">
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

    <SendCoupon 
      ref="SendCoupon"
      v-if="pageType=='SendCoupon'"/>

    <ChangeIntegral 
      ref="ChangeIntegral"/>
  </a-layout>
</template>

<script>
import { STable } from '@/components'
import { identitySelect } from '@/utils/enums'

import { getServiceList } from '@/api/manage'

import { getUserdefault } from '@/api/crm'

export default {
  name: 'CrmDetail',
  components: {
    STable,
    ChangeIntegral: ()=>import('./components/ChangeIntegral'),
    SendCoupon: ()=>import('./components/SendCoupon')
  },
  data () {
    return {
      pageType: 'detail',
      detail: null,
      identitySelect,
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
        // console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      
    }
  },
  created () {
    getUserdefault(this.$route.query.id).then(res=>{
      // console.log(res)
      this.detail = res.data
    })
  },
  methods: {
    // 增加减少积分
    openChangeIntegralModal(type){
      this.$refs.ChangeIntegral.showModal({
        user_id: this.detail.user_id,
        type
      })
    },
    identityText(id){
      let item = this.identitySelect.find(e=>{
        return e.value === id
      })
      // console.log(item)
      if (item&&item.value) {
        return item.label
      }else{
        return '-'
      }
      
    },
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
