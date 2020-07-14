import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import HomePage from '../views/app/HomePage.vue'
import Login from '../views/login/Login.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } 
  else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({ name: 'HomePage' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
