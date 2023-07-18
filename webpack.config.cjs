const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

module.exports = {
  entry: './src/bot.js',
  target: 'node',
  externals: [
    nodeExternals()
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'commonjs2',
  },
  resolve: {
    // 确保以下模块路径包含在解析的模块路径中
    modules: ['node_modules'],
    // 确保以下模块扩展名会被自动解析
    extensions: [".ts", ".js", '.json', ".mjs"],
    fallback: {
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          // 指定需要转译的模块路径或模块名称
          /node_modules\/mongodb/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
    ],
  },
  // 提取第三方库依赖文件
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
