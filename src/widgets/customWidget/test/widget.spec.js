describe('Widget', function () {

  var $compile, scope;

  // add both, module required by the widget and locally defined ones
  beforeEach(function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/src/widgets/customWidget/';
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
    scope.properties = {};
  }));

  it('should contains specified html', function () {
    scope.properties.value = 'Hello';

    var element = $compile('<custom-widget></custom-widget>')(scope);
    scope.$apply();

    expect(element.text().trim()).toBe('Value is: Hello. Click me to toggle background color');
  });
});
