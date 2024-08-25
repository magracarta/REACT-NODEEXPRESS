
import './App.css';
import { Routes  ,Route } from "react-router-dom";
import { Login , Join, Main , WritePost, MyPage , Postone } from './Component';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
 
  return (
    <div className="App" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/join' element={<Join/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/writepost' element={<WritePost/>}/>
        <Route path='/postone/:postid' element={<Postone/>}/>
      </Routes>
    </div>
  );
}

export default App;
