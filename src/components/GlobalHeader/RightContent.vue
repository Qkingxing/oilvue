<template>
  <div :class="wrpCls" class="header_right_wrap">
    <!-- 切换 -->
    <a-popover v-model="visible" trigger="click">

      <div class="box-item" style="width: auto;">
        <span class="header-notice">
          {{site_id==(-1)?userInfo.group_name:userInfo.site_name}}
          <a-icon type="caret-down" class="anticon" :class="{'route-icon':visible}"/>
        </span>
        
      </div>

      <div slot="content" class="popover_box">
        <div class="header_stationSearchBox">
          <a-input-search 
            placeholder="请输入站点的名称" 
            size="large"
            class="tree_search"
            @change="onChange"/>
        </div>
        <div class="tree_box" v-if="treeShow">
          <a-tree
            :default-expand-all="true"
            :tree-data="treeData"
            @select="onChangePermission"
          >
            <template slot="title" slot-scope="{ title }">
              <span>{{ title }}</span>
            </template>
          </a-tree>
        </div>
      </div>
    </a-popover>
    <!-- 客服 -->
    <a-popover placement="bottomRight">
      <template slot="content">
        <a-carousel style="width: 334px;" class="kefu">
          <div class="slider_item" style="width: 334px;"><h3>1</h3></div>
          <div class="slider_item" style="width: 334px;"><h3>2</h3></div>
          <div class="slider_item" style="width: 334px;"><h3>3</h3></div>
          <div class="slider_item" style="width: 334px;"><h3>4</h3></div>
        </a-carousel>
      </template>
      <div class="box-item">
        <a-icon type="customer-service" />
      </div>
    </a-popover>
    <!-- 通知 -->
    
    <a-popover placement="bottomRight">
      <template slot="content" style="width:320px;">
        <div>
          <a-tabs
            default-active-key="1"
            :style="{ width: '274px' }"
            >
            <a-tab-pane key="1" tab="通知(0)">
              <a-empty />
            </a-tab-pane>
            <a-tab-pane key="2" tab="消息(0)">
              <a-empty />
            </a-tab-pane>
            <a-tab-pane key="3" tab="待办(0)">
              <a-empty />
            </a-tab-pane>
          </a-tabs>
        </div>
      </template>
      <div class="box-item">
        <a-icon type="bell" />
      </div>
    </a-popover>
    
    <!-- 微信 -->
    
    <a-popover placement="bottomRight">
      <template slot="content">
        <div class="NativeMiniAppQrcodeContent_qrcode">
          <img src="data:image/png;base64,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" alt="">
        </div>
        <p class="NativeMiniAppQrcodeContent_text">我是二维码</p>
      </template>
      <div class="box-item" style="font-size:22px;">
        <icon-font type="iconweixin" />
      </div>
    </a-popover>
    
    <!-- 小程序 -->
    
    <a-popover placement="bottomRight">
      <template slot="content">
        <div class="NativeMiniAppQrcodeContent_qrcode">
          <img src="data:image/png;base64,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" alt="">
        </div>
        <p class="NativeMiniAppQrcodeContent_text">我是小程序</p>
      </template>
      <div class="box-item">
        <icon-font type="iconxiaochengxu" />
      </div>
    </a-popover>
    
    <!-- 全屏 -->
    
    <a-tooltip>
      <template slot="title">
        {{fullscreen ? `取消全屏`:`全屏`}}
      </template>
      <div class="box-item" @click="handleFullScreen">
        <a-icon type="arrows-alt" />
      </div>
    </a-tooltip>
    
    <!-- 账号 -->
    <avatar-dropdown :menu="showMenu" :current-user="{name: nickname}" :class="prefixCls" />
    <!-- <select-lang :class="prefixCls" /> -->
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import notification from 'ant-design-vue/es/notification'
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'

