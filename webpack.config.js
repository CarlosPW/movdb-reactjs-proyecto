const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "production",
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js",
		publicPath: "/",
	},
	devServer: {
		historyApiFallback: true,
		// contentBase: path.resolve(__dirname, "public"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html",
		}),
		new MiniCssExtractPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				use: [
					"file-loader",
					{
						loader: "image-webpack-loader",
						options: {
							bypassOnDebug: true,
							disable: true,
						},
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"resolve-url-loader",
					"sass-loader",
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
	performance: {
		hints: "error",
		maxEntrypointSize: 8080000,
		maxAssetSize: 8080000,
	},
	//devtool (dev): 'eval-cheap-module-source-map',
	devtool: "source-map",
};
