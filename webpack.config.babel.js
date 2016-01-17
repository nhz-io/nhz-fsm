var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var
  SRC                       = 'src',
  DEV                       = 'dev',
  GH_PAGES                  = 'gh-pages',
  DIST                      = 'dist',
  MAIN                      = 'main.jsx',
  FSM                       = 'StateMachine.es6',
  FSM_BROWSER               = 'FSM',
  GENERATOR_BROWSER         = 'FSMGenerator',
  GENERATOR                 = 'Generator.es6',
  GENERATOR_DIST            = 'nhz-fsm-generator',
  HOST                      = 'localhost',
  TEMPLATE                  = 'template.html',
  NODE_MODULES              = 'node_modules',
  PORT                      = 9000,

  DEV_CONFIG                = 'dev.es6',
  DIST_CONFIG               = 'dist.es6',
  DIST_BROWSER_CONFIG       = 'dist-browser.es6',
  GH_PAGES_CONFIG           = 'gh-pages.es6',

  ROOT_PATH                 = path.resolve(__dirname),
  SRC_PATH                  = path.resolve(ROOT_PATH, SRC),
  DEV_PATH                  = path.resolve(ROOT_PATH, DEV),
  DIST_PATH                 = path.resolve(ROOT_PATH, DIST),
  FSM_PATH                  = path.resolve(SRC_PATH, FSM),
  CONFIG_PATH               = path.resolve(ROOT_PATH, 'config'),
  GENERATOR_PATH            = path.resolve(SRC_PATH, GENERATOR),
  MAIN_SRC_PATH             = path.resolve(SRC_PATH, MAIN),
  MAIN_DEV_PATH             = path.resolve(DEV_PATH, MAIN),
  GH_PAGES_PATH             = path.resolve(ROOT_PATH, GH_PAGES),
  DEV_TEMPLATE              = path.resolve(DEV_PATH, TEMPLATE),
  GH_PAGES_TEMPLATE         = path.resolve(DEV_PATH, TEMPLATE),
  NODE_MODULES_PATH         = path.resolve(ROOT_PATH, NODE_MODULES),
  DEV_CONFIG_PATH           = path.resolve(CONFIG_PATH, DEV_CONFIG),
  DIST_CONFIG_PATH          = path.resolve(CONFIG_PATH, DIST_CONFIG),
  DIST_BROWSER_CONFIG_PATH  = path.resolve(CONFIG_PATH, DIST_BROWSER_CONFIG),
  GH_PAGES_CONFIG_PATH      = path.resolve(CONFIG_PATH, GH_PAGES_CONFIG),

  TARGET                    = process.env.npm_lifecycle_event;

if(TARGET === 'start') {
  module.exports = {
    resolve: {
      extensions: [ "", ".js", ".jsx", ".es6" ],
      alias: {
        src: SRC_PATH,
        config: DEV_CONFIG_PATH
      }
    },

    devtool: 'eval-source-map',

    entry: MAIN_DEV_PATH,

    output: {
      path: DIST_PATH,
      filename: pkg.name + '.js'
    },

    module: {
      preLoaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loader: 'eslint-loader',
          include: [ SRC_PATH, DEV_PATH, CONFIG_PATH ],
          exclude: NODE_MODULES_PATH
        },
      ],
      loaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loaders: ['react-hot', 'babel'],
          include: [ SRC_PATH, DEV_PATH, CONFIG_PATH ]
        },
        {
          test: /.*\.(gif|png|jpe?g|woff|ttf|svg|eot|json)(\?.+)?$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]'
          ],
          include: [ SRC_PATH, DEV_PATH, NODE_MODULES_PATH ]
        },
        {
          test: /\.scss$/,
          loaders: [ 'style', 'css', 'sass' ],
          include: [ SRC_PATH, DEV_PATH, NODE_MODULES_PATH ]
        }
      ]
    },

    devServer: {
      colors:true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      host: HOST,
      port: PORT
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlwebpackPlugin({
        title: pkg.description + ' ' + pkg.version,
        script: pkg.name + '.js',
        template: DEV_TEMPLATE
      })
    ],

    eslint: {
      configFile: '.eslintrc'
    }
  }
}

