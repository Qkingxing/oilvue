
<template>
  <a-layout v-loading="loading">
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="head-title">
        <span>
          客群详情
        </span>
        <a-button @click="$router.go(-1)"> 返回上一页 </a-button>
      </div>
      <!-- 固定 -->
      <div class="crowInfo">
        <div class="info-item">
          <div class="info-title">客群名称</div>
          <div class="info-content">{{form.grouping_name}}</div>
        </div>
        <div class="info-item">
          <div class="info-title">客群类型</div>
          <div class="info-content">
            {{form.grouping_type==0?'固定':'条件'}}
          </div>
        </div>
        <div class="info-item"  v-if="form.grouping_type==0">
          <div class="info-title">客群人数</div>
          <div class="info-content">
            {{form.peo_count}}
            <a style="margin-left: 16px;" @click="RefreshGrouping">刷新</a>
          </div>
        </div>
        <div class="info-item"  v-if="form.grouping_type==0">
          <div class="info-title">应用活动</div>
          <div class="info-content">-</div>
        </div>
        <div class="info-item"  v-if="form.grouping_type==1" style="margin-top: 12px;">
          <div class="info-title">筛选条件</div>
          <div class="info-content">
            <div 
              class="preview-section"
              v-for="(value,index) in form.conditions"
              :key="index"
              v-show="value.isShow">
              <p class="title">{{value.name}}</p>

              <div 
                class="preview-item"
                v-for="(cItem,cIndex) in value.treelist"
                :key="cIndex"
                v-show="cItem.isShow">
                <div class="item-label">{{cItem.name}}</div>
                <!-- 多选 -->
                <div class="item-box" v-if="cItem.type==2">
                  <div class="item-block">
                    {{checkboxText(cItem.data,cIndex,index)}}
                  </div>
                </div>
                <!-- 下拉 -->
                <div class="item-box" v-if="cItem.type==4">
                  <div 
                    class="item-block"
                    v-for="(selectItem, selectIndex) in selectList(cItem.data, cItem.info)" 
                    :key="selectIndex">
                    {{selectItem}}<span v-if="selectList(cItem.data, cItem.info).length>1">、</span>
                  </div>

                </div>
                <!-- 组合（下拉+数字） -->
                <div class="item-box" v-if="cItem.type==3">
                  <div 
                    class="item-block"
                    v-for="(customItem, customIndex) in customList(cItem.info)"
                    :key="customIndex"
                    >
                    {{customItem}}<span v-if="customList(cItem.info).length>1">、</span>
                  </div>
                </div>
                <!-- 组合（下拉+下拉+数字） -->
                <div class="item-box" v-if="cItem.type==5">
                  <div 
                    class="item-block"
                    v-for="(customItem, customIndex) in customList2(cItem.info)"
                    :key="customIndex"
                    >
                    {{customItem}}<span v-if="customList2(cItem.info).length>1">、</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="table-header" v-if="form.grouping_type==0">
        <div class="sub-title">客群信息</div>
        <div class="searchBox">
          <a-input-search 
            @search="$refs.table.refresh()"
            v-model="queryParam.sreach" 
            placeholder="请输入手机号/客户编号" 
            style="width: 200px" />
        </div>
      </div>

      <!-- 表格 -->
      <div class="showDataForTable" v-if="form.grouping_type==0">
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
        >
          <span slot="sonnumber" slot-scope="text">
            <template>
              <router-link 
                :to="{
                  path:'/crm/customer/list/detail',
                  query:{
                    id: text
                  }
                }">
                {{text}}
              </router-link>
            </template>
          </span>

        </s-table>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { getdefaultGroup, defaultGrouping,RefreshGrouping } from '@/api/crm'

export default {
  name: 'CrmCrowdDetail',
  components: {
    STable
  },
  data () {
    return {
      loading: false,
      form: {
        grouping_type: null
      },
      // 查询参数
      queryParam: {
        sreach: ''
      },
      // 表头
      columns: [
        {
          title: '客户子编号',
          dataIndex: 'sonnumber',
          scopedSlots: { customRender: 'sonnumber' }
        },
        {
          title: '手机号',
          dataIndex: 'mobile'
        },
        {
          title: '车牌数量',
          dataIndex: 'car_count',
        },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          id: this.$route.query.id,
          sreach: this.queryParam.sreach
        }
        return defaultGrouping(Object.assign(params))
          .then(res => {
            // console.log(res.data.list)
            return {
              data: res.data.list, // 列表数组
              pageNo: res.data.pageNo,  // 当前页码
              pageSize: res.data.pageSize,  // 每页页数
              totalCount: res.data.totalCount, // 列表总条数
              totalPage: res.data.totalPage // 列表总页数
            }
          })
      },
    }
  },
  created () {
    this.Init()
  },
  methods: {
    async Init(){
      this.loading = true
      let formRes = await getdefaultGroup(this.$route.query.id)
        // console.log(formRes.data)
      this.form = formRes.data
      this.loading = false
    },
    // 刷新
    RefreshGrouping(){
      RefreshGrouping(this.$route.query.id).then(()=>{
        this.$message.success('刷新成功')
        this.Init()
      })
    },
    // 双下拉
    customList2(data){

      let arr = []
      data.forEach(e => {
        // console.log(e)
        if (e.name==='区间') {
          let str = `${e.name2} ${e.areaLeft}-${e.arearight}${e.unit}`
          arr.push(str)
        }else{
          let str = `${e.name2} ${e.name}${e.areaLeft}${e.unit}`
          arr.push(str)
        }
      });
      // console.log(arr)

      return arr
    },
    // 单下拉
    customList(data){

      let arr = []
      data.forEach(e => {
        // console.log(e)
        if (e.name==='区间') {
          let str = `${e.areaLeft}-${e.arearight}${e.unit}`
          arr.push(str)
        }else{
          let str = `${e.name}${e.areaLeft}${e.unit}`
          arr.push(str)
        }
      });
      // console.log(arr)

      return arr
    },
    selectList(target, data){
      if (!target) {
        return
      }
      // console.log(target)
      // console.log(data)
      let arr = data.filter(e=>{
        return target.includes(e.id)
      }).filter(e=>{
        return e.id!==0
      }).map(e=>{
        return e.name
      })
      // console.log(arr)
      return arr
    },
    checkboxText(target,cIndex,index){
      let item = this.form.conditions[index].treelist[cIndex]
      // console.log(target)
      if (!target) {
        return
      }
      let arr = item.info.filter(e=>{
        return target.includes(e.id)
      }).map(e=>{
        return e.name
      })
      let str = arr.join('、')
      return str
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
.crowInfo{
  padding-left: 56px;
  .info-item{
    display: flex;
    line-height: 40px;
    position: relative;
    .info-title{
      color: #3e4b6f;
      padding-right: 24px;
    }
    .info-content{
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      color: #1e1e28;
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
  color: #7c7ee2;
}
.select-all{
  margin-left: 16px;
  cursor: pointer;
}
.preview-section{
  border: 1px solid #e4e7f0;
  margin-bottom: 16px;
  padding: 12px 24px;
  width: 600px;
  .title{
    font-size: 14px;
    color: #1e1e28;
    font-weight: 500;
    text-align: left;
  }
  .preview-item{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    min-height: 40px;
    .item-label{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      width: 120px;
      height: 40px;
      text-align: right;
      margin-right: 20px;
    }
    .item-box{
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      font-weight: 500;
      .item-block{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 40px;
        text-align: left;
      }
    }
  }
}
</style>
