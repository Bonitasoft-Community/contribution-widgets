describe('fileUpload', function () {

  var $compile, scope;

  // add both, module required by the widget and locally defined ones
  beforeEach(function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/src/widgets/customFileUpload/';
    loadJSONFixtures('widget.json');

    (getJSONFixture('widget.json').requiredModules || []).concat([
      'bonitasoft.ui.widgets',
      'bonitasoft.ui.services',
      'bonitasoft.ui.filters'
    ]).forEach(function (module) {
      angular.mock.module(module);
    });
  });
  
   //beforeEach(module('bonitasoft.ui.services'));

  beforeEach(inject(function (_$compile_, $rootScope) {
    $compile = _$compile_;
    scope = $rootScope.$new();
    scope.properties = {
      isBound: function() {
        return false;
      },
      labelHidden: false,
      required: false,
      label: 'custom file upload',
      labelPosition: 'left',
      labelWidth: '4',
      placeholder: 'coucou',
      alignment: 'left',
      url: 'test',
      currentFile: ''
    };
  }));

  it('should contains specified html', function () {
    scope.properties.value = 'Hello';

    var element = $compile('<custom-file-upload></custom-file-upload>')(scope);
    scope.$apply();
    expect(element.text().trim()).toBe('custom file upload');
  });
  
  it('should reset the input on clear', function() {
      var file = {
        filename:'testFile',
        tempPath: 'path'
      };
      var element = $compile('<custom-file-upload></custom-file-upload>')(scope);
      var controller = element.controller('customFileUpload');
      controller.uploadComplete(file);
      scope.$apply();
      expect(element.find('input').val()).toBe('testFile');
    
      controller.clear();
      scope.$apply();
      expect(element.find('input').val()).toBe('');
      expect(scope.properties.newFile).toEqual(null);
  });
  
  it('should remove current file on delete', function() {
    var file = {
      filename:'testFile',
      tempPath: 'path'
    };
    var element = $compile('<custom-file-upload></custom-file-upload>')(scope);
    var controller = element.controller('customFileUpload');
    controller.uploadComplete(file);
    scope.$apply();
    expect(element.find('input').val()).toBe('testFile');
    expect(scope.properties.deleteFile).toEqual(false);
    
    controller.delete();
    scope.$apply();
    expect(element.find('input').val()).toBe('');
    expect(scope.properties.deleteFile).toEqual(true);
  });
  
  it('shoud set new file on upload', function() {
    var file = {
      filename:'testFile',
      tempPath: 'path'
    };
    var element = $compile('<custom-file-upload></custom-file-upload>')(scope);
    var controller = element.controller('customFileUpload');
    expect(scope.properties.newFile).toBeUndefined();

    controller.uploadComplete(file);
    scope.$apply();
    expect(scope.properties.newFile).toEqual(file);
  });
  
  it('should calculate url from current file', function(){
    var currentFile = {
      fileName:'testFile',
      url: 'url'
    };
    var element = $compile('<custom-file-upload></custom-file-upload>')(scope);
    scope.properties.currentFile = currentFile;
    scope.$apply();
    expect(element.find('a').attr('href')).toBe('/bonita/portal/url');
  });
  
  it('should restore previous state on cancel edit',function(){ 
    var currentFile = {
      fileName:'testFile',
      url: 'url'
    };
    var element = $compile('<custom-file-upload></custom-file-upload>')(scope);
    var controller = element.controller('customFileUpload');
    scope.properties.currentFile = currentFile;
    scope.$apply();

    controller.edit();
    scope.$apply();
    expect(element.find('a').val()).toBeUndefined();

    controller.cancelEdit();
    scope.$apply();
    expect(scope.properties.newFile).toBe(null);
    expect(element.find('a').attr('href')).toBe('/bonita/portal/url');
  });
   
});
