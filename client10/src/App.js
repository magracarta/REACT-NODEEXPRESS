import './App.css';
import {Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import { List , Join , Heading } from './Component';


function App() {
  const [userObjList, setUserObjList] = useState([]);
  return (
    <div className="App">
      <Heading /><br/>
      <Routes>
          <Route path='/join' element={<Join userObjList = {userObjList} setUserObjList={setUserObjList}/>} />
          <Route path='/List' element={<List  userObjList = {userObjList} setUserObjList={setUserObjList}/>} />
      </Routes>
    </div>
  );
}

export default App;
