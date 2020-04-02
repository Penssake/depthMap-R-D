module.exports = {
  outputDir: "./public",
  lintOnSave: process.env.NODE_ENV !== "production",
  chainWebpack: config => {
    config.module
      .rule("obj")
      .test(/\.obj$/)
      .use("webpack-obj-loader")
      .loader("webpack-obj-loader")
      .end();
  },
  devServer: {
    port: 8081,
    disableHostCheck: true,
    open: true,
    hot: true,
    liveReload: true,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
