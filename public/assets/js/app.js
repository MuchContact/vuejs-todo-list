Vue.filter("timeago", function (date) {
  return new timeago().format(date);
});

Vue.component("todo-list", {
  template: "#todo-list-template",
  data: function () {
    return {
      backendUri: "https://immense-hamlet-88968.herokuapp.com/",
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

      this.$http.put(this.backendUri + task._id, task).then(function (response) {
        this.sortTasks(this.defaultSortBy, this.defaultSortOrder);
        this.setData("todoData", this.tasks);
      }, function (response) {
        task.updated = originUpdateTime;
        task.priority = originPriority;
        alert("update task failed");
      });

    },
    toggleTodoStatus: function (task) {
      var originUpdateTime = task.updated;
      task.updated = Date.now();
      task.completed = !task.completed;

      this.$http.put(this.backendUri + task._id, task).then(function (response) {
        this.setData("todoData", this.tasks);
      }, function (response) {
        task.updated = originUpdateTime;
        task.completed = !task.completed;
        alert("update task failed");
      });

    },
    sortTasks: function (sortBy, sortOrder) {
      this.tasks = _.orderBy(this.tasks, sortBy, sortOrder);
    },
    deleteTodo: function (task) {
      this.$http.delete(this.backendUri + task._id).then(function (response) {
        task.updated = Date.now();
        this.tasks.splice(this.tasks.indexOf(task), 1);
        this.setData("todoData", this.tasks);
      }, function (response) {
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
      localStorage.clear();
      this.$http.get(this.backendUri).then(function (response) {
        this.tasks = response.body;
        this.sortTasks(this.defaultSortBy, this.defaultSortOrder);
        this.setData("todoData", this.tasks);
        new timeago().render(document.querySelectorAll(".timeago"));

      }, function (response) {
        // error callback
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
});

var app = new Vue({
  el: "#app"
});
