import React,{useState, useEffect, useCallback} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {MainMenu , Post} from "../Component";
import "../style/Posts.css";

import { useSelector, useDispatch } from 'react-redux';

function Main() {
    const navigate = useNavigate();
    // const [loginUser, setLoginUser] = useState({});
    const loginUser = useSelector(state => state.user);
    const [postList ,setPostList] = useState([]); 
    const [followings,setFollwings] = useState([]); 
    const [paging ,setPaging ] = useState({});
    const [word, setWord] = useState('n');
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가


    useEffect(() => {
      if (!loginUser.email) {
        alert("로그인이 필요합니다.");
        navigate("/");
      }
      axios.get("/api/member/LoginUser").then((result) => {        
        //setLoginUser(result.data.loginUser);
        setFollwings(result.data.followings);
      }).catch(err => { console.error(err) });

      console.log('loginUser : ',loginUser);
  
      setPostList([]);
      console.log(word);
      onPageMove(1, word);
    }, [word]);



    const handleScroll= useCallback(
      ()=>{
        const scrollHeight = document.documentElement.scrollHeight -10 //스크롤 가능한 크기
        const scrollTop = document.documentElement.scrollTop;//현재위치
        const clientHeight = document.documentElement.clientHeight;//내용물의 크기
        if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
          onPageMove(Number(paging.page) + 1 , word);
        }
      },[paging,isLoading ,word]
    );

    
    useEffect(()=>{
      window.addEventListener('scroll', handleScroll);
      return ()=>{
        window.removeEventListener("scroll", handleScroll);
      }
    },[handleScroll]);
    

    function onPageMove(page , word){
      setIsLoading(true);
      axios.get("/api/post/getPostList/"+page +"/"+word).then((result)=>{
        setPostList((prev)=>[...prev, ...result.data.postList]);
        setPaging(result.data.paging);
        setIsLoading(false); 
      }).catch(err=>{
        console.error(err)
        setIsLoading(false); 
      });
    }
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <MainMenu setWord={setWord} />
      <div className="Posts">
        {
          (postList)?(
            postList.map((post,idx)=>{
              return(
                <Post post={post} key={idx} loginUser = {loginUser} followings ={followings} setFollwings = {setFollwings}/>
              )
            })
          ):(null)
        }
      </div>
    </div>
  )
} 

export default Main
