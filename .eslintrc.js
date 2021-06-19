module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier",
    "sort-imports-es6-autofix",
  ],
  rules: {
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-non-null-assertion": ["off"],
    "@typescript-eslint/no-use-before-define": ["off"],
    "@typescript-eslint/no-namespace": ["off"],
    "class-methods-use-this": ["off"],
    "consistent-return": ["off"],
    "default-case": ["off"],
    "func-names": ["off"],
    "import/extensions": ["off"],
    "import/no-extraneous-dependencies": ["off"],
    "import/no-unresolved": ["off"],
    "import/order": ["off"],
    "import/prefer-default-export": ["off"],
    "jsx-a11y/anchor-has-content": ["off"],
    "jsx-a11y/click-events-have-key-events": ["off"],
    "jsx-a11y/control-has-associated-label": ["off"],
    "jsx-a11y/label-has-associated-control": ["off"],
    "jsx-a11y/mouse-events-have-key-events": ["off"],
    "jsx-a11y/no-noninteractive-element-interactions": ["off"],
    "jsx-a11y/no-static-element-interactions": ["off"],
    "no-alert": ["off"],
    "no-await-in-loop": ["off"],
    "no-case-declarations": ["error"],
    "no-console": ["off"],
    "no-inner-declarations": ["off"],
    "no-multi-assign": ["off"],
    "no-plusplus": ["off"],
    "no-restricted-syntax": ["off"],
    "no-return-assign": ["off"],
    "no-param-reassign": ["off"],
    "no-throw-literal": ["off"],
    "no-underscore-dangle": ["off"],
    "no-useless-constructor": ["off"],
    "no-shadow": ["off"],
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
      },
    ],
    "lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],
    "arrow-body-style": ["error", "as-needed"],
    "max-classes-per-file": ["error", 3],
    "react/button-has-type": ["off"],
    "react/no-array-index-key": ["off"],
    "react/no-danger": ["off"],
    "react/destructuring-assignment": ["off"],
    "react/jsx-one-expression-per-line": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react/jsx-wrap-multilines": ["off"],
    "react/prop-types": ["off"],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "react/jsx-no-target-blank": ["error"],
    "react/sort-comp": ["error"],
    "react/react-in-jsx-scope": ["off"],
    "sort-imports-es6-autofix/sort-imports-es6": [
      "error",
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        trailingComma: "all",
        bracketSpacing: true,
        arrowParens: "avoid",
      },
    ],
  },
  //   overrides: [
  //     {
  //         "files": ["*.js", "*.jsx"],
  //         "rules": {
  //             "@typescript-eslint/explicit-function-return-type": "off"
  //         }
  //     }
  // ]
};
