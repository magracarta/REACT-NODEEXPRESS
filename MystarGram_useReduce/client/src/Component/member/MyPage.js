import React, { useEffect, useState } from 'react'
import MainMenu from '../post/MainMenu'
import "../../style/mypage.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyPage() {
    const [imgSrc , setImgSrc] = useState('http://localhost:5000/images/user.png');
    const [followers, setFollowers] = useState([]); //나를 follow하는 사람들
    const [followings, setFollwings] = useState([]); //내가 following 하는 사람들

    const [postList , setpostList] = useState([]); //로그인 유저가 작성한 포스트들
    const [imgList, setImgList] = useState([]); //하단에 포스트를 대변할 수 있는 이미지들
    const [loginUser, setLoginUser] = useState({});

    const navigate = useNavigate();

    useEffect(
        ()=>{
            axios.get("/api/member/LoginUser").then((result)=>{
                if (!result.data.loginUser) {
                    alert("로그인이 필요합니다.");
                    navigate("/");
                  }
                setLoginUser(result.data.loginUser);
                setFollowers(result.data.followers);
                setFollwings(result.data.followings);
                if(result.data.loginUser.profileimg){
                    setImgSrc(`http://localhost:5000/upimg/${result.data.loginUser.profileimg}`);
                }
            }).catch((err)=>{console.error(err);});

            axios.get("/api/post/getMyPost").then((result)=>{
               setpostList(result.data.postList);
               setImgList(result.data.imglist);
            }).catch((err)=>{console.error(err);});



        },[]
    )
  return (
    <div className='mypage'>
      <MainMenu />
      <div className="userinfo">
        <div className="img">
            <img src={imgSrc} />
        </div>
        <div className="profile">
            <div className="field">
                <label>E-mail</label>
                <div>{loginUser.email}</div>
            </div>
            <div className="field">
                <label>Nick Name</label>
                <div>{loginUser.nickname}</div>
            </div>
            <div className="field">
                <label>Followers</label>
                <div>{(followers)?(followers.length):(0)}</div>
            </div>
            <div className="field">
                <label>followings</label>
                <div>{(followings)?(followings.length):(0)}</div>
            </div>
            <div className="field">
                <label>intro</label>
                <div>{loginUser.profilemsg}</div>
            </div>
            <div className="btn">
                <button>Edit Profile</button>
                <button>Post Write</button>
            </div>
            <div className="userpost">
                {/* 한줄에 세게씩 이미지를 적당한 크기로 나열해주세요. 필요하다면 css 수정도 해주세요. */}
                
                    {
                        imgList && imgList.map((v, k) => {
                            return (
                                <div  key={k} onClick={()=>{navigate(`/postone/${postList[k].id}`)}}>
                                    <img src={`http://localhost:5000/upimg/${v}`}  />
                                </div>
                            );
                        })
                    }
                
            </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage
