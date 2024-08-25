import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MainMenu from './MainMenu'
import axios, { Axios } from 'axios'
import Post from './Post'


function Postone() {
    const {postid} = useParams();
    const [post, setPost] = useState({});
    const [loginUser , setLoginUser] = useState({});
    const [followings , setFollwings] = useState([]);
    const [word , setWord] = useState("no");

    const navigate = useNavigate();

    useEffect(
        ()=>{

            //로그인 유저 & 팔로잉 배열
            axios.get("/api/member/LoginUser").then((result) => {
                if (!result.data.loginUser) {
                  alert("로그인이 필요합니다.");
                  navigate("/");
                }
                setLoginUser(result.data.loginUser);
                setFollwings(result.data.followings);
            }).catch(err => { console.error(err) });

            //포스트
            axios.get("/api/post/getPost/"+postid).then((result)=>{
                setPost(result.data);
            }).catch(err=>{console.error(err);})

           
            
    }, []);


        
  return (
    <div>
        <MainMenu setWord = {setWord} />
        {/* 해당 포스트 한개만 Main 에서 표시된 것처럼 표시하세요. */}
        <div className="Posts">
       
        <Post post={post} loginUser = {loginUser} followings ={followings} setFollwings = {setFollwings}/>
        
      </div>
        {/* <div className="post" style={{width:"800px"}}>
       

        { <Slider {...settings}>
            {
                (images)?(
                    images.map((value, key)=>{
                        return (
                            <img key={key} src={`http://localhost:5000/upimg/${value.savefilename}` } width="750" height="900"/>
                        )
                    })
                ):(null)
            }
            </Slider>
        }

        <div className="like">
            {
                (likeList)?(
                   likeList.some(
                    (like)=>(loginUser.nickname == like.likenick)
                   )
                   ?( <img src={`http://localhost:5000/images/delike.png`} onClick={()=>{onLike()}} />)
                   :( <img src={`http://localhost:5000/images/like.png`}  onClick={()=>{onLike()}} />)
                ):(<img src={`http://localhost:5000/images/like.png`}  onClick={()=>{onLike()}}/>)
            }
            &nbsp;&nbsp;
            <img src = {`http://localhost:5000/images/reply.png`} onClick={()=>{
                viewOrNot();
            }}/>
        </div>
        <div className='like'>
            {
                (likeList && likeList.length >= 1)?(
                    <span>{likeList.length} 명이 좋아합니다.</span>
                ):(
                    <span>아직 "좋아요"가  없어요.</span>
                    )
            }
               
            </div>
            <div className='content'>{post.content}</div>
            <div className='reply'>
                {
                    (replyList && replyList.length > 0)?(
                        replyList.map((reply,idx)=>{
                            return(
                                <div key = {idx} style={replyStyle}>
                                    <div style={{flex:"1", fontWeight:"bold"}}>{reply.writer}&nbsp;</div>
                                    <div style={{flex:"3"}}>{reply.content}&nbsp;</div>
                                    <div style={{flex:"1", textAlign:"right"}}>
                                        {
                                            (reply.writer==loginUser.nickname)?(
                                                <button onClick={()=>{deletREply(reply.id)}} style={{width:"100%"}}>
                                                    삭제
                                                </button>
                                            ):(null)
                                        }
                                    </div>
                                </div>
                            )
                        })
                    ):(<div  style={replyStyle}>아직 댓글이 없습니다.</div>)
                }
                <div style={{display:"flex", margin:"3px 7px"}}>
                    <input type="text" style={{flex:"5"}} value={replyContent} onChange={(e)=>{ setReplyContent(e.currentTarget.value) }}/>
                    <button style={{flex:"1"}} onClick={()=>{addReply(postid)}}>댓글입력</button>
                </div>
            </div>

    </div> */}
    </div>
  )
}

export default Postone
