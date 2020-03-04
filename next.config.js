var path = require('path')
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')

module.exports = withCss(withSass({
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack}) => {
        config.resolve.modules = [path.resolve(__dirname), 'node_modules']
        return config
    }
}))