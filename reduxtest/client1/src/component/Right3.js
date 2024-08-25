import React from 'react'
import { useDispatch } from 'react-redux'

function Right3(props) {
  const dispatch = useDispatch();
  return (
    <div>
        <h1>Right3</h1>
          
      <input type="button" value="+" onClick={
        ()=>{
            dispatch({type: 'PLUS'});
        }
      }/>
    </div>
  )
}

export default Right3
