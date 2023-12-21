const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: '01013003',
    host: "localhost",
    port: 5432,
    database: "shop"
})


module.exports = pool