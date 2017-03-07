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
      <div class="row">
        <div class="col-sm-12">
          <todo-list></todo-list>
        </div>
      </div>
    </div>
</template>

<script>
import TODO from './TodoList.vue'
import Vue from 'vue'

Vue.component("todo-list", TODO);
</script>
