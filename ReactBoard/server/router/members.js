const express = require("express");
const router = express.Router();
const getConnection = require("../router/data/db");

router.post('/login', async(req,res,next)=>{
    let {userid, pwd}=(req.body);
    try{
        let connection = await getConnection();
        let [rows , field] = await connection.query("select * from member where userid = ?",[userid]);
       
        if(rows.length < 1 ) return res.send({msg:"아이디가 없습니다."});
        if(rows[0].pwd != pwd)  return res.send({msg:"비밀번호가 다릅니다."});

        const uniqInt = Date.now();
        req.session[uniqInt] = rows[0];
        res.cookie('session', uniqInt , {httpOnly:true, path:"/"});
        res.send({msg:"ok"});

    }catch(err){
        console.error(err);
    }
});

router.get('/logout',(req,res)=>{
    if(req.cookies.session){
        delete req.session[req.cookies.session];
       
        res.clearCookie("session",{httpOnly:true, path:"/"});
    }else{
        req.session.destroy(); //세션 쿠키 한번에 삭제
    }
    res.redirect("http://localhost:3000/");
});

router.post("/join", async(req,res)=>{
    let {userid , pwd , name , email , phone}=(req.body);
    try{
        const connection = await getConnection();
        const result = await connection.query("insert into member (userid , pwd , name , email , phone) values (? , ? , ? , ? , ?)",[userid , pwd , name , email , phone]);
        res.send({});
    }catch(err){
        res.send({msg:"문제 발생"});
        console.error(err);
    }
});

router.get("/getLoginUser",(req,res)=>{
    const loginuser = req.session[req.cookies.session];
    res.send(loginuser);
});

router.post("/update",async(req,res)=>{
    let {userid , pwd, name , email , phone}  =req.body;
    try{
        const connection = await getConnection();
        const result = await connection.query("update member set pwd = ? , name = ? , email = ? , phone =? where userid =?",[pwd , name , email , phone,userid ]);
        req.session[req.cookies.session] = {userid, pwd , name , email, phone};
        res.send({});
    }catch(err){
        res.send({msg:"문제 발생"});
        console.error(err);
    }
});

module.exports = router;