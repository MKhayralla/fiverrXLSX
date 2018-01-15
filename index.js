(function () {
  angular.module('fiverrApp',[])
  .controller('appController',appController)
  .service('MenuSearchService',testService)
  //injecting the ajax simulating service
  appController.$inject=['MenuSearchService'];
  function appController(testService) {
    //styling object for alasql :
    var mystyle = {
        headers: true
    };
    var ctrl = this ;
    ctrl.items = null ;
    var promise = testService.getJson();
    promise.then(function (response) {
      console.log('Secceded to load json !')
      //finding the table data in the json response
      var res = response.data.find(function (element) {
        return element.type ==='table'
      }) || response.data ;
      ctrl.items = res.data||res ;
      console.log(ctrl.items)
    })
    .catch(function (error) {
      console.log('Failed to load json !')
    });
    //download data as xlsx
    ctrl.exportData = function () {
        alasql('SELECT * INTO XLS("tracks.xls",?) FROM ?',[mystyle,ctrl.items]);
    };
      }
  testService.$inject=['$http'];
  function testService($http) {
    var service = this ;
    //dimulating the server http request response :
    service.getJson = function(){
      var response = $http({
        method : 'GET',
        url : './Track.json'
      })
      return response ;
    }
  }
})();
