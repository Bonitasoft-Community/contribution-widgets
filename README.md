# Bonitasoft Community contribution widgets

This is a repository that provide a place for the Community to build and share their custom widgets. 

You can browse the list of widgets available in the src/widgets folder. Follow the instructions below to understand how to setup your environment and deploy the widgets.

A framework is provided to start building custom widgets for the UI Designer. It includes build, test and deployment steps and supports multiple widgets.

The build step will create a `dist` folder with resulting directive and a zip file directly importable
in the UI designer or via command line using `deploy` step.

## Prerequisites
* Node >= v6.0.0
* Npm >= v4.2.0

## Getting started

Set up your local node project:
```
npm install
```

## Build

Build all the widgets and create a ZIP version of each of them in the folder dist/

```
npm run build
```

## Tests

Launch unit-tests on all the widgets
```
npm test [ -- --watch ]
```

`--watch`   Watch source files and launch tests whenever a source file changes

## Deploy
You can deploy widgets developed in widget seed directly in a running UI Designer.

```
npm run deploy -- --widget <widget name> [--host <ui designer url>] [--force] [--watch]
```

`--widget`  [required] Widget directory name to deploy  
`--host`    UI Designer URL. Default value: `http://127.0.0.1:8080/designer`  
`--force`   Override the widget if it already exist at destination
`--watch`   Watch source files and redeploy widget whenever a source file changes

e.g. `npm run deploy -- --widget customWidget --host http://127.0.0.1:8080/designer --force --watch`

## Widget structure 

Below is the description of the files used to build a widget.

### Controller 

The file is named controller.ctrl.js

It contains the widget logic

### Template

The file is named template.tpl.html 

It contains the widget template

### Widget Model

The file is named widget.json.

If contains the widget model.

```
{
  "id": "customWidget",                 // Camel cased widget id, used as tag name for the html element
                                        // should not begin by 'pb' since it is a reserved prefix for default widgets
                                        // Has to match with the folder name containing the widget
                                        // Must contains only alphanumeric characters with no space

  "name": "Widget",                     // Displayed in the widget palette.
  "template": "@template.tpl.html",     // Html template, inlined during the build
  "controller": "@controller.ctrl.js",  // Directive controller, inlined during the build
  "custom": true,                       // Must be set to true
  "icon": "<svg .... </svg>",           // Widget's icon that will be displayed in the palette, must be an inlined svg
  "description" : "Enter description"   // Describe the widget
  "properties": [                       // Define properties of the widget
    {
      "label": "Color",                 // Displayed in property panel

      "name": "color",                  // Name used in the template or the controller
                                        // via the scope (e.g. $scope.properties.color)

      "type": "choice",                 // Define the type of the value,
                                        // possible values: ['text', 'choice', 'html', 'integer', 'boolean', 'collection']

      "showFor": "<condition>",         // Enter a condition to display the property
                                        // Example: "showFor": "properties.labelHidden.value === false"

      "help": "Describe the property",  // Tooltip description of the property  

      "choiceValues": [                 // Only available for choice type
        "RebeccaPurple",
        "Chartreuse",
        "Tomato",
        "DeepSkyBlue"
      ],
      "defaultValue": "RebeccaPurple",
      "bond": "expression"              // Define the type of editor displayed in
                                        // the property panel,
                                        // possible values: ['variable', 'expression', 'interpolation', 'constant']
    }
  ],
  "assets": [                           // Define widget assets and dependencies, can be local or external
    {
      "name": "style.css",              // Name of an internal asset or URL of an external asset
      "type": "css",                    // Possible values: ['css', 'js', 'img', 'json']

      "external": false,                // External assets name must be a standard URL
                                        // Internal assets content must be
                                        // in assets/<type>/<name> (e.g. assets/css/style.css)

      "order": 1                        // Define load order
    }
  ],
  "requiredModules": ["ngAnimate"]      // To define an Angular module upon which the widget depends
}
```

### Assets folder

The assets folder contains the widget dependencies. Those asset have to be declared in the widget model. 

## UI Designer compatibility

Widget built with this project can be deployed to the UI Designer. However, it's not possible to export a widget from the UI Designer and import it in this project. 

## Contribute

If you are interested in creating new widgets, take a look to the [Contribution guidelines](CONTRIBUTING.md)
