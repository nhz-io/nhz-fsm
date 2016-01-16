var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var
  SRC                     = 'src',
  DEV                     = 'dev',
  GH_PAGES                = 'gh-pages',
  DIST                    = 'dist',
  MAIN                    = 'main.jsx',
  FSM                     = 'StateMachine.es6',
  FSM_BROWSER             = 'FSM',
  GENERATOR_BROWSER       = 'FSMGenerator',
  GENERATOR               = 'Generator.es6',
  GENERATOR_DIST          = 'nhz-fsm-generator',
  HOST                    = 'localhost',
  TEMPLATE                = 'template.html',
  NODE_MODULES            = 'node_modules',
  PORT                    = 9000,

  ROOT_PATH               = path.resolve(__dirname),
  SRC_PATH                = path.resolve(ROOT_PATH, SRC),
  DEV_PATH                = path.resolve(ROOT_PATH, DEV),
  DIST_PATH               = path.resolve(ROOT_PATH, DIST),
  FSM_PATH                = path.resolve(SRC_PATH, FSM),
  GENERATOR_PATH          = path.resolve(SRC_PATH, GENERATOR),
  MAIN_SRC_PATH           = path.resolve(SRC_PATH, MAIN),
  MAIN_DEV_PATH           = path.resolve(DEV_PATH, MAIN),
  GH_PAGES_PATH           = path.resolve(ROOT_PATH, GH_PAGES),
  DEV_TEMPLATE            = path.resolve(DEV_PATH, TEMPLATE),
  GH_PAGES_TEMPLATE       = path.resolve(DEV_PATH, TEMPLATE),
  NODE_MODULES_PATH       = path.resolve(DEV_PATH, NODE_MODULES),

  TARGET            = process.env.npm_lifecycle_event;

if(TARGET === 'start') {
  module.exports = {
    resolve: {
      extensions: [ "", ".js", ".jsx", ".es6" ],
      alias: { src: SRC_PATH }
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
          include: SRC_PATH,
          exclude: NODE_MODULES_PATH
        },
      ],
      loaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loaders: ['react-hot', 'babel'],
          include: [ SRC_PATH, DEV_PATH ]
        },
        {
          test: /.*\.(gif|png|jpe?g|woff|ttf|svg|eot)(\?.+)?$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]'
          ],
          include: [ SRC_PATH, DEV_PATH, path.resolve(ROOT_PATH, 'node_modules') ]
        },
        {
          test: /\.scss$/,
          loaders: [ 'style', 'css', 'sass' ],
          include: [ SRC_PATH, DEV_PATH, path.resolve(ROOT_PATH, 'node_modules') ]
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
      alias: { src: SRC_PATH }
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
          include: SRC_PATH,
          exclude: NODE_MODULES_PATH
        },
      ],

      loaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loader: 'babel',
          include: SRC_PATH,
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
      alias: { src: SRC_PATH }
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
          include: SRC_PATH,
          exclude: NODE_MODULES_PATH
        },
      ],

      loaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loader: 'babel',
          include: SRC_PATH,
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
      alias: { src: SRC_PATH }
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
          include: SRC_PATH,
          exclude: NODE_MODULES_PATH
        },
      ],

      loaders: [
        {
          test: /\.(js|es6|jsx)$/,
          loaders: ['babel'],
          include: [ SRC_PATH, DEV_PATH ],
          exclude: NODE_MODULES_PATH
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]'
          ],
          include: [ SRC_PATH, DEV_PATH ],
          exclude: NODE_MODULES_PATH
        },
        {
          test: /\.scss$/,
          loaders: [ 'style', 'css', 'sass' ],
          include: [ SRC_PATH, DEV_PATH ],
          exclude: NODE_MODULES_PATH
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
