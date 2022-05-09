const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: ['./src/js/main.js', './src/styles/styles.scss'],
    output: {
        filename: 'sources/js-dist.js',
        path: path.resolve(__dirname, 'src')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                include: [
                    path.resolve(__dirname, "src/js"),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'src/styles'),
                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "resolve-url-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true, // <-- !!IMPORTANT!!
                        }
                    },
                ]
            }
        ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "sources/css-dist.css",
        })
    ]
}