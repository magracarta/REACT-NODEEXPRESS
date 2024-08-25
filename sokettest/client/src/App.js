import React, {useState,useEffect , useRef} from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chatroom from './component/Chatroom';
import Chatting from './component/Chatting';
import Lgoin from './component/Lgoin';

function App() {
 

  return (
      <Routes>
        <Route path='/' element={<Lgoin />} />
        <Route path='/chatroom' element={<Chatroom />} />
        <Route path='/chatting/:cseq' element={<Chatting />} />
      </Routes>
  );
}

export default App;
