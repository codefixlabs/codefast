const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    "eslint-config-turbo",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: [
    ".*.js",
    "*.config.js",
    "*.config.mjs",
    "*.config.cjs",
    "*.config.ts",
    "node_modules/",
    ".next/",
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
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
