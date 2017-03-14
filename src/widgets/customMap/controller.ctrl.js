function IframeController($scope, $timeout, NgMap) {
    
  var ctrl=this;
  var name = 'customMap';
  
  ctrl.googleMapsUrl = 'https://maps.google.com/maps/api/js?key=' + $scope.properties.googleKey;
  
  ctrl.pauseLoading=true;

  $timeout(function() {
    ctrl.pauseLoading=false;
  }, 2000);

  ctrl.showStore = function(evt, id) {
    ctrl.store = $scope.properties.places[id];
    ctrl.map.showInfoWindow('info', this);
  };    
}
