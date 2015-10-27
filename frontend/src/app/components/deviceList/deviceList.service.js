(function() {
  'use strict';

  angular
      .module('public')
      .service('deviceList', deviceList);


  /** @ngInject */
  function deviceList() {
    var data = {};

    this.getDevices = getDevices;
    this.setDevice = setDevice;
    this.delDevice = delDevice;

    function getDevices() {
      return data;
    }

    function setDevice(senseId, iconId) {
      
      // call the backend api here to store the data
      
      data[senseId] = iconId;
    }

    function delDevice(senseId) {
      
      // call the backend api here to delete the data

      delete data[senseId];
    }
  }

})();