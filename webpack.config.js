const path = require('path');

const config = {
  entry: {
    'index':'./index.js',
    'article':'./article/article.js'
  }
  ,
  output: {
    path: path.resolve(__dirname, 'script'),
    filename: '[name].js'
  },
  
};

module.exports = config;