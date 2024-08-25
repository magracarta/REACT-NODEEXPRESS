import React, { useEffect, useState } from 'react';
import axios from 'axios';


function List() {
  const [members, setMembers] = useState([]);
  useEffect(()=>{
    //멤버를 조회해서 members 변수에 저장하고 아래 return 에서 전송받은 데이터를 화면에 출력하세요.
    axios.get("/api/getMembers").then(response=> setMembers(response.data)).catch(err=>console.error(err));
    return()=>{ //컴포넌트가 화면에서 사라질때 한번 호출됩니다.
      alert("컴포넌트가 사라집니다.");
    }
    
  },[]); // useEffect가 실행될 조건. 안쓰면 1번만 실행
  //주의 : [] 안에 넣는 변수를 함수안에서 변경하지 마세요.
 
  return (
    <div>
      {/* props로 전달된 배열을 내용에 적절하게 출력하세요. */}
      {
        (members)?(
          members.map((v,k)=>{
            return <h2 key ={k}>번호 : {k} , id : {v.userid} , 이름: {v.name} , 전화번호 : {v.phone}</h2>
          })
        ):(null)
      }
    </div>
  )
}

export default List
