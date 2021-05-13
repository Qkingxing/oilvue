<template>
  <a-modal
      :title="'修改车牌号'"
      :width="600"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      class="layerWrap"
    >
      <div class="modal-content">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="车牌号" class="inline-item" style="width: 400px;">
            <a-form-model-item
              v-for="(item,i) in form.tags" :key="i"
              style="margin-left: 8px;">
              <a-input allowClear style="width: 108px;margin: 3px 0 3px 0;"/>
            </a-form-model-item>

            <div class="add-wrap edit-wrap">
              <a-icon type="plus" />
              添加
            </div>
          </a-form-model-item>
        </a-form-model>

      </div>
  </a-modal>
</template>

<script>

import _ from 'lodash'

export default {
  name: 'ChangePlateNumber',
  data(){
    return {

      visible: false,
      confirmLoading: false,
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
      form: {
        tags:[

        ]
      },
      rules: {
        // name: [
        //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
        //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        // ],
      },


    }
  },
  created(){
    this.Init()
  },
  methods: {
    async Init(){
      
    },
    resetForm(){
      this.form = {
       
      }
    },
    showModal(obj) {
     
      this.visible = true;
    },
    handleOk(e) {
      // this.confirmLoading = true;

      
      let form = _.cloneDeep(this.form)

      console.log(form)
      

      // this.visible = false;
      // this.confirmLoading = false;
    },
    handleCancel(e) {
      this.visible = false;
    },
    
  }
}
</script>

<style lang="less" scoped>
.modal-content{
  padding: 8px 30px 50px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.edit-wrap{
  margin: 3px 0 3px 0;
}
.add-wrap{
  width: 108px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 32px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px dashed #eaeaf4;
  margin-left: 8px;
  cursor: pointer;
}
.inline-item{
  display: inline-block;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
/deep/.ant-form-item-children{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
/deep/.ant-form-item{
  margin-bottom: 0;
}
</style>