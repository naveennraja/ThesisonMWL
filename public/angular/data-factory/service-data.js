angular.module("web-tasks").service('taskService', taskService);

function taskService() {
    var gatheredData = {
        "build":"session"
    };
    return {
        sendData: function(data) {
            jQuery.extend(gatheredData, data);
            console.log("gatheredData",gatheredData,data);
            //alert('Current data: ' + gatheredData.join(', '));
        },
        getData: function() {
            return gatheredData;
        }
    };
    console.log(gatheredData);
}
//taskDataFactory.postTaskData();