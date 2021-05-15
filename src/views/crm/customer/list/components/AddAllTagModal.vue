
<template>
  <a-modal
      :title="'批量加标签'"
      :width="600"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
    <div class="tip">已选择「{{ids.length}}」位客户</div>

    <div class="modal-box">
      <span>客户标签</span>
      <a-input :maxLength="10" v-model="tagName" placeholder="请输入标签名称" style="width: 300px; margin-left: 16px;"/>
      <span style="margin-left: -45px; color: rgb(199, 199, 199); position: relative;">{{tagName.length}}/10</span>

    </div>

  </a-modal>
</template>

<script>
import { giveuserlabel } from '@/api/crm'
import _ from 'lodash'

export default {
  name: 'AddAllTagModal',
  data(){
    return {

      visible: false,
      confirmLoading: false,
      ids: [],
      tagName: ''

    }
  },
  created(){

  },
  methods: {

    showModal(ids) {
      // console.log(ids)
      this.ids = ids
      this.visible = true;
    },
    handleOk(e) {

      let params = {
        label_name: this.tagName,
        user_id: this.ids
      }
      if (this.tagName==='') {
        this.$message.error('请输入标签名称')
        return
      }

      giveuserlabel(params).then(res=>{
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
/deep/.ant-modal-body{
  text-align: center;
}
.modal-box{
  height: 120px;
  padding-top: 20px;
}
</style>