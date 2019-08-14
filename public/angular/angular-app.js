angular.module('web-tasks', ['ngRoute']).config(config);
function config($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: introductionController,
        controllerAs: 'vm',
        templateUrl: "angular/introduction-page/introduction.html"
    }).when('/simple-task',{
        controller : simpleTaskController,
        templateUrl:"angular/simple-task/simple-task.html",
        controllerAs : 'vm'
    }).when('/nasa-tlx',{
            templateUrl:"angular/nasa-tlx/nasa-tlx.html",
            controller : nasatlxcontroller,
            controllerAs : 'vm'
    }).when('/self-report-measure',{
            templateUrl:"angular/self-report-measure/self-report-measure.html",
            controller : selfreportmeasure,
            controllerAs : 'vm'
    }).when('/medium-task',{
        templateUrl:"angular/medium-task/medium-task.html",
        controller : mediumTaskController,
        controllerAs : 'vm'
    }).when('/complex-task',{
        templateUrl:"angular/complex-task/complex-task.html",
        controller : complexTaskController,
        controllerAs : 'vm'
    }).when('/thank-you',{
        templateUrl:"angular/thank-you/thank-you.html",
        skipLocationChange: false
     }).otherwise({
        controller: introductionController,
        controllerAs: 'vm',
        templateUrl: "angular/introduction-page/introduction.html"

    });
    $locationProvider.html5Mode(false).hashPrefix('!');
}