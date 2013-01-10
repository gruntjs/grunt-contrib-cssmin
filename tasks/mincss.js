/*
 * grunt-contrib-mincss
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('mincss', 'Minify CSS files', function() {
    var sourceCode, sourceCompressed;
    var taskOutputMin = [];
    var taskOutputMax = [];

    var options = this.options();
    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(f) {
      f.src.forEach(function(file) {
        sourceCode = grunt.file.read(file);
        sourceCompressed = minifyCSS(sourceCode);

        taskOutputMin.push(sourceCompressed);
        taskOutputMax.push(sourceCode);
      });

      if (taskOutputMin.length > 0) {
        taskOutputMin = taskOutputMin.join('');
        taskOutputMax = taskOutputMax.join('\n');

        grunt.file.write(f.dest, taskOutputMin);
        grunt.log.writeln('File ' + f.dest + ' created.');

        minMaxInfo(taskOutputMin, taskOutputMax);
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

  var minMaxGzip = function(src) {
    return src ? require('gzip-js').zip(src, {}) : '';
  };

  var minMaxInfo = function(min, max) {
    var gzipSize = String(minMaxGzip(min).length);
    grunt.log.writeln('Uncompressed size: ' + String(max.length).green + ' bytes.');
    grunt.log.writeln('Compressed size: ' + gzipSize.green + ' bytes gzipped (' + String(min.length).green + ' bytes minified).');
  };
};
