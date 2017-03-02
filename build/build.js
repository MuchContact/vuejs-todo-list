/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _TodoList = __webpack_require__(2);

	var _TodoList2 = _interopRequireDefault(_TodoList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	Vue.filter("timeago", function (date) {
	  return new timeago().format(date);
	});

	Vue.component("todo-list", _TodoList2.default);

	var app = new Vue({
	  el: "#app"
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(3)
	__vue_template__ = __webpack_require__(7)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/muco/Workspaces/JsWs/vuejs-todo-list/public/assets/js/components/TodoList.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(4);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template id="todo-list-template">
	//   <div>
	//     <input class="form-control input-lg" placeholder="What do you need to do?" v-model="newTask" @keypress.enter="addTodo()">
	//     <hr>
	//     <small>
	//       <i class="fa fa-fw fa-bar-chart"></i>
	//       <span v-show="!remainingTasks && completedTasks">No Tasks Remaining</span>
	//       <span v-show="remainingTasks">{{ remainingTasks }} Remaining Task<span v-show="remainingTasks > 1 || remainingTasks === 0">s</span></span>
	//       <span v-show="totalTasks > 1 && totalTasks > remainingTasks"> of {{ totalTasks }} Total Task<span v-show="totalTasks > 1 || totalTasks === 0">s</span></span>
	//       <span v-show="!remainingTasks && !completedTasks">No Tasks in List</span>
	//       <span v-show="completedTasks"> | <a class="text-warning" href="#" @click.prevent="clearCompleted"><i class="fa fa-fw fa-times"></i>Remove Completed Tasks from List</a></span>
	//       <a class="text-danger pull-right" href="#" @click.prevent="resetApp">Reset to Default Demo Data<i class="fa fa-fw fa-refresh"></i></a>
	//     </small>
	//     <hr>
	//     <ul class="list-group">
	//       <li class="list-group-item animated flipInX" v-for="todo in tasks" todo="todo">
	//         <div class="row">
	//           <div class="col-sm-12">
	//             <i :class="{ 'fa fa-fw fa-2x fa-circle-o task-check': !todo.completed, 'fa fa-fw fa-2x fa-check-circle-o text-success task-check': todo.completed }" @click="toggleTodoStatus( todo )"></i>
	//             <span :class="{ 'task-text': !todo.completed, 'task-text task-completed text-success': todo.completed }" @click="toggleTodoStatus( todo )">
	//               {{ todo.task }}
	//             </span>
	//             <button class="btn btn-danger btn-sm pull-right" @click="deleteTodo( todo )"><i class="fa fa-2x fa-minus-circle"></i></button>
	//           </div>
	//         </div>
	//         <div class="row">
	//           <div class="col-sm-12">
	//             <small class="priority-meta text-muted">
	//               Priority:
	//               <span @click="togglePriority( todo, 3 )" :class="{ 'label label-default priority-label inactive': todo.priority !== 3 , 'label label-info priority-label': todo.priority === 3 }"><i class="fa fa-chevron-down"></i> Low</span>
	//               <span @click="togglePriority( todo, 2 )" :class="{ 'label label-default priority-label inactive': todo.priority !== 2 , 'label label-primary priority-label': todo.priority === 2 }">Normal</span>
	//               <span @click="togglePriority( todo, 1 )" :class="{ 'label label-default priority-label inactive': todo.priority !== 1 , 'label label-danger priority-label': todo.priority === 1 }">High <i class="fa fa-chevron-up"></i></span>
	//               <span v-show="todo.created"><i class="fa fa-clock-o time-created"></i> Added <span class="timeago" :datetime="todo.created">{{ todo.created | timeago }}</span></span>
	//             </small>
	//           </div>
	//         </div>
	//       </li>
	//     </ul>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  data: function data() {
	    return {
	      backendUri: "http://localhost:3000/todos/",
	      newTask: "",
	      tasks: [],
	      defaultSortBy: ["priority", "created"],
	      defaultSortOrder: ["asc", "desc"],
	      defaultTaskPriority: 2 // 1: high, 2: normal. 3: low
	    };
	  },
	  created: function created() {
	    this.initApp();
	  },
	  mounted: function mounted() {
	    new timeago().render(document.querySelectorAll(".timeago"));
	  },
	  methods: {
	    togglePriority: function togglePriority(task, priority) {
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
	    toggleTodoStatus: function toggleTodoStatus(task) {
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
	    sortTasks: function sortTasks(sortBy, sortOrder) {
	      this.tasks = _.orderBy(this.tasks, sortBy, sortOrder);
	    },
	    deleteTodo: function deleteTodo(task) {
	      this.$http.delete(this.backendUri + task._id).then(function (response) {
	        task.updated = Date.now();
	        this.tasks.splice(this.tasks.indexOf(task), 1);
	        this.setData("todoData", this.tasks);
	      }, function (response) {
	        alert("delete task failed");
	      });
	    },
	    addTodo: function addTodo() {
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
	    isComplete: function isComplete(task) {
	      return task.completed;
	    },
	    notComplete: function notComplete(task) {
	      return !this.isComplete(task);
	    },
	    clearCompleted: function clearCompleted() {
	      this.tasks = this.tasks.filter(this.notComplete);
	      this.setData("todoData", this.tasks);
	    },
	    setData: function setData(key, data) {
	      var todoData = (0, _stringify2.default)(data);
	      localStorage.setItem(key, todoData);
	    },
	    getData: function getData(key) {
	      var todoData = localStorage.getItem(key);
	      return JSON.parse(todoData);
	    },
	    resetApp: function resetApp() {
	      this.tasks = this.getData("originalData");
	      this.initApp();
	    },
	    initApp: function initApp() {
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
	    completedTasks: function completedTasks() {
	      if (this.tasks) {
	        return this.tasks.filter(this.isComplete).length;
	      }
	    },
	    remainingTasks: function remainingTasks() {
	      if (this.tasks) {
	        return this.tasks.filter(this.notComplete).length;
	      }
	    },
	    totalTasks: function totalTasks() {
	      if (this.tasks) {
	        return this.tasks.length;
	      }
	    }
	  }
	};
	// </script>
	//

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(6);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "\r\n  <div>\r\n    <input class=\"form-control input-lg\" placeholder=\"What do you need to do?\" v-model=\"newTask\" @keypress.enter=\"addTodo()\">\r\n    <hr>\r\n    <small>\r\n      <i class=\"fa fa-fw fa-bar-chart\"></i>\r\n      <span v-show=\"!remainingTasks && completedTasks\">No Tasks Remaining</span>\r\n      <span v-show=\"remainingTasks\">{{ remainingTasks }} Remaining Task<span v-show=\"remainingTasks > 1 || remainingTasks === 0\">s</span></span>\r\n      <span v-show=\"totalTasks > 1 && totalTasks > remainingTasks\"> of {{ totalTasks }} Total Task<span v-show=\"totalTasks > 1 || totalTasks === 0\">s</span></span>\r\n      <span v-show=\"!remainingTasks && !completedTasks\">No Tasks in List</span>\r\n      <span v-show=\"completedTasks\"> | <a class=\"text-warning\" href=\"#\" @click.prevent=\"clearCompleted\"><i class=\"fa fa-fw fa-times\"></i>Remove Completed Tasks from List</a></span>\r\n      <a class=\"text-danger pull-right\" href=\"#\" @click.prevent=\"resetApp\">Reset to Default Demo Data<i class=\"fa fa-fw fa-refresh\"></i></a>\r\n    </small>\r\n    <hr>\r\n    <ul class=\"list-group\">\r\n      <li class=\"list-group-item animated flipInX\" v-for=\"todo in tasks\" todo=\"todo\">\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-12\">\r\n            <i :class=\"{ 'fa fa-fw fa-2x fa-circle-o task-check': !todo.completed, 'fa fa-fw fa-2x fa-check-circle-o text-success task-check': todo.completed }\" @click=\"toggleTodoStatus( todo )\"></i>\r\n            <span :class=\"{ 'task-text': !todo.completed, 'task-text task-completed text-success': todo.completed }\" @click=\"toggleTodoStatus( todo )\">\r\n              {{ todo.task }}\r\n            </span>\r\n            <button class=\"btn btn-danger btn-sm pull-right\" @click=\"deleteTodo( todo )\"><i class=\"fa fa-2x fa-minus-circle\"></i></button>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-12\">\r\n            <small class=\"priority-meta text-muted\">\r\n              Priority:\r\n              <span @click=\"togglePriority( todo, 3 )\" :class=\"{ 'label label-default priority-label inactive': todo.priority !== 3 , 'label label-info priority-label': todo.priority === 3 }\"><i class=\"fa fa-chevron-down\"></i> Low</span>\r\n              <span @click=\"togglePriority( todo, 2 )\" :class=\"{ 'label label-default priority-label inactive': todo.priority !== 2 , 'label label-primary priority-label': todo.priority === 2 }\">Normal</span>\r\n              <span @click=\"togglePriority( todo, 1 )\" :class=\"{ 'label label-default priority-label inactive': todo.priority !== 1 , 'label label-danger priority-label': todo.priority === 1 }\">High <i class=\"fa fa-chevron-up\"></i></span>\r\n              <span v-show=\"todo.created\"><i class=\"fa fa-clock-o time-created\"></i> Added <span class=\"timeago\" :datetime=\"todo.created\">{{ todo.created | timeago }}</span></span>\r\n            </small>\r\n          </div>\r\n        </div>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n";

/***/ }
/******/ ]);