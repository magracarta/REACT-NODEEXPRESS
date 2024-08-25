const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

try{
    fs.readdirSync("uploads");
}catch(err){
    console.log("uploads 파일이 생성합니다.");
    fs.mkdirSync("uploads");
}
app.set("port",process.env.PORT || 5000);


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({resave:false, saveUninitialized:false , secret:"abcd",}));
app.use("/img", express.static(path.join(__dirname, 'uploads')));

const memberRouter = require("./router/members");
app.use("/members", memberRouter);


const boardRouter = require("./router/boards");
app.use("/boards", boardRouter);


app.get("/",(req,res)=>{
    res.send("<h1>Hello World!</h1>");
});




app.listen(app.get("port"),()=>{console.log(`${app.get("port")} port Server Open...`)})