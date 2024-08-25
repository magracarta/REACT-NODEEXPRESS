import './App.css';
import Left1 from './component/Left1';
import { useState } from 'react';
import Right1 from './component/Right1';
import { Provider  } from 'react-redux';
import store from "./slices/store";
import Count from './Count';

function App() {
  return (
    <div>
    <Provider store={store}>
      <Count />
    </Provider>
    
    </div>
    
  );
}


export default App;
