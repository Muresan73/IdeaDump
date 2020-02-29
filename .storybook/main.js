const custom = require('../webpack.config.js');
const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: config => {
    config.resolve.extensions = [...config.resolve.extensions, '.ts', '.tsx'];
    // config.resolve.alias.src = path.resolve(__dirname, '../src/');
    return { ...config, module: { ...config.module, rules: custom.module.rules } };
  }
};
