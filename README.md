# Nepali Date Picker

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Download Count][download-url]][npm-url]

[travis-image]: https://img.shields.io/travis/leapfrogtechnology/Nepali-Date-Picker.svg?style=flat-square
[travis-url]: https://travis-ci.org/leapfrogtechnology/Nepali-Date-Picker
[npm-image]: https://img.shields.io/npm/v/nepali-date-picker.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nepali-date-picker
[download-url]: https://img.shields.io/npm/dt/nepali-date-picker.svg?style=flat-square

## Installation

**NPM**

```bash
$ npm install nepali-date-picker
```

**Bower**

```bash
$ bower install nepali-date-picker --save
```

### Demo and Documentation

> https://nepali-date-picker.herokuapp.com/demo/

### Usage

Include `jQuery`, `nepaliDatePicker.min.js` and `nepaliDatePicker.min.css` in your HTML.

```html
<!-- this should go after your </body> -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/nepali-date-picker@2.0.1/dist/jquery.nepaliDatePicker.min.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://unpkg.com/nepali-date-picker@2.0.1/dist/nepaliDatePicker.min.css" crossorigin="anonymous" />
```

**Input Element**

```html
<input type="text" value="" name="date" class="date-picker" />
```

**Initialize Date Picker**

```javascript
$('.date-picker').nepaliDatePicker({
  dateFormat: '%D, %M %d, %y',
  closeOnDateSelect: true,
  minDate: 'सोम, जेठ १०, २०७३',
  maxDate: 'मंगल, जेठ ३२, २०७३'
});
```

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
