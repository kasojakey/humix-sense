(function() {
  'use strict';

  angular
    .module('public')
    .directive('ngSenseContent', senseContent);

  /** @ngInject */
  function senseContent() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/senseContent/senseContent.html',
      scope: {
          creationDate: '='
      },
      controller: senseContentController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function senseContentController(deviceList, $scope, $modal, $log) {
      var vm = this;

      vm.getDervices = deviceList.getDevices;

      $scope.$watch(function(){ return deviceList.getDevices}, function(newVal, oldVal){
        $log.info('data change'+newVal+' '+oldVal);
      }, true);

      vm.open = function(){

        var modalInstance = $modal.open({
          animation: 1,
          templateUrl: 'addModalContent.html',
          controller: modalController,
          controllerAs: 'vm'
        });

        modalInstance.result.then(function (sense) {
          
          deviceList.setDevice(sense.id, sense.imgId);

          $log.info('Generating sense id: ' + sense.id + ', imageId:' + sense.imgId);

        }, function () {

          $log.info('Modal dismissed at: ' + new Date());

        });
      };
    }

    function modalController($modalInstance){
      var vm = this;

      vm.imgId = 10 + Math.floor(Math.random() * 54); // random image id
      
      vm.senseId = ""; // sense id
      

      vm.ok = function(){
        $modalInstance.close({id: vm.senseId , imgId: vm.imgId});
      };

      vm.cancel = function(){
        $modalInstance.dismiss('cancel');
      };
    }
  }

})();