import React from 'react';
import {useState} from 'react';
import { connect } from 'react-redux'

function Login(props) {

  const [credentials, setCredentials] = useState({})

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name] : [e.target.value]
    })
  }
  
  const handleLogin = () => {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
  }







  return (
    <div>
      <h1 className="loginHeader">Login</h1>
      <input type="text" onChange={handleChange} className="username" name='username' />
      <input type="password" onChage={handleChange} className="password" name='password' />
      <button onClick={handleLogin} className="loginBtn">Enter</button>
    </div>
  )
}

export default Login
