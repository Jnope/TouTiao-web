module.exports = {
    css: {
      loaderOptions: {
        scss: {
            prependData: `@import "@/style/tools/index.scss";@import "@/style/settings/var.scss";`
        },
      }
    }
}