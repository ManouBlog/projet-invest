import { createStore } from 'vuex'

export default createStore({
  state: {
    user:JSON.parse(localStorage.getItem('user')),
    token : JSON.parse(localStorage.getItem('token'))
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
