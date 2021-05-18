import { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Animated} from 'react-animated-css';

function Register(props) {
  const [user, setUser] = useState({});

  const newUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = (props) => {
    fetch("https://api.succeedatfailing.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          console.log("user Registered");
          props.history.push('/login')
        }
      });
  };

  const paperStyle = {
    padding: 40,
    height: "fit-content",
    width: 340,
    margin: "70px auto",
  };
  const avatarStyle = { backgroundColor: "#88729D" };
  const btnStyle = { margin: "10px 0", backgroundColor: "#DE7D63" };

  return (
    <Animated animationIn="fadeIn">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Register</h2>
          </Grid>

          <TextField
            label="Email"
            type="text"
            name="email"
            onChange={newUser}
            fullWidth
            required
          />

          <TextField
            label="Username"
            type="text"
            name="username"
            onChange={newUser}
            fullWidth
            required
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={newUser}
            fullWidth
            required
          />

          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email"
          />

          <Button
            type="submit"
            variant="contained"
            style={btnStyle}
            onClick={() => registerUser(props)}
            fullWidth
          >
            Register
          </Button>
          <Typography>
            {" "}
            Already have an account ?
            <Link href="https://api.succeedatfailing.com/login">Sign In</Link>
          </Typography>
        </Paper>
      </Grid>
    </Animated>
  );
}

export default Register;
