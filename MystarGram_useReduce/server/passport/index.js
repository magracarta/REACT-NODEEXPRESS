// /passport/index.js

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const getConnection = require("../router/data/db");
const local = require("./localStrategy");
let kakao = require("./kakaoStrategy");

module.exports=()=>{
    passport.serializeUser((user, done)=>{
        done(null, user.email);//세션에 로그인 유저 이메일만 저장
    });
    passport.deserializeUser(async(email, done)=>{
        const sql = "select * from member where email=?";
        try{
            const connection = await getConnection();
            const [rows, field] = await connection.query(sql , [email]);
            done(null, rows[0]);//로그인 유저정보 복구
        }catch(err){
            done(err);
        }
    });
    local();
    kakao();
}