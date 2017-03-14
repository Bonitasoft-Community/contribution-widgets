describe('AutoCompleteInput', function () {

  var $compile, scope;

  // add both, module required by the widget and locally defined ones
  beforeEach(function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/src/widgets/customAutoCompleteInput/';
    loadJSONFixtures('widget.json');
    
    (getJSONFixture('widget.json').requiredModules || []).concat([
      'bonitasoft.ui.widgets',
      'bonitasoft.ui.filters'
    ]).forEach(function (module) {
      angular.mock.module(module);
    });
  });

  beforeEach(inject(function (_$compile_, $rootScope) {
    $compile = _$compile_;
    scope = $rootScope.$new();
    scope.properties = scope.properties = {
      isBound: function() {
        return false;
      },
      value: ''
    };
  }));

  it('should return id from Object Array', function () {
    scope.properties.availableValues =  [{'id':1,'label':'London'},{'id':2,'label':'Paris'}];
    scope.properties.returnedKey = 'id';
    scope.properties.displayedKey = 'label';
    var element = $compile('<custom-auto-complete-input></custom-auto-complete-input>')(scope);
    var controller = element.controller('customAutoCompleteInput');
    controller.formattedValue({'id':2,'label':'Paris'});
    scope.$apply();
    expect(scope.properties.value).toBe(2);
  });
  
  it('should return value from List', function () {
    scope.properties.availableValues =  ['London','Paris'];
    var element = $compile('<custom-auto-complete-input></custom-auto-complete-input>')(scope);
    var controller = element.controller('customAutoCompleteInput');
    controller.formattedValue('Paris');
    scope.$apply();
    expect(scope.properties.value).toBe('Paris');
  });
  
});
