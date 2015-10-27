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
    function senseContentController($scope, $modal, $log) {
      var vm = this;
      vm.id = "";

      vm.open = function(){

        var modalInstance = $modal.open({
          animation: 1,
          templateUrl: 'addModalContent.html',
          controller: modalController,
          controllerAs: 'vm'
        });

        modalInstance.result.then(function (sense) {
          // when modal close...
          // 
          // call the db api here 
          
          $log.info('Generating sense id: ' + sense.id + ', imageId:' + sense.imgId);

        }, function () {

          $log.info('Modal dismissed at: ' + new Date());

        });
      };
    }

    function modalController($modalInstance){
      var vm = this;

      var imgId = 10 + Math.floor(Math.random() * 54); // random image id
      
      vm.senseId = ""; // sense id

      vm.imgUrl = 'assets/images/bluemix-icon-list/i-appicon-' + imgId + '-50.png';
      

      vm.ok = function(){
        $modalInstance.close({id: vm.senseId , imgId: imgId});
      };

      vm.cancel = function(){
        $modalInstance.dismiss('cancel');
      };
    }
  }

})();
