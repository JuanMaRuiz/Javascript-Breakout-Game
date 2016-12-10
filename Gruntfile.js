'use strict';

module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'src{,*/}*.js', '!node_modules/{,*/}*.js'],
      options: {
          jshintrc: true,
          reporter: require('jshint-stylish')
      }
    },
    watch: {
      js: {
        files: ['src/{,*/}*.js', '!lib/{,*/}*.js', 'Gruntfile.js'],
        tasks: ['jshint'],
        options: {
          interrupt: true,
          livereload: true
        },
      },
      html: {
        files: 'index.html',
        livereload: true
      }
    },
    browserSync: {
        bsFiles: {
            src : ['./{,*/}*.html', 'src/{,*/}*.js', 'src/{,*/}*.css']
        },
        options: {
          watchTask: true,
          open: false,
          server: './'
        }
    }
  });

  grunt.registerTask('default', ['jshint', 'browserSync', 'watch']);
};