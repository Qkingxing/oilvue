<template>

    <a-layout-content
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title">
        会员基础设置
      </div>

      <a-form layout="inline" class="form-wrap">


        <a-form-item 
          label="生效油站" 
          :labelCol="{md: {span: 4}}" 
          :wrapperCol="{md: {span: 20}}">
          鹰眼集团
        </a-form-item>

        <a-form-item 
          label="会员注册" 
          :labelCol="{md: {span: 4}}" 
          :wrapperCol="{md: {span: 20}}">
          <a-radio-group name="radioGroup" v-model="form.member_type">
            <a-radio :value="1">
              支付即会员
            </a-radio>
            <a-radio :value="2">
              授权手机号
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item 
          label="初始会员等级" 
          :labelCol="{md: {span: 4}}" 
          :wrapperCol="{md: {span: 20}}">

          <div class="item_wrap">
            <a-radio-group name="radioGroup" :default-value="1">
              <a-radio :value="1">
                动态等级会员
              </a-radio>
            </a-radio-group>

            <a-select default-value="lucy" style="width: 120px" >
              <a-select-option value="jack">
                Jack
              </a-select-option>
              <a-select-option value="lucy">
                Lucy
              </a-select-option>
              <a-select-option value="disabled">
                Disabled
              </a-select-option>
              <a-select-option value="Yiminghe">
                yiminghe
              </a-select-option>
            </a-select>

            <div class="tips">没有合适的会员等级？
              
              <a type="link" @click="openModal">去创建</a>
            </div>
          </div>

        </a-form-item>

        <a-form-item 
          label="初始等级有效期" 
          :labelCol="{md: {span: 4}}" 
          :wrapperCol="{md: {span: 20}}">
          <a-radio-group name="radioGroup" v-model="initial_day_type">
            <a-radio :value="1">
              7天
            </a-radio>
            <a-radio :value="2">
              30天
            </a-radio>
            <a-radio :value="3">
              自定义
            </a-radio>
          </a-radio-group>
          
          <span v-if="initial_day_type==3">
            <a-input-number v-model="form.initial_day" :min="1"/>
            <span style="margin-left: 10px;">天</span>
          </span>
        </a-form-item>

        <a-form-item 
          label="    " 
          :colon="false"
          class="handle-btn-group"
          :labelCol="{md: {span: 4}}" 
          :wrapperCol="{md: {span: 20}}">

          <a-button type="primary" style="margin-right: 10px;" v-if="type=='add'"> 新增 </a-button>
          <a-button type="primary" style="margin-right: 10px;" v-else> 编辑 </a-button>

          <a-button @click="exit"> 取消 </a-button>

        </a-form-item>

      </a-form>

    </a-layout-content>

</template>

<script>
import { STable } from '@/components'

import { getUserBasicslist } from '@/api/crm'

export default {
  name: 'FoundationAdd',
  components: {
    STable
  },
  data () {
    return {
      form:{
        id: null,	 //[string]		修改的时候使用		
        group_name: null,
        //[string]	是	生效油站名称		
        member_type: 1,
        //[string]	是	会员注册1是注册即会员 2授权手机号		
        member_id: null,
        //[string]	是	初始会员等级		
        initial_day: null,
        //[string]	是	初始等级有效期
      },
      initial_day_type: 1

    }
  },
  props:{
    type:{
      type: String
    }
  },
  created () {},
  methods: {
    openModal(){
      let routerJump = this.$router.resolve({ path: '/crm/member/grow' });
      window.open(routerJump.href, '_blank');

      // console.log(this.$confirm)
      this.$confirm({
        title: '操作提示',
        content: '动态等级会员等级是否创建成功？',
        onOk () {
          return new Promise((resolve, reject) => {
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },
    exit(){
      this.$emit('exit')
    }
  }
}
</script>
<style lang="less" scoped>
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}

.form-wrap{
  margin-top: 50px;
  width: 800px;
  .ant-form-item{
    width: 100%;
    margin-bottom: 24px;
  }
  .tips{
    margin-left: 16px;
    color: #9696a0;
    font-size: 14px;
  }
}
.item_wrap{
  display: flex;
  align-items: center;
}
.handle-btn-group{
  padding-top: 56px;
}

</style>
