const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  mode: 'production',

  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
    poor: path.join(__dirname, 'src', 'poor-mans-react', 'index.tsx')
  },
  target: 'web',
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.html']
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },

  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: './src/index.html',
  //     filename: './index.html',
  //     chunks: ['root']
  //   }),
  //   new HtmlWebPackPlugin({
  //     template: './src/PoorManReact/index.html',
  //     filename: './poorman.html',
  //     chunks: ['poormanreact']
  //   })
  // ],

  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['app'],
      filename: 'index.html',
      template: "src/index.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ['poor'],
      filename: 'poor.html',
      template: "src/poor-mans-react/index.html",
    }),
    new Visualizer()
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM'
  // }

  output: {
    filename: '[name]/main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
