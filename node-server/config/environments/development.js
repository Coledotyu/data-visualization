module.exports = {
  database: {
    mongodb: {
      db: 'mongodb://127.0.0.1/ytx_mobile_dev',
      dbName: 'ytx_mobile_dev',
      defaultLimit: 1000
    },
    
    redis: {
      port: 6379,
      host: '127.0.0.1',
      options: {}
    },

    elasticsearch: {
      host: 'http://127.0.0.1:9200',
      log: 'error'
    }
  },

  mongoose: {
    schemaConfig: {
      autoIndex: true
    }
  },

  loggerDir: './logs', 

  allowedOrigins: [
  ],
  
  httpProxy: {
    javaProxy: {
      dynamicShare: 'http://192.168.18.92:9011/stock/quotation',
      staticShare: 'http://192.168.18.92:9011/stock/static',
    }
  },
}

