module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxRuntime: 'automatic' }]
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          components: './app/components',
          styles: './styles'
        }
      }],
      'react-native-reanimated/plugin' // Ensure this line is present
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    }
  };
};