
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '600px' }">
      <div class="head-title">
        <span>
          基础信息
        </span>
      </div>
      <div class="select-info">
        <div class="label">客群名称</div>
        <a-form layout="inline">
          <a-form-item>
            <a-input :maxLength="10" placeholder="请输入标签名称" style="width:300px;"/>
            <span style="margin-left: -45px; color: rgb(199, 199, 199); position: relative;">10/10</span>
          </a-form-item>
        </a-form>
      </div>
      <div class="select-info">
        <div class="label">
          客群类型&nbsp;
          <a-popover placement="rightTop">
            <template slot="content">
              <div>固定人群：创建分群后人群数量固定不变，只有手动刷新才会更新数据（数据截止到昨日24点)</div>
              <div>条件人群：创建分群后人群数量会自动更新（实时数据）</div>
            </template>
            <a-icon style="color: rgb(153, 153, 153);" type="question-circle" />
          </a-popover>
        </div>
        <a-radio-group name="radioGroup" v-model="form.grouping_type" style="line-height: 40px;">
          <a-radio :value="0" style="margin-right: 70px;">
            固定人群
          </a-radio>
          <a-radio :value="1">
            条件人群
          </a-radio>
        </a-radio-group>
      </div>
      <div class="head-title" style="margin-top: 20px;"><span>筛选条件</span></div>
      <div class="select_wrap">
        <el-cascader
          style="width: 700px;"
          v-model="value"
          :options="options"
          :show-all-levels="false"
          :props="{ 
            expandTrigger: 'hover', 
            multiple: true ,
            value: 'id',
            label: 'name',
            children: 'treelist',
          }"
          @change="handleChange"
        ></el-cascader>
        <span class="select_count">已选择{{value.length}}项</span>
      </div>
      <!-- <div class="customer-attr-info">
        <a-empty />
      </div> -->
      <div 
        class="select-attr-box"
        v-for="(value,index) in form.conditions"
        :key="index">
        <div class="customer-attr-info" v-show="value.isShow">
          <div class="title">{{value.name}}</div>

          <div 
            class="sub-attr-info"
            v-for="(cItem,cIndex) in value.treelist"
            :key="cIndex"
            v-show="cItem.isShow">

            <div class="sub-title">
              <span>{{cItem.name}}</span>
            </div>
            <div class="sub-comtent">
              <!-- 多选 -->
              <a-checkbox-group v-if="cItem.type===2">
                <a-checkbox 
                  class="ant-checkbox-group-item"
                  v-for="(checkItem,checkIndex) in cItem.info"
                  :key="checkIndex"
                  :value="checkItem.id">{{checkItem.name}}</a-checkbox>
              </a-checkbox-group>
              <!-- 可扩展 -->
              <div class="custom" v-if="cItem.type===3">
                <div class="custom-item">
                  <a-select style="width: 120px; margin-right: 8px;">
                    <a-select-option value="jack">
                      Jack
                    </a-select-option>
                  </a-select>
                  <a-form-item>
                    <a-input-number :min="0" style="margin-right: 8px;"/>
                  </a-form-item>
                  <div class="unit">个</div>
                  <div class="action-btns">
                    <a-icon type="minus-circle" style="font-size: 16px; cursor: pointer; color: rgb(62, 75, 110);"/>
                    <a-icon type="plus-circle" style="font-size: 16px; cursor: pointer; color: rgb(62, 75, 110); margin-left: 8px;"/>
                  </div>
                </div>
              </div>

            </div>
            <div class="sub-remove">
              <a-icon @click="delTree(index,cIndex)" type="close" style="font-size: 12px; cursor: pointer;"/>
            </div>
          </div>
        </div>
      </div>

      <div class="btn-box">
        <a-button type="primary" size="large"> 确认 </a-button>
        <a-button style="margin-left: 8px;" size="large" @click="exit"> 取消 </a-button>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import _ from 'lodash'
import { getSelectOption } from '@/api/crm'

