
<template>
  <a-modal
      :title="'修改标签'"
      :width="600"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
    <div class="modal-box">
      <div class="modal-item">
        <div class="title">客户编号</div>
        <div class="code">{{user_id}}</div>
      </div>
      <div class="modal-item">
        <div class="title">客户标签</div>
        <a-select
          class="tagSelect"
          mode="multiple"
          placeholder="请选择标签"
          @change="handleChange"
          v-model="tags"
        >
          <a-select-option 
            v-for="(item,i) in selectList" :key="i"
            :value="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </div>
    </div>

  </a-modal>
</template>

<script>
import { querylabellist, userupdatelabel } from '@/api/crm'
import _ from 'lodash'

export default {
  name: 'AddTagModal',
  data(){
    return {

      visible: false,
      confirmLoading: false,
      user_id: null,
      selectList:[],
      tags: []

    }
  },
  created(){
    querylabellist().then(res=>{
      // console.log(res.data)
      this.selectList = res.data
    })
  },  
  methods: {
    handleChange(value) {
      // console.log(value);
    },
    showModal(obj) {
      // console.log(obj)
      this.user_id = obj.user_id
      this.tags = obj.tags
      this.visible = true;
    },
    handleOk(e) {

      let params = {
        user_id: this.user_id,
        label_id: this.tags
      }
      // console.log(params)
      // return
      userupdatelabel(params).then(res=>{
        // console.log(res)
        this.$message.success('操作成功')
        this.handleCancel()
        this.$emit('change')
      })

      this.visible = false;
      this.confirmLoading = false;
    },
    handleCancel(e) {
      this.visible = false;
    },
    
  }
}
</script>

<style lang="less" scoped>
.modal-box{
  min-height: 120px;
  .modal-item{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    line-height: 40px;
    margin-bottom: 16px;
    .title{
      width: 152px;
      text-align: right;
    }
    .code{
      margin-left: 16px;
    }
  }
}
.tagSelect{
  width: 280px;
  margin-left: 16px;
}
</style>