if(TARGET === 'dist') {
  module.exports = {
    resolve: {
      extensions: [ "", ".js", ".jsx", ".es6" ],
      alias: {
        src: SRC_PATH,
        config: DIST_CONFIG_PATH
      }
    },

    externals: (function(externals = {}) {
      for(let key in pkg.dependencies) { externals[key] = key };
      return externals;
    }()),

    entry: (function(entry = {}) {
      entry[pkg.name] = entry[pkg.name + '.min'] = FSM_PATH;
      entry[GENERATOR_DIST] = entry[GENERATOR_DIST + '.min'] = GENERATOR_PATH;
      return entry;
    }()),

    output: {
      path: DIST_PATH,
      filename: "[name].js",
      libraryTarget: 'commonjs2',
      library: true
    },

    module: {
      preLoaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loader: 'eslint-loader',
          include: [ SRC_PATH, CONFIG_PATH ],
          exclude: NODE_MODULES_PATH
        },
      ],

      loaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loader: 'babel',
          include: [ SRC_PATH, CONFIG_PATH ],
          exclude: NODE_MODULES_PATH
        }
      ]
    },

    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        include: /\.min\.js$/,
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        }
      })
    ],

    eslint: {
      configFile: '.eslintrc'
    }
  }
}

if(TARGET === 'dist-browser') {
  module.exports = {
    resolve: {
      extensions: [ "", ".js", ".jsx", ".es6" ],
      alias: {
        src: SRC_PATH,
        config: DIST_BROWSER_CONFIG_PATH
      }
    },

    entry: (function(entry = {}) {
      entry[pkg.name] = entry[pkg.name + '.min'] = FSM_PATH;
      entry[GENERATOR_DIST] = entry[GENERATOR_DIST + '.min'] = GENERATOR_PATH;
      return entry;
    }()),

    output: {
      path: DIST_PATH,
      filename: "[name].js",
      libraryTarget: 'this',
    },

    module: {
      preLoaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loader: 'eslint-loader',
          include: [ SRC_PATH, CONFIG_PATH ],
          exclude: NODE_MODULES_PATH
        },
      ],

      loaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loader: 'babel',
          include: [ SRC_PATH, CONFIG_PATH ],
          exclude: NODE_MODULES_PATH
        }
      ]
    },

    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        include: /\.min\.js$/,
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        }
      })
    ],

    eslint: {
      configFile: '.eslintrc'
    }
  }
}


if(TARGET === 'gh-pages') {
  module.exports = {
    resolve: {
      extensions: [ "", ".js", ".jsx", ".es6" ],
      alias: {
        src: SRC_PATH,
        config: GH_PAGES_CONFIG_PATH
      }
    },

    entry: MAIN_DEV_PATH,

    output: {
      path: GH_PAGES_PATH,
      filename: pkg.name + ".js"
    },

    module: {
      preLoaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loader: 'eslint-loader',
          include: [ SRC_PATH, DEV_PATH, CONFIG_PATH ],
          exclude: NODE_MODULES_PATH
        },
      ],

      loaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loaders: ['babel'],
          include: [ SRC_PATH, DEV_PATH, CONFIG_PATH ],
          exclude: NODE_MODULES_PATH
        },
        {
          test: /.*\.(gif|png|jpe?g|woff|ttf|svg|eot|json)(\?.+)?$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]'
          ],
          include: [ SRC_PATH, DEV_PATH, path.resolve(ROOT_PATH, NODE_MODULES_PATH) ]
        },
        {
          test: /\.scss$/,
          loaders: [ 'style', 'css', 'sass' ],
          include: [ SRC_PATH, DEV_PATH, path.resolve(ROOT_PATH, NODE_MODULES_PATH) ]
        }
      ]
    },

    plugins: [
      new HtmlwebpackPlugin({
        title: pkg.description + ' ' + pkg.version,
        script: pkg.name + ".js",
        template: GH_PAGES_TEMPLATE
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        }
      })
    ],

    eslint: {
      configFile: '.eslintrc'
    }
  }
}
