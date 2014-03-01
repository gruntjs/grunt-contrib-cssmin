/*
 * grunt-contrib-cssmin
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');
  var CleanCSS = require('clean-css');
  var chalk = require('chalk');
  var maxmin = require('maxmin');

  grunt.registerMultiTask('cssmin', 'Minify CSS files', function() {
    var options = this.options({
      report: 'min'
    });
    this.files.forEach(function(f) {
      var valid = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      var max = '';
      var min = valid.map(function(f) {
        var src = grunt.file.read(f);
        max += src;
        options.relativeTo = path.dirname(f);
        return minifyCSS(src, options);
      }).join('');

      if (min.length < 1) {
        grunt.log.warn('Destination not written because minified CSS was empty.');
      } else {
        if (options.banner) {
          min = options.banner + grunt.util.linefeed + min;
        }

        grunt.file.write(f.dest, min);
        grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created: ' + maxmin(max, min, options.report === 'gzip'));
      }
    });
  });

  var minifyCSS = function(source, options) {
    try {
      return new CleanCSS(options).minify(source);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('CSS minification failed.');
    }
  };
};