export default {
  name: 'CrmCrowdAdd',
  components: {},
  data () {
    return {
      value: [],
      options: [],
      form:{
        grouping_name: "星哥的群10",//客群名称
        grouping_type: 0,//客群类型 0：固定人群，1：条件人群
        conditions: [],
      },
    }
  },
  props:{
    pageType:{
      type: String
    }
  },
  created () {
    this.Init()

  },
  methods: {
    async Init(){
      let res = await getSelectOption(this.form.grouping_type)
      console.log(res.data)
      this.options = res.data

      this.form.conditions = _.cloneDeep(res.data)



    },
    // 删除一条
    delTree(index,cIndex){
      let arr = [
        this.form.conditions[index].id, 
        this.form.conditions[index].treelist[cIndex].id
      ]

      let value = this.value.filter((e,i)=>{

        return e[0]!==arr[0]||e[1]!==arr[1]
      })
      this.value = value

      this.form.conditions[index].treelist[cIndex].isShow = false
      let showArr = this.form.conditions[index].treelist.map(e=>{
        return e.isShow
      })
      if (!showArr.includes(true)) {
        this.form.conditions[index].isShow = false
      }
    },
    handleChange (value) {
      // console.log(value)
      // console.log(this.form.conditions)
      let fatherArr = [...new Set(value.map(e=>{
        return e[0]
      }))]
      let childrenArr = [...new Set(value.map(e=>{
        return e[1]
      }))]
      // console.log(fatherArr)
      // console.log(childrenArr)
      this.form.conditions.forEach(e => {
        
        if (fatherArr.includes(e.id)) {
          e.isShow = true
          
        }else{
          e.isShow = false
        }
        
        e.treelist.forEach(ele=>{
          if (childrenArr.includes(ele.id)) {
            ele.isShow = true
          }else{
            ele.isShow = false
          }
        })
      });
    },
    exit(){
      if (this.pageType==='edit') {
        this.$emit('back')
      }else{
        this.$emit('back')
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ant-form-item{
  margin-bottom: 0;
}
.ant-checkbox-group-item{
  margin-right: 38px;
}
.head-title{
  font-size: 14px;
  line-height: 44px;
  font-weight: 500;
  border-bottom: 1px solid #eaeaf4;
  margin-bottom: 24px;
  margin-top: 8px;
}
.select-info{
  display: flex;
  margin-bottom: 16px;
  .label{
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    margin-right: 20px;
    color: #040a46;
    font-size: 14px;
  }
}
.select_wrap{
  display: flex;
  align-items: center;
  .select_count{
    margin-left: 20px;
    font-size: 14px;
  }
}
.customer-attr-info{
  width: 100%;
  height: auto;
  min-height: 144px;
  border: 1px solid #eaeaf4;
  margin-top: 16px;
  padding: 24px;
  box-sizing: border-box;
  .title{
    color: #1e1e28;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .sub-attr-info{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    margin-bottom: 16px;
    position: relative;
    line-height: 56px;
    .sub-title{
      -ms-flex-negative: 0;
      flex-shrink: 0;
      width: 88px;
      height: 56px;
      text-align: right;
      margin-right: 16px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      line-height: 14px;
    }
    .sub-remove{
      width: 16px;
      position: absolute;
      right: -8px;
    }
  }
  .custom{
    .custom-item{
      width: 400px;
      min-height: 56px;
      background: #fafafa;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding-left: 16px;
      position: relative;
      .action-btns{
        width: 40px;
        position: absolute;
        right: -48px;
      }
    }
  }
}
.select-attr-box{
  .customer-attr-info{
    width: 100%;
    height: auto;
    min-height: 144px;
    border: 1px solid #eaeaf4;
    margin-top: 16px;
    padding: 24px;
    box-sizing: border-box;
    .title{
      color: #040a46;
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
}
.btn-box{
  width: 100%;
  height: 87px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-left: 251px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -2px 8px 0 #eaeaea;
  z-index: 9;
}
.ant-btn-lg{
  min-width: 82px;
  font-size: 14px;
  padding: 0 19px;
  height: 40px;
  line-height: 40px;
}
</style>
