
<template>
  <div>
    <div class="set-common-wrap">
      <div class="header">
        支付设置
      </div>
      <div class="form-wrap">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="付款限制">
             <a-form
              v-bind="formItemLayout"
            >
            <a-form-item label="">
              <span style="padding-right:80px">支付次数</span>
              <span style="padding-right:14px">每个账号每</span>
             
              <a-input-number style="width:100px" :min="8" :max="12" :value="number.value" />
              <span style="padding-left:8px">天</span>
              <span style="padding:0 5px 0 3px">,可支付</span>
               <a-input-number style="width:100px" :min="8" :max="12" :value="number.value" />
              <span style="padding-left:4px">次</span>
            </a-form-item>
            <a-button type="primary">
      保存
    </a-button>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="退款限制">
           <a-form
              v-bind="formItemLayout"
            >

            <a-form-item label="">
               <span style="padding-right:80px">退款有效期</span>
              <a-radio-group v-decorator="['radio-group']">
                <a-radio value="a">
                7天
                </a-radio>
                <a-radio value="b">
                30天
                </a-radio>
                <a-radio value="b">
                自定义
                </a-radio>
                 <a-input-number style="margin:0 10px;width:100px" :min="8" :max="12" :value="number.value" />
                  <a-radio value="b">
                仅限当天退款
                </a-radio>
                  
              </a-radio-group>
            </a-form-item>
            

             <a-form-item label="">
               <span>退款返券</span>
               <a-radio-group v-decorator="['radio-group']">
                <a-radio value="a">
                开启
                </a-radio>
                <a-radio value="b">
                关闭
                </a-radio>
               
               
                  
              </a-radio-group>
            </a-form-item>

             <a-form-item label="">
              <span style="padding-right:80px">退款次数</span>
              <span style="padding-right:14px">每个账号每</span>
             
              <a-input-number style="width:100px" :min="8" :max="12" :value="number.value" />
              <span style="padding-left:8px">天</span>
              <span style="padding:0 5px 0 3px">,可退款</span>
               <a-input-number style="width:100px" :min="8" :max="12" :value="number.value" />
              <span style="padding-left:4px">次</span>
            </a-form-item>
            <a-button type="primary">
      保存
    </a-button>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </div>
     
     
    </div>
  </div>
</template>

<script>
export default {
    name: 'Basis',
     data: () => ({
       lastIndex:'12/20',
       number:{},
      formItemLayout: {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
      },
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
      ]
  }),
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' });
  },
  methods: {
     handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    normFile(e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
  }
}
</script>
<style scoped>
  .set-common-wrap{
    background:#fff;
    padding:10px 20px;
    margin:0px auto;
  }
  .header{
    height:80px;
    line-height:60px;
    font-size:18px;
    font-weight:bold;
    border-bottom:1px solid #ccc;
  }
  .ant-form-item{
    width:800px;
    margin-bottom:16px;
  }
  .form-wrap{
    padding:30px 0;
  }
</style>

