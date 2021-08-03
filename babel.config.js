module.exports = api => {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'babel-plugin-root-import',
        {
          paths: [
            {
              rootPathSuffix: 'src/components',
              rootPathPrefix: '@components'
            },
            {
              rootPathSuffix: 'src/screens',
              rootPathPrefix: '@screens'
            },
            {
              rootPathSuffix: 'src/utils',
              rootPathPrefix: '@utils'
            }
          ]
        }
      ]
    ]
  };
};
