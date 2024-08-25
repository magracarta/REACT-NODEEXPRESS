//kakaoStrategy.js
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const getConnection = require("../router/data/db");


module.exports=()=>{
    passport.use(
        new KakaoStrategy(
            {
                clientID : process.env.KAKAO_ID,
                callbackURL:"/member/kakao/callback",
            },
            async(accessToken, refreshToken, profile, done)=>{
                //회원 조회를 해서 없으면 회원 가입부터 하고 로그인
                const connection = await getConnection();
                let sql = "select * from member where snsid = ? AND provider = ?";
                let [rows, fields] = await connection.query(sql , [profile.id , "kakao"]);
                if(rows.length >= 1){
                    done(null , rows[0]);
                }else{
                    sql = "insert into member (email, nickname, snsid, provider) values (?,?,?,?)";
                    console.log(profile);
                    [result, fields] = await connection.query(sql, [ profile._json.id, profile._json.properties.nickname, profile._json.id, 'kakao']);
                    sql = 'select * from member where snsid=? AND provider=?';
                    let [rows2, fields2] = await connection.query(sql, [profile.id, 'kakao']); done (null, rows2[0]);
                    
                }
            }
        )
    )
}