const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|svg|gif)/,
                use: ["file-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
            root: __dirname,
            src: path.resolve(__dirname, "src"),
        },
        modules: [path.join(__dirname, "src"), "node_modules"],
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "/build/",
        noInfo: true,
        open: true,
        port: 5000,
        historyApiFallback: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "webpack-react-start-kit",
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
