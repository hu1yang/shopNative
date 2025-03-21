module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins:[
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src'
        },
      },
    ],
    'react-native-reanimated/plugin',
  ]
};
