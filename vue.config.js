module.exports = {
  devServer: {
    proxy: 'http://localhost:8000/'
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
  ]
}