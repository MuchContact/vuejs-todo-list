<template>
    <div class="container">
      <div class="container page-header">
        <h1>Simple Vue.js To-do List App</h1>
        <p class="lead">
          Type text below and hit enter key to add new tasks. Click priority label on task to change it. Tasks sort by priority and when created.
          <br>
          <small> Demo uses browser's local storage - task list will persist between visits unless browser's cache is cleared.</small>
        </p>
      </div>
      <div class="container" v-if="!user.authenticated">
        <h2>
          Not Login yet. Please <a v-link="'login'">Login in</a>.
        </h2>
      </div>
      <div class="row" v-if="user.authenticated">
        <div class="col-sm-12">
          <todo-list></todo-list>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import TODO from './TodoList.vue'
import auth from '../auth'

export default {
  data() {
    return {
      user: auth.user
    }
  },
  created: function () {
    this.initApp();
  },
  methods: {
    initApp: function () {
        if(this.user.authenticated) {
          Vue.component("todo-list", TODO);
        }
    }
  }
}
</script>
