# Overview

In your project's Gruntfile, add a section named `mincss` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mincss: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

Files are compressed with [clean-css](https://github.com/GoalSmashers/clean-css).