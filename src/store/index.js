import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import crm from './modules/crm'
import user from './modules/user'

// default router permission control
// import permission from './modules/permission'

// dynamic router permission control (Experimental)
import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    crm,
    user,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
