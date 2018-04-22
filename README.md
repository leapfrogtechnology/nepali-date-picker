# Nepali-Date-Picker
[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Download Count][download-url]][npm-url]

[travis-image]: https://api.travis-ci.org/leapfrogtechnology/Nepali-Date-Picker.svg?branch=master
[travis-url]: https://travis-ci.org/leapfrogtechnology/Nepali-Date-Picker
[npm-image]: https://img.shields.io/npm/v/nepali-date-picker.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nepali-date-picker
[download-url]: https://img.shields.io/npm/dt/nepali-date-picker.svg?style=flat-square

### Installation

**NPM**

```bash
$ npm install nepali-date-picker
```

**Bower**

```bash
$ bower install nepali-date-picker --save`
```

### Usage

- Include `jquery`, `jquery.nepaliDatePicker.min.js` and `nepaliDatePicker.min.css` in your HTML.

```html
<!-- this should go after your </body> -->
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="dist/jquery.nepaliDatePicker.min.js"></script>
<link rel="stylesheet" href="dist/nepaliDatePicker.min.css">
```

- HTML

``` html
<input type="text" value="" name="date" class="date-picker">
```

- JavaScript

```javascript
$(".date-picker").nepaliDatePicker({
    dateFormat: "%D, %M %d, %y",
    closeOnDateSelect: true,
    minDate : "सोम, जेठ १०, २०७३",
    maxDate : "मंगल, जेठ ३२, २०७३"
});
```

- Documentation

> https://nepali-date-picker.herokuapp.com/demo/

## For Developers

### Installing Dependencies

```bash
$ npm install
$ bower install

# if you have installed grunt dependencies already
$ grunt update
```

 ### Minify JavaScript & CSS (Build)

 ```bash
 $ npm run build
 ```

 ### Tests

  ```bash
  $ npm test
  ```

### Demo

> https://nepali-date-picker.herokuapp.com/demo/

### Travis CI

> https://travis-ci.org/leapfrogtechnology/Nepali-Date-Picker
