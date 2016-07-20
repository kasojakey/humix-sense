(function() {
  'use strict';

  angular
    .module('public')
    .directive('ngModuleContent', moduleContent);

  /** @ngInject */
  function moduleContent() {
    var directive = {
      restrict: 'E',
      // replace: false,
      templateUrl: 'app/components/moduleContent/moduleContent.html',
      scope: {
          creationDate: '=',
          senseId: '@'
      },
      link: function(scope, element, attrs){
        attrs.$observe('senseId', function(senseId) {
          scope.senseId = senseId;
          scope.getModules();
        });
      },
      controller: moduleContentController,
      controllerAs: 'moduleContentController',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function moduleContentController(moduleList, $log, $scope) {

      $scope.getModules = function () {
        moduleList.get({senseId: $scope.senseId}, function(response) {
          $scope.modules = angular.fromJson(response.result);
          $scope.moduleEmpty = $scope.modules.length == 0;
          $log.info('$scope.modules: ' + $scope.modules);
          $log.info('$scope.moduleEmpty: ' + $scope.moduleEmpty);
        });
      };

      $scope.showLogViewer = false;

      $scope.displayLog = function () {
          $scope.showLogViewer = !$scope.showLogViewer;
      };

      // $scope.$watch(function(){ return moduleList.getModules}, function(newVal, oldVal){
      //   $log.info('data change'+newVal+' '+oldVal);
      // }, true);

      // vm.open = function(){
      //
      //   var modalInstance = $modal.open({
      //     animation: 1,
      //     templateUrl: 'addModalContent.html',
      //     controller: modalController,
      //     controllerAs: 'vm'
      //   });
      //
      //   modalInstance.result.then(function (sense) {
      //
      //     moduleList.setModule(sense.id, sense.imgId);
      //
      //     $log.info('Generating sense id: ' + sense.id + ', imageId:' + sense.imgId);
      //
      //   }, function () {
      //
      //     $log.info('Modal dismissed at: ' + new Date());
      //
      //   });
      // };
    }

    // function modalController($modalInstance){
    //   var vm = this;
    //
    //   vm.imgId = 10 + Math.floor(Math.random() * 54); // random image id
    //
    //   vm.senseId = ""; // sense id
    //
    //
    //   vm.ok = function(){
    //     $modalInstance.close({id: vm.senseId , imgId: vm.imgId});
    //   };
    //
    //   vm.cancel = function(){
    //     $modalInstance.dismiss('cancel');
    //   };
    // }
  }

})();
