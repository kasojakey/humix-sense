(function() {
  'use strict';

  angular
    .module('public')
    .directive('ngSenseItem', ngSenseItem);

  /** @ngInject */
  function ngSenseItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/senseItem/senseItem.html',
      scope: {
          creationDate: '='
      },
      controller: senseItemController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function senseItemController(moment) {
      var vm = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
