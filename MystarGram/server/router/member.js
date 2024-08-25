const express = require("express");
const router = express.Router();
const getConnection = require("../router/data/db");
const fileObg = require("./data/multerObj");

router.post("/uploadFile", fileObg.single("fileupload"),async (req,res)=>{
   let {email , password  , nickname , phone ,intro} =req.body;
   try{
     let connection = await getConnection();
     let filename = req.file? req.file.filename : null;
     let [rows, fields] = await connection.query("select * from member where nickname =?",[nickname]);
     if( rows.length > 0){
        return res.send({msg:"이미 존재하는 닉네임"});
     }
     let result = await connection.query("insert into member ( nickname ,email , pwd  , phone ,profileimg ,profilemsg ) values(? , ? ,?, ? , ? ,?)",[nickname , email , password , phone, filename , intro]);


     res.send({msg:"ok"});
   }catch(err){
    console.error(err);
   }
});

const passport = require("passport");

router.post("/loginlocal", (req, res , next)=>{
    passport.authenticate(
        "local" , 
        (authError, user, info)=>{
            if(authError){
                //서버에러가 발생
                console.error(authError);
                return ;
            }
            if(!user){
                //이메일이 없거나 패스워드가 틀리거나 
                console.log(info.message);
                return res.send({msg : info.message})
            }

            //정상로그인  // req.login() : req가 갖고 있는 로그인 관련 함수
            return req.login(user , (loginError)=>{
                if(loginError){
                    console.error(loginError);
                    return next(loginError);
                }
                return res.send({ msg:'ok' , loginUser:req.user })
            });
        }
    )(req,res,next);
});

router.get("/kakao", passport.authenticate('kakao'));

router.get("/kakao/callback", 
    passport.authenticate('kakao',{
        failureRedirect: "http://localhose:3000/"
    }),
    (req,res)=>{
        res.redirect("http://localhost:3000/main");
    }
);

router.get("/LoginUser", async(req,res)=>{
    try{
        if(req.user){
            let connection = await getConnection();
            let [rows, fiedls] = await connection.query("select * from follow where ffrom = ?",[req.user.nickname]);
            //ffrom 에서 로그인 유저 닉네임을 검색하고, 검색 결과 fto들을 정리해서 배열로 변환
            let followings = (rows.length >=1 )? rows.map((f)=>(f.fto)):[];
    
           let [rows2, fiedls2] = await connection.query("select * from follow where fto = ?",[req.user.nickname]);
    
           let followers = (rows2.length >=1 )? rows2.map((f)=>(f.ffrom)):[];
           res.send({loginUser: req.user , followers , followings});
    
        }else{
            res.send({loginUser: req.user });
        }

    }catch(err){
        console.error(err);
    }
});


router.get("/getFollowing", async(req,res)=>{
    try{
        let connection = await getConnection();
        let [rows, fiedls] = await connection.query("select * from follow where ffrom = ?",[req.user.nickname]);
        //ffrom 에서 로그인 유저 닉네임을 검색하고, 검색 결과 fto들을 정리해서 배열로 변환
        let followings = (rows.length >=1 )? rows.map((f)=>(f.fto)):[];

       res.send({followings});

    }catch(err){
        console.error(err);
    }
});

router.post("/follow", async(req,res)=>{
    try{
        let {ffrom, fto} = req.body;
        let connection = await getConnection();
        let [rows, fiedls] = await connection.query("insert into follow (ffrom, fto) values (? , ?)",[ffrom, fto]);
        res.send("ok");

    }catch(err){
        console.error(err);
    }
});



router.get("/logout", (req,res)=>{
    req.session.destroy();
    res.send("ok");
});



module.exports = router;
