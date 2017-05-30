const autoprefixer = require('autoprefixer')

module.exports = {
    postcss: () => {
        return [
            autoprefixer({
                browsers: [
                    'iOS >= 9.0',
                    'Android >= 4.4.4',
                    'last 4 ChromeAndroid versions'
                ]
            })
        ]
    }
}
