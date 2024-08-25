const mysql = require("mysql2/promise");

async function getConnection(){
    return mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"adminuser",
        database:"board"
    });
}

module.exports = getConnection;
