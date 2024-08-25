import React from 'react'
import "./Login.css";
//css 파일은 이와 같이import해서 적용시킬 수 있다.
//현재 위치는 html 태그 내부가 아니고, react(JSX)내부이므로 <link> 태그를 사용할 수없다.
//이렇게 만들어진 css 파일들의 적용은 최종 index.html 에서 적용되는 것이므로,
//파일을 아무리 나누고 component가 다르더라도, css내부에 selector 가 모든 index.html 내용에 영향을 미친다.

function Login() {
  return (
    <div>
      <form>
        아이디 : <input type="text" /><br/>
        패스워드 : <input type="password" /> <br/>
        <button>로그인</button>
      </form>
    </div>
  )
}

export default Login
