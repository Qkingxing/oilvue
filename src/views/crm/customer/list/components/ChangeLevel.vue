<template>
  <a-modal
      :title="'温馨提示'"
      :width="640"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      class="layerWrap"
    >
      <div>
        将客户从
        <span class="grade-name">铜卡会员</span>
        变更为

        <a-form-model
          class="grade-form-item"
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="初始会员等级" >
            
            <a-radio-group v-model="form.radio" style="padding-top: 5px;">
              <a-radio :style="radioStyle" :value="1">
                动态等级(自动升级)
              </a-radio>
              <a-radio :style="radioStyle" :value="2" style="margin-top: 15px;">
                固定等级
                <a-select v-model="form.level_id" style="width: 200px;margin-left: 16px;" placeholder="请选择固定等级">
                  <a-select-option 
                    v-for="(item,index) in fixedLevelOptions"
                    :key="index"
                    :value="item.id">
                    {{item.name}}
                  </a-select-option>

                </a-select>

              </a-radio>

            </a-radio-group>


          </a-form-model-item>
        </a-form-model>

      </div>
  </a-modal>
</template>

<script>

import _ from 'lodash'
import { getlevelAlls } from '@/api/user'

export default {
  name: 'ChangeLevel',
  data(){
    return {

      visible: false,
      confirmLoading: false,
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      form: {
        radio: 1,
        level_id: undefined
      },
      rules: {
        // name: [
        //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
        //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        // ],
      },
      fixedLevelOptions: []


    }
  },
  created(){
    this.load()
  },
  methods: {
    async load(){
      // 固定等级下拉
      let fixedLevelRes = await getlevelAlls({type:1})
      // console.log(fixedLevelRes.data)
      this.fixedLevelOptions = fixedLevelRes.data


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
/deep/.ant-modal-body{
  text-align: center;
  font-size: 14px;
}
.grade-name{
  color: #37f;
}
.grade-form-item{
  text-align: left;
  margin-top: 24px;
  /deep/.ant-radio-wrapper{
    width: 100%;
  }
}

</style>