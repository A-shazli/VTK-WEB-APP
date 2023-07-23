const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
  devServer: {
    
    static: {
      directory: path.resolve(__dirname, 'dist'),
      
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
   
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: 'src/template.html',
    }),

    new CopyPlugin({
      patterns: [
        {
    from: path.join(__dirname, 'node_modules', 'itk', 'WebWorkers'),
    to: path.join(__dirname, 'dist', 'itk', 'WebWorkers'),
  },
  {
    from: path.join(__dirname, 'node_modules', 'itk', 'ImageIOs'),
    to: path.join(__dirname, 'dist', 'itk', 'ImageIOs'),
  },
  {
    from: path.join(__dirname, 'node_modules', 'itk', 'MeshIOs'),
    to: path.join(__dirname, 'dist', 'itk', 'MeshIOs'),
  },
  {
    from: path.join(__dirname, 'node_modules', 'itk', 'PolyDataIOs'),
    to: path.join(__dirname, 'dist', 'itk', 'PolyDataIOs'),
  },
  {
    from: path.join(__dirname, 'node_modules', 'itk', 'Pipelines'),
    to: path.join(__dirname, 'dist', 'itk', 'Pipelines'),
  },
      ]
    }),

  ],
}
