module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    'airbnb-base',"eslint-config-prettier"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "no-plusplus": "off",
    "max-len": ["error", { code: 400, ignoreComments: true }],
    "no-restricted-globals": "off",
    "no-console": "off",
    "linebreak-style": "off",
    "no-restricted-syntax": "off",
    "no-alert": "off",
    "no-shadow": "off",
    "consistent-return": "off",
    "import/prefer-default-export": "off",
    "import/newline-after-import": "off",
    "no-param-reassign": "off",

  },
  plugins: ["jest"],
};
