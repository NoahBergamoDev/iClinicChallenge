module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    "prettier/prettier": 0,
    // enable additional rules
    quotes: ["error", "double"],
    semi: ["error", "never"],


    // override configuration set by extending "eslint:recommended"
    "no-empty": "warn",
    "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "for-direction": "off",
  },
};
