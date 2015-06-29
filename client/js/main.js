var myApp = angular.module('myApp', ['ngRoute']);
// routing
myApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/task.html'
		});
})

myApp.factory('taskFactory', function() {
	var factory = {};
	var tasks = [];
	var priorities = [
		{priority: '1 LOW'}, 
		{priority: '2 MEDIUM'}, 
		{priority: '3 HIGH'}
	];

	factory.getTasks = function(callback) {
		callback(tasks);
	}

	factory.getPriority = function(callback) {
		callback(priorities);
	}

	factory.addTask = function(task, callback) {
		tasks.push(task);
		callback(tasks);
	}

	factory.removeTask = function(task, callback) {
		tasks.splice(tasks.indexOf(task), 1);
		callback(tasks);
	}

	return factory;
})

myApp.controller('taskController', function($scope, taskFactory) {
	var tasks = {};
	var priorities = {};

	taskFactory.getTasks(function(data) {
		$scope.tasks = data;
	})

	taskFactory.getPriority(function(data) {
		$scope.priorities = data;
	})

	$scope.addTask = function() {
		$scope.task.created = new Date();
		if($scope.task.alert === '1') {
			$scope.task.priority = 'LOW';
		} else if($scope.task.alert === '2') {
			$scope.task.priority = 'MEDIUM';
		} else {
			$scope.task.priority = 'HIGH';
		}
		taskFactory.addTask($scope.task, function(data) {
			console.log(data);
			$scope.tasks = data;
		});
		$scope.task = {};
	}

	$scope.removeTask = function(task) {
		taskFactory.removeTask(task, function(data) {
			$scope.tasks = data;
		});
	}
})