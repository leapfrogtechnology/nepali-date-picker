# Nepali-Date-Picker
[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Download Count][download-url]][npm-url]

[travis-image]: https://api.travis-ci.org/leapfrogtechnology/Nepali-Date-Picker.svg?branch=master
[travis-url]: https://travis-ci.org/leapfrogtechnology/Nepali-Date-Picker
[npm-image]: https://img.shields.io/npm/v/nepali-date-picker.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nepali-date-picker
[download-url]: https://img.shields.io/npm/dt/nepali-date-picker.svg?style=flat-square

### Install:
For npm installation : 
``` bash
$ npm install nepali-date-picker --save
```

For bower installation : 
``` bash
$ bower install nepali-date-picker --save`
```

### How do I use it?
- First include to page css and js files
``` html
<!-- this should go after your </body> -->
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="dist/jquery.nepaliDatePicker.min.js"></script>
<link rel="stylesheet" href="dist/nepaliDatePicker.min.css">
```
- Html
``` html
<input type="text" value="" name="date" class="date-picker">
```
- Javascript
``` javascript
$(".date-picker").nepaliDatePicker({
      dateFormat: "%D, %M %d, %y",
      closeOnDateSelect: true,
      minDate : "सोम, जेठ १०, २०७३",
      maxDate : "मंगल, जेठ ३२, २०७३"
  });
```
- Documentation 
> https://nepali-date-picker.herokuapp.com/demo/

## For developers only

### Installing dependancies
``` bash
$ bower install

$ npm install

#if you already install grunt dependencies
$ grunt update
```
 
 ### Minify javascript & css
 ``` bash
 $ grunt compress
 ```
 
 ### Testing calender Functions
  ``` bash
  $ grunt test
  ```
### Demo
> https://nepali-date-picker.herokuapp.com/demo/
  
### Travis CI
> https://travis-ci.org/leapfrogtechnology/Nepali-Date-Picker
 
