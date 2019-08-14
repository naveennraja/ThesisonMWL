angular.module("web-tasks").factory("taskDataFactory",taskDataFactory);

function taskDataFactory() {
    return{
        postTaskData : postTaskData,
    };
  function postTaskData(data) {
      console.log("Inside posting data---- angular",data);
        //return $http.post('/api/hotels/'+id+'/reviews', review).then(complete).catch(failed);
  }


}