'use strict';

const PORT = process.env.port || 8080;

require('./server.js').start(PORT);
