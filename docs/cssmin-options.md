# Options

Options are passed to [clean-css](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically). In addition this task defines two extra options:


## report

Choices: `'min'`, `'gzip'`  
Default: `'min'`

Report minification result or both minification and gzip results.
This is useful to see exactly how well clean-css is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).


#### sourceMap

Choices: `true`, `false`  
Default: `false`

This option can be used to generate a source map for your compiled CSS.
Set it to `true` to enable source map generation. The source map will be placed
under the same directory as your target file.
`/foo/bar.compiled.css` will generate a source map called `/foo/bar.compiled.css.map`.


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
