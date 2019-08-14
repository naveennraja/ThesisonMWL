angular.module('web-tasks').controller("introductionController",introductionController);
function introductionController($scope) {
    var vm = this;
    vm.title = "Please fill in the details and proceed to task";
    vm.data = {};
    vm.data.uniqueId = '_' + (Number(String(Math.random()).slice(2)) + Date.now() + Math.round(performance.now())).toString(36);
    // Credits to IP-API.com http://ip-api.com/
    $.getJSON('http://ip-api.com/json?callback=?', function(data) {
        vm.data.userDetail = {};
        vm.data.userIp = data["query"];
        vm.data.userDetail = data;
    });
    $scope.getTaskType = function() {
        $.extend(vm.data,$("form").serializeObject());
        localStorage.setItem("taskData",JSON.stringify(vm.data));
        //console.log(vm.data);
        switch ($scope.taskval) {
            case "Simple":
                $scope.taskLink = "simple-task";
                break;
            case "Medium":
                $scope.taskLink = "medium-task";
                break;
            case "Complex":
                $scope.taskLink = "complex-task";
                break;
            default :

        }
    };
}
/*Credits: https://gist.github.com/rambabusaravanan/8eebfd7a9c828fd6121c8d8a48e08962*/
$.fn.serializeObject = function() {
    var obj = {};
    var arr = this.serializeArray();
    arr.forEach(function(item, index) {
        if (obj[item.name] === undefined) { // New
            obj[item.name] = item.value || '';
        } else {                            // Existing
            if (!obj[item.name].push) {
                obj[item.name] = [obj[item.name]];
            }
            obj[item.name].push(item.value || '');
        }
    });
    return obj;
};