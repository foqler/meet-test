import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(new VueSocketIO({
  debug: false,
  connection: SocketIO('localhost:3000', {
    withCredentials: true
  })
}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
