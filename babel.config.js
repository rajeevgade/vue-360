module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: false,
        useESModules: true,
      },
    ],
  ],
};
