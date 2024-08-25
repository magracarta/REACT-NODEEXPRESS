import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../../style/board.css";

function BoardView() {
    let {num} = useParams();
    let [board , setBoard] = useState({});
    let [replyList , setReplyList] = useState([]);
    let [loginUser , setLoginUser] = useState({});
    let [curDateTime , setCurDate]  = useState(""); // 07/11 10:45
    let [rContent , setRContent]  = useState("");
    let navigate = useNavigate();

    let replyInsert=(e)=> setRContent(e.target.value);
    useEffect(()=>{
        
        fetchdata();
        getLoginUser();
    },[]);

    const fetchdata = async()=>{
        try{
            let result = await axios.get("/api/boards/getBoard/"+num);
            setBoard(result.data.board);
            setReplyList(prev=>[...result.data.reply]);
        }catch(err){ console.error(err);}
    }

    const getLoginUser = async()=>{
        axios.get("/api/members/getLoginuser").then((result)=>{
            if(!result.data){
                alert("로그인이 필요한 서비스입니다.");
                navigate("/");
            }else setLoginUser({...result.data});
        }).catch(err=> console.error(err));
        
        setCurDate(createDate());
    }
 
    async function deleteBoard(num){
        const pass = window.prompt('삭제할 패스워드를 입력하세요.');
        if(board.pass != pass) return alert('패스워드가 일치하지 않습니다.');
        try{
            let result = await axios.delete("/api/boards/deleteboard/"+num);
            navigate("/main");
        }catch(err){
            console.error(err);
        }
    }

    async function deleteReply(replynum){
        if(!window.confirm("해당 댓글을 삭제할까요?")) return false;
        try{
        let reulst = await axios.delete("/api/boards/deletereply/"+replynum);
        fetchdata();
        }catch(err){console.error(err)};
    }
    
    let addReply = async()=>{
        let rplydata={ boardnum : num, userid : loginUser.userid, content : rContent}
        //댓글을 추가하고
        try{
            let insert = await axios.post("/api/boards/insertReply" , rplydata);
           //댓글을 다시 조회해서 댓글리스트를 갱신하세요(replyList 변수에 새 리스트가 들어가면 자동 갱신)
            fetchdata();
            setRContent("");
            getLoginUser();
        }catch(err){
            alert("댓글작성 실패 관리자 문의");
            console.error(err);
        }
    }

    

    function createDate(){
        let date = new Date();
        const month = String(date.getMonth()+1).padStart(2,'0');
        const days = String(date.getDate()+1).padStart(2,'0');
        const hours = String(date.getHours()).padStart(2,"0");
        const minutes = String(date.getMinutes()).padStart(2,"0");
        return month+"/"+days+" "+hours+":"+minutes;
    }
  return (
    <div className='boardView'>
        <h2>Board View</h2>
        <div className='field'>
            <label>작성자</label><div>{board.userid}</div>
        </div>
        <div className='field'>
            <label>조회수</label><div>{board.readcount}</div>
        </div>
        <div className='field'>
            <label>이메일</label><div>{board.email}</div>
        </div>
        <div className='field'>
            <label>제목</label><div>{board.title}</div>
        </div>
        <div className='field'>
            <label>내용</label><div><pre>{board.content}</pre></div>
        </div>
        <div className='field'>
            <label>이미지</label>
            <div>{board.savefilename&&<img src={`http://localhost:5000/img/${board.savefilename}`} style ={{width:"300px"}}/>}</div>
        </div>
        <div className='btns'>
            <button onClick={()=>{navigate(`/updateBoard/${board.num}`)}}>수정</button>
            <button onClick={()=>{deleteBoard(board.num)}}>삭제</button>
            <button onClick={()=>{navigate('/main')}}>돌아가기</button>
        </div>
        <br/><br/>
        <div className='head-row'>
            <div className='head-col'>장성일시</div>
            <div className="head-col">작성자</div>
            <div className="head-col">내용</div>
            <div className="head-col">&nbsp;</div>
        </div>
        <div className='new-reply-row'>
            <div className="new-reply-col">{curDateTime}</div>
            <div className="new-reply-col">{loginUser.userid}</div>
            <div className="new-reply-col">
                <input type="text" name="reply-content" value={rContent} onChange={replyInsert} />
            </div>
            <div className='new-reply-col'>
                <button onClick={addReply}>댓글 작성</button>
            </div>
        </div>

        {
            replyList.map((reply, idx)=> {
                return(
                    <div className='new-reply-row'>
                    <div className='new-reply-col'>{reply.writedate.substring(5,10)}</div>
                    <div className='new-reply-col'>{reply.userid}</div>
                    <div className='new-reply-col'>{reply.content}</div>
                    <div className='new-reply-col'>
                        { loginUser.userid == reply.userid && <button onClick={()=>{deleteReply(reply.replynum)}}>삭제</button> }
                    </div>
                 </div>
                )
            })
        }
    </div>

  )
}

export default BoardView
