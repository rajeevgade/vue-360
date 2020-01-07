// vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    configureWebpack: {
        optimization: {
            splitChunks: false
        }
    },
    filenameHashing: false,
    pages: {
        viewer_360: {
          entry: 'src/main.js',
          filename: 'index.html'
        }
    }
};