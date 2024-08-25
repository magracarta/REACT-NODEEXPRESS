const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");
const router = express.Router();

async function getConnection(){
    return await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"adminuser",
        database:"chattest"
    });
}



router.post("/login",async(req,res)=>{
    let {name} = req.body;
    console.log(name);
    try{
        let connection = await getConnection();
        let [result, field] = await connection.query("select * from user where name = ?",[name]);
        if(result.length <= 0){
            res.json({"msg":"계정이 존재하지 않습니다."});
            return false;
        }
        res.json(result[0]);
    }catch(err){
        console.error(err);
    }
});

module.exports = router;