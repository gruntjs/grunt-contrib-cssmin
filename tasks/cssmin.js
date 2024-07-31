'use strict';

var path = require('path');
var util = require('util');
var CleanCSS = require('clean-css');
var chalk = require('chalk');
var maxmin = require('maxmin');

module.exports = function (grunt) {
  var getAvailableFiles = function (filesArray) {
    return filesArray.filter(function (filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found');
        return false;
      }
      return true;
    });
  };

  grunt.registerMultiTask('cssmin', 'Minify CSS', function () {
    var done = this.async();

    var created = {
      maps: 0,
      files: 0
    };
    var size = {
      before: 0,
      after: 0
    };

    var files = this.files;

    files.forEach(function (file) {
      var options = this.options({
        report: 'min',
        sourceMap: false
      });

      var availableFiles = getAvailableFiles(file.src);
      var compiled = '';

      if (Boolean(options.rebase)) {
        options.rebaseTo = path.dirname(file.dest);
      }

      try {
        new CleanCSS(options).minify(availableFiles, function (error, minified) {
          compiled = minified;
          if (compiled.errors.length) {
            grunt.warn(compiled.errors.toString());
            return;
          }

          if (compiled.warnings.length) {
            grunt.log.error(compiled.warnings.toString());
          }

          if (options.debug) {
            grunt.log.writeln(util.format(compiled.stats));
          }

          var compiledCssString = compiled.styles;

          var unCompiledCssString = availableFiles.map(function (file) {
            return grunt.file.read(file);
          }).join('');

          size.before += unCompiledCssString.length;

          if (options.sourceMap) {
            compiledCssString += '\n' + '/*# sourceMappingURL=' + path.basename(file.dest) + '.map */';
            grunt.file.write(file.dest + '.map', compiled.sourceMap.toString());
            created.maps++;
            grunt.verbose.writeln('File ' + chalk.cyan(file.dest + '.map') + ' created');
          }

          grunt.file.write(file.dest, compiledCssString);
          created.files++;
          size.after += compiledCssString.length;
          grunt.verbose.writeln('File ' + chalk.cyan(file.dest) + ' created ' + chalk.dim(maxmin(
            unCompiledCssString, compiledCssString, options.report === 'gzip')));

          if (created.maps > 0) {
            grunt.log.ok(created.maps + ' source' + grunt.util.pluralize(files.length, 'map/maps') +
              ' created.');
          }

          if (created.files > 0) {
            grunt.log.ok(created.files + ' ' + grunt.util.pluralize(files.length, 'file/files') +
              ' created. ' + chalk.dim(maxmin(size.before, size.after)));
          } else {
            grunt.log.warn('No files created.');
          }

          done();
        });
      } catch (err) {
        grunt.log.error(err);
        grunt.warn('CSS minification failed at ' + availableFiles + '.');
      }
    }, this);
  });
};
