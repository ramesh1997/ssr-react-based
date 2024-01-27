const path =require('path');
const merge = require("webpack-merge");
const baseConfig =  require("./webpack.base.js");


const config = {
//Tell webpack the root file of our 
//server application
entry : './src/client/client.js', //same as index.js but it is browser side 

//Tell webpack where to put the output file 
//that is genereted 
output : {
    filename : 'bundle.js',
    path : path.resolve(__dirname,'public')
}
};

module.exports = merge(baseConfig,config);