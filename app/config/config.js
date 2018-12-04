const globalConfig = {
  development: {
    endpoints: {
      darts: 'https://www.darts-sci.com',
    }
  },
  production: {
    endpoints: {
      darts: 'https://www.darts-sci.com',
    }
  }
}

const config = globalConfig[process.env.NODE_ENV];

export default config;