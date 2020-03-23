module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier/recommended",
    "@vue/typescript/recommended",
    "@vue/eslint-config-prettier",
    "@vue/eslint-config-typescript"
  ],

  parserOptions: {
    parser: "@typescript-eslint/parser"
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
