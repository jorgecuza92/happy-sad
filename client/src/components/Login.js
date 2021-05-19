import React from "react";
import { useState } from "react";
import { connect } from 'react-redux';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import './Login.css';

import { Animated } from "react-animated-css";



function Login(props) {
  const [credentials, setCredentials] = useState({});

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (id) => {
    fetch("https://api.succeedatfailing.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          const token = result.token;
          // get the token and place in local storage
          localStorage.setItem("jsonwebtoken", token);
          localStorage.setItem("username", result.username);
          localStorage.setItem('id', result.userId)
          localStorage.setItem('url', result.profileImage)
          props.onLogin()
          // take user to the dashboard 
          props.history.push("/app-track");
        }
      });
  };

  const paperStyle = { padding: 40, height: 'fit-content', width: 340, margin: "70px auto" }
  const avatarStyle = { backgroundColor: "#88729D" }
  const btnStyle = { margin: '10px 0', backgroundColor: "#DE7D63" }

  return (


    <Grid className="loginContainer" >
      <div className="innerLoginContainer">

        <Animated animationIn='fadeIn'>
          <Grid>

            <Paper elevation={10} style={paperStyle}>
              <Grid align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                <h2>Sign In</h2>
              </Grid>

              <TextField label='Username' type="text" name="username"
                onChange={handleChange} fullWidth required />

              <TextField label='Password' type="password" name="password"
                onChange={handleChange} fullWidth required />

              <FormControlLabel
                control={
                  <Checkbox

                    name="checkedB"
                    color="primary"
                  />
                }
                label="Remember me"
              />

              <Button type='submit' variant="contained" style={btnStyle} onClick={handleLogin} fullWidth>Sign In</Button>
              <Typography> Do you have an account ?
              <Link href="https://succeedatfailing.com/register" >
                  Register
              </Link>
              </Typography>
            </Paper>
          </Grid>
        </Animated>
      </div>
    </Grid>









  );

}

const mapDispatchToProps = (dispatch) => {
  return {
        onLogin: () => dispatch({type: 'LOGIN'})
  }
}


export default connect(null, mapDispatchToProps)(Login);
