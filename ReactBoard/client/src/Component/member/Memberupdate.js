import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Memberupdate() {
    const [user , setUser] = useState({ userid : "" , pwd : "" , pwdcheck : "" , name : "" , email :"" , phone:"" });
    const navigate = useNavigate();
  
    const userChange = (e)=> setUser(prev=>({...prev ,[ e.target.name] : e.target.value}));
    
    useEffect(()=>{
        axios.get("/api/members/getLoginuser").then((result)=>{
            if(!result.data){
                alert("로그인이 필요한 서비스입니다.");
                navigate("/");
            }else setUser(prev=>({...prev, ...result.data, pwdcheck:""}));
        }).catch(err=> console.error(err));
    },[]);


    let onsubmit = ()=>{
        let submitValue = true;
        
          for(let key  in user){
            if(!user[key] && document.querySelector(`input[name="${key}"]`)){
                submitValue = false;
                return alert(document.querySelector(`input[name="${key}"]`).dataset.alert+" 입력하세요.");
            }
            if(key == "pwdcheck" && user[key] !== user.pwd) {
                submitValue = false;
                return alert("패스워드확인이 일치하지 않습니다.");
            }
          }

          if(!submitValue) return false;
          axios.post("/api/members/update", user).then(response =>{
            if(response.data.msg) alert("회원수정에 문제가 있습니다. 관리자에게 문의하세요.");
            else alert("회원수정이 완료되었습니다.");
            navigate("/main");
          }).catch(err=>{console.error(err);});

    }


  return (
    <div className='login'>
        <form id="login-form">
        <h2>Edit Member</h2>
        <div className='field'>
            <label>USER ID</label>
            <input type="text" name="userid" value={user.userid} readOnly data-alert="아이디를" />
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
            <input type="button" value="정보수정" onClick={onsubmit} />
            <input type="button" value="돌아가기" onClick={
                ()=>{navigator('/main');}
            }/>
        </div>

        </form>
  </div>
  )
}

export default Memberupdate
