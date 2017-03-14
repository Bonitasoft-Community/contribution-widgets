function AutoCompleteInputCtrl($scope, $parse, $log) {
  
  var ctrl=this;
  this.name = 'customAutoCompleteInput';
  this.rawValue = '';
  
  this.formattedValue = function(newValue) {
      if(angular.isDefined(newValue)) {
        $scope.properties.value = ctrl.getValue(newValue);
        this.rawValue = newValue;
      } else if (ctrl.getLabel(this.rawValue)){
        return ctrl.getLabel(this.rawValue);
      } else {
        return this.rawValue;
      }
  }

  if (!$scope.properties.isBound('value')) {
    $log.error('the customAutoCompleteInput property named "value" need to be bound to a variable');
  }

  function createGetter(accessor) {
      return accessor && $parse(accessor);
  }
  
  this.getLabel = createGetter($scope.properties.displayedKey) || function (item) {
    return typeof item === 'string' ? item : JSON.stringify(item);
  };
  
  this.getValue = createGetter($scope.properties.returnedKey) || function (item) {
      return item;
  };

}
