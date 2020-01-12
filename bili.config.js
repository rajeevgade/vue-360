module.exports = {
    banner: true,
    output: {
      extractCSS: false,
    },
    plugins: {
      vue: {
        css: true
      },
      babel: {
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      },
    }
};