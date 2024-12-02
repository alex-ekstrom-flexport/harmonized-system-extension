const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const srcDir = path.join(__dirname, '..', 'src')

module.exports = {
  entry: {
    background: './src/background/index.js',
    sidepanel: './src/sidepanel/index.tsx',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks(chunk) {
        return chunk.name !== 'background'
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './manifest.json', to: '.', context: 'public' },
        {
          from: '.',
          to: path.resolve('dist', 'assets', '[name][ext]'),
          context: 'assets',
        },
      ],
    }),
    ...getHtmlPlugins(['sidepanel']),
  ],
}
function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: 'HS Code Lookup Side Panel',
        filename: `./html/${chunk}.html`,
        chunks: [chunk],
      })
  )
}
