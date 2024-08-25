import './App.css';
import React, { useState } from 'react';
//input 태그의 사용
//input type="text"에 입력된 내용을 state 변수로 추출하는 방법

function App() {
  //입력란에 쓰여진 애용이 저장될 state 변수를 생성
  const [content , setContent] = useState("");
  const [contentList , setContentList] = useState([]); //단어들을 배열로 저장할 배열

//전송 버튼을 클릭하면 입력란의 값을 배열에 추가하고

  const contentText=(e)=>{
    setContent(prev =>  e.target.value)
    
  }

  const onSubmit =()=>{
    setContentList(prev => [...prev, content]);
    setContent("");  
  }

  return (
    <div className="App">
      <input type="text" value={content} onChange={contentText}/>
      {/* 
        입력란  입력 -> content 변수로 입력값 전달 -> 입력란 value 값으로 복귀 !! 이 동작의 연속입니다. 입력란의 최신내용은 content에 계속 업데이트
      */}
      <button onClick={onSubmit}>전송</button><br/>
      {contentList.map((v,k)=>{
        return <div key={k}>{v}</div>
      //map 함수안에서 배열의 요소들을 화면에 표시하고자 한다면 위와 같이 익명함수에 return 명령을 사용합니다.
      //map 함수를 이용해서 같은 종류의 태그가 연속해서 같은 위치에 등장한다면 각 태그들을 key라는 속성을 부여해야 경고 에러 및 에러가 발생하지 않습니다.
      })}    
    </div>
  );
}

export default App;
