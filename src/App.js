import React from 'react';
import './App.css';
import SignupForm from './SignupForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<SignupForm />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;