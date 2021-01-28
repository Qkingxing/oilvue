
<template>
  <div class="container">
    <div class="set-common-wrap">
      <div class="header">
        身份设置
      </div>
     <div  class="body">
       <div  class="identify-auth-list-wrapper">
         <ul  class="identify-auth-list">
           <li  class="identify-auth">
             <div  class="identify-auth-img-wrapper">
              <img  src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/identify/sijiache.png" class="identify-auth-img">
              <div  class="identify-auth-img-mask">
                </div>
                </div>
                <div  class="identify-auth-action">
                  <div  class="identify-auth-action-text">
                    能链车辆认证</div>
                     <a-switch checked-children="开启" un-checked-children="关闭" default-checked />
                        </div>
                        </li>
                        </ul>
                        </div>
                      </div>
      
     
    </div>
  </div>
</template>

<script>
export default {
    name: 'Basis',
     data: () => ({
       lastIndex:'12/20',
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
  .container .body .identify-auth-list-wrapper {
      padding: 24px 0;
  }
  .container .body .identify-auth-list-wrapper .identify-auth-list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.container .body .identify-auth-list-wrapper .identify-auth-list .identify-auth{
    width: 278px;
    height: 212px;
    border: 1px solid #eaeaf4;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 16px 16px;
}
.container .body .identify-auth-list-wrapper .identify-auth-list .identify-auth .identify-auth-img-wrapper {
    height: 152px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
}
.container .body .identify-auth-list-wrapper .identify-auth-list .identify-auth .identify-auth-img-wrapper .identify-auth-img {
    width: 157px;
}
.container .body .identify-auth-list-wrapper .identify-auth-list .identify-auth .identify-auth-img-wrapper .identify-auth-img-mask {
    position: absolute;
    top: 70px;
    left: 40px;
    width: 198px;
    height: 74px;
    background: -webkit-gradient(linear,left top,left bottom,from(rgba(240,215,1,.25)),color-stop(39%,rgba(240,215,1,.05)),to(rgba(240,215,1,0)));
    background: linear-gradient(180deg,rgba(240,215,1,.25),rgba(240,215,1,.05) 39%,rgba(240,215,1,0));
    -webkit-animation-name: heightAnimation-data-v-7a236276;
    animation-name: heightAnimation-data-v-7a236276;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    animation-direction: reverse;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}
.container .body .identify-auth-list-wrapper .identify-auth-list .identify-auth .identify-auth-action{
    height: 60px;
    border-top: 1px solid #eaeaf4;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 22px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.container .body .identify-auth-list-wrapper .identify-auth-list .identify-auth{
    width: 278px;
    height: 212px;
    border: 1px solid #eaeaf4;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 16px 16px;
}
.container .body .identify-auth-list-wrapper .identify-auth-list .identify-auth .identify-auth-img-wrapper .identify-auth-img-mask {
    position: absolute;
    top: 70px;
    left: 40px;
    width: 198px;
    height: 74px;
    background: -webkit-gradient(linear,left top,left bottom,from(rgba(240,215,1,.25)),color-stop(39%,rgba(240,215,1,.05)),to(rgba(240,215,1,0)));
    background: linear-gradient(180deg,rgba(240,215,1,.25),rgba(240,215,1,.05) 39%,rgba(240,215,1,0));
    -webkit-animation-name: heightAnimation-data-v-7a236276;
    animation-name: heightAnimation-data-v-7a236276;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    animation-direction: reverse;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}
.container .body .identify-auth-list-wrapper .identify-auth-list .identify-auth .identify-auth-img-wrapper .identify-auth-img-mask {
    position: absolute;
    top: 70px;
    left: 40px;
    width: 198px;
    height: 74px;
    background: -webkit-gradient(linear,left top, left bottom,from(rgba(240,215,1,.25)),color-stop(39%, rgba(240,215,1,.05)),to(rgba(240,215,1,0)));
    background: linear-gradient(180deg,rgba(240,215,1,.25),rgba(240,215,1,.05) 39%,rgba(240,215,1,0));
    -webkit-animation-name: heightAnimation-data-v-7a236276;
    animation-name: heightAnimation-data-v-7a236276;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    animation-direction: reverse;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}
</style>

