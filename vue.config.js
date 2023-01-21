const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/E09/" : "/",
  //devServer: {
    //host: '172.16.118.20',
    //port: '3000'
  //}
})