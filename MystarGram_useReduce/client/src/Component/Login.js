import React ,{useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../style/mystargram.css"

//적용된 redux를 사용할 수 있게 도와주는 모듈
import {useSelector , useDispatch} from 'react-redux'

//쉽게 설명하면 dispatch 가 쓰기(배포) , selector가 읽기
import { loginAction } from '../store/userSlice';

function Login() {
    const navigate = useNavigate(); 
    const [pwd, setPwd] = useState("");    
    const [email, setEmail] = useState("");    
    const dispatch = useDispatch(); // 쓰기를 위한 함수 생성 


    async function onLoginLocal(){
        if(!email) return alert("이메일을 입력하세요.");
        if(!pwd) return alert("비밀번호를 입력하세요.");
        try{
            const result = await axios.post('/api/member/loginlocal',{email,pwd})
            if(result.data.msg == "ok"){
                const res = await axios.get('/api/member/LoginUser');
                dispatch(loginAction(res.data.loginUser));
                navigate('/main');
            }else{
                setPwd("");
                return alert(result.data.msg);
            }

        }catch(err){ console.log(err); };
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
