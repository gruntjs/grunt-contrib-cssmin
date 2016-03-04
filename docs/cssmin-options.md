# Options

Options are passed to [clean-css](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api). In addition this task defines some extra options:


## report

Type: `string`  
Choices: `'min'`, `'gzip'`  
Default: `'min'`

Report minification result or both minification and gzip results.
This is useful to see exactly how well clean-css is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).


## sourceMap

Type: `boolean`  
Choices: `true`, `false`  
Default: `false`

Enable Source Maps.
