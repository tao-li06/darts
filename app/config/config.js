const globalConfig = {
  development: {
    endpoints: {
      darts: 'http://35.233.139.236',
    }
  },
  production: {
    endpoints: {
      darts: 'http://35.233.139.236',
    }
  }
}

const config = globalConfig[process.env.NODE_ENV];

export default config;