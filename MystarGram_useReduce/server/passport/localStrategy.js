//localStrategy.js
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const getConnection = require("../router/data/db");


module.exports = ()=>{
    passport.use(
        new localStrategy( //kakao에서는 KAKAP_ID와 callbackURL
            {
                usernameField:"email",
                passwordField:"pwd",
            },
            async (email , password , done) =>{
                try{
                    const connection = await getConnection();
                    const sql = "select * from member where email = ?";
                    const [rows,fields] = await connection.query(sql,[email]);
                    if(rows.length >= 1){
                        if(password == rows[0].pwd){
                            //정상로그인
                            done(null, rows[0] , null);
                        }else{
                            //패스워드 틀림
                            done(null, false , {message:'password가 일치하지 않습니다.'});
                        }
                    }else{
                        //아이디 없음
                        done(null , false, {message:"없는 이메일입니다."});
                    }
                }catch(err){
                    console.error(err);
                }
            }
        )
    )
}