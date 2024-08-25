import React from 'react'

function List(props) {
  return (
    <div>
      {/* props로 전달된 배열을 내용에 적절하게 출력하세요. */}
      {props.userObjList.map((v,k)=>{
        return <h2>id : {v.id} , 이름: {v.name} , 전화번호 : {v.phone}</h2>
      })}
    </div>
  )
}

export default List
