import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style/board.css';

function Login() {
    const [userid , setUserid] = useState("");
    const [pwd , setPwd] = useState("");
    const [message , setMessage] = useState("");
    const navigate = useNavigate();

    const onsubmit = async()=>{
        if(!userid){return alert('아이디를 입력하세요.');}
        if(!pwd){return alert('패스워드를 입력하세요.');}

       try{
            let result = await axios.post("/api/members/login" , {userid,pwd});
            if(result.data.msg == "ok") navigate("/main");
            else setMessage(result.data.msg);
       }catch(err){
            console.error(err);
            navigate("/");
       }
    }


  return (
    <div className='login'>
      <form id ="login-form">
        <div className='field'>
            <label>USER ID</label>
            <input type="text" value={userid} onChange={(e)=>{
                setUserid(e.currentTarget.value);
            }}/>
        </div>
        <div className='field'>
            <label>PASSWORD</label>
            <input type="password"  value={pwd} onChange={(e)=>{
                setPwd(e.currentTarget.value);
            }}/>
        </div>
        <div className='btns'>
            <input type="button" value="LOG IN" onClick={onsubmit} />
            <input type="button" value="JOIN" onClick={
                ()=>{navigate("/joinForm")}
            } />
        </div>
        <div>{message}</div>
      </form>
    </div>
  )
}

export default Login
