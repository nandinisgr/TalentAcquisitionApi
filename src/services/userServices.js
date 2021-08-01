const pool = require('../config/db');

async function getUser (email_id) {
    const query = {
        name: 'Check user exists',
        text: 'SELECT * FROM "public".user_info WHERE email_id = $1',
        values: [ email_id ],
    };

    console.log(`select query called! ${email_id}`);

    try {
        return await pool.query(query);

        // console.log(`query result is ${result}`);

        // return result.rows.length;
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function insertUser (userDetails) {
    const query = {
        name: 'insert user in db',
        text: `INSERT INTO "public".user_info (user_name, email_id, password) 
                VALUES($1, $2, $3) RETURNING *`,
        values: [
            userDetails.user_name,
            userDetails.email_id,
            userDetails.encryptedPassword,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

//Get user data By getByphone
async function getByEmail(userDetails) {
    const query = {
        name: 'get By Email in user_info',
        text: `select * FROM "public".user_info where email_id=$1`,
        values: [          
            userDetails.email_id,
        ],
    };
    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

//Get user data By getByName
async function getByName(userDetails) {
    const query = {
        name: 'get By Name in user_info',
        text: `select * FROM "public".user_info where user_name=$1`,
        values: [          
            userDetails.user_name,
        ],
    };
    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}
module.exports = {insertUser,getUser,getByEmail,getByName};
