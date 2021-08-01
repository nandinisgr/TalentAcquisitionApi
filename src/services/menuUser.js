const pool = require('../config/db');

async function insertUser(menuUserDetails) {
    const query = {
        name: 'insert menu_user in db',
        text: `INSERT INTO "public".menu_user (department_name,user_name,address,email_id) 
                VALUES($1, $2,$3,$4) RETURNING *`,
        values: [
            menuUserDetails.department_name,
            menuUserDetails.user_name,
            menuUserDetails.address,
            menuUserDetails.email_id,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function updateUser(menuUserDetails) {
    const query = {
        name: 'update menu_user in db',
        text: `UPDATE "public".menu_user SET user_name=$2,department_name =$3,email_id=$4,address=$5 WHERE menuuser_id=$1`,
        values: [
            menuUserDetails.menuuser_id,
            menuUserDetails.user_name,
            menuUserDetails.department_name,
            menuUserDetails.email_id,
            menuUserDetails.address,
       
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function removeUser(menuUserDetails) {
    const query = {
        name: 'delete removeUser in db',
        text: `DELETE FROM "public".menu_user WHERE menuuser_id=$1`,
        values: [
            menuUserDetails.menuuser_id,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function getallUser() {
    const query = {
        name: 'Get all getallUser',
        text: `select * FROM "public".menu_user order by menuuser_id DESC`,

    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}
//total count of getUserCount
async function getUserCount() {
    const query = {
        name: 'menu_user  in menu_user',
        text: `select(select count(*) from public.menu_user)as menu_user`,

    };
    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}


module.exports = { getUserCount, getallUser, removeUser, updateUser, insertUser };
