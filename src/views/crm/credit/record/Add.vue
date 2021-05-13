
<template>

  <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '700px', position: 'relative' }">
    <div class="head-title">
      客户积分记录
      <a-button type="info" @click="back">返回上一页</a-button>
    </div>

    <div class="page-contain">
      <div class="phone-inquire-wrapBox">
        <div class="phone-inquire-wrap">
          <a-form-model ref="ruleForm" :model="form" :rules="rules">
            <a-form-model-item prop="sreach">

              <a-input
                v-model="form.sreach"
                class="add-input"
                placeholder="请输入增加积分的手机号/用户编号"
              />
              <a-button type="primary" @click="onSubmit">
                查询
              </a-button>

            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    </div>

    <a-modal
      title="选择用户"
      :width="718"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="title">符合当前条件客户共<span>「{{data.length}}」</span>位，请选择需要增减积分的用户</div>
      <a-table 
        :columns="columns" 
        :data-source="data" 
        rowKey="id"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio' }"
        :pagination="false">
      </a-table>
    </a-modal>

  </a-layout-content>
</template>

<script>
import { sreachUser } from '@/api/crm'

export default {
  name: 'AddRecord',
  components: {},
  data () {
    return {
      form: {
        sreach: ''
      },
      rules: {
        sreach: [
          { required: true, message: '请输入4-11位的整数', trigger: 'blur' },
          { min: 1, max: 11, message: '请输入4-11位的整数', trigger: 'blur' },
        ],
      },
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      data: [],
      columns: [
        {
          title: '客户子编号',
          dataIndex: 'sonnumber',
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
        },
        {
          title: '会员等级',
          dataIndex: 'level_id',
        },
        {
          title: '现有积分',
          dataIndex: 'integral',
        },
        {
          title: '偏好油站',
          dataIndex: 'love_site_id',
        },
      ],
      selectedRowKeys: [], // Check here to configure the default column
    }
  },
  created () {
   
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;

      let item = this.data.filter(e=>{
        return e.id === this.selectedRowKeys[0].id
      })
      // 确认选择，跳转详情
      this.godetail(item)

      this.visible = false;
      this.confirmLoading = false;

    },
    godetail(item){
      this.$emit('godetail',item)
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert('submit!');
          sreachUser(this.form).then(res=>{
            // console.log(res)
            if (res.data.length) {
              if (res.data.length===1) {
                // 数量为1，直接跳转
                this.godetail(res.data[0])
              }else{
                // 数量大于1，展开列表
                this.data = res.data
              }
              this.selectedRowKeys[0] = res.data[0].id
            }else{
              this.$message.error('该用户/手机号未注册，无积分信息')
            }
            this.showModal()
          })
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    back(){
      this.$emit('back')
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
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
.phone-inquire-wrapBox{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 94px;
  .add-input{
    width: 280px;
    margin-right: 10px;
  }
}
.title{
  color: #3c3c46;
  margin-bottom: 8px;
  span{
    color: #37f;
  }
}
</style>
