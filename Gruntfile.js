/*
 * grunt-contrib-cssmin
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
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
    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    cssmin: {
      compress: {
        files: {
          'tmp/style.css': ['test/fixtures/input_one.css', 'test/fixtures/input_two.css']
        }
      },
      empty: {
        files: {
          'tmp/idontexist.css': ['test/fixtures/idontexist.css']
        }
      },
      with_banner: {
        options: {
          banner: '/* module name - my awesome css banner */'
        },
        files: {
          'tmp/with-banner.css': ['test/fixtures/input_one.css', 'test/fixtures/input_two.css']
        }
      },
      remove_first_comment: {
        options: {
          banner: '/* custom banner */',
          keepSpecialComments: 0
        },
        files: {
          'tmp/remove_first_comment.css': ['test/fixtures/input_bannered.css']
        }
      },
      inline_import: {
        files: {
          'tmp/inline_import.css': ['test/fixtures/input_inline_import.css', 'test/fixtures/inner/input_inline_import.css']
        }
      },
      only_stale: {
        options: {
          'onlyStale': true
        },
        files: {
          'tmp/stale_dest.css': ['test/fixtures/input_stale_dest_one.css', 'test/fixtures/input_stale_dest_two.css'],
          'tmp/fresh_dest.css': ['test/fixtures/input_fresh_dest_one.css', 'test/fixtures/input_fresh_dest_two.css']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');
  
  // File mtime modification task to unit test onlyStale
  grunt.registerTask('onlystalesetup', function() {
    var fs = require('fs');
    
    // Make
    fs.mkdirSync('tmp');
    
    // Stale test (should reminify)
    fs.openSync('tmp/stale_dest.css', 'w');
    fs.utimesSync('tmp/stale_dest.css', 0, 0);
    fs.utimesSync('test/fixtures/input_stale_dest_one.css', 0, 0);
    fs.utimesSync('test/fixtures/input_stale_dest_two.css', 10, 10);
    
    // Fresh test (should not minify)
    fs.openSync('tmp/fresh_dest.css', 'w');
    fs.utimesSync('tmp/fresh_dest.css', 30, 30);
    fs.utimesSync('test/fixtures/input_fresh_dest_one.css', 20, 20);
    fs.utimesSync('test/fixtures/input_fresh_dest_two.css', 10, 10);
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'onlystalesetup', 'cssmin', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
