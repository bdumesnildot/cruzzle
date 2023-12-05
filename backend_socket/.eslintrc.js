module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "no-console": "off",
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(error|warn|info)$/]",
        message:
          "You can only call the error(), warn(), and info() methods from the console object",
      },
    ],
  },
};
