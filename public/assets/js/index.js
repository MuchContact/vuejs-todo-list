import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Home from './components/Home.vue'
import App from './components/App.vue'
import Login from './components/Login.vue'
import auth from './auth'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.filter("timeago", function (date) {
  return new timeago().format(date);
});

auth.checkAuth()

export var router = new VueRouter()

router.map({
  '/home': {
    component: Home
  },
  '/login': {
    component: Login
  },
  '/signup': {
    component: Login
  }
})

router.redirect({
  '*': '/home'
})

router.start(App, '#appPage')
