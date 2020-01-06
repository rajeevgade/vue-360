// vue.config.js
module.exports = {
    configureWebpack: {
        optimization: {
            splitChunks: false
        }
    },
    filenameHashing: false,
    pages: {
        il: {
          entry: 'src/main.js',
          filename: 'index.html'
        }
    }
};