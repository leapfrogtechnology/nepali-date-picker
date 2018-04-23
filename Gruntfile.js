module.exports = function (grunt) {
    var path = require('path');
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt'),
        init: true,
        config: {
            fonts: {
                extensions: ['eot', 'ttf', 'woff', 'svg'].join(',')
            },
            images: {
                extensions: ['pngconfigPath', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].join(',')
            }
        },
        loadGruntTasks: true
    });

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', ['default', 'uglify', 'cssmin']);
    grunt.registerTask('update', ['auto_install']);
    grunt.registerTask('test', [
        'jshint',
        'jasmine'
    ]);

    return grunt;
};
