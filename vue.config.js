module.exports = {
  devServer: {
    proxy: 'http://localhost:8000/',
    disableHostCheck: true,
  },
  "css": {
    "loaderOptions": {
      "scss": {
        "prependData": "@import \"@/assets/variables.scss\";"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  filename: '[name].[hash].bundle.js',
}