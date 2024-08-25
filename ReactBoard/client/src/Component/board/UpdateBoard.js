import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import '../../style/board.css';

function UpdateBoard() {
    let {num} = useParams();
    const [loginUser , setLoginUser] = useState({userid: '', email: ''});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [boardpwd , setBoardpwd] = useState("");
    const [pass, setPass] = useState("");
    const [image, setImage] = useState("");
    const [savefilename, setSavefilename] = useState("");
    const [oldImgSrc, seltOldImgsrc] = useState("");
    const [oldSavefilename, setOldSavefilename] = useState("");
    const [imgStyle, setImgStyle] = useState({display:"block"});
    const [imgSrc , setImgSrc] = useState('http://placehold.it/200x150');

    useEffect(()=>{
        axios.get("/api/members/getLoginuser").then((result)=>{
            if(!result.data){
                alert("로그인이 필요한 서비스입니다.");
                navigate("/");
            }else setLoginUser(result.data);
            
        }).catch(err=>{ console.error(err); });
        fetchdata();
    },[]);

    let navigate = useNavigate();
    async function onSubmit(){
        if(pass != boardpwd) return alert("비밀번호가 다릅니다.");
        let obj ={
            title , content , image , savefilename , num
        }
        try{
            const result = await axios.post("/api/boards/updateBoard",obj);
            navigate("/boardView/"+num);
        }catch(err){

        }

    }
    let onFileUpload=async(e)=>{
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        const result = await axios.post("/api/boards/fileupload", formData);
        setSavefilename(result.data.savefilename);
        setImage(result.data.image);

        setImgSrc(`http://localhost:5000/img/${result.data.savefilename}`);
        setImgStyle({width:"300px"});
    }

    const fetchdata = async()=>{
        try{
            let result = await axios.get("/api/boards/getBoard/"+num);
            setTitle(result.data.board.title);
            setContent(result.data.board.content);
            setImage(result.data.board.image);
            setOldSavefilename(result.data.board.saveFileName);
            seltOldImgsrc(`http://localhost:5000/img/${result.data.board.savefilename}`);
            setBoardpwd(result.data.board.pass);

            
        }catch(err){ console.error(err);}
    }
  return (
    <div className='writeBoard'>
            <h2>Board Write Form</h2>
            <div className='field'>
                <label>작성자</label><input type="text" value={loginUser.userid} readOnly/>
            </div>
            <div className='field'>
                <label>이메일</label><input type="text"  value={loginUser.email} readOnly/>
            </div>
            <div className='field'>
                <label>PASS</label><input type="password"  value={pass} onChange={(e)=>{ setPass( e.currentTarget.value ) }}/>
            </div>
            <div className='field'>
                <label>제목</label>
                <input type="text" value={title} onChange={
                    (e)=>{ setTitle( e.currentTarget.value ) }
                }/>
            </div>
            
            <div className='field'>
                <label>내용</label>
                <textarea rows="10" value={content} onChange={
                    (e)=>{ setContent( e.currentTarget.value ) }
                }></textarea>
            </div>
            <div className='field'>
                <label>원래 이미지</label>
                
                <div><img src={oldImgSrc} style={{width:"150px"}} alt=""/></div>
            </div>
            <div className='field'>
                <label>수정할 이미지</label>
                <input type="file" name='image' onChange={(e)=>{ onFileUpload(e); }  }/>
                {/* e 를 전달인수로 전달해야 해당함수에서 방금 선택한 이미지를 인식할 수 있습니다. */}
            </div>
            <div className='field'>
                <label>이미지 미리보기</label>
                <div><img src={imgSrc} style={imgStyle} alt=""/></div>
            </div>
            <div className='btns'>
                <button onClick={ ()=>{ onSubmit() } }>작성완료</button>
                <button onClick={ ()=>{ navigate('/main') }}>돌아가기</button>
            </div>
        </div>
  )
}

export default UpdateBoard
