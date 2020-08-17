const path = require("path");

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const config = {
  projectName: 'Taro-miniprogram',
  date: '2020-3-20',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  sass: {
    resource: path.resolve(__dirname, '..', 'src/assets/style/mixins.scss')
  },
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: 'babel-runtime'
      }
      ]
    ]
  },
  defineConstants: {
  },
  alias: {
    '@': resolve('src')
  },
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  // 注入自定义变量
  const injectConfig = {
    env: {
      CONFIG_ENV: '"production"' // 注入的环境变量 默认生产环境 默认值不可更改
    }
  }
  for (const argv of process.argv) {
    if (argv.indexOf('CONFIG_ENV=') > -1) {
      injectConfig.env.CONFIG_ENV = `'${argv.split('=')[1]}'`
      break
    }
  }

  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'), injectConfig)
  }
  return merge({}, config, require('./prod'), injectConfig)
}

