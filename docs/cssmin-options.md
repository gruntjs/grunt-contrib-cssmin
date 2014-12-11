# Options

Options are passed to [clean-css](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically). In addition this task defines some extra options:

## banner

Type: `String`  
Default: `null`

Prefix the compressed source with the given banner, with a linebreak inbetween.

## report

Choices: `'min'`, `'gzip'`  
Default: `'min'`

Either report only minification result or report minification and gzip results.
This is useful to see exactly how well clean-css is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).
