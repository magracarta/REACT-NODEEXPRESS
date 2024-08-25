import React, { useState } from 'react';
import '../css/join.css'

//입력한 내용을 스테이트 변수에 실시간으로 저장하고 제출 버튼을 누르면 입력 내용이 하나의 객체 또는 배열에 저장되어서 List 에서 출력되게 코딩하세요.

function Join(props) {
  const [obj , setObj] = useState({ id : "", pwd : "", name : "", phone : ""});

  const onChange = (e) => setObj(prev => ({...prev, [e.target.name]:e.target.value }));
    
  const submitObj =()=>{
    props.setUserObjList((prev)=> [...prev ,obj ]);
    setObj({ id : "", pwd : "", name : "", phone : "" });
  };
  return (
    <div>
        <div className='container'>
            <div className='field'>
                <label>아이디</label>
                <input type="text" name='id' value={obj.id} onChange={onChange} />
            </div>
            <div className='field'>
                <label>비밀번호</label>
                <input type="password" name='pwd'  value={obj.pwd} onChange={onChange} />
            </div>
            <div className='field'>
                <label>이름</label>
                <input type="text" name='name' value={obj.name}  onChange={onChange}/>
            </div>
            <div className='field'>
                <label>전화번호</label>
                <input type="text"  name='phone' value={obj.phone} onChange={onChange} />
            </div>
            <div className='btns' style={{display:"flex", width:"100%"}}>
                <button style={{flex:"1", height:"50px"}} onClick={submitObj}>제출</button>
            </div>
        </div>
    </div>
  )
}

export default Join
