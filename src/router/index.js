import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/app/HomePage.vue'
import Login from '../views/login/Login.vue'
import firebase from 'firebase'

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
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

/* router.beforeEach((to, from, next) => {
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
}) */

export default router
