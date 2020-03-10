module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  rules: {
    "no-console": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/no-array-index-key": "off",
    "array-callback-return": "off",
    "consistent-return": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-restricted-syntax": "off"
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
};
