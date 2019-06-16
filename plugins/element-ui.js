import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import '~/assets/css/app.scss'

export default () => {
  Vue.use(Element, { locale })
}