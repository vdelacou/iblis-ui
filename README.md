# Iblis UI

_**Beautiful React UI components to be used in a Entreprise SaaS**_

[![NPM version](https://badge.fury.io/js/iblis-ui.svg)](https://www.npmjs.com/package/iblis-ui) 
[![build status](https://travis-ci.org/vdelacou/iblis-ui.svg)](https://travis-ci.org/vdelacou/iblis-ui) 
[![dependencies Status](https://david-dm.org/vdelacou/iblis-ui/status.svg)](https://david-dm.org/vdelacou/iblis-ui) 
[![Maintainability](https://api.codeclimate.com/v1/badges/1b6863f74d5920662131/maintainability)](https://codeclimate.com/github/vdelacou/iblis-ui/maintainability)
<!-- [![Test Coverage](https://api.codeclimate.com/v1/badges/1b6863f74d5920662131/test_coverage)](https://codeclimate.com/github/vdelacou/iblis-ui/test_coverage) -->

![Example](./screenshots/example.png)

## Why

When you create a new entreprise Saas, you mostly need a layout template and some basic components.

There are lot of admin templates (free or not) but most of them have almost the same design
* [AdminLTE](https://adminlte.io) Best open source admin dashboard & control panel theme
* [Ant Design Pro](https://pro.ant.design/) Out-of-box UI solution for enterprise applications

No React component libraries has the following requirements :
* Written in pure Typescript
* Use last version of[Material-UI](https://material-ui.com/) 
* Entreprise oriented components
* Layout with top menu (no drawer)
* UI Components independent from layout
* Redux-form Ready Form Components
* Fully responsive
* Detailed documentation
* Easy installation
* Easy to use and customize with Theme

## Demos

Do full  screen
explain which components are the 
Check story to see how to use a components
- [See fonts](https://vdelacou.github.io/iblis-font/) use `&#xe900;` in the Font Test Drive
- [Demo source](./docs)

## Install

`npm install iblis-ui`

or

`yarn add iblis-ui`

## Usage

100% full width



##  Parts
Theme
Layout
Components
    form
    ui

## Libraries used

## Test

For test we use storybook
some test are done directly (not with configshots)

## Docs
how to build docs (generate ...)
is it possible not have the 

## Dev

comment the line for generation

## Changelog
Recently Updated? Please read the changelog.


## Contribute

1.  [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2.  Install dependencies using Yarn: `yarn install`
3.  Make the necessary changes and ensure that the tests are passing using `yarn test`
4.  Send a pull request


## Todo

* Add an helper on text field
* bug on menu with submeny when mobile


## Known issues:

* Nothing for the moment

## Thanks:

* [Typefaces](https://github.com/KyleAMathews/typefaces) for giving me the idea
* [IconMoon](https://icomoon.io/) to allow to create your own font for free

# Iblis-UI

[![NPM version](https://badge.fury.io/js/iblis-font.svg)](https://www.npmjs.com/package/iblis-font) 
[![build status](https://travis-ci.org/vdelacou/iblis-font.svg)](https://travis-ci.org/vdelacou/iblis-font) 
[![dependencies Status](https://david-dm.org/vdelacou/iblis-font/status.svg)](https://david-dm.org/vdelacou/iblis-font) 
[![Maintainability](https://api.codeclimate.com/v1/badges/c7e42fe511b80cc25760/maintainability)](https://codeclimate.com/github/vdelacou/iblis-font/maintainability) 


## How to use

Install it and run storybook:

```bash
yarn
yarn storybook
```

You can now explore all components at http://localhost:6006

## How to Export as a Static App

Install it and export:

```bash
yarn
yarn build-storybook
```


## How to Dev

If you use Visual Studio Code, I recommand you to install the following plugins:
* https://marketplace.visualstudio.com/items?itemName=eg2.tslint (to be sure that your code respect our guidelines specified in the linter tslint.json)

To see change just edit the compoments in folder `./src/components` directly and see change with hot-reload.

If you create a new component , you need add a new stories in the folder `./stories` and see the difference with all the properties

## How to build

Before push a new version, use:

```bash
yarn
yarn build
```
TODO
update type definition for addon  with v4 when it wil be updated
generate documentation for textfield and selectfield
use excludedPropTypes to exclude the InjectedFormProps from documentation

https://medium.freecodecamp.org/effective-use-of-typescript-with-react-3a1389b6072a

https://github.com/piotrwitek/react-redux-typescript-guide

# list all the libraries
#talk about theming
# exampe how to use in stories
# not exhausitive (see example how to use and expand)
#Can be sure as it is or could be a a good starter to create your own components

#    // require.resolve("react-docgen-typescript-loader")

# font ilbis-ofony

# put the list of library

## 🕺 &nbsp; Contribute


