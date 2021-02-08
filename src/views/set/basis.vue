
<template>
  <div>
    <div class="set-common-wrap">
      <div class="header">
        基础信息
      </div>
      <div class="form-wrap">
        <a-form
          :form="form"
          v-bind="formItemLayout"
         
        >
        <a-form-item label="油站名称">
          <a-input
          
          v-model="formData.name"
          />
        </a-form-item>
        <a-form-item label="油站简称">
          <a-input
          disabled
          />
        </a-form-item>
        <a-form-item   label="所在城市">
          <a-select
          style="width:100px"
              
              placeholder="选择区"
            >
            
            <a-select-option value="usa">
              U.S.A
            </a-select-option>
          </a-select>
            <a-select
            style="width:100px;margin:0 10px;"
                placeholder="选择区"
            >
            <a-select-option value="usa">
                U.S.A
              </a-select-option>
            </a-select>
            <a-select
              style="width:100px"
                placeholder="选择区"
              >
              <a-select-option value="usa">
                U.S.A
              </a-select-option>
            </a-select>
            </a-form-item>
            <a-form-item label="详细地址">
              <a-input
              v-model="formData.address"
            :suffix="lastAddress"
              
              />
            </a-form-item>
            <a-form-item   label="经纬度">
              <a-input
              style="width:160px;margin-right:12px;"
              
              />
            <a-input
            style="width:160px"
            />
            </a-form-item>
            <a-form-item   label="油站电话">
                  <a-input
              />
            </a-form-item>
            <a-form-item label="是否营业">
            <a-radio-group v-decorator="['radio-group']">
              <a-radio value="a">
               开业中
              </a-radio>
              <a-radio value="b">
               暂停营业
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="标签">
            <a-input
              :suffix="lastIndex"
            />
          </a-form-item>
          <a-form-item label="油站图片">
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture-card"
              :file-list="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
                <div class="ant-upload-text">
                </div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </a-form-item>
            <a-form-item  label="提示">
     
                可上传5张，图片建议尺寸850像素*350像素，大小不超过1M
                </a-form-item>
            <a-form-item label="零管系统">
            <a-radio-group v-decorator="['radio-group']">
              <a-radio value="a">
               启用
              </a-radio>
              <a-radio value="b">
               禁用
              </a-radio>
             
            </a-radio-group>
          </a-form-item>
           <a-form-item label="ETC直扣注册">
            <a-radio-group v-decorator="['radio-group']">
              <a-radio value="a">
               需注册
              </a-radio>
              <a-radio value="b">
               关闭注册
              </a-radio>
             
            </a-radio-group>
          </a-form-item>

        
        </a-form>
      </div>
      <div class="header">
        第三方绑定
      </div>
      <div class="form-wrap">
        <a-form
         v-bind="formItemLayout"
         
        >
        <a-form-item label="微信公众号">
            <a-radio-group v-decorator="['radio-group']">
              <a-radio value="a">
               使用中
              </a-radio>
              <a-radio value="b">
               未使用
              </a-radio>
             
            </a-radio-group>
          </a-form-item>
         <a-form-item label="关联AppID">
          <a-input
          />
        </a-form-item>
          <a-form-item label="微信小程序">
            <a-radio-group v-decorator="['radio-group']">
              <a-radio value="a">
               使用中
              </a-radio>
              <a-radio value="b">
               未使用
              </a-radio>
            </a-radio-group>
          </a-form-item>
         <a-form-item   label="关联AppID">
               <a-input
          />
        </a-form-item>
        <a-form-item label="微信公众号">
            <a-radio-group v-decorator="['radio-group']">
              <a-radio value="a">
               使用中
              </a-radio>
              <a-radio value="b">
               未使用
              </a-radio>
             
            </a-radio-group>
          </a-form-item>
       
         <a-form-item label="关联AppID">
          <a-input
          />
        </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
            <a-button @click="store" type="primary">
              保存
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Basis',
     data: () => ({
       formData:{
         name:'',
         address:''
       },
       lastIndex:'',
      formItemLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 12 },
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
  computed:{
    lastAddress(){
      this.formData.address=this.formData.address.slice(0,50)
      return this.formData.address.length+'/50'
    }
  },
  methods: {
    store(){
      console.log(this.formData)
    },
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
