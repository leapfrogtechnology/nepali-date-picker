# Nepali Date Picker

[![NPM Version][npm-image]][npm-url]
[![Download Count][download-url]][npm-url]

[npm-image]: https://img.shields.io/npm/v/nepali-date-picker.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nepali-date-picker
[download-url]: https://img.shields.io/npm/dt/nepali-date-picker.svg?style=flat-square

Nepali Date Picker jQuery Plugin for everyone. 🇳🇵

## Installation

```bash
npm install nepali-date-picker
```

## Demo and Documentation

> https://leapfrogtechnology.github.io/nepali-date-picker/demo/

## Usage

Include `jQuery`, `nepaliDatePicker.min.js` and `nepaliDatePicker.min.css` in your HTML.

```html
<!-- this should go after your </body> -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
<script
  src="https://unpkg.com/nepali-date-picker@2.0.2/dist/jquery.nepaliDatePicker.min.js"
  crossorigin="anonymous"
></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/nepali-date-picker@2.0.2/dist/nepaliDatePicker.min.css"
  crossorigin="anonymous"
/>
```

### Add Input Element

```html
<input type="text" value="" name="date" class="date-picker" />
```

### Initialize Date Picker

```javascript
$('.date-picker').nepaliDatePicker({
  dateFormat: '%D, %M %d, %y',
  closeOnDateSelect: true,
  minDate: 'सोम, जेठ १०, २०७३',
  maxDate: 'मंगल, जेठ ३२, २०७३'
});
```

## Contributing

### Install

```bash
npm install
npm run update
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```
