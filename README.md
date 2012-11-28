# grunt-contrib-mincss [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-mincss.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-mincss)

> Compress CSS files.


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-mincss --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Mincss task
_Run this task with the `grunt mincss` command._

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._
[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks


Files are compressed with [clean-css](https://github.com/GoalSmashers/clean-css).


### Usage Examples

```js
mincss: {
  compress: {
    files: {
      "path/to/output.css": ["path/to/input_one.css", "path/to/input_two.css"]
    }
  }
}
```


## Release History

 * 2012-10-31   v0.3.2   Update clean-css dep.
 * 2012-10-11   v0.3.1   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-22   v0.3.0   Options no longer accepted from global config key.
 * 2012-09-09   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Tim Branyen](http://goingslowly.com/)

*This file was generated on Wed Nov 28 2012 08:42:41.*
