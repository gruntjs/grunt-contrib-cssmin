'use strict';

var grunt = require('grunt');

function readFileAndRemoveNewlines(file) {
  return grunt.file.read(file).replace(/\n/g, '');
}

function filesEqual(test, filename, filename2, message) {
  var expect = readFileAndRemoveNewlines(filename);
  var result = readFileAndRemoveNewlines(filename2);
  test.equal(expect, result, message);
}

function testFilesEqual(test, filename, message) {
  return filesEqual(test, 'test/expected/' + filename, 'tmp/' + filename, message);
}

exports.cssmin = {
  main: function(test) {
    test.expect(1);
    testFilesEqual(test, 'style.css',
      'should concat and minify an array of CSS files in order using clean-css');
    test.done();
  },
  imports: function(test) {
    test.expect(1);
    testFilesEqual(test, 'inline_import.css', 'should inline @import');
    test.done();
  },
  absolute: function(test) {
    test.expect(1);
    testFilesEqual(test, 'absolute.css', 'should perform the standard tasks when given absolute paths');
    test.done();
  },
  sourceMapIn: function(test) {
    test.expect(3);
    testFilesEqual(test, 'sourcemap.css', 'should have correct format with sourceMappingURL');
    test.ok(grunt.file.exists('tmp/sourcemap.css.map'), 'sourceMap file should exist');
    testFilesEqual(test, 'sourcemap.css.map', 'sourceMap should have correct format');
    test.done();
  },
  sourceMapInFunction: function(test) {
    test.expect(3);
    filesEqual(test, 'test/expected/sourcemap.css', 'tmp2/sourcemap.css',
      'should have correct format with sourceMappingURL');
    test.ok(grunt.file.exists('tmp2/sourcemap.css.map'), 'sourceMap file should exist');
    filesEqual(test, 'test/expected/sourcemap.css.map', 'tmp2/sourcemap.css.map',
      'sourceMap should have correct format');
    test.done();
  }
};
