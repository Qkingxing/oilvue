
<template>
  <div class="mainContainreBox"> 
      <div class="mainContainreBlock">
          <div class="container animated fadeIn">
            <div class="group">
                <div class="title_model">
                    <div class="main_label">账号信息</div>
                   
                </div>
                <div class="group-body">
                    <div class="aoe">
                        <div class="admin">
                            <span class="a">登录账号</span>
                            <span class="b">openUser</span>
                            <span class="c">修改登陆密码</span>
                        </div>
                    </div>
                    <div class="aoe1">
                        <div class="admin1">
                            <span class="a">账号类型</span>
                            <span class="b">集团账号</span>
                        </div>
                    </div>
                    <div class="aoe2">
                        <div class="admin2">
                            <span class="a">员工角色</span>
                            <span class="b">管理员</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="group">
                <div class="title_model">
                    <div class="main_label">账号信息</div>
                   
                </div>
                <div class="group-body">
                    <div class="aoe">
                        <div class="admin">
                            <span class="a">员工姓名</span>
                            <span class="b" style=" font-weight: 700;">对外演示账号</span>
                        </div>
                    </div>
                    <div class="aoe1">
                        <div class="admin1">
                            <span class="a">手机号</span>
                            <span class="b">18565639389</span>
                        </div>
                    </div>
                    <div class="aoe3">
                        <div class="admin2">
                            <span class="a">形象照</span>
                               <div class="cc">
                                    <a-upload
                                        name="avatar"
                                        list-type="picture-card"
                                        class="avatar-uploader"
                                        :show-upload-list="false"
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        :before-upload="beforeUpload"
                                        @change="handleChange"
                                    >
                                        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                        <div v-else>
                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">
                                                Upload
                                            </div>
                                        </div>
                                    </a-upload>
                                    <div class="text">请上传形象照，图片大小不超过1M</div>
                               </div>
                               
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
    name: 'Center',
    data(){
        return{
             loading: false,
            imageUrl: '',
        }
    },
    methods:{
        handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, imageUrl => {
                this.imageUrl = imageUrl;
                this.loading = false;
                });
            }
        },
        beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.$message.error('You can only upload JPG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        },
  
    }
}
</script>
<style lang="scss" scoped>
    .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }
    .ant-upload-picture-card-wrapper{
        width: 0;
        padding-left: 10px;
    }
    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
    .mainContainreBox{
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        .mainContainreBlock{
            padding-left: 24px;
            padding-right: 24px;
            padding-bottom: 25px;
            background: #fff;
            min-width: 1004px;
            height: 787px;
            .container{
                box-sizing: border-box;
                .group{
                    box-sizing: border-box;
                    .title_model{
                        position: relative;
                        padding: 24px 0 16px;
                        border-bottom: 1px solid #eaeaf4;
                        display: flex;
                        align-items: center;
                        vertical-align: bottom;
                        .main_label{
                            font-size: 16px;
                            margin-right: 16px;
                            font-weight: 700;
                            color: #1e1e28;
                        }
                        
                    }
                    .group-body{
                        margin-top: 25px;
                        .aoe{
                            width: 100%;
                            margin-bottom: 15px;
                            .admin{
                                width: 94%;
                                margin: 0 auto;
                                .a{
                                    font-size: 15px;
                                    font-weight: 700;
                                }
                                .b{
                                    padding-left: 10px;
                                    font-size: 15px;
                                  
                                }
                                .c{
                                    padding-left: 10px;
                                }
                            }
                        }
                        .aoe1{
                            width: 100%;
                            margin-bottom: 15px;
                            .admin1{
                                width: 94%;
                                margin: 0 auto;
                                .a{
                                    font-size: 15px;
                                    font-weight: 700;
                                }
                                .b{
                                    padding-left: 10px;
                                }
                            }
                        }
                        .aoe2{
                            width: 100%;
                            .admin2{
                                width: 94%;
                                margin: 0 auto;
                                .a{
                                    font-size: 15px;
                                    font-weight: 700;
                                }
                                .b{
                                    padding-left: 10px;
                                }
                            }
                        }
                        .aoe3{
                             width: 100%;
                             .admin2{
                                width: 94%;
                                margin: 0 auto;
                                display: flex;
                                .cc{
                                    .text{
                                        display: block;
                                        font-size: 12px;
                                        color: #9696a0;
                                        margin-top: -9px;
                                        margin-left: 10px;
                                        line-height: 2;
                                    }
                                }
                                .a{
                                    font-size: 15px;
                                    font-weight: 700;
                                }
                                .b{
                                    padding-left: 10px;
                                }
                            }
                        }
                        
                    }
                }
            }
        }
    }

</style>
