---
title: webpack4打包vendor过大问题
date: 2018-07-28
---
## webpack4 vendor过大解决方案
> webpack.config中optimization配置多个cacheGroups，对库进行分类打包  

* 需要注意window和mac正则分割符，已踩坑

#### optimization配置代码
```
 optimization: {
    namedChunks: true,
    splitChunks: {
      minSize: 30000,
      cacheGroups: {
        commons: {
          chunks: 'initial', // 'initial', 'async', 'all'
          name: 'commons',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 0, // 优先级
        },
        // 单独打包vue插件
        'vue-vendor': {
          chunks: 'initial', // 'initial', 'async', 'all',
          test: /[\/]node_modules[\/]vue/, // <- window | mac -> /node_modules/vue/
          name: 'vue-vendor',
          priority: -9,
          enforce: true,
        },
        vendor: {
          chunks: 'initial', // 'initial', 'async', 'all'
          test: /node_modules/,
          // test: /node_modules/,
          name: 'vendor',
          priority: -10,
          enforce: true,
        }
      }
    }
  },
```


#### 完整webpack.base.conf.js
```
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '../', dir)
}

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].js'
  },
  module: {
    rules: [
      {
        test: /.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {test: /.vue$/, loader: 'vue-loader', options: vueLoaderConfig},
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/components/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]?[hash]',
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)(?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]?[hash]',
        }
      },
      {
        test: /.(scss|css)$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },
  optimization: {
    namedChunks: true,
    splitChunks: {
      minSize: 30000,
      cacheGroups: {
        commons: {
          chunks: 'initial', // 'initial', 'async', 'all'
          name: 'commons',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 0, // 优先级
        },
        // 单独打包vue插件
        'vue-vendor': {
          chunks: 'initial', // 'initial', 'async', 'all',
          test: /[\/]node_modules[\/]vue/, // <- window | mac -> /node_modules/vue/
          name: 'vue-vendor',
          priority: -9,
          enforce: true,
        },
        vendor: {
          chunks: 'initial', // 'initial', 'async', 'all'
          test: /node_modules/,
          // test: /node_modules/,
          name: 'vendor',
          priority: -10,
          enforce: true,
        }
      }
    }
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        name: JSON.stringify(process.env.npm_package_name)
      }
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: '',
        ignore: ['.*'],
      },
    ]),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      favicon: resolve('static/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true,
      },
      chunksSortMode: 'dependency',
    })
  ],
}

```
  