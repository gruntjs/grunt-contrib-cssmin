# Options

Options are passed to [clean-css](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically). In addition this task defines an extra option:


## report

Choices: `'min'`, `'gzip'`  
Default: `'min'`

Report minification result or both minification and gzip results.
This is useful to see exactly how well clean-css is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).


## Passing options to clean-css

```js
cssmin: {
  target: {
    files: [{
      expand: true,
      cwd: 'release/css',
      src: ['*.css', '!*.min.css'],
      dest: 'release/css',
      ext: '.min.css'
    }],
    options: {
      shorthandCompacting: false,
      roundingPrecision: -1
    }
  }
}
```

For a full list of available options, see [clean-css](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically) docs.
