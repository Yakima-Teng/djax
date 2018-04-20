# Linter Configuration

This boilerplate uses [ESLint](https://eslint.org/) as the linter, and uses the [Standard](https://github.com/feross/standard/blob/master/RULES.md) preset with some small customizations.

## Customizing

If you are not happy with the default linting rules, you have several options:

1. Overwrite individual rules in `.eslintrc.js`. For example, you can add the following rule to enforce semicolons instead of omitting them:

``` js
// .eslintrc.js
"semi": [2, "always"]
// or
"semi": ["error", "always"]
```

## Fixing Linting Errors

If your project is hosted in git repository, and there are some errors in your commiting files, then they will be fixed automatically. This function is achieved by mechanism of githook using npm packages: `husky` and `lint-staged`.

Key points in `package.json` file:
```
{

  "scripts": {
    "precommit": "lint-staged"
  },

  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "git add"
    ]
  }

}
```
