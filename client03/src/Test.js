import React from 'react'
import './test.css';

//Test.js 같은 파일 : 함수를 export 하는 파일 -> Component
//누군가가 그를 import 해서 하나의 태그로 사용하면 include와 같은 형식으로 삽입이 가능하다.

//Component 생성 규칙 
//1. 컴포넌트 이름은 반드시 대문자로 시작
//2. 컴포넌트 다른 컴포넌트에서 사용할 수 있도록 반드시 export
//3. 다른 컴포넌트를 사용하려면 반드시 import
//4. export와 import 하는 관계에서 서로를 인식할 수있는 이름을 반드시 맞춰서 사용
//5. import 된 컴포넌트는 태그 형시그로 사용하며, 필요에 따라 여러번 표시되도록 태그를 필요한 곳에 여러번 쓸수 있다.

function Test() {
  return (
    <div>
        <form>
            이름 : <input type="text"/> <br/>
            전화 번호 : <input type="text"/><br/>
            <button>본인인증</button>
        </form>
    </div>
  )
}

export default Test
