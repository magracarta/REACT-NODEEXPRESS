import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../../style/MainMenu.css"

function MainMenu(props) {
  const {setWord} = props;
  const navigate = useNavigate();
  
  const [loginUser, setLoginUser] = useState({});
  const [imgSrc , setImgSrc] = useState('http://localhost:5000/images/user.png');

  const [inputStyle, setInputStyle] = useState({display:"none"});
  const [serachTag,setSearchTag] = useState("");
  const [search,setSearch] = useState("");
  const [veiwOrNot,setViewOrNot] = useState(false);


  useEffect(()=>{
    // if( props.loginUser && props.loginUser.profileimg){
    //   setImgSrc(`http://localhost:5000/upimg/${props.loginUser.profileimg}`);
    // }

    axios.get("/api/member/LoginUser").then((result)=>{
      if( result.data.loginUser){
        setLoginUser(result.data.loginUser);
       if(result.data.loginUser.profileimg) setImgSrc(`http://localhost:5000/upimg/${result.data.loginUser.profileimg}`);
        }
      })
    },[]);

    useEffect(()=>{
      if(veiwOrNot){
        setInputStyle({display:"flex", marginBottom:"10px"});
      }else{
        setInputStyle({display:"none"});
      }
    },[veiwOrNot]);

    function onLogout(){
      axios.get("/api/member/logout")
      .then((rsult)=>{
        navigate("/"); //router 안에서만 이동
        window.location.href="http://localhost:3000/" //페이지 이동
      })
      .catch((err)=>{ console.error(err)});
    }

    function onSearch(){
      if(serachTag.length == "" ) setWord("n");
      else setWord(serachTag);
    }
  return (
    <div>
      <div className='topmenu'>
        <img src='http://localhost:5000/images/home.png' onClick={()=>{
          navigate("/main")
        }} />
        <img src='http://localhost:5000/images/write.png' onClick={()=>{
          navigate("/writepost")
        }} />
        <img src='http://localhost:5000/images/search.png' onClick={()=>{
          setViewOrNot(!veiwOrNot);
        }} />
        <img src={imgSrc} onClick={()=>{
          navigate("/mypage")
        }}/>
        <img src="http://localhost:5000/images/logout.png" onClick={
          ()=>{ onLogout() }
        } />
      </div>
      <div className="search" style={inputStyle}>
        <input type="text" value={serachTag} style={{flex:"4", padding:"3px"}} onChange={(e)=>{ setSearchTag(e.currentTarget.value) }} />
        <button style={{flex:"1", padding:"3px"}} onClick={()=>{onSearch()}}>해시태그 검색</button>
      </div>
    </div>
  )
}

export default MainMenu
