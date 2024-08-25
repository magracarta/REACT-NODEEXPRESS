import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../store/userSlice';


function Lgoin() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async()=>{
       try{
        let result = await axios.post("http://localhost:3000/member/login",{name});
        if(result.data.msg) return alert(result.data.msg);
        dispatch(loginAction(result.data));
        navigate("/chatroom");
       }catch(err){
        console.error(err);
       }
    }

  return (
    <div>
      <div>
        <input type="text" name="name" value={name} onChange={(e)=>{setName(e.currentTarget.value)}} />
        <button onClick={login} className='loginbuttn'>로그인</button>
      </div>
    </div>
  )
}

export default Lgoin
