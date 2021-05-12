import logo from './logo.svg';

import Application from './components/Application';
import Register from './components/Registration';
import Login from './components/Login';
import React, { Component } from 'react';
import Feed from './components/Feed'

import 'semantic-ui-css/semantic.min.css';
import './components/App.css';


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
