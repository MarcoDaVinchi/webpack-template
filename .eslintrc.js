module.exports = {
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:vue/recommended'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
