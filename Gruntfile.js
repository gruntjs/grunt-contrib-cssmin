'use strict';
var path = require('path');
function absolutePath(file) {
  return path.join(__dirname, file);
}
module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    clean: {
      test: ['tmp']
    },
    cssmin: {
      options: {
        sourceMap: true
      },
      absolute: {
        files: [{
          src: [
            'test/fixtures/input_one.css',
            'test/fixtures/input_two.css'
          ].map(absolutePath),
          dest: absolutePath('tmp/absolute.css')
        }]
      },
      compress: {
        files: {
          'tmp/style.css': [
            'test/fixtures/input_one.css',
            'test/fixtures/input_two.css'
          ]
        }
      },
      empty: {
        files: {
          'tmp/idontexist.css': [
            'test/fixtures/idontexist.css'
          ]
        }
      },
      inlineImport: {
        files: {
          'tmp/inline_import.css': [
            'test/fixtures/input_inline_import.css',
            'test/fixtures/inner/input_inline_import.css'
          ]
        }
      },
      noRebase: {
        files: {
          'tmp/no-rebase.css': [
            'test/fixtures/no-rebase.css'
          ]
        }
      },
      rebase: {
        options: {
          rebase: true
        },
        files: {
          'tmp/rebase.css': [
            'test/fixtures/rebase.css'
          ]
        }
      }
    },
    nodeunit: {
      tests: ['test/test.js']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  grunt.registerTask('test', [
    'jshint',
    'clean',
    'cssmin',
    'cssmin',
    'nodeunit'
  ]);

  grunt.registerTask('default', [
    'test',
    'build-contrib'
  ]);
};
