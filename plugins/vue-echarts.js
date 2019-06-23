import Vue from 'vue'
import VueECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/polar'

Vue.component('v-chart', VueECharts)
//全局挂载   任何页面都可以使用v-chart标签