const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = {
	mode: 'production',
	entry: {
	  main: './entry.js',
	  head: './head.js',
	  footer: './footer.js',
  },

  output: {
		filename: '[name].entry.js',
    chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, 'docs')
	},

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {url: false}
          },
        ],
      },

      {
        test: /\.(png|jpg|pdf|webp|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

	plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.opt.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      inject: false,
      cache: false,
      compile: true
    }),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
    }),
    new HTMLInlineCSSWebpackPlugin({
      filter(fileName) {
        return (fileName.includes('head') || fileName === 'index.html');
      },
      replace: {
        removeTarget: true,
        target: '<!-- head_css -->',
      },
    }),
    new HTMLInlineCSSWebpackPlugin({
      filter(fileName) {
        return (fileName.includes('main') || fileName === 'index.html');
      },
      replace: {
        removeTarget: true,
        target: '<!-- all_css -->',
      },
    }),
    new HTMLInlineCSSWebpackPlugin({
      filter(fileName) {
        return (fileName.includes('footer') || fileName === 'index.html');
      },
      replace: {
        removeTarget: true,
        target: '<!-- footer_css -->',
      },
    }),
  ],
};
