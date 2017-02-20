const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].[chunkhash].css');

const TARGET = process.env.npm_lifecycle_event;
const stylePath = path.join(__dirname, 'app', 'style.css');
const appPath = path.join(__dirname, 'app');
const buildPath = path.join(__dirname, 'build');

function configSwitch(target) {

  const module = {
    module: {}
  };

  switch(target) {
    case 'test':
    case 'test:tdd':
      module.module = {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            loaders: ['babel-loader?cacheDirectory'],
            include: [
              appPath,
              path.join(__dirname, 'test')
            ]
          }
        ]
      };

      break;

    case 'build':
      module.module = {
        use: [
          {
            test: /\.(js|jsx)$/,
            use: ['babel-loader?cacheDirectory', 'eslint-loader'],
            include: appPath
          },
          // Extract CSS during build
          {
            test: /\.css$/,
            use: extractCSS.extract({ fallback: 'style-loader', use: 'css-loader' }),
            include: stylePath
          }
        ]
      };

      module.entry = {
        style: stylePath,
        vendor: [
          'react', 'react-dom'
        ]
      };

      module.plugins = [
        new CleanWebpackPlugin([buildPath], {
          root: process.cwd()
        }),
        new webpack.optimize.CommonsChunkPlugin({
          names: ['vendor', 'manifest'],

          // options.name modules only
          minChunks: Infinity
        }),
        // Output extracted CSS to a file
        extractCSS
      ]

      module.output = {
        path: path.join(__dirname, 'build'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js'
      }

    default:
      module.module = {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            loaders: ['babel-loader?cacheDirectory', 'eslint-loader'],
            include: appPath
          },
          {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
            include: appPath
          }
        ]
      };

      module.entry = {
        style: stylePath
      };

      module.devServer = {
        // host: 'localhost',
        // port: 9000
      };
  }

  return module;
}

const common = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: buildPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      title: 'Ancients',
      appMountId: 'app',
      inject: false
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};

const config = merge(common, configSwitch(TARGET));

module.exports = validate(config, {
  quiet: true
});
