import Vue from 'vue'
import Router from 'vue-router'
import loazyload from '@/views/index'
import scroll from '@/views/scroll'
import rain from '@/views/canvas'
import emergencyPlan from '@/views/emergencyPlan'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loazyloadDome',
      component: loazyload
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: scroll
    },
    {
      path: '/rain',
      name: 'rain',
      component: rain
    },
    {
      path: '/emergencyPlan',
      name: 'emergencyPlan',
      component: emergencyPlan
    }
  ]
})
