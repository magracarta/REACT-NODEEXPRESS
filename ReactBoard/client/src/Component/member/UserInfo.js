import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../../style/board.css"

function UserInfo() {
    const [loginUser , setLoginUser] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("/api/members/getLoginuser").then((result)=>{
            if(!result.data){
                alert("로그인이 필요한 서비스입니다.");
                navigate("/");
            }else{
                setLoginUser(result.data);
            }
        }).catch(err=>{
            console.error(err);
            //navigate("/");
        });
    },[]);

    let onLogout =()=>{
        fetch("/api/members/logout", {method: "GET"})
        .then(response => { return response;})
        .then(data => {
            navigate("/");
        }).catch(error => { console.error(error); });
    }
  return (
    <div className='loginuser'>
        <h3>{loginUser.userid}({loginUser.name}) 님 어서오세요 &nbsp;</h3>
        <button onClick={()=>{navigate("/memberUpdate")}}>회원정보 수정</button>
        <button onClick={onLogout}>로그아웃</button>
        <button onClick={()=>{navigate("/writeBoard")}}>게시글 쓰기</button>
    </div>
  )
}

export default UserInfo
