const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env) => ({

    mode: env.production ? 'production' : 'development',

    // Enable sourcemaps for debugging webpack's output.
    devtool: env.production ? 'source-map' : 'inline-cheap-module-source-map',

    entry: './src/index.tsx',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    output: {
        // Only bust cache of the main.js file. Other files are used by manifest.json
        filename: (chunkData) => (env.production && chunkData.chunk.name === 'main' ? '[name].[chunkhash].js' : '[name].js')
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
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     hmr: !!env.development, // only enable hot in development
                        //     // if hmr does not work, this is a forceful method
                        //     reloadAll: !!env.development
                        // }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: () => [
                                require('precss'),
                                require('autoprefixer')
                            ]
                        }
                    },
                    'sass-loader' // compiles Sass to CSS
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: env.production ? 'main.[contenthash].css' : 'main.css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            title: 'Repo Finder',
            template: './index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash()
    ],
    // Optimization will only kick-in in 'production' mode
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'main',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
});
