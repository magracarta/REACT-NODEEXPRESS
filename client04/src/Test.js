import React, {useState , useEffect} from 'react'
import "./Test.css";
//리액트에는다른 프레임과 달리 특별한 변수가 있습니다.
//그 변수를 sate 변수라고 부르며, 이를 사용하기 위해서는 위에처럼 useState 함수를 import 애서 설정을 거쳐야 사용이 가능합니다.
//atae 변수는 페이지내에서 사용할 수 있는 전역변수정도로 일단 이해해주세요. 변수의 내용이 바뀔때마다 자동으로 페이지가 재 rendering(Test 함수가 한번더 호출) 이 되는 변수입니다.

function Test() {
    //함수 안에서 이페이지에서 사용할 state 변수를 생성 및 초기화 합니다.
    const[temp , setTemp] = useState(50);
    //temp : 변수이름
    //setTemp : temp 변수의 값을 바꿀 수 있는 setter 함수
    //useState(0) : temp 변수에 0으로 초기화 하면서 temp 변수와 setTemp 함수를 생성합니다.
    const increaseButton=()=> setTemp(prevtemp => prevtemp+1);

    //useEffect는 useState와 같이 중요하고 특별한 역할을 하는 함수입니다.
    //누가 호출하지 않아도 페이지가 처음 로딩될 때 자체적으로 호출 실행됩니다.
    //실행조건을 달아두면 그 조건에 따라 추가로 호출됩니다.
    //사용자가 이의로 호출하는 함수는 아닙니다.
    useEffect(
        ()=>{
            console.log("temp 바뀌었습니다." , temp);
        },[temp]
    );
   
    
    
    let str = "Test Component";
    console.log(`${str} 가 rendering 됩니다.`);
    return (
    <div>
      <h1 className='test'>Test Component 입니다.</h1>
      <h2>temp 변수 값 : {temp} &nbsp;</h2>
        {/* 리턴 HTML 안에서 스크립트 영역의 변수의 값을 같이 출력하거나 스크립트 연산을 하고 싶다면 위와 같이 중괄호를 해서 표시한다.  */}
        <button onClick={increaseButton}>temp 변수값 1 증가</button>
        {/* 버튼을 생성하고 onClick 이벤트에 스크립트 명령을 연결하고 싶다면 위와 같이 onClick={} 로 표시합니다. 다만 중괄호 안에 직접 명령을 쓰지않고, 익명 화살표 함수를 넣어서 명령들을 넣습니다. */}
    </div>
  )
}

export default Test

//state 변수의 값은 return 내부에서 제한없이 사용이 가능합니다.
//다만 값의 변경은 반드시 setTemp를 이용해야 합니다.
//return 내에서 JSX(자바스크립트 문법)을 사용하려면 { }안에서 사용합니다.
//temp 변수값 표현 {temp}
//onClick 에 JSX 명령을 연결하려면 onClick="함수이름()"을 사용하지 않고
//onClick={()=>{}} 형식을 사용합니다.
//return 문 외부에 별도의 함수를 정의해 놓고 그 함수를 호출하기도 합니다.
//onClick = {함수이름();}