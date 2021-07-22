module.exports = {
  configureWebpack: {
    resolve: {
      //extensions: [], // 配置后缀,这里略
      alias: { // @配置好了，为src
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        
        // 'router': '@/router', router和store不需要了，$router和$store直接引用对象
      }
    }
  }
}