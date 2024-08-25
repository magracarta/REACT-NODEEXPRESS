import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {throttle}  from 'lodash';

import '../../style/board.css'

function BoardList() {
 const [boardList , setBoardList] = useState([]);
 const [paging , setPaging ] = useState({});
 const [beginend , setBeginend] = useState([]);
 const navigate = useNavigate();
 let {page}= useParams();

useEffect(()=>{
  pagingfunction2(1);
},[]);

const handleScroll = useCallback(throttle(() => {
  const scrollHeight = document.documentElement.scrollHeight - 20;
  const scrollTop = window.scrollY;
  const clientHeight = document.documentElement.clientHeight;
  if(paging.totalCount/paging.displayRow < paging.page) return false;
  if (scrollTop + clientHeight >= scrollHeight) {
    onPageMove(parseInt(paging.page, 10) + 1);
  }
}, 200), [paging]);

useEffect(()=>{
  //컴포넌트가 시작될때
  window.addEventListener("scroll", handleScroll);
  //window 에 scroll 이벤트가 발생하면 handleScroll 함수를 호출해서 실행해주세요.

  //컴포넌트가 끝날 때
  return()=>{
    window.removeEventListener("scroll", handleScroll);
  }

},[handleScroll]);

// let pagingfunction = async (page)=>{
//   try{
//     let result = await axios.get("/api/boards/getBoardList/"+page);
//     setBoardList([...result.data.boardList]);
//     let pagedata = result.data.paging;
//     setPaging(pagedata);
//     let pagingarr = [];
//     for(let i = pagedata.beginPage; i <= pagedata.endPage; i++){
//       pagingarr.push(i);
//     }
//     setBeginend(pagingarr);
//   }catch(err){
//     console.error(err);
//   }
// }

let pagingfunction2 = async (page)=>{
  try{
    let result = await axios.get("/api/boards/getBoardList/"+page);
    setPaging(result.data.paging);
    let boards = [...boardList];
    boards = [...boardList, ...result.data.boardList]; //새로 조회한 페이지의 목록과 합니다.
    setBoardList([...boards]);//Merge한 리스트를  boardList로 복사

  }catch(err){
    console.error(err);
  }
}


function onBoardnum(num){
    navigate(`/boardView/${num}`);
}

function onPageMove(page){
  //매개변수로 전달된 페이지로 게시물을 검색항 후 
  //리스트를 갱신하세요.

  //스크롤 방식
  pagingfunction2(page);

  //페이지 표시방식
  // navigate(`/main/${page}`);
  // pagingfunction(page);


}


  return (
    <div className='boardList'>
      <div className='titlerow'>
        <div className='titlecol'>번호</div>
        <div className='titlecol'>제목</div>
        <div className='titlecol'>글쓴이</div>
        <div className='titlecol'>작성일</div>
        <div className='titlecol'>조회수</div>
      </div>
      {
        boardList.map((board, idx)=>{
            return(
                <div className='row' key={idx}>
                    <div className='col'>{board.num}</div>
                    <div className='col' onClick={()=>{ onBoardnum(board.num); }}>{board.title}</div>
                    <div className='col'>{board.userid}</div>
                    <div className='col'>{board.writedate.substring(0,10)}</div>
                    <div className='col'>{board.readcount}</div>
                </div>
            )
        })
      }
      {/* <div id="paging" style={{display:"flex", justifyContent:"center"}}>
      {paging && (
          <>
            {paging.prev && (
              <span onClick={() => { onPageMove(paging.beginPage - 1) }}> ◀ </span>)}
            {beginend ? beginend.map((page, index) => {
              return (
                <>
                  { page == paging.page ? <span style={{margin:" 0 10px", color:"#000" ,textDecoration:"underline"}} key={index}> {page} </span> :
                    <span style={{margin:" 0 10px", cursor:"pointer"}} key={index} onClick={() => { onPageMove(page) }}> {page} </span>
                  }
                </>
              );
            }):null}
            {paging.next && (
              <span onClick={() => { onPageMove(paging.endPage + 1) }}> ▶ </span>
            )}
          </>
        ) }
      </div> */}
    </div>
  )
}

export default BoardList
