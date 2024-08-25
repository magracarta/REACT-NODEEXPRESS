const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const getConnection = require("../router/data/db");
const multerObj = require("./data/multerObj");
const paging = require("./data/paging");


router.get("/getBoardList/:page",async(req,res)=>{
    if(req.params.page != undefined){
        paging.page = req.params.page;
        req.session.page = req.params.page;
    }else if(req.session.page !=undefined ){
        paging.page = req.session.page;
    }else{
        req.session.page ="";
        paging.page = req.params.page;
    }

    try{
        const connection = await getConnection();
        let sql = "select * from board";
        let [rows , field] = await connection.query(sql);
        
        paging.totalCount = rows.length;
        paging.calPaging();
        

        sql = 'select * from board order by num desc limit ? offset ?';
        let [rows2 , field2] = await connection.query(sql, [paging.displayRow , paging.startNum-1]);
        res.send({boardList: rows2 , paging });

    }catch(err){
        console.error(err);
    }
});

router.get("/getBoard/:num",async(req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query('update board set readcount = readcount+1 where num = ?',[req.params.num]);
        const [rows , field] = await connection.query('select * from board where  num = ?',[req.params.num]);
        const [rows2 , field2] = await connection.query('select * from reply where  boardnum = ?order by replynum desc',[req.params.num]);
        res.send({board: rows[0], reply: rows2});
        
    }catch(err){
        console.error(err);
    }
});

router.post("/updateBoard",async(req,res)=>{
   let {title , content , image , savefilename , num} = req.body;
    try{
        const connection = await getConnection();
        const result = await connection.query('update board set title = ? , content = ? , image = ? , savefilename = ? where num = ?',
        [title , content , image , savefilename , num]);
        res.send("ok");
        
    }catch(err){
        console.error(err);
    }
});

router.post("/insertReply",async(req,res)=>{
    let {boardnum ,userid , content } = (req.body);
    try{
        const connection = await getConnection();
        const [rows , field] = await connection.query('insert into  reply (userid ,content ,boardnum ) values (? , ?, ?)', [ userid , content , boardnum ]);
        res.send("ok");
        
    }catch(err){
        console.error(err);
    }
});

router.delete("/deletereply/:replynum",async(req, res)=>{
    try{
        const connection = await getConnection();
        const [rows , field] = await connection.query('delete from reply where  replynum = ?',[req.params.replynum]);
        res.send("ok");
    }catch(err){
        console.error(err);
    }
});

router.post("/fileupload",multerObj.single("image"),(req,res)=>{
    res.send({
        savefilename:req.file.filename , 
        image : req.file.originalname
    });
});

router.post("/insertBoard",async(req,res)=>{
    let {userid ,email , pass , title , content ,image, savefilename } = req.body;
    try{
        const connection = await getConnection();
        const [rows , field] = await connection.query('insert into board (userid ,email , pass , title , content ,image, savefilename ) values (? ,? ,? , ? ,? ,? ,? )',[userid ,email , pass , title , content ,image, savefilename]);
        res.send("ok");
    }catch(err){
        console.error(err);
    }
});

router.delete("/deleteboard/:num", async(req,res)=>{
    try{
        const connection = await getConnection();
        const [rows , field] = await connection.query('delete from board where  num = ?',[req.params.num]);
        res.send("ok");
    }catch(err){
        console.error(err);
    }
});

module.exports = router;