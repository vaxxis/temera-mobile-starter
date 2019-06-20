module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@AppStore': ['./src/AppStore.ts'],

          '@screens': './src/screens',
          '@screens/*': './src/screens/*',

          '@components': './src/components',
          '@components/*': './src/components/*',

          '@utils': './src/utils',
          '@utils/*': './src/utils/*',

          '@api': './src/api',
          '@api/*': './src/api/*',

          '@types': './src/types',
          '@types/*': './src/types/*',

          '@config': './src/config',
          '@config/*': './src/config/*',
        },
      },
    ],
  ],
}
