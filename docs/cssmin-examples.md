# Usage

## Combine two files into one output file

```js
cssmin: {
  options: {
    shorthandCompacting: false,
    roundingPrecision: -1
  },
  target: {
    files: {
      'output.css': ['foo.css', 'bar.css']
    }
  }
}
```

## Minify all contents of a release directory and add a `.min.css` extension

```js
cssmin: {
  target: {
    files: [{
      expand: true,
      cwd: 'release/css',
      src: ['*.css', '!*.min.css'],
      dest: 'release/css',
      ext: '.min.css'
    }]
  }
}
```
