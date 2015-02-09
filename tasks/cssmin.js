/*
 * grunt-contrib-cssmin
 * http://gruntjs.com/
 *
 * Copyright (c) 2015 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
var CleanCSS = require('clean-css');
var chalk = require('chalk');
var maxmin = require('maxmin');

module.exports = function(grunt) {

  var minifyCssFiles = function (options, files) {
    try {
      return new CleanCSS(options).minify(files);
    } catch (err) {
      grunt.log.error(err);
      grunt.fail.warn('CSS minification failed.');
    }
  };

  var getAvailableFiles = function (filesArray) {
    return filesArray.filter(function(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
        return false;
      } else {
        return true;
      }
    });
  };

  grunt.registerMultiTask('cssmin', 'Minify CSS files with CleanCSS.', function() {
    var options = this.options({
      report: 'min',
      sourceMap: false,
    });
    this.files.forEach(function(file) {
      var availableFiles = getAvailableFiles(file.src);
      var unCompiledCssString = '';
      var cleanCssOptions = { sourceMap: options.sourceMap, target: file.dest };
      var compiled = minifyCssFiles(cleanCssOptions, availableFiles);
      var compiledCssString = compiled.styles;

      availableFiles.forEach(function(file){
        var src = grunt.file.read(file);
        unCompiledCssString += src;
      });

      if (compiledCssString.length === 0) {
        return grunt.log.warn('Destination not written because minified CSS was empty.');
      }

      //source map
      if (options.sourceMap) {
        var compiledFileName = file.dest.split('/').pop();
        var sourceMapString = compiled.sourceMap.toString();
        compiledCssString += '\n' + '/*# sourceMappingURL='+compiledFileName+'.map */';
        grunt.file.write(file.dest+'.map', sourceMapString);
      }

      //write compiled css file
      grunt.file.write(file.dest, compiledCssString);
      grunt.verbose.writeln('File ' + chalk.cyan(file.dest) + ' created.');
      grunt.verbose.writeln('File ' + chalk.cyan(file.dest) + ' created: ' + maxmin(unCompiledCssString, compiledCssString, options.report === 'gzip'));
    });
  });
};
