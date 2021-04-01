<template>

    <a-layout-content
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title">
        会员基础设置
      </div>

      <a-form-model layout="inline" class="form-wrap">


        <a-form-model-item 
          label="生效油站" 
          :labelCol="{md: {span: 4}}" 
          :wrapperCol="{md: {span: 20}}">
          {{userInfo.group_name}}
        </a-form-model-item>

        <a-form-model-item 
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
        </a-form-model-item>

        <a-form-model-item 
          label="初始会员等级" 
          :labelCol="{md: {span: 4}}" 
          :wrapperCol="{md: {span: 20}}">

          <div class="item_wrap">
            <a-radio-group name="radioGroup" :default-value="1">
              <a-radio :value="1">
                动态等级会员
              </a-radio>
            </a-radio-group>

            <a-select v-model="form.member_id" style="width: 160px" placeholder="请选择">
              <a-select-option 
                v-for="(item, index) in levelList"
                :key="index"
                :value="item.id">
                {{item.name}}
              </a-select-option>

            </a-select>

            <div class="tips">没有合适的会员等级？
              
              <a type="link" @click="openModal">去创建</a>
            </div>
          </div>

        </a-form-model-item>

        <a-form-model-item 
          label="初始等级有效期" 
          :labelCol="{md: {span: 4}}" 
          :wrapperCol="{md: {span: 20}}">
          <a-radio-group name="radioGroup" v-model="initial_day_type" @change="changeDayType">
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
        </a-form-model-item>

        <a-form-model-item 
          label="    " 
          :colon="false"
          class="handle-btn-group"
          :labelCol="{md: {span: 4}}" 
          :wrapperCol="{md: {span: 20}}">

          <a-button type="primary" style="margin-right: 10px;" @click="submit">{{type=='add'?'新增':'编辑'}}</a-button>

          <a-button @click="exit"> 取消 </a-button>

        </a-form-model-item>

      </a-form-model>

    </a-layout-content>

</template>

<script>
import { STable } from '@/components'

import { postBasicsset } from '@/api/crm'
import { getlevelAlls } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'FoundationAdd',
  components: {
    STable
  },
  data () {
    return {
      form:{
        id: undefined,	 //[string]		修改的时候使用		
        member_type: 1,
        //[string]	是	会员注册1是注册即会员 2授权手机号		
        member_id: null,
        //[string]	是	初始会员等级		
        initial_day: 7,
        //[string]	是	初始等级有效期
      },
      initial_day_type: 1,
      levelList: []

    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  props:{
    type:{
      type: String
    },
    itemData:{
      type:Object,
      default:null
    }
  },
  created () {
    // console.log(this.userInfo)

    this.Init()
  },
  methods: {
    async Init(){
      let res = await getlevelAlls({type:2})
      console.log(res.data)
      if(res){
        this.levelList = res.data
      }
    },
    submit(){
      console.log(this.form)
      postBasicsset(this.form).then((res)=>{
        this.exit()
      })
    },
    changeDayType(){
      // this.initial_day_type
      // console.log(this.initial_day_type)
      switch (this.initial_day_type) {
        case 1:
          this.form.initial_day = 7
          break;
        case 2:
          this.form.initial_day = 30
          break;
        case 3:
          this.form.initial_day = undefined
          break;
        default:
          break;
      }
    },
    openModal(){
      let that = this
      let routerJump = this.$router.resolve({ path: '/crm/member/grow' });
      window.open(routerJump.href, '_blank');

      // console.log(this.$confirm)
      this.$confirm({
        title: '操作提示',
        content: '动态等级会员等级是否创建成功？',
        onOk () {
          that.Init()
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
