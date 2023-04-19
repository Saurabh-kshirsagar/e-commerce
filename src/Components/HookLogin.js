import React, { useState, useEffect } from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography, Link } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { json, NavLink, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { userLogin } from '../services/user.service';
import './HookLogin.css'
import { Label } from '@mui/icons-material';



export default function HookLogin() {
    const paperStyle = { padding: 20, height: '70vh', width: 480, margin: "90px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const redirect = useNavigate();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const onSubmit = async (data) => {
        const finalData = {
            user_id: data.user_ID,
            password: data.Password
        }
        try {
            const loginData = await userLogin(finalData);
            if (loginData) {
                enqueueSnackbar("Successfully Logged in.", {
                    variant: 'success',
                    anchorOrigin:
                    {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
                //send some msg
                redirect('/main')

                // alert("object")
            }
        } catch (err) {
            enqueueSnackbar("Invalid email or password.", {
                variant: 'error',
                anchorOrigin:
                {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        }
    };


    return (
        <div>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LoginIcon /></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField label='UserId' variant='standard' placeholder='Enter UserId' fullWidth  {...register("user_ID", {
                            required: true,
                            pattern: /^[A-Za-z][A-Za-z0-9_]{0,29}$/i
                        })} />
                        {errors?.user_ID?.type === "required" && <p>This field is required</p>}
                        {errors?.user_ID?.type === "pattern" && (<p>Please enter valid userID</p>)}
                        <TextField label='Password' variant='standard' placeholder='Enter password' type='password' fullWidth  {...register("Password", {
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/i
                        })} />
                        {errors?.Password?.type === "required" && <p>This field is required</p>}
                        {errors?.Password?.type === "pattern" && (<p>Please enter valid password</p>)}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                        <Grid spacing={10}>
                            <Link href="#" >
                                Forgot password ?
                            </Link>
                        </Grid>
                        <Grid>
                            Do you have an account ?
                            <Link href="/register" >
                                Sign Up
                            </Link></Grid>                           
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}
