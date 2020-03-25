var path = require('path')
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')

module.exports = withSass(withCss({
    cssLoaderOptions: {
        url: false
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack}) => {
        config.resolve.modules = [path.resolve(__dirname), 'node_modules'],
        config.module.rules.push({
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader']
        })
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          })
        return config
    }
}))