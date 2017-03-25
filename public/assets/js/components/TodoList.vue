<template id="todo-list-template">
  <div>
    <input class="form-control input-lg" placeholder="What do you need to do?" v-model="newTask" @keypress.enter="addTodo()">
    <hr>
    <small>
      <i class="fa fa-fw fa-bar-chart"></i>
      <span v-show="!remainingTasks && completedTasks">No Tasks Remaining</span>
      <span v-show="remainingTasks">{{ remainingTasks }} Remaining Task<span v-show="remainingTasks > 1 || remainingTasks === 0">s</span></span>
      <span v-show="totalTasks > 1 && totalTasks > remainingTasks"> of {{ totalTasks }} Total Task<span v-show="totalTasks > 1 || totalTasks === 0">s</span></span>
      <span v-show="!remainingTasks && !completedTasks">No Tasks in List</span>
      <span v-show="completedTasks"> | <a class="text-warning" href="#" @click.prevent="clearCompleted"><i class="fa fa-fw fa-times"></i>Remove Completed Tasks from List</a></span>
      <a class="text-danger pull-right" href="#" @click.prevent="resetApp">Reset to Default Demo Data<i class="fa fa-fw fa-refresh"></i></a>
    </small>
    <hr>
    <ul class="list-group">
      <li class="list-group-item animated flipInX" v-for="todo in tasks" todo="todo">
        <div class="row">
          <div class="col-sm-12">
            <i :class="{ 'fa fa-fw fa-2x fa-circle-o task-check': !todo.completed, 'fa fa-fw fa-2x fa-check-circle-o text-success task-check': todo.completed }" @click="toggleTodoStatus( todo )"></i>
            <span :class="{ 'task-text': !todo.completed, 'task-text task-completed text-success': todo.completed }" @click="toggleTodoStatus( todo )">
              {{ todo.task }}
            </span>
            <button class="btn btn-danger btn-sm pull-right" @click="deleteTodo( todo )"><i class="fa fa-2x fa-minus-circle"></i></button>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <small class="priority-meta text-muted">
              Priority:
              <span @click="togglePriority( todo, 3 )" :class="{ 'label label-default priority-label inactive': todo.priority !== 3 , 'label label-info priority-label': todo.priority === 3 }"><i class="fa fa-chevron-down"></i> Low</span>
              <span @click="togglePriority( todo, 2 )" :class="{ 'label label-default priority-label inactive': todo.priority !== 2 , 'label label-primary priority-label': todo.priority === 2 }">Normal</span>
              <span @click="togglePriority( todo, 1 )" :class="{ 'label label-default priority-label inactive': todo.priority !== 1 , 'label label-danger priority-label': todo.priority === 1 }">High <i class="fa fa-chevron-up"></i></span>
              <span v-show="todo.created"><i class="fa fa-clock-o time-created"></i> Added <span class="timeago" :datetime="todo.created">{{ todo.created | timeago }}</span></span>
            </small>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'
import auth from '../auth'

export default {
  data: function () {
      return {
        backendUri: "http://localhost:3000/todos/",
        newTask: "",
        tasks: [],
        defaultSortBy: ["priority", "created"],
        defaultSortOrder: ["asc", "desc"],
        defaultTaskPriority: 2 // 1: high, 2: normal. 3: low
      }
    },
    created: function () {
      this.initApp();
    },
    mounted: function () {
      new timeago().render(document.querySelectorAll(".timeago"));
    },
    methods: {
      togglePriority: function (task, priority) {
        var originUpdateTime = task.updated;
        var originPriority = task.priority;
        task.updated = Date.now();
        task.priority = priority;

        this.$http.put(this.backendUri + task._id, task).then(function (response){
          this.sortTasks(this.defaultSortBy, this.defaultSortOrder);
          this.setData("todoData", this.tasks);
        }, function (err) {
          task.updated = originUpdateTime;
          task.priority = originPriority;
          alert("update task failed");
        });

      },
      toggleTodoStatus: function (task) {
        var originUpdateTime = task.updated;
        task.updated = Date.now();
        task.completed = !task.completed;

        this.$http.put(this.backendUri + task._id, task).then((response) => {
          this.setData("todoData", this.tasks);
        }, (err) => {
          task.updated = originUpdateTime;
          task.completed = !task.completed;
          alert("update task failed");
        });

      },
      sortTasks: function (sortBy, sortOrder) {
        this.tasks = _.orderBy(this.tasks, sortBy, sortOrder);
      },
      deleteTodo: function (task) {
        this.$http.delete(this.backendUri + task._id).then((response) => {
          task.updated = Date.now();
          this.tasks.splice(this.tasks.indexOf(task), 1);
          this.setData("todoData", this.tasks);
        }, (err) => {
          alert("delete task failed");
        });

      },
      addTodo: function () {
        if (this.newTask.trim().length) {
          var task = {
            task: this.newTask,
            priority: this.defaultTaskPriority,
            created: Date.now(),
            completed: false
          };

          this.$http.post(this.backendUri, task).then(function (response) {
            this.tasks.push(task);
            this.sortTasks(this.defaultSortBy, this.defaultSortOrder);
            this.$nextTick(function () {
              new timeago().render(document.querySelectorAll(".timeago"));
            });
            this.newTask = "";
            this.setData("todoData", this.tasks);
          }, function (response) {
            alert("create task failed");
          });

        } else {
          this.newTask = "";
        }
      },
      isComplete: function (task) {
        return task.completed;
      },
      notComplete: function (task) {
        return !this.isComplete(task);
      },
      clearCompleted: function () {
        this.tasks = this.tasks.filter(this.notComplete);
        this.setData("todoData", this.tasks);
      },
      setData: function (key, data) {
        var todoData = JSON.stringify(data);
        localStorage.setItem(key, todoData);
      },
      getData: function (key) {
        var todoData = localStorage.getItem(key);
        return JSON.parse(todoData);
      },
      resetApp: function () {
        this.tasks = this.getData("originalData");
        this.initApp();
      },
      initApp: function () {
          this.$http.get(this.backendUri).then(function (response) {
                    this.tasks = JSON.parse(response.body);
                    this.sortTasks(this.defaultSortBy, this.defaultSortOrder);
                    this.setData("todoData", this.tasks);
                    new timeago().render(document.querySelectorAll(".timeago"));

                  }, function (error) {
                    if(error.status == 401){
                      auth.logout();
                    } else {
                      console.log(error);
                    }
                  });
      }
    },
    computed: {
      completedTasks: function () {
        if (this.tasks) {
          return this.tasks.filter(this.isComplete).length;
        }
      },
      remainingTasks: function () {
        if (this.tasks) {
          return this.tasks.filter(this.notComplete).length;
        }
      },
      totalTasks: function () {
        if (this.tasks) {
          return this.tasks.length;
        }
      }
    }
}
</script>
