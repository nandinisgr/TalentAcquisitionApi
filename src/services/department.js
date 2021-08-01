const pool = require('../config/db');

async function insertDepartment(DepartmentDetails) {
    const query = {
        name: 'insert department in db',
        text: `INSERT INTO "public".department (department_name,roles) 
                VALUES($1, $2) RETURNING *`,
        values: [
            DepartmentDetails.department_name,
            DepartmentDetails.roles,

        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function updateDepartment(DepartmentDetails) {
    const query = {
        name: 'update department in db',
        text: `UPDATE "public".department SET roles=$3,department_name =$2 WHERE department_id=$1`,
        values: [
            DepartmentDetails.department_id,
            DepartmentDetails.department_name,
            DepartmentDetails.roles,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function removeDepartment(DepartmentDetails) {
    const query = {
        name: 'delete department in db',
        text: `DELETE FROM "public".department WHERE department_id=$1`,
        values: [
            DepartmentDetails.department_id,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function getallDepartment() {
    const query = {
        name: 'Get all department',
        text: `select * FROM "public".department order by department_id DESC`,

    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}
//total count of getDepartmentCount
async function getDepartmentCount() {
    const query = {
        name: 'getDepartmentCount  in department',
        text: `select(select count(*) from public.department)as department`,

    };
    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}


module.exports = { getDepartmentCount, getallDepartment, removeDepartment, updateDepartment, insertDepartment };
