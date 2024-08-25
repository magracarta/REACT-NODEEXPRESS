import React from 'react'
import { useSelector } from 'react-redux'

function Left3(props) {
 console.log('3');
  const number = useSelector((state)=>state.number);
  return (
    <div>
      <h1>Left : {number}</h1>
    </div>
  )
}

export default Left3