const treeData = [
  {
    title: '集团',
    key: '0-0',
    children: [

    ],
  }
];

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      // currentUser: {
      //   name: this.nickname
      // },
      visible: false,
      fullscreen: false, // 全屏
      treeData,
      treeShow: false
    }
  },
  computed: {
    ...mapGetters(['nickname', 'site_id','userInfo']),
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
    
  },
  created(){
    this.treeLoad('')
  },
  mounted () {
    // setTimeout(() => {
      // this.currentUser = {
      //   name: 'Serati Ma'
      // }
      // this.currentUser = {
        // name: this.nickname
      // }
    // }, 1500)
    
    
  },
  methods: {
    ...mapMutations(['SET_SITE_ID']),
    ...mapActions(['getSitelist', 'SwitchPermission']),
    // 切换权限
    onChangePermission(selectedKeys){
      // console.log(selectedKeys)
      // console.log(this.treeData[0].children)
      let item = this.treeData[0].children.filter(e=>{
        return e.key === selectedKeys[0]
      })[0]
      
      if (item) {
        // console.log('油站')
        // console.log(item.data)
        // console.log(this.userInfo)
        // 当前账号是单站账号
        // account_type
        // [string]	是	账号类型账号类型，0集团账号1单站账号2片区账号，
        if (this.userInfo.account_type) {
          notification.error({
            message: '错误',
            description: '你是单站账号没有该权限'
          })
        }else{
          // 当前账号是集团账号
          // console.log('切换油站成功')
          this.SwitchPermission(item.data.id)
        }
      }else{
        // console.log('集团')
        // 当前账号是单站账号
        if (this.userInfo.account_type) {
          notification.error({
            message: '错误',
            description: '你是单站账号没有该权限'
          })
        }else{
          // 当前账号是集团账号
          // console.log('切换集团成功')
          this.SwitchPermission(-1)
        }
      }
    },
    // 油站树初始化
    treeLoad(sreach){
      this.treeShow = false
      this.getSitelist({ sreach, head: true }).then(res=>{
        
        if (res.code === 200) {
          // console.log(res.data.data)
          this.treeData[0].title = this.userInfo.group_name
          this.treeData[0].children = res.data.data.map((e,i)=>{
            return {
              title: e.site_name,
              key: e.id,
              data: e
            }
          })
          this.treeShow = true
        }
      })
    },
    handleFullScreen(){
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    hide() {
      this.visible = false;
    },
    onChange(e) {
      const value = e.target.value;
      // console.log(value)
      this.treeLoad(value)
    },
  }
}
</script>
<style lang="less" scoped>
.header_right_wrap{
  display: flex;
  align-items: center;
}
.box-item{
  height: 55px;
  line-height: 55px;
  display: inline-block;
  width: 50px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  color: #040a46;
  .header-notice{
    display: inline-block;
    padding: 0 14px 0 20px;
    height: 100%;
    min-width: 160px;
    text-align: center;
    font-size: 16px;
    .anticon{
      display: inline-block;
      color: inherit;
      font-size: 16px;
      line-height: 0;
      text-align: center;
      text-transform: none;
      vertical-align: -.125em;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      transition: all .4s;
      &.route-icon{
        transform: rotateX(180deg);
      }
    }
    
  }
}
.popover_box{
  display: flex;
  flex-direction: column;
  width: 303px; 
  height: 520px;
  .tree_box{
    flex: 1;
    overflow: auto;
    width: 300px; 
    margin-top: 10px;
  }
}
.header_stationSearchBox{
  .ant-input{
    font-size: 14px;
  }
}
.NativeMiniAppQrcodeContent_qrcode{
  display: block;
  width: 100%;
  padding-top: 12px;
  box-sizing: content-box;
  img{
    display: block;
    width: 140px;
    height: auto;
    margin: auto;
  }
}
.NativeMiniAppQrcodeContent_text{
  font-size: 14px;
  font-weight: 400;
  color: #333;
  margin-top: 8px;
  margin-bottom: 8px;
  text-align: center;
}
.ant-carousel{
  
  .slick-slide {
    text-align: center;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
    h3{
      color: #fff;
    }
  }
}


.slider_item{
  text-align: center;
  width: 334px;
  height: 152px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
</style>

<style lang="less">

  .tree_search{
    input{
      font-size: 14px!important;
    }
  }

.kefu{
  &.ant-carousel{
    .slick-dots{
      position: relative;
      height: auto;
      bottom: 0;
      li{
        margin: 0 5px;
        button{
          border: 1px solid #ddd;
          width: 10px;
          height: 10px;
          box-sizing: border-box;
          border-radius: 50%;
          opacity: 1;
        }
        &.slick-active{
          button{
            border-color: #7C7EE2;
            width: 10px;
            background: #7C7EE2;
          }
        }
      }
    }
  }
}
</style>