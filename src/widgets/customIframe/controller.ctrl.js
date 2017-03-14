function IframeController($scope, $sce) {
    
    var ctrl=this;
    
    //this.trustSrc = trustSrc;
    var name = 'customIframe';
    
    this.trustSrc = function(src) {
    
      return $sce.trustAsResourceUrl(src);
    }
    


    
}
