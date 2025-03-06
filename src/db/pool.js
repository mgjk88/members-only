require('dotenv').config();
const {Pool} = require('pg');

module.exports = new Pool({
    connectionString: process.env.DB_STRING //can be changed easily if moved to prod
})

