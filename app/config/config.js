const globalConfig = {
  development: {
    endpoints: {
      darts: 'darts-sci.com/',
    }
  },
  production: {
    endpoints: {
      darts: 'darts-sci.com/',
    }
  }
}

const config = globalConfig[process.env.NODE_ENV];

export default config;