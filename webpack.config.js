const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

var babelPresets = ["es2015", "react"];
if(process.env.NODE_ENV !== "production") {
	babelPresets.push("react-hmre");
}

module.exports = {
	entry: {
		BasicError: "./src/BasicError.jsx",
		BasicErrorSolution: "./src/BasicErrorSolution.jsx",
		PropsError: "./src/PropsError.jsx",
		PropsErrorCheck: "./src/PropsErrorCheck.jsx",
		PropsErrorTimestamp: "./src/PropsErrorTimestamp.jsx",
		PropHack: "./src/PropHack.jsx"
	},
	output: {
		path: "dist",
		filename: "[name]_bundle.js"
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HtmlWebpackPlugin({
			filename: "BasicError.html",
			chunks: ["BasicError"]
		}),
		new HtmlWebpackPlugin({
			filename: "BasicErrorSolution.html",
			chunks: ["BasicErrorSolution"]
		}),
		new HtmlWebpackPlugin({
			filename: "PropsError.html",
			chunks: ["PropsError"]
		}),
		new HtmlWebpackPlugin({
			filename: "PropsErrorCheck.html",
			chunks: ["PropsErrorCheck"]
		}),
		new HtmlWebpackPlugin({
			filename: "PropsErrorTimestamp.html",
			chunks: ["PropsErrorTimestamp"]
		}),
		new HtmlWebpackPlugin({
			filename: "PropHack.html",
			chunks: ["PropHack"]
		})
	],
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/ ,
				loaders: ["babel-loader?" + babelPresets.map((preset) => `presets[]=${preset}`).join("&")]
			},
			{
				test: /.css$/,
				loader: "style-loader!css-loader"
			}
		]
	},
	devtool: "source-map",
	debug: true
};
