(function() {
  'use strict';

  angular
      .module('public')
      .service('deviceList', deviceList);


  /** @ngInject */
  function deviceList($http) {
    var data = {};

    this.getDevices = getDevices;
    this.setDevice = setDevice;
    this.delDevice = delDevice;

    function getDevices() {
      return data;
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
      data[senseId] = iconId;
    }

    function delDevice(senseId) {      
      // call the backend api here to delete the data
      $http({
        method: 'DELETE',
        url: 'api/device/'+'senseId'
      });      

      delete data[senseId];
    }
  }

})();