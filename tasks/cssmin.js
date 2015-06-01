'use strict';

var path = require('path');
var util = require('util');
var CleanCSS = require('clean-css');
var chalk = require('chalk');
var maxmin = require('maxmin');
var async = require('async');

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
    var compileTasks = [];
    var self = this;
    var created = {
      maps: 0,
      files: 0
    };
    var size = {
      before: 0,
      after: 0
    };

    this.files.forEach(function (file) {
      
      var options = this.options({
        rebase: false,
        report: 'min',
        sourceMap: false
      });

      var availableFiles = getAvailableFiles(file.src);
      var compiled = '';

      options.target = file.dest;
      options.relativeTo = path.dirname(availableFiles[0]);
      
      compileTasks.push(function(cb) {
        new CleanCSS(options).minify(availableFiles, function(errors, compiled) {
          return cb(null, {
            'file': file,
            'availableFiles': availableFiles,
            'options': options,
            'errors': errors || [],
            'compiled': compiled
          });
        });
      });

    }, this);
    
    // done looping through files
    
    async.series(compileTasks, function(err, compiled) {
      
      if (err) {
        grunt.warn(err.toString());
        return done(false);
      }
      
      compiled.forEach(function(comp) {
        if (comp.errors.length) {
          grunt.warn('CSS minification failed at ' + comp.availableFiles + '.');
          grunt.warn(comp.errors.toString());
          return;
        }
        if (comp.compiled.warnings.length) {
          grunt.log.error(comp.compiled.warnings.toString());
        }
        if (comp.options.debug) {
          grunt.log.writeln(util.format(comp.compiled.stats));
        }
        var compiledCssString = comp.compiled.styles;
        var unCompiledCssString = comp.availableFiles.map(function (file) {
          return grunt.file.read(file);
        }).join('');
        size.before += unCompiledCssString.length;
        if (comp.options.sourceMap) {
          compiledCssString += '\n' + '/*# sourceMappingURL=' + path.basename(comp.file.dest) + '.map */';
          grunt.file.write(comp.file.dest + '.map', compiled.sourceMap.toString());
          created.maps++;
          grunt.verbose.writeln('File ' + chalk.cyan(comp.file.dest + '.map') + ' created');
        }
        grunt.file.write(comp.file.dest, compiledCssString);
        created.files++;
        size.after += compiledCssString.length;
        grunt.verbose.writeln('File ' + chalk.cyan(comp.file.dest) + ' created ' + chalk.dim(maxmin(unCompiledCssString, compiledCssString, comp.options.report === 'gzip')));
      });
      
        if (created.maps > 0) {
          grunt.log.ok(created.maps + ' source' + grunt.util.pluralize(self.files.length, 'map/maps') + ' created.');
        }
    
        if (created.files > 0) {
          grunt.log.ok(created.files + ' ' + grunt.util.pluralize(self.files.length, 'file/files') + ' created. ' + chalk.dim(maxmin(size.before, size.after)));
        } else {
          grunt.log.warn('No files created.');
        }
        
        done();
      
    });
    
  });
};
