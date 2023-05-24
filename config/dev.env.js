'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://localhost:8080/#/"',
  API_URL: '"https://internal.sajiin-app-v1.my.id/"',
  SOCKET_URL: '"http://174.138.18.90:8082"',
  PRINTER_URL: '"http://localhost:9999"',
})
