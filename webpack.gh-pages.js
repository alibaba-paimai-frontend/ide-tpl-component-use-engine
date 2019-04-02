const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

[EDITOR_START]
const CopyPlugin = require('copy-webpack-plugin');
[EDITOR_END]

const path = require('path');
const { getExternal } = require('./webpack-helper');

const targetDir = 'public';

module.exports = common.map(config => {
  /* 这份配置是用于发布 demo 到 gh-pages 分支使用的  */
  return merge(config, {
    entry: './demo/demo.tsx',
    externals: getExternal([EXTERNALS], true),
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimizer: [new TerserPlugin()]
    },
    plugins: [
      new CleanWebpackPlugin(targetDir),
      new HtmlWebpackPlugin({
        title: 'demo 页面',
        excludeChunks: ['index', 'index.js'],
        // Load a custom template (lodash by default)
        template: 'demo/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      [EDITOR_START]
      new CopyPlugin([{ from: './.cache/works', to: './' }])
      [EDITOR_END]
    ],
    output: {
      filename: 'demo.js',
      path: path.resolve(__dirname, targetDir),
      libraryTarget: 'umd',
      library: '[LIBNAME]Demo',
      umdNamedDefine: true
    }
  });
});
