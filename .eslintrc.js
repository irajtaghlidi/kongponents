module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: [
    "plugin:vue/recommended",
    "plugin:jest/recommended",
    "standard"
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'curly': 'error',
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'object-property-newline': 'error',
    'import/no-named-default': 0,
    'object-curly-spacing': 0,
    'lines-between-class-members': ['error', 'always'],
    'padding-line-between-statements': [
      "error",
      { blankLine: "always", prev: ["block", "block-like"], next: "*" },
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var", "if"] },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "any", prev: "directive", next: "directive" }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "jest/valid-expect": "error"
  }
}
