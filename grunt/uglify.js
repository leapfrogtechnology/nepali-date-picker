module.exports = {
  staticMappings: {
    files: [
      {
        src: 'src/nepaliDatePicker.js',
        dest: 'dist/nepaliDatePicker.min.js'
      }
    ],
    options: {
      report: 'min',
      mangle: false
    }
  }
};
