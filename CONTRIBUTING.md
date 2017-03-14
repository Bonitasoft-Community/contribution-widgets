# Contributing to Bonita widgets

#### Table Of Contents

[Code of conduct](#code-of-conduct)

[How to contribute](#how-to-contribute)
  * [Report an issue](#report-an-issue)
  * [Add a new widget](#add-a-new-widget)
  * [Improve existing widget](#improve-existing-widget)
  * [Pull request](#pull-request)
  
[Styleguide](#styleguide)
  * [Javascript](#javascript)
  * [Specs](#specs)
  * [Documentation](#documentation)

# Code of Conduct

This project adheres to the [Contributor Covenant code of conduct](http://contributor-covenant.org/version/1/4). By participating, you are expected to uphold this code. Please report unacceptable behavior to [adoption@bonitasoft.com](mailto:adoption@bonitasoft.com)

# Report an issue

Bugs, enhancement and new widgets are tracked as [GitHub issues](https://github.com/lio-p/bonita-widget-seed/issues). Refer to the [GitHub documentation](https://guides.github.com/features/issues/) to learn how to use Issues. 

Use proper label to categorize the issues:
* **bugs** to report a bug
* **enhancement** to suggest a code improvement
* **new widget** to announce a new widget

# Add a new widget

* Create a new issue in GitHub
* Create a new folder in the src/widgets. One directory per widget.
* Tests must be called `*.spec.js` and located in &lt;widget_folder&gt;/test
* Widget assets must be in `assets` directory and declared in `widget.json`.

# Improve existing widget

* If the improvement or bug fix has no issues associated, create one. 
* Implement the code change

# Pull request

* Each Pull Request have to be linked to an existing [GitHub Issue](https://github.com/blog/1506-closing-issues-via-pull-requests). 
* Follow the [Styleguide](#styleguides)
* Make sure your code has sufficient test coverage

# Styleguides

The code must be **easy to read, be easy to maintain, have enough tests** to get confident on its behaviour over time.

## AngularJS

The widget code should adhere to [AngularJS Standard Style](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).

## Specs

* Include well-structured Jasmine specs in the &lt;widget_folder&gt;/test folder.
* Use one *describe* for your Widget

## Documentation

Have a README.md file by widget to describe it:
* General description to explain what the widget does
* A chapter to describe how to use the widget
* A screenshot of the widget displayed

