module.exports = {
  database: {
    mongodb: {
      db: 'mongodb://10.46.20.231/ytx_mobile_dev',
      dbName: 'ytx_mobile_dev',
      defaultLimit: 1000
    },
    
    redis: {
      port: 6379,
      host: '',
      options: {
        password: '' 
      }
    },

    elasticsearch: {
      host: 'http://10.46.20.231:9200',
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

