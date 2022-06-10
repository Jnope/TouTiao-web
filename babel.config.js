// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ]
// }
module.exports = {
  plugins: [
      [
          '@babel/plugin-transform-runtime',
          {
              corejs: false,
              helpers: true,
              regenerator: false,
          },
      ],
      [
          'import',
          {
              libraryName: 'element-plus',
              customStyleName: (name) => {
                  return `element-plus/lib/theme-chalk/${name}.css`;
              },
          },
      ],
  ],
  presets: [
      [
          '@babel/preset-env',
          {
              corejs: 3,
              useBuiltIns: 'usage',
          },
      ],
  ],
}