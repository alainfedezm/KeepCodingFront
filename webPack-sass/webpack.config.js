module.exports = {
    entry: './src/main.js',
    mode : 'development',
    output : {
        //filename: '[name].[hash].bundle.js',
        filename: '[name].js',
        path: __dirname + '/dist',
    },

    module:{
        rules:[
            {
                test: /\.scss$/i,
                use: ['style-loader','css-loader','sass-loader'],
            }
        ]
    },

};