'use strict';
var path = require('path');
var CleanCSS = require('clean-css');
var chalk = require('chalk');
var maxmin = require('maxmin');

module.exports = function (grunt) {
  var getAvailableFiles = function (filesArray) {
    return filesArray.filter(function (filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found');
        return false;
      } else {
        return true;
      }
    });
  };

  grunt.registerMultiTask('cssmin', 'Minify CSS', function () {
    this.files.forEach(function (file) {
      var options = this.options({
        report: 'min',
        sourceMap: false
      });

      var availableFiles = getAvailableFiles(file.src);
      var compiled = '';

      options.target = file.dest;

      try {
        compiled = new CleanCSS(options).minify(availableFiles);
      } catch (err) {
        grunt.log.error(err);
        grunt.warn('CSS minification failed');
      }

      var compiledCssString = compiled.styles;

      var unCompiledCssString = availableFiles.map(function (file) {
        return grunt.file.read(file);
      }).join('');

      if (options.sourceMap) {
        compiledCssString += '\n' + '/*# sourceMappingURL=' + path.basename(file.dest) + '.map */';
        grunt.file.write(file.dest + '.map', compiled.sourceMap.toString());
        grunt.verbose.writeln('File ' + chalk.cyan(file.dest + '.map') + ' created');
      }

      grunt.file.write(file.dest, compiledCssString);
      grunt.verbose.writeln('File ' + chalk.cyan(file.dest) + ' created ' + chalk.dim(maxmin(unCompiledCssString, compiledCssString, options.report === 'gzip')));
    }, this);
  });
};
