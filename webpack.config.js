/**
 * Created by junxie on 18/5/27.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        pageOne: './src/todoList/index.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        })
    ],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, 'src')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['.js', '.json', '.jsx']
    }
};
