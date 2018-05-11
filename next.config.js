module.exports = {
    webpack: config => {
      config.module.rules.push({
        test: /\.scss$/,
        use: [
          'babel-loader',
          'styled-jsx-css-loader',
          'sass-loader'
        ],
      })
  
      return config
    },
  }