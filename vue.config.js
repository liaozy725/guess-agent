
module.exports = {
  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  publicPath: '/',
  devServer: {
      proxy: {
          '/apis': {
              target: 'http://jingcaiagent.manggeek.com/',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                '^/apis': '/'
              }
          }
      }
  }
}