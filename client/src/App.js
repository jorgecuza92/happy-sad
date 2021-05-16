import logo from './logo.svg';

import Application from './components/Application';
import Register from './components/Registration';
import Login from './components/Login';
import React, { Component } from 'react';
import Feed from './components/Feed'

import 'semantic-ui-css/semantic.min.css';
import './components/App.css';
import ProfilePage from './components/ProfilePage';

import Navbar from './components/Navbar/Navbar';

function App() {

    return (
      <div className="App">
 
       
       <div className="app_body">
       <Feed />
       </div>
       
      </div>
    );
  }
  

  

export default App;
