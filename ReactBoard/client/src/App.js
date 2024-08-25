// import './App.css';
import { Routes,Route , Navigate } from 'react-router-dom';
import { Login, Main , JoinForm ,Memberupdate , BoardView , WriteBoard , UpdateBoard } from './Component';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/main' element={<Main />}/>
        <Route path='/joinForm' element={<JoinForm />}/>
        <Route path='/memberupdate' element={<Memberupdate />}/>
        <Route path='/boardView/:num' element={<BoardView/>} />
        <Route path='/writeBoard' element={<WriteBoard/>}/>
        <Route path='/updateBoard/:num' element={<UpdateBoard/>}/>
      </Routes>
    </div>
  );
}

export default App;
