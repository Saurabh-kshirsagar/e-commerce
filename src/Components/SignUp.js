import React, { useState } from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


export default function SignUp() {
    const paperStyle = { padding: "30px 20px", width: 400, margin: "80px auto", }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: "#1bbd7e" }
    const radioStyle = { marginTop: 5 }

    const redirect = useNavigate();
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        cnfpassword: '',
        contact: ''
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
    const addDetails = (e) => {
        e.preventDefault();

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
        }
        else {
            alert("Registered  succesfully");
            localStorage.setItem("userdata", JSON.stringify([...data, input]))
            redirect("/login")
        }
    }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><HowToRegIcon /></Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant="caption" gutterBottom>Plese fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth variant='standard' label="Name" placeholder='Enter your name' name='name' onChange={getData} />
                    <TextField fullWidth variant='standard' label="Email" placeholder='Enter your email-id' name='email' onChange={getData} required />
                    
                    <TextField fullWidth variant='standard' label="Contact Number" placeholder='Enter your contact no.' name='contact' onChange={getData} />
                    <FormControl style={radioStyle}>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            style={{ display: 'initial' }}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth variant='standard' label="Password" placeholder='Enter password' name='password' onChange={getData} required/>
                    <TextField fullWidth variant='standard' label="Confirm Password" placeholder='Re-enter the password' name='cnfpassword' onChange={getData} required/>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="I accept the terms and conditions." />
                    </FormGroup>
                    <Typography>Already have an account ?
                        <span><NavLink to="/login"> Sign In</NavLink></span>
                    </Typography>
                    <Button type='submit'fullWidth variant='contained' color='primary' onClick={addDetails}>Sign Up</Button>
                </form>
            </Paper>
        </Grid>
    )
    }
