/**
 * For More
 * https://github.com/JamieMason/Jasmine-Matchers
 * http://jasmine.github.io/1.3/introduction.html
 *
 * @type {{src: string[], options: {specs: string[]}}}
 */
module.exports = {
  src: ['node_modules/jquery/dist/jquery.js', 'node_modules/jasmine-expect/dist/jasmine-matchers.js', 'src/*.js'],
  options: {
    specs: ['test/*.js']
  }
};
