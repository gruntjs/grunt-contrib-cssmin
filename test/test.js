'use strict';

var grunt = require('grunt');

function readFileAndRemoveNewlines(file) {
  return grunt.file.read(file).replace(/\r\n/g, '\n').replace(/\n/g, '');
}

exports.cssmin = {
  main: function(test) {
    test.expect(1);

    var expect = readFileAndRemoveNewlines('test/expected/style.css');
    var result = readFileAndRemoveNewlines('tmp/style.css');
    test.equal(expect, result, 'should concat and minify an array of CSS files in order using clean-css');

    test.done();
  },
  imports: function(test) {
    test.expect(1);

    var expect = readFileAndRemoveNewlines('test/expected/inline_import.css');
    var result = readFileAndRemoveNewlines('tmp/inline_import.css');
    test.equal(expect, result, 'should inline @import');

    test.done();
  },
  absolute: function(test) {
    test.expect(1);

    var expect = readFileAndRemoveNewlines('test/expected/absolute.css');
    var result = readFileAndRemoveNewlines('tmp/absolute.css');
    test.equal(expect, result, 'should perform the standard tasks when given absolute paths');

    test.done();
  }
};
