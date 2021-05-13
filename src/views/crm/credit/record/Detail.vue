
<template>

  <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '700px', position: 'relative' }">
    <div class="head-title">
      客户积分记录
      <a-button type="info" @click="back">返回上一页</a-button>
    </div>

    <div class="page-contain">
      <div class="table-main-wrap">
        <div class="header-wrap">
          <div class="header-item">
            <span class="title">手机号</span>
            <span class="value">15264791111</span>
          </div>
          <div class="header-item">
            <span class="title">现有积分</span>
            <span class="value">
              <span>0 </span>
              <span class="creditsEdit">
                <em type="link" @click="openModal('plus')">增加</em>
                <em type="link" @click="openModal('reduce')">减少</em>
              </span>
            </span>
          </div>
          <div class="header-item">
            <span class="title">已用积分</span>
            <span class="value">0</span>
          </div>

          
        </div>
        <div class="table-wrap">
          <s-table
            ref="table"
            size="default"
            rowKey="id"
            :scroll="{ x: true }"
            :columns="columns"
            :data="loadData"
          >
            <span slot="type" slot-scope="text">
              <template>
                {{typeListText(text).text}}
              </template>
            </span>
          </s-table>
        </div>
      </div>
    </div>




    <ChangeIntegral 
      ref="ChangeIntegral"/>
  </a-layout-content>
</template>

<script>

import { STable } from '@/components'
import { getuserintegrallist } from '@/api/crm'
import { typeList } from '@/utils/enums'

export default {
  name: 'DetailRecord',
  components: {
    STable,
    ChangeIntegral:()=>import('./components/ChangeIntegral')
  },
  props:{
    user_id:{
      type: Number,
      default: null
    }
  },
  data () {
    return {
      typeList,
      // 表头
      columns: [
        {
          title: '时间',
          dataIndex: 'create_time'
        },
        {
          title: '积分变动油站',
          dataIndex: 'site_name'
        },
        {
          title: '积分类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '积分变动',
          dataIndex: 'integral'
        },
        {
          title: '积分总数',
          // dataIndex: 'sonnumber'
        },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          user_id: this.user_id
        }


        return getuserintegrallist(Object.assign(params))
          .then(res => {
            console.log(res)
            return {
              data: res.data.data, // 列表数组
              pageNo: parameter.pageNo,  // 当前页码
              pageSize: parameter.pageSize,  // 每页页数
              totalCount: res.data.total, // 列表总条数
              totalPage: res.data.current_page // 列表总页数
            }
          })
      },
    }
  },
  created () {
   
  },
  methods: {
    openModal(type){
      this.$refs.ChangeIntegral.showModal({
        user_id: this.user_id,
        type
      })
    },
    typeListText(value){
      let item = this.typeList.filter(e=>{
        return e.value === value
      })[0]
      // console.log(item)
      return item
    },
    back(){
      this.$emit('back')
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-contain{
  padding-top: 16px;
}
.table-main-wrap{
  .header-wrap{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    border: 1px solid #eaeaf4;
    .header-item{
      span{
        display: inline-block;
      }
      .title{
        width: 120px;
        text-align: center;
        line-height: 50px;
        background: #f8f8f9;
        border-right: 1px solid #eaeaf4;
      }
      .value{
        width: 250px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 20px;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }
    }
    .creditsEdit{
      cursor: pointer;
      color: #37f;
      padding-right: 15px;
      em{
        font-style: normal;
        margin: 0 4px;
      }
    }
  }
}
.table-wrap{
  margin-top: 16px;
}
</style>
