<template>

  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <!-- <div class="container"> -->
      <!-- <div class="user-layout-lang">
        <select-lang class="select-lang-trigger" />
      </div> -->
      <!-- <div class="user-layout-content"> -->
        <!-- <div class="top"> -->
          <!-- <div class="header">
            <a href="/">
              <img src="~@/assets/logo.svg" class="logo" alt="logo">
              <span class="title">Ant Design</span>
            </a>
          </div> -->
          <!-- <div class="desc">
            {{ $t('layouts.userLayout.title') }}
          </div> -->
        <!-- </div> -->

        <!-- <router-view /> -->

        <!-- <div class="footer">
          <div class="links">
            <a href="_self">帮助</a>
            <a href="_self">隐私</a>
            <a href="_self">条款</a>
          </div>
          <div class="copyright">
            Copyright &copy; 2018 vueComponent
          </div>
        </div> -->
      <!-- </div> -->
    <!-- </div> -->
    <div class="loginContainer">
      <div class="loginContainerSpace"></div>
      <div class="loginContainerBackground">
        <img data-v-329ea08f="" src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/05/14/16/4b16603e33054b9175912f605785.jpeg">
      </div>
      <div class="loginContainerMainBox">
        <router-view />
      </div>
      <div class="loginContainerSpace"></div>
    </div>
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'
import SelectLang from '@/components/SelectLang'

export default {
  name: 'UserLayout',
  components: {
    SelectLang
  },
  mixins: [deviceMixin],
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    //padding: 50px 0 84px;
    position: relative;

    .user-layout-lang {
      width: 100%;
      height: 40px;
      line-height: 44px;
      text-align: right;

      .select-lang-trigger {
        cursor: pointer;
        padding: 12px;
        margin-right: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        vertical-align: middle;
      }
    }

    .user-layout-content {
      padding: 32px 0 24px;

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        // position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }

    a {
      text-decoration: none;
    }

  }
}
.loginContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  height: 100%;
  height: 100vh;
  margin: auto;
  background: #fff;
  z-index: 1;
  .loginContainerSpace{
    display: flex;
    flex: 1;
    max-width: 60px;
    height: 100%;
  }
  .loginContainerBackground{
    display: flex;
    flex: 3;
    flex-shrink: 0;
    min-width: 636px;
    max-width: 800px;
    justify-content: flex-start;
    align-items: center;
    margin-right: 100px;
    img{
      display: block;
      height: 476px;
    }
  }
  .loginContainerMainBox{
    display: flex;
    flex: 2;
    flex-shrink: 0;
    min-width: 400px;
    max-width: 400px;
    justify-content: flex-end;
    width: 400px;
    height: 476px;
    background: #fff;
    box-shadow: 0 17px 41px 0 rgba(241,242,247,.8);
    border-radius: 8px;
    overflow: hidden;
    line-height: 1;
  }
}
</style>
