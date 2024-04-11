const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    "eslint-config-turbo",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "*.config.js"],
  parserOptions: {
    project,
  },
  plugins: ["only-warn"],
  rules: {
    curly: ["error", "all"],
    "import/no-default-export": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
};
