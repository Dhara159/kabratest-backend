// Jest config for mocking mongodb connection for testing
module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '3.5.5', // Version of MongoDB
      skipMD5: true
    },
    autoStart: false
  }
};