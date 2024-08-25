import React ,{useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../style/mystargram.css"

function Login() {
    const navigate = useNavigate(); 
    const [pwd, setPwd] = useState("");    
    const [email, setEmail] = useState("");    

    function onLoginLocal(){
        if(!email) return alert("이메일을 입력하세요.");
        if(!pwd) return alert("비밀번호를 입력하세요.");
        axios.post('/api/member/loginlocal',{email,pwd}).then((result)=>{
            if(result.data.msg == "ok"){
                navigate('/main');
            }else{
                setPwd("");
                return alert(result.data.msg);
            }
        }).catch((err)=>{ console.log(err); });
    }

    return (
        <div className='loginform'>
        <div className='field'>
            <label>EMAIL</label>
            <input type="text" value={email} onChange={(e)=>{setEmail(e.currentTarget.value)}}/>
        </div>
        <div className='field'>
            <label>PASSWORD</label>
            <input type="password" value={pwd} onChange={(e)=>{setPwd(e.currentTarget.value)}} />
        </div>
        <div className='btns'>
            <button onClick={()=>{onLoginLocal()}}>LOGIN</button>
            <button onClick={()=>{navigate('/join')}}>JOIN</button>
        </div>
        <div className='snslogin'>
            <button onClick={()=>{
                window.location.href = 'http://localhost:5000/member/kakao';
            }}>KAKAO</button>
            <button>NAVER</button>
            <button>GOOGLE</button>
            <button>FACEBOOK</button>
        </div>
        </div>
    )
}

export default Login
