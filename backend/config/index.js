var config

// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  console.log('prod');
  config = require('./prod')
} else {
  // we are in development - return the dev keys!!!
  console.log('dev');
  config = require('./dev')
}

module.exports = config
