import { useState } from 'react';
import './App.css';

//state 변수를 만들어서 그 변수 값(true/false)에 따라  <h2>App.js 컴포넌트 입니다.</h2> 가 보이게 또는 안보이게 되는 버튼을 생성하세요.

function App() {
  const [temp, setTemp] = useState(true); 
  return (
    <div className="App">
       <button onClick={()=>{
        setTemp(!temp);
      }}>{temp?"숨기기":"보이기"}</button>
      
      {/* return () 안에서는 if else가 사용이 불가능, 그대신 ()?():() 삼항 연산자를 사용합니다. */}
      {
        (temp)?<h2>App.js 컴포넌트 입니다.</h2>:(null)
      }
     
    </div>
  );
}

export default App;
