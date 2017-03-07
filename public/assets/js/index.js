import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import TodoList from './components/TodoList.vue'
import Home from './components/Home.vue'
import App from './components/App.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.filter("timeago", function (date) {
  return new timeago().format(date);
});

export var router = new VueRouter()

router.map({
  '/home': {
    component: Home
  }
})

router.redirect({
  '*': '/home'
})

router.start(App, '#appPage')
