const { defineConfig } = require("@vue/cli-service");
const path = require('path'); // Ensure path module is imported

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components') // Correct placement inside 'resolve'
      }
    }
  },
});