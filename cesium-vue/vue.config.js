/*
 * @Author: GerhardYang
 * @Date: 2019-11-09 21:52:37
 * @LastEditTime: 2019-11-13 18:25:17
 * @LastEditors: GerhardYang
 * @Description: your file description
 */
module.exports = {
  // 根路径
  // 生产环境去掉map
  publicPath: './',

  // 生产环境取消console
  productionSourceMap: false,

  configureWebpack: (config) => {
      if (process.env.NODE_ENV === 'production') {
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      }
    }
}