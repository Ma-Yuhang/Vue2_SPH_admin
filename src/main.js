import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control


if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 引入三级分类组件
import CategorySelect from '@/components/CategorySelect'
// 将三级分类组件注册为全局组件
Vue.component(CategorySelect.name, CategorySelect)
// 引入有提示文字的组件
import HintButton from '@/components/HintButton'
Vue.component(HintButton.name, HintButton)

Vue.config.productionTip = false
// 引入api相关的接口
import API from '@/api'
Vue.prototype.$API = API
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
