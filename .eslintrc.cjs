/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

// module.exports = {
//   root: true,
//   extends: [
//     'plugin:vue/vue3-essential',
//     'eslint:recommended',
//     '@vue/eslint-config-typescript/recommended',
//     '@vue/eslint-config-prettier',
//   ],
//   rules: {
//     quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
//   },
//   overrides: [
//     {
//       files: ['cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'],
//       extends: ['plugin:cypress/recommended'],
//     },
//   ],
// };
module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  ignorePatterns: ['*.d.ts'],

  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly',
  },

  overrides: [
    {
      files: ['*.js'],

      parserOptions: {
        sourceType: 'module',
      },

      extends: [
        // Base ESLint recommended rules
        'eslint:recommended',

        // https://github.com/prettier/eslint-config-prettier#installation
        // usage with Prettier, provided by 'eslint-config-prettier'.
        'prettier',
      ],

      rules: {
        'prefer-promise-reject-errors': 'off',

        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],

        // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
        // does not work with type definitions
        'no-unused-vars': 'off',

        // allow debugger during development only
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.vue'],

      env: {
        browser: true,
        es2021: true,
        node: true,
        'vue/setup-compiler-macros': true,
      },

      // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
      // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
      // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
      parserOptions: {
        sourceType: 'module',
        parser: require.resolve('@typescript-eslint/parser'),
        extraFileExtensions: ['.vue'],
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaFeatures: {
          jsx: true,
        },
      },

      // Rules order is important, please avoid shuffling them
      extends: [
        // Base ESLint recommended rules
        'eslint:recommended',

        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
        // ESLint typescript rules
        'plugin:@typescript-eslint/recommended',
        // For the following ruleset see: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/README.md#recommended-configs
        'plugin:@typescript-eslint/recommended-requiring-type-checking',

        // Uncomment any of the lines below to choose desired strictness,
        // but leave only one uncommented!
        // See https://eslint.vuejs.org/rules/#available-rules
        // 'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
        // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
        'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

        'plugin:react/recommended',

        // https://github.com/prettier/eslint-config-prettier#installation
        // usage with Prettier, provided by 'eslint-config-prettier'.
        'prettier',
      ],

      plugins: [
        // required to apply rules which need type information
        '@typescript-eslint',

        // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
        // required to lint *.vue files
        'vue',

        'react',

        // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
        // Prettier has not been included as plugin to avoid performance impact
        // add it as an extension for your IDE
      ],

      settings: {
        react: {
          version: 'detect',
        },
      },

      rules: {
        'prefer-promise-reject-errors': 'off',

        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],

        // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
        // does not work with type definitions
        'no-unused-vars': 'off',

        // allow debugger during development only
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // this rule, if on, would require explicit return type on the `render` function
        '@typescript-eslint/explicit-function-return-type': 'off',

        // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-non-null-assertion': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-empty-function': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-return-await': 'off',
        '@typescript-eslint/return-await': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',

        // vue
        'vue/no-deprecated-slot-attribute': 'off',
        'vue/require-default-prop': 'off',
      },
    },
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
    {
      files: ['cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
};
