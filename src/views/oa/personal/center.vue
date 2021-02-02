
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
                <!-- <span class="c">修改登陆密码</span> -->
                <span class="text" type="primary" @click="bba"> 修改登陆密码 </span>
                <div class="password">
                  <a-modal
                    class="aaa"
                    title="修改密码"
                    :dialog-style="{ top: '20px', witdh: '600' }"
                    :visible="modal1Visible"
                    @ok="yes"
                    @cancel="no"
                  >
                    <p class="tips-title">* 密码由英文与数字混合组成，并且不短于8位</p>
                    <div class="inp">
                      <p>输入原密码</p>
                      <a-input-password v-model="input1" />
                    </div>
                    <span class="text1" v-show="show1" style="padding-left: 185px">密码不能为空</span>
                    <div class="inp">
                      <p>输入新密码</p>
                      <a-input-password v-model="input2" />
                    </div>
                    <span class="text1" v-show="show2" style="padding-left: 185px"
                      >长度为8-14个字符，字母/数字至少包含2种</span
                    >
                    <div class="inp">
                      <p>重复新密码</p>
                      <a-input-password v-model="input3" />
                    </div>
                    <span class="text1" v-show="show3" style="padding-left: 185px"
                      >长度为8-14个字符，字母/数字至少包含2种</span
                    >
                  </a-modal>
                </div>
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
                <span class="b" style="font-weight: 700">对外演示账号</span>
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
                      <div class="ant-upload-text">Upload</div>
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
import { personage } from '@/api/work'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'Center',
  data() {
    return {
      loading: false,
      imageUrl: '',
      modal1Visible: false,
      input1: '',
      input2: '',
      input3: '',
      show1: false,
      show2: false,
      show3: false,
    }
  },
  methods: {
    bba() {
      this.setModal1Visible(true)
    },
    yes() {
      return personage().then((res) => {
        console.log(res.data)
        this.setModal1Visible(false)
      })
    },
    no() {
      this.setModal1Visible(false)
    },
    setModal1Visible(modal1Visible) {
      this.modal1Visible = modal1Visible
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
  },
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
.ant-upload-picture-card-wrapper {
  width: 0;
  padding-left: 10px;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
/deep/ .ant-modal-header {
  background-color: #fafafa;
  border: none;
}
/deep/ .ant-modal-title {
  text-align: center;
}
/deep/ .ant-modal-content {
  width: 600px;
}
/deep/ .tips-title {
  color: #9696a0;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  margin-top: 24px;
}
/deep/ .inp {
  display: flex;
  p {
    display: block;
    box-sizing: border-box;
    width: 25%;
  }
  .ant-input-password {
    display: block;
    box-sizing: border-box;
    width: 75%;
  }

  padding: 26px 100px 0;
}
/deep/ .ant-modal-footer {
  text-align: center;
  border: none;
  margin-bottom: 40px;
  .ant-btn {
    min-width: 82px;
    font-size: 14px;
    padding: 0 19px;
    height: 40px;
    line-height: 40px;
  }
}

.mainContainreBox {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  .mainContainreBlock {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 25px;
    background: #fff;
    min-width: 1004px;
    height: 787px;
    .container {
      box-sizing: border-box;
      .group {
        box-sizing: border-box;
        .title_model {
          position: relative;
          padding: 24px 0 16px;
          border-bottom: 1px solid #eaeaf4;
          display: flex;
          align-items: center;
          vertical-align: bottom;
          .main_label {
            font-size: 16px;
            margin-right: 16px;
            font-weight: 700;
            color: #040a46;
          }
        }
        .group-body {
          margin-top: 25px;
          .aoe {
            width: 100%;
            margin-bottom: 15px;

            .admin {
              width: 94%;
              margin: 0 auto;
              .ant-modal-header {
                background-color: #e8e8e8;
              }
              .ant-modal-title {
                text-align: center;
              }
              .text {
                color: #37f;
                cursor: pointer;
              }
              .a {
                font-size: 15px;
                font-weight: 700;
              }
              .b {
                padding-left: 10px;
                font-size: 15px;
              }
              .c {
                padding-left: 10px;
              }
            }
          }
          .aoe1 {
            width: 100%;
            margin-bottom: 15px;
            .admin1 {
              width: 94%;
              margin: 0 auto;
              .a {
                font-size: 15px;
                font-weight: 700;
              }
              .b {
                padding-left: 10px;
              }
            }
          }
          .aoe2 {
            width: 100%;
            .admin2 {
              width: 94%;
              margin: 0 auto;
              .a {
                font-size: 15px;
                font-weight: 700;
              }
              .b {
                padding-left: 10px;
              }
            }
          }
          .aoe3 {
            width: 100%;
            .admin2 {
              width: 94%;
              margin: 0 auto;
              display: flex;
              .cc {
                .text {
                  display: block;
                  font-size: 12px;
                  color: #9696a0;
                  margin-top: -9px;
                  margin-left: 10px;
                  line-height: 2;
                }
              }
              .a {
                font-size: 15px;
                font-weight: 700;
              }
              .b {
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
