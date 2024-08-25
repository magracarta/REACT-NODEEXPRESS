const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const app = express();

app.set("port",process.env.PORT || 5000);
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({resave:false,
    saveUninitialized:false ,
    secret:process.env.COOKIE_SECRET,
    cookie:{httpOnly:true , secure:false}}));

const passport = require('passport');
const passportConfig = require("./passport");
passportConfig();
app.use(passport.initialize());
app.use(passport.session());


app.use("/images", express.static(path.join(__dirname, 'images')));
app.use("/upimg", express.static(path.join(__dirname, 'uploads')));
app.use("/", express.static(path.join(__dirname, 'public')));

const memberRouter = require("./router/member");
app.use("/member", memberRouter);

const postRouter = require("./router/post");
app.use("/post", postRouter);




app.get("/",(req,res)=>{
    res.send("<h1>Hello World!</h1>");
});




app.listen(app.get("port"),()=>{console.log(`${app.get("port")} port Server Open...`)})