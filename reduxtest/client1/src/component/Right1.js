import React from 'react'
import Right2 from './Right2'

function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2 onIncrease = {()=>{props.onIncrease();}}></Right2>
    </div>
  )
}

export default Right1
