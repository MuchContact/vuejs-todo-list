import TODO from './components/TodoList.vue'

Vue.filter("timeago", function (date) {
  return new timeago().format(date);
});

Vue.component("todo-list", TODO);

var app = new Vue({
  el: "#app"
});
