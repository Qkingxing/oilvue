<template>
  <a-layout-content
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="step-content">
        <div class="step-box">
          <a-steps :current="current" labelPlacement="vertical">

            <a-step title="基础设置" />
            <a-step title="充值规则设置" />
            <a-step title="完成" />
          </a-steps>
        </div>
      </div>

      <div class="main-content">
        <div class="mainContent-box">
          <div class="mainContent-scroll" :ittfm="current">
            <div class="mainContent-block">
              <div class="mainContent-setting-box">
                <div class="setting-header">基础设置</div>
                <a-form style="min-width:700px;" :label-col="{ span: 3 }" :wrapper-col="{ span: 19 }">
                  <a-form-item label="加油卡名称" :colon="false">
                    <a-input style="width:240px;"/>
                  </a-form-item>
                  <a-form-item :colon="false" style="height: 40px;">
                    <div slot="label" class="setting-canUseMerchantBox">
                      <span>可用油站</span>
                      <a-popover placement="top">
                        <template slot="title">
                          <div>可用油站</div>
                        </template>
                        <template slot="content">
                          <div>仅可在本站充值，选择其他可用油站后即支持跨站消费</div>
                        </template>
                        <a-icon style="color: #cad5e9;font-size: 16px;" type="question-circle" />
                      </a-popover>
                    </div>
                    <a-input style="width:240px;"/>
                  </a-form-item>
                  <a-form-item label="卡类型" :colon="false">
                    <a-radio-group :options="plainOptions" />
                  </a-form-item>
                  <a-form-item label="卡面样式" :colon="false">
                    <a-radio-group :options="plainOptions2" />
                    <div class="cardPanelTemplate">
                      <div>
                        <span class="cardPanelTemplateItem activeCardPanel">
                          <img :src="templateList[0]" alt="">
                        </span>
                        <span class="cardPanelTemplateItem">
                          <img :src="templateList[1]" alt="">
                        </span>
                        <span class="cardPanelTemplateItem">
                          <img :src="templateList[2]" alt="">
                        </span>
                      </div>
                    </div>
                  </a-form-item>
                  <a-form-item label="规则说明" :colon="false">
                    <a-textarea
                      style="width:320px;"
                      placeholder="可补充填写本加油卡的其他注意事项，非必填项"
                      :auto-size="{ minRows: 3, maxRows: 6 }"
                    />
                  </a-form-item>


 
                </a-form>

                <div class="btn-box">
                  <a-button type="info" size="large">
                    取消
                  </a-button>
                  <a-button @click="current=1" type="primary" size="large" style="margin-left: 8px;">
                    下一步
                  </a-button>
                </div>
              </div>

              <div class="preview-box">
                <div class="preview-box-header">页面预览</div>
                <div class="preview-box-content">
                  <div class="preview-header">
                    <img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/04/16/10/666c1309d980cf8a4953486cbf85.png">
                  </div>
                  <div class="preview-content">
                    <div class="preview-content-header">
                      <div class="content-left">鹰眼第二加油站</div>
                    </div>
                    <div class="preview-content-body">
                      <div class="preview-card">
                        <img src="https://prd-1258898587.cos.ap-beijing.myqcloud.com/public/2020/11/24/13/8d2d587a8081c645af0335acd7ce.png" alt="预览图片">
                        <div class="preview-card-name">鹰眼预存</div>
                        <div class="preview-available">限LNG、CNG、98(乙醇)、95(会员)、95(乙醇)、92(会员)、92(乙醇)、0(乙醇)、-30、-10#会员价</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mainContent-block">2</div>
            <div class="mainContent-block">3</div>
          </div>
        </div>
      </div>

      
    </a-layout-content>
</template>

