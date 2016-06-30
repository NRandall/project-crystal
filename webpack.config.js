const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {

  entry: [
    './client/src/index',
  ],
  output: {
    path: path.join(__dirname, '/client/build/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new CopyWebpackPlugin(
      [
        {
          from: `${__dirname}/client/src/index.html`,
          to: `${__dirname}/client/build/index.html`,
        },
        {
          from: `${__dirname}/client/src/assets/favicon.ico`,
          to: `${__dirname}/client/build/favicon.ico`,
        },
      ]
    ),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.svg$/, loader:
        'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
      { test: /\.woff$/, loader:
        'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
      { test: /\.woff2$/, loader:
        'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
      { test: /\.[ot]tf$/, loader:
        'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
      { test: /\.eot$/, loader:
        'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' },
    ],
  },
  postcss: () => [precss, autoprefixer],
};

if (process.env.NODE_ENV === 'production') {
  console.log('node in production mode');
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    })
  );
}

module.exports = config;
