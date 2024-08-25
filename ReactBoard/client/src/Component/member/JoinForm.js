import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function JoinForm() {
  const [user , setUser] = useState({ userid : "" , pwd : "" , pwdcheck : "" , name : "" , email :"" , phone:"" });
  const navigate = useNavigate();

  const userChange = (e)=> setUser(prev=>({...prev ,[ e.target.name] : e.target.value}));

  const onsubmit = ()=>{
    for(let key  in user){
      if(!user[key]) return alert(document.querySelector(`input[name="${key}"]`).dataset.alert+" 입력하세요.");
      if(key == "pwdcheck" && user[key] != user.pwd) return alert("패스워드확인이 일치하지 않습니다.");
    }

    axios.post("/api/members/join", user).then(response =>{
      if(response.data.msg) alert("회원가입에 문제가 있습니다. 관리자에게 문의하세요.");
      else alert("회원가입이 완료되었습니다.");
      navigate("/");
    }).catch(err=>{console.error(err);});
  }
  return (
    <div className='login'>
      <form id="login-form">
        <h2>Join</h2>
        <div className='field'>
          <label>USER ID</label>
          <input type="text" name="userid" value={user.userid} onChange={userChange} data-alert="아이디를" />
        </div>
        <div className='field'>
          <label>Password</label>
          <input type="password" name="pwd" value={user.pwd} onChange={userChange}  data-alert="비밀번호를"/>
        </div>
        <div className='field'>
          <label>Password - check</label>
          <input type="password" name="pwdcheck" value={user.pwdcheck} onChange={userChange} data-alert="페스워드체크를"/>
        </div>
        <div className='field'>
          <label>NAME</label>
          <input type="text" name="name" value={user.name} onChange={userChange}  data-alert="이름을"/>
        </div>
        <div className='field'>
          <label>EMAIL</label>
          <input type="text" name='email' value={user.email} onChange={userChange}  data-alert="이메일을" />
        </div>
        <div className='field'>
          <label>PHONE</label>
          <input type="text" name='phone' value={user.phone} onChange={userChange}  data-alert="전화번호를"/>
        </div>
        <div className='btns'>
            <input type="button" value="회원가입" onClick={onsubmit} />
            <input type="button" value="돌아가기" onClick={
                ()=>{}
            }/>
        </div>

      </form>
    </div>
  )
}

export default JoinForm