<script>
export default {
  name: 'PrepaidEdit',
  data(){
    return {
      current: 0,
      plainOptions:[
        '个人卡', '车队卡'
      ],
      plainOptions2:[
        '模板', '自定义'
      ],
      templateList:[
        'https://prd-1258898587.cos.ap-beijing.myqcloud.com/public/2020/11/24/11/71b0969fc36bb90ed93fbb74adbb.png',
        'https://prd-1258898587.cos.ap-beijing.myqcloud.com/public/2020/11/24/11/2143f30c32366b5fb6d899f2d828.png',
        'https://prd-1258898587.cos.ap-beijing.myqcloud.com/public/2020/11/24/11/5f13040ce79b5929d4ac982a449c.png'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.step-content{
  background: #fff;
  display: flex;
  justify-content: center;
  .step-box{
    padding: 16px 0;
    width: 60%;
    height: 87px;
  }
}
.main-content{
  background: #fff;
  margin-top: 8px;
  height: 850px;
  .mainContent-box{
    display: block;
    box-sizing: border-box;
    width: 100%;
    overflow-x: hidden;
    height: 100%;
    .mainContent-scroll{
      transition: .3s;
      transform: translateZ(0);
      width: 100%;
      position: relative;
      height: 100%;
      &[ittfm="1"]{
        transform: translate3d(-100%,0,0);
      }
      &[ittfm="2"]{
        transform: translate3d(-200%,0,0);
      }
      .mainContent-block{
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        padding-left: 24px;
        padding-right: 24px;
        overflow: hidden;
        &:nth-child(2){
          transform: translateX(100%);
        }
        &:nth-child(3){
          transform: translateX(200%);
        }
        .mainContent-setting-box{
          flex: 2;
          padding-right: 40px;
          
          .setting-header{
            font-size: 14px;
            font-family: PingFangSC-Medium,PingFang SC;
            font-weight: 500;
            color: #1e1e28;
            line-height: 14px;
            padding: 24px 0 16px 0;
            border-bottom: 1px solid #eaeaf4;
            margin-bottom: 27px;
          }
          .btn-box{
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            padding-left: 128px;
            margin-top: 80px;
          }
        }
        .preview-box{
          .preview-box-header{
            font-size: 14px;
            height: 54px;
            font-family: PingFangSC-Medium,PingFang SC;
            font-weight: 500;
            color: #1e1e28;
            line-height: 14px;
            padding: 24px 0 16px 0;
            background: #fff;
          }
          .preview-box-content{
            background: #fafafa;
            position: relative;
            height: 675px;
            width: 368px;
            padding: 24px;
            .preview-header{
              width: 320px;
              height: 67px;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .preview-content{
              position: relative;
              width: 320px;
              height: 560px;
              background: #fff;
              padding: 16px 17px;
              .preview-content-header{
                height: 17px;
                font-size: 12px;
                font-family: PingFangSC-Regular,PingFang SC;
                font-weight: 400;
                line-height: 17px;
                margin-bottom: 8px;
                .content-left{
                  color: #1e1e28;
                  display: inline-block;
                }
              }
              .preview-content-body{
                .preview-card{
                  position: relative;
                  width: 286px;
                  height: 121px;
                  overflow: hidden;
                  border-radius: 15px 15px 0 0;
                  img{
                    width: 100%;
                  }
                  .preview-card-name{
                    top: 17px;
                    left: 17px;
                    width: 145px;
                    height: 24px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 17px;
                    font-family: PingFangSC-Semibold,PingFang SC;
                    font-weight: 600;
                    color: #fff;
                    line-height: 24px;
                  }
                  .preview-available{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    font-size: 11px;
                    font-family: PingFangSC-Regular,PingFang SC;
                    font-weight: 400;
                    color: #fff;
                    line-height: 16px;
                    height: 32px;
                    left: 17px;
                    right: 17px;
                    top: 41px;
                  }
                }
              }
            }
          }
        }



      }
    }
  }
}
.ant-form-item{
  margin-bottom: 16px;
}
.setting-canUseMerchantBox{
  display: flex;
  height: 100%;
  align-items: center;
  span{
    transform: translateX(-8px);
  }
}

</style>
<style lang="scss">
.mainContent-setting-box{
  .ant-col-3{
    padding-left: 42px;
    text-align: right;
    min-width: 122px;
    width: auto;
    line-height: 40px;
  }
  .ant-radio-wrapper{
    width: 140px;
    margin-right: 33px;
    color: #1e1e28;
  }
  .cardPanelTemplate{
    width: 100%;
    padding-top: 15px;
    border-top: 1px solid #eaeaf4;
    div{
      position: relative;
    }
    .cardPanelTemplateItem{
      position: relative;
      display: inline-block;
      width: 120px;
      height: 80px;
      background: #ccc;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 8px;
      cursor: pointer;
      overflow: hidden;
      &.activeCardPanel{
        box-shadow: 0 0 4px 0 #5482eb;
        border: 1px solid #5482eb;
      }
      img{
        height: 100%;
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>