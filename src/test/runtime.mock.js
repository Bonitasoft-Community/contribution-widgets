angular.module('bonitasoft.ui.filters', [])

  .filter('uiTranslate', function () {
    return function (value) {
      return value;
    };
  });

  angular.module('bonitasoft.ui.services', []).service('widgetNameFactory', function (){
    var widgetsName = {};

   return {
     getName: getName
   };

   function getName(widget) {
     if (!widgetsName.hasOwnProperty(widget)) {
       widgetsName[widget] = -1;
     }

     widgetsName[widget] += 1;

     return widget + widgetsName[widget];
   }
  });

