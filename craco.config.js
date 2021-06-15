module.exports = {
  babel: {
    plugins: [
      // [
      //   'react-intl-auto',
      //   {
      //     removePrefix: 'src/',
      //     filebase: false,
      //   },
      // ],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '~': './src',
          },
        },
      ],
    ],
    loaderOptions: {
      ignore: ['./node_modules/mapbox-gl/dist/mapbox-gl.js'],
    },
  },
};
