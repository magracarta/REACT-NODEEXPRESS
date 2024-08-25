import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Slide from "react-slick";

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import "../../style/Posts.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const settings = {
    dot:false,
    arrows:false,
    infinite:false,
    speed:500,
    slidsToShow:1,
    slideToScroll:1
}


function Post(props) {
    let {post , loginUser , followings , setFollwings} = props;
    const [postId, setPostId] = useState();
    const [images, setImages] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [replyList, setReplyList] = useState([]);
    const [viewVal, setViewVal] = useState(false);
    const [replyStyle , setReplyStyle] = useState({display:"none"});
    const [replyContent , setReplyContent] = useState(""); 
    
  
    let navigate = useNavigate();

    useEffect(
        ()=>{
            setPostId(post.id);
            axios.get(`/api/post/getImages/${post.id}`)
            .then(result => { 
                setImages(result.data)
             })
            .catch(err=>{ console.error(err) });

            setPostId(post.id);
            axios.get(`/api/post/getLikes/${post.id}`)
            .then(result => { 
                setLikeList(result.data)
             })
            .catch(err=>{ console.error(err) });

            getReplyList();
            

        },[]
    )

    function getReplyList(){
        axios.get(`/api/post/getReplys/${post.id}`)
            .then(result => { 
                setReplyList(result.data)
             })
            .catch(err=>{ console.error(err) });
    }

    async function onLike(){
        try{
            //현재 로그인 유저의 닉네임과 현재 포스트 id로 like 작업을 하고 
            //현재 로그인 유저의 닉네임과 현재 포스트 id를 서버에 보내서 내역이 있으면 삭제, 없으면 추가
            let resultlike = await axios.post("/api/post/addlike", {postid:post.id , likenick:loginUser.nickname});
            alert(resultlike.data.msg);
            //현재 포스트의 라이크를 재조회하고 likeList를 갱신합니다.
            const result2 = await axios.get(`/api/post/getLikes/${post.id}`);
            setLikeList(result2.data);
        }catch(err){
            console.error(err);
        }
    }

    async function deletREply(replyid){
        //댓글을 삭제하고 댓글 리스트를 재조회 및 갱신하세요.
        let reuslt = await axios.delete("/api/post/deleteReply/"+replyid);
        if(reuslt.data.msg == "ok"){
            alert("댓글 삭제 완료");
            getReplyList();
        }else{
            alert("댓글 삭제 실패");
        }
    }

    async function addReply(postid){
        //댓글을 추가하고 댓글 리스트를 재조회 및 갱신하세요.
        let reuslt = await axios.post("/api/post/addReply",{postid , writer:loginUser.nickname, content:replyContent});
        if(reuslt.data.msg == "ok"){
            alert("댓글 등록 완료");
            getReplyList();
            setViewVal(true);
            setReplyContent("");
        }else{
            alert("댓글 등록 실패");
        }
    }

    useEffect(()=>{
        if(viewVal){
            setReplyStyle({
                display:"flex",
                margin:"5px 3px"
            })
        }else{
            setReplyStyle({
                display:"none"
            })
        }

    },[viewVal]);

    function viewOrNot(){
        setViewVal(!viewVal);
    }

   async function onFollow(writer){
        try{
            await axios.post("/api/member/follow",{ffrom:loginUser.nickname , fto: writer});
            const result = await axios.get("/api/member/getFollowing");
            setFollwings(result.data.followings);
        }catch(err){
            console.error(err);
        }
    }
  return (
    <div className="post" style={{width:"800px"}}>
        <div className="writer" style={{display:"flex"}}>
            <div>{post.id} &nbsp;</div>
            <div>{post.writer} &nbsp;</div>
            {
                ( (post.writer != loginUser.nickname) 
                && ( !followings.some((following)=>{
                    return following == post.writer
                }) ) 
                )?<button onClick={()=>{
                    onFollow(post.writer)
                }}>FOLLOW</button>
                :(null)
            }
            
        </div>

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
            <div className='content'>{props.post.content}</div>
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
                                            (reply.writer==props.loginUser.nickname)?(
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
                    <button style={{flex:"1"}} onClick={()=>{addReply(post.id)}}>댓글입력</button>
                </div>
            </div>

    </div>
  )
}

export default Post
