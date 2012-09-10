/*
 * grunt-contrib-mincss
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib-mincss/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  grunt.registerMultiTask('mincss', 'Minify CSS files', function() {

    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this);

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var srcFiles;
    var taskOutput;
    var sourceCode;

    this.files.forEach(function(file) {
      srcFiles = grunt.file.expandFiles(file.src);
      sourceCode = grunt.helper('concat', srcFiles);
      taskOutput = minifyCSS(sourceCode);

      if (taskOutput.length > 0) {
        grunt.file.write(file.dest, taskOutput);
        grunt.log.writeln('File ' + file.dest + ' created.');
        grunt.helper('min_max_info', taskOutput, sourceCode);
      }
    });
  });

  var minifyCSS = function(source) {
    try {
      return require('clean-css').process(source);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('css minification failed.');
    }
  };
};