
<template>
  <a-modal v-model="visible" :title="title" on-ok="handleOk" :width="600">
    <div class="fieldsModalHeader">
      <div class="headerLeft">可选字段</div>
      <div class="headerRight">
        <span style="margin-right: 16px" @click="resetCol">重置</span>
        <span @click="defaultCol">恢复默认</span>
      </div>
    </div>
    <div class="fieldsModalBody">
      <div class="fieldsModalBodyItem" v-for="(item, index) in oldcolumns" :key="index">
        <a-checkbox :disabled="item.disabled" v-model="item.show"> {{ item.title }} </a-checkbox>
      </div>
    </div>

    <template slot="footer">
      <a-button key="back" @click="handleCancel"> 取消 </a-button>

      <a-button key="submit" type="primary" :loading="loading" @click="handleOk"> 确认 </a-button>
    </template>
  </a-modal>
</template>

<script>
import { oldcolumns } from '@/utils/enums'
import _ from 'lodash'

export default {
  name: 'ColumnsModal',
  data() {
    return {
      title: '自定义展示',
      visible: false,
      loading: false,
      oldcolumns: _.cloneDeep(oldcolumns),
    }
  },
  mounted(){

  },
  methods: {
    defaultCol(){
      this.oldcolumns.forEach((e,i)=>{
        if (e.default) {
          e.show = true
        }else{
          e.show = false
        }
      })
    },
    resetCol(){

      this.oldcolumns.forEach((e,i)=>{
        if (!e.disabled) {
          e.show = false
        }
      })
    },
    show() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
      
    },
    handleOk() {
      this.visible = false
      let oldcolumns = _.cloneDeep(this.oldcolumns).filter(e=>{
        return e.show
      })
      this.$emit('change', oldcolumns)
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  .modal-box {
    min-height: 120px;
    padding-top: 20px;
  }
}
.fieldsModalHeader {
  padding: 15px 0;
  border-bottom: 1px solid #e4e7f0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 14px;
  display: flex;
  .headerLeft {
    color: #1f2e4d;
  }
  .headerRight {
    color: #7C7EE2;
    flex: 1;
    text-align: right;
    span {
      cursor: pointer;
    }
  }
}
.fieldsModalBody {
  padding: 16px 0;
  display: flex;
  flex-wrap: wrap;
  .fieldsModalBodyItem {
    width: 25%;
    .ant-checkbox-wrapper {
      white-space: nowrap;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #3e4b6e;
      line-height: 40px;
    }
  }
}
</style>
