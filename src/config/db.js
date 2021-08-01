const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'talent',
});

module.exports = pool;


//MYSQL Connection
// var pool = mysql.createPool({
//     connectionLimit: 5,
//     host: 'localhost',
//     user: 'root',
//     password: '', 
//     database: 'talent'
// });
