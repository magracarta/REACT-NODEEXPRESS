import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decreament, increamemt, increamemtByAmount } from './slices/countSlice';

function Count() {
    
  const count = useSelector(state => state.counter.number);
  const [userData , setUserData] = useState({
    name :useSelector(state => state.user.name),
    email : useSelector(state => state.user.email)
  });
  const dispatch = useDispatch();
  return (
      <div>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increamemt())}>Increment</button>
        <button onClick={() => dispatch(decreament())}>Decrement</button>
        <button onClick={() => dispatch(increamemtByAmount(5))}>Increment by 5</button>


        <div>
            <input type="text" placeholder='login' />
            <input type="text" placeholder='email' />
        </div>
      </div>
  )
}

export default Count
