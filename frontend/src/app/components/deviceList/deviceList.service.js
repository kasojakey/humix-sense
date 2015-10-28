(function() {
  'use strict';

  angular
      .module('public')
      .service('deviceList', deviceList);


  /** @ngInject */
  function deviceList($http) {
    var devices = {};
    $http({
      method: 'GET',
      url: 'api/devices'
    }).then(function successCallback(response) {
        var data = JSON.parse(response.data.result);
        data.forEach(function(obj){
          devices[obj.senseId] = obj.senseIcon;
        });
      }, function errorCallback(response) {
        console.log(response);
    });      

    this.getDevices = getDevices;
    this.setDevice = setDevice;
    this.delDevice = delDevice;

    function getDevices() {
      return devices;
    }

    function setDevice(senseId, iconId) {
      // call the backend api here to store the data
      $http({
        method: 'POST',
        url: 'api/registerDevice',
        data: {'senseId':senseId, 'senseIcon': iconId}
      }).then(function successCallback(response) {
          console.log(response);
        }, function errorCallback(response) {
          console.log(response);
      });      
      devices[senseId] = iconId;
    }

    function delDevice(senseId) {      
      // call the backend api here to delete the data
      $http({
        method: 'DELETE',
        url: 'api/devices/'+ senseId
      });      

      delete devices[senseId];
    }
  }

})();