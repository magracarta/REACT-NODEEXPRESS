import './App.css';
import {BrowserRouter , Routes , Route } from "react-router-dom";
import { A, B, C } from './Component';


function App() {
  return (
    <div className="App">
      {/* <h1>App 컴포넌트입니다.</h1> */}
      <a href="/A">A로 이동</a>&nbsp;&nbsp;
      <a href="/B">B로 이동</a>&nbsp;&nbsp;
      <a href="/C">C로 이동</a>

      <Routes>
      <Route path = "/A" element ={<A />} />
      <Route path = "/B" element ={<B />} />
      <Route path = "/C" element ={<C />} />
    </Routes>
    </div>
  );
}

export default App;
