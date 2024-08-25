const express= require("express");
const path = require("path");
const app = express();
const mysql = require("mysql2/promise");
const port = 5000;

async function getConnection(){
    return mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"adminuser",
        database:"board"
    });
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("<h1>Hello server11World</h1>");
})

app.post("/join", async (req,res)=>{
    const {id, pwd, name , phone, email} = req.body;
    console.log("클라이언트에서 전송된 내용");
    try{
        const connection = await getConnection();
        const result= connection.query("insert into member (userid, pwd, name , phone, email)  values (? ,? ,? ,? ,?)",[id, pwd, name , phone, email]);
        
        res.send("ok");
    }catch(err){
        console.error(err);
    }
    
});

app.get("/getMembers",async(req,res)=>{
    try{
        const connection = await getConnection();
        const [rows, fields]= await connection.query("SELECT * FROM member ORDER BY userid ASC");
        res.send(rows);
    }catch(err){
        console.error(err);
    }
});

app.listen(port,()=>{console.log(`${port} port Server Open...`)})