const path = require("path");

module.exports = {
    entry: ["./src/js/app.js"],
    output: {
        path: path.resolve(__dirname, "src", "js"),
        filename: "dist/[name].js"
    },
    module: {
        rules: [
            {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};