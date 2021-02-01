// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'

// 添加 echarts 
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 数字跳动
import countTo from 'vue-count-to'
Vue.component('countTo', countTo)
// element-ui
// 禁止全局引入，跟ant冲突
import { 
  Cascader, CascaderPanel,Select,Option
 
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Cascader).use(CascaderPanel).use(Select).use(Option)
 

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
// import './core/lazy_use' // use lazy load components
import './core/use' // use all components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

// 引入自定义阿里图标库
import { Icon } from 'ant-design-vue';
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2354010_t5rzgia7jsm.js',
});
Vue.component('icon-font', IconFont)


window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
