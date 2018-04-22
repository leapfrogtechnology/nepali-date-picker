/**
 * For More
 * https://github.com/JamieMason/Jasmine-Matchers
 * http://jasmine.github.io/1.3/introduction.html
 *
 * @type {{src: string[], options: {specs: string[]}}}
 */
module.exports = {
    src : ['bower_components/jquery/dist/jquery.js', 'bower_components/jasmine-expect/dist/jasmine-matchers.js' ,'src/*.js'],
    options : {
        specs : ['test/*.js']
    }
};
