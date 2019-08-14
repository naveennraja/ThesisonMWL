//angular.module('web-tasks').factory('taskDataFactory', taskService);
angular.module('web-tasks').controller("selfreportmeasure",selfreportmeasure);
function selfreportmeasure($http) {
    var vm = this;
    vm.title = "Self Report Measure";
    vm.data = {
        "self-report-measure-rating" : 0
    };

      //console.log("You are in the Self-Report Measure Page");
    $(".grid-rating li").click(function() {
        $(this).addClass('selected').siblings().removeClass('selected').parent().attr('data-clicked', 'true');
            $("#end-task").removeClass("disabled");
            console.log(parseInt($(this).attr('data-grid-value')));
            vm.data["self-report-measure-rating"] = parseInt($(this).attr('data-grid-value'));

        //taskService().sendData(vm.data);
        //jQuery.extend(vm.data, nakan);
        $.extend(vm.data,JSON.parse(localStorage.getItem("taskData")));
        //console.log(vm.data,JSON.parse(localStorage.getItem("taskData")));
        //console.log("Combining the data",vm.data);
        localStorage.setItem("taskData",JSON.stringify(vm.data));
        $.extend(vm.data,JSON.parse(localStorage.getItem("taskData")));
        localStorage.setItem("taskData",JSON.stringify(vm.data));
        // data = JSON.parse(localStorage.taskData);
        // console.log(localStorage.taskData);
        data = JSON.parse(localStorage.taskData);
        console.log(data);
        // localStorage.removeItem("taskData");
        // console.log("Del",localStorage.getItem("taskData"));
    });
    $("#end-task").on("click",function() {
        var data;
            $.extend(vm.data,JSON.parse(localStorage.getItem("taskData")));
            localStorage.setItem("taskData",JSON.stringify(vm.data));
            data = JSON.parse(localStorage.taskData);
            console.log(data);
            $http.post('/api/webTasks/postTaskData', data).then(function(result) {
                console.log(result);
                vm.message = 'Successful!!!!.';
                vm.error = 'Not Succesful';
            }).catch(function(error) {
                vm.error = error.data;
                console.log(error);
            });
            console.log("Posting Data",data["task-type"]+"Task");
   });

}
