const e = require("express");
const express = require("express");
const router = express.Router();
const getConnection = require("../router/data/db");
const fileObg = require("./data/multerObj");

let paging = {
    page:1, //현재 페이지
    displayRow:3 , //한 스크롤에 보여줄 피드 갯수
    startNum: 0,
    endNum:0,
    calPaging: function(){
        this.startNum = ((this.page-1) * this.displayRow +1)-1 > 0 ? ((this.page-1) * this.displayRow +1)-1 :0;
        this.endNum = this.page * this.displayRow;
        console.log('start end', this.startNum + " " + this.endNum);
    }
}

router.post("/imgup", fileObg.single("image"),(req,res)=>{
    res.send({filename:req.file.originalname, savefilename: req.file.filename})
});


router.post("/writePost",async(req,res)=>{
    const {content, writer } = req.body;

    try{
        const connection = await getConnection();
        //post 테이블에 레코드를 추가합니다. id 저장
        let sql = "insert into post(content, writer) values(?,?)";
        let [result, fiedls] = await connection.query(sql, [content ,writer ]);
        const postid = result.insertId;
        console.log(result);
        console.log(`postid : ${postid}`);
        //본문(content)에서 해시태그를 분리한다.
        const hashtags = content.match(/(?<=#)[^\s#]+/g);
        console.log(`해시 태그들 : ${hashtags}`);
        //각 해시태그를 새로운 태그들만 hashtag 테이블에 저장 id저장
        if(hashtags){
            hashtags.map(async(t,i)=>{
                // 현재 태그가 hashtag 테이블에 존재하는지 조회
                sql = 'select * from hashtag where word = ?';
                let [rows , filed2 ] = await connection.query(sql,[t]);
                let tagid;
                if(rows.length >= 1){
                    tagid = rows[0].id;
                }else{
                    sql = "insert into hashtag(word) values (?)";
                    let [result2, field] = await connection.query(sql, [t]);
                    tagid = result2.insertId;
                }
                console.log(`tagid : ${tagid}`);
                //postid와 hashid로 post_hash테이블에 레코드를 추가
                sql = "insert into post_hash(postid, hashid) values (? , ?)";
                let [result3, field3] = await connection.query(sql, [postid, tagid]);

            });
        }
       res.send({postid});

    }catch(err){
        console.error(err);
    }
});


router.post("/wirteImg",async(req,res)=>{
    const {postid , filename ,savefilename} = req.body;

    try{
        const connection = await getConnection();
        const sql = "insert into images (postid, filename ,savefilename) values (? , ? , ?)";
        let [result,fiedls] = await connection.query(sql, [postid , filename , savefilename]);
        res.send("ok");
    }catch(err){
        console.error(err);
    }
});
router.get("/getPostList/:page/:word",async(req,res)=>{
    if(req.params.page != undefined){
        paging.page = req.params.page;
    }else{
        paging.page = 1;
    }
    paging.calPaging();
    try{
        const connection = await getConnection();
        if(req.params.word != "n"){
            let sql = "SELECT * from hashtag where word = ?";
            let [rows , fields] = await connection.query(sql,[req.params.word]);
            if(rows.length >= 1){
                let wordid = rows[0].id;
                let [row1 , fiedls] = await connection.query(`SELECT postid FROM post_hash WHERE hashid = ${wordid}`);

                console.log(row1);
                let postid = [];
                row1.map((v, k)=>{
                    postid.push(v.postid);
                }); 

                let postidtext =postid.join(', ');
                

                console.log(postidtext);
                sql = `SELECT * FROM post WHERE id in ( ${postidtext} ) ORDER BY id DESC LIMIT ? OFFSET ?`;
                let [rows2 , fiedls2] = await connection.query(sql , [ paging.displayRow , paging.startNum]);
                console.log(rows2);
                res.send({postList : rows2 , paging});

            }else{
                const sql = "SELECT * FROM post ORDER BY id DESC LIMIT ? OFFSET ?";
                let [rows, fields] = await connection.query(sql,[paging.displayRow , paging.startNum]);
                res.send({postList : rows , paging});
            }
            
        }else{
            const sql = "SELECT * FROM post ORDER BY id DESC LIMIT ? OFFSET ?";
            let [rows, fields] = await connection.query(sql,[paging.displayRow , paging.startNum]);
            
            res.send({postList : rows , paging});
        }
        
    }catch(err){
        console.error(err);
    }
});

router.get("/getImages/:postid", async(req,res)=>{
    let postid = req.params.postid;

    try{
        const connection = await getConnection();
        const sql = "select * from images where postid = ?";
        let [rows, fields] = await connection.query(sql,[postid]);
        res.send(rows);
        
    }catch(err){
        console.error(err);
    }
    
});

router.get("/getLikes/:postid",async(req,res)=>{
    try{
        const connection = await getConnection();
        const sql = "select * from likes where postid = ?";
        let [rows, fields] = await connection.query(sql,[req.params.postid]);
        res.send(rows);
    }catch(err){
        console.error(err);
    }
});

router.post("/addlike",async(req,res)=>{
    try{
        const {postid, likenick} = req.body;
        const connection = await getConnection();
        const sql = "select * from likes where postid = ? and likenick = ?";
        let [rows, fields] = await connection.query(sql,[postid, likenick]);

        if(rows.length == 0){
            let result = await connection.query("insert into likes set postid = ? , likenick = ?" ,[postid, likenick]);
            res.send({msg:"하트를 눌렀습니다."});
        }else{
            let result = await connection.query("delete from likes  where postid = ? and likenick = ?" ,[postid, likenick]);
            res.send({msg:"하트 취소했습니다."});
        }
    }catch(err){
        console.error(err);
    }
});


router.get("/getReplys/:postid",async(req,res)=>{
    try{
        const connection = await getConnection();
        const sql = "select * from reply where postid = ? order by id desc";
        let [rows, fields] = await connection.query(sql,[req.params.postid]);
        res.send(rows);
    }catch(err){
        console.error(err);
    }
});

router.post("/addReply",async(req,res)=>{
    try{
        const {postid , writer , content} = req.body;
        const connection = await getConnection();
        const sql = "insert into reply (postid ,writer,content) values (?, ?, ?)";
        let [rows, fields] = await connection.query(sql,[postid , writer , content]);
        res.send({msg : "ok"});
    }catch(err){
        console.error(err);
    }
});

router.delete("/deleteReply/:replyid",async(req,res)=>{
    try{
        const connection = await getConnection();
        const sql = "delete from reply where id = ?";
        let [rows, fields] = await connection.query(sql,[req.params.replyid]);
        res.send({msg : "ok"});
    }catch(err){
        console.error(err);
    }
});


router.get("/getMyPost", async(req,res)=>{
    try{
        const connection = await getConnection();
        //로그인 유저의 닉네임으로 포스트의 작성자를 대상으로 하여 검색을 합니다.
        let sql = "select * from post where writer = ?";
        let [rows, fields] = await connection.query(sql,[req.user.nickname]);

        //검색된 포스트의 아이디들로 반복 실행해서  images 테이블에서 postid 를 대상으로 검색
        let imglist =[];
        sql = "select * from images where postid = ?";
        for(let i=0; i<rows.length; i++){
            let [rows2, fiedls] = await connection.query(sql , [rows[i].id]); 
            //검색된 이미지들의 첫번째만 배열에 담습니다.
            imglist.push(rows2[0].savefilename);
           
        }

        res.send({postList : rows , imglist });
    }catch(err){
        console.error(err);
    }
});

router.get("/getPost/:postid", async(req,res)=>{
    try{
        const connection = await getConnection();
        const sql = "select * from post where id =?";
        let [rows , fiedls] = await connection.query(sql, [req.params.postid]);
        res.send(rows[0]);
    }catch(err){
        console.error(err);
    }
});

module.exports = router;
