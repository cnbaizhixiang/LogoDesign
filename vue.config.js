const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false,
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        //http://cnhong.gnway.cc:8000
        //https://www.logoaidesign.com
        target: `http://127.0.0.1:9060`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
});
