const { Pool } = require('pg');
const { user, host, database, password, port, connectionTimeoutMillis, idleTimeoutMillis, max } = require('../config/db_configuration');

const pool = new Pool({ user, host, database, password, port, connectionTimeoutMillis, idleTimeoutMillis, max });

module.exports = pool;

