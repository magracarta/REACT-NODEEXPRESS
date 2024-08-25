import React from 'react'
import {Link} from "react-router-dom";

function Heading() {
  return (
    <div className='headerWrap'>
      {/* Home Join List 메뉴를 구성해주세요. */}
      <Link to="/join">join</Link>
      <Link to="/list">list</Link>
    </div>
  )
}

export default Heading
