'use strict';
var grunt = require('grunt');

exports.cssmin = {
  main: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/style.css').replace(/\n/g,'');
    var result = grunt.file.read('tmp/style.css').replace(/\n/g,'');
    test.equal(expect, result, 'should concat and minify an array of css files in order using clean-css');

    test.done();
  },
  imports: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/inline_import.css').replace(/\n/g,'');
    var result = grunt.file.read('tmp/inline_import.css').replace(/\n/g,'');
    test.equal(expect, result, 'should inline @import');

    test.done();
  }
};
