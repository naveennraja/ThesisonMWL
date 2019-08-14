angular.module('web-tasks', ['ngRoute']).config(config);
function config($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: introductionController,
        controllerAs: 'vm',
        templateUrl: "public/angular/introduction-page/introduction.html"
    }).when('/simple-task',{
        controller : simpleTaskController,
        templateUrl:"public/angular/simple-task/simple-task.html",
        controllerAs : 'vm'
    }).when('/nasa-tlx',{
            templateUrl:"public/angular/nasa-tlx/nasa-tlx.html",
            controller : nasatlxcontroller,
            controllerAs : 'vm'
    }).when('/self-report-measure',{
            templateUrl:"public/angular/self-report-measure/self-report-measure.html",
            controller : selfreportmeasure,
            controllerAs : 'vm'
    }).when('/medium-task',{
        templateUrl:"public/angular/medium-task/medium-task.html",
        controller : mediumTaskController,
        controllerAs : 'vm'
    }).when('/complex-task',{
        templateUrl:"public/angular/complex-task/complex-task.html",
        controller : complexTaskController,
        controllerAs : 'vm'
    }).when('/thank-you',{
        templateUrl:"public/angular/thank-you/thank-you.html",
        skipLocationChange: false
     }).otherwise({
        controller: introductionController,
        controllerAs: 'vm',
        templateUrl: "public/angular/introduction-page/introduction.html"

    });
    $locationProvider.html5Mode(false).hashPrefix('!');
}