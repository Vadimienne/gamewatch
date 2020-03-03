var path = require('path')

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack}) => {
        config.resolve.modules = [path.resolve(__dirname), 'node_modules']
        return config
    }
}