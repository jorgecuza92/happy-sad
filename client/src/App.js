import logo from './logo.svg';
import './components/App.css';
import Application from './components/Application';
import Register from './components/Registration';
import Login from './components/Login';
import React, { Component } from 'react';
import Feed from './components/Feed'



function App() {

    return (
      <div className="App">
       <h1>Succeed At Failing</h1>
       <Application />
       <Feed />
       <Register />
       
      </div>
    );
  }
  

  

export default App;
