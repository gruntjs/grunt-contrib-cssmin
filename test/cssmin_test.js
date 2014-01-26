'use strict';

var grunt = require('grunt');
var statSync = require('fs').statSync;

exports.cssmin = {
  main: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/style.css');
    var result = grunt.file.read('tmp/style.css');
    test.equal(expect, result, 'should concat and minify an array of css files in order using clean-css');

    test.done();
  },
  with_banner: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/with-banner.css');
    var result = grunt.file.read('tmp/with-banner.css');
    test.equal(expect, result, 'should concat, minify and prefix banner');

    test.done();
  },
  empty: function(test) {
    test.expect(1);

    test.ok(!grunt.file.exists('tmp/idontexist.css'), 'Empty minified file should not exist');

    test.done();
  },
  remove_first_comment: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/input_bannered.css');
    var result = grunt.file.read('tmp/remove_first_comment.css');
    test.equal(expect, result, 'should minify and replace banner');

    test.done();
  },
  imports: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/inline_import.css');
    var result = grunt.file.read('tmp/inline_import.css');
    test.equal(expect, result, 'should inline @import');

    test.done();
  },
  only_stale: function(test) {
    test.expect(2);
    
    var staleMtime = statSync('tmp/stale_dest.css').mtime.getTime() / 1000;
    test.notEqual(staleMtime, 0);
    
    var freshMtime = statSync('tmp/fresh_dest.css').mtime.getTime() / 1000;
    test.equal(freshMtime, 30);
    
    test.done();
  }
};
