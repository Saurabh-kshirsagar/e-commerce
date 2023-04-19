import React,{useState} from 'react'
import {Avatar, Button, Grid, Paper, TextField, Typography,Link} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { json, NavLink, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

import SignUp from './SignUp';

export default function Login() {
  const paperStyle={padding:20,height:"70vh",width:400,margin:"80px auto"}
  const avatarStyle={backgroundColor:"#1bbd7e"}
  const btnStyle={margin:"8px 0"}
  const linkStyle={margin:"8px 0"}

  const redirect = useNavigate();
  const [input, setInput] = useState({
    
    email: '',
    password: '',
    
})
const [data, setData] = useState([])
console.log(input);
const getData = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    console.log(value, name);

    setInput(() => {
        return {
            ...input,
            [name]: value
        }
    })

}
const addData = (e) => {
  e.preventDefault();

  const getuserArr = localStorage.getItem("userdata");
  console.log(getuserArr);

  const { email, password } = input;
  if (email === "") {
      alert('email field is requred', {
          position: "top-center",
      });
  } else if (!email.includes("@")) {
      alert('plz enter valid email addres', {
          position: "top-center",
      });
  } else if (password === "") {
     alert('password field is requred', {
          position: "top-center",
      });
  } else if (password.length < 5) {
     alert('password length greater five', {
          position: "top-center",
      });
  } else {

      if (getuserArr && getuserArr.length) {
          const userdata = JSON.parse(getuserArr);
          const userlogin = userdata.filter((el) => {
              return el.email === email && el.password === password
          });

          if (userlogin.length === 0) {
              alert("invalid details")
          } else {
              alert("user login succesfulyy");
              redirect("/home")
          }
      }
  }
}


  return (
   <Grid>
      <Paper elevation={10} style={paperStyle}>
       <Grid align="center">
       <Avatar style={avatarStyle}><LoginIcon/></Avatar>
        <h2>Sign In</h2>
       </Grid>
            <TextField label="Email"  placeholder='Enter email-address' variant='standard' fullWidth="true" name='email' onChange={getData}  required/>
            <TextField label="Password" type="password"  placeholder='Enter Password' variant='standard' name='password' onChange={getData}  fullWidth="true" required/>
            <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember" />
            </FormGroup>
            <Button type='button' color='primary' variant="contained"  onClick={addData} style={btnStyle} fullWidth>Sign in</Button>
          <Typography style={linkStyle}>
          <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography> Dont have an account ?
          <span><NavLink to="/"> Sign Up</NavLink></span>
          </Typography>
       </Paper>
   </Grid>
  )
}
