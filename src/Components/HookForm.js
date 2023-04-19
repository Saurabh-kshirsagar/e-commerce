import { useEffect } from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography, Link } from '@mui/material'
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
import { useForm } from "react-hook-form";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Register } from '../services/register.service';



export default function HookForm() {
  const paperStyle = { padding: '30px 20px', width: 500, margin: "80px auto" }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const marginTop = { marginTop: 5 }
  const mrg = { marginTop: 15, }


  const redirect = useNavigate();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    debugger
    const finalData = {
      first_name: data.firstName,
      last_name: data.lastName,
      mobile_no: data.mobile_No,
      user_id: data.user_ID,
      email_id: data.email,
      password: data.Password
    }
    try {
      const register = await Register(finalData);
      if (register) {
        enqueueSnackbar("You are registered successfully.", {
          variant: 'success',
          anchorOrigin:
          {
            vertical: 'top',
            horizontal: 'right'
          }

        })

        redirect('/')

      }
    } catch (err) {

      enqueueSnackbar("something went wrong", {
        variant: 'erroe',
        anchorOrigin:
        {
          vertical: 'top',
          horizontal: 'right'
        }

      })

      console.log(err);
    }

  }
  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}>
            </Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth label='Name' variant='standard' placeholder="Enter your name" {...register("firstName", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i
            })} />
            {errors?.firstName?.type === "required" && <p>This field is required</p>}
            {errors?.firstName?.type === "maxLength" && (<p>First name cannot exceed 20 characters</p>)}
            {errors?.firstName?.type === "pattern" && (<p>Alphabetical characters only</p>)}

            <TextField fullWidth label='Last Name' variant='standard' placeholder="Enter your Last name" {...register("lastName", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i
            })} />
            {errors?.lastName?.type === "required" && <p>This field is required</p>}
            {errors?.lastName?.type === "maxLength" && (<p>Last name cannot exceed 20 characters</p>)}
            {errors?.lastName?.type === "pattern" && (<p>Alphabetical characters only</p>)}

            <TextField fullWidth label='email' variant='standard' placeholder="Enter your email"{...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            })} />
            {errors?.email?.type === "required" && <p>This field is required</p>}
            {errors?.email?.type === "pattern" && (<p>Enter valid email address</p>)}

            <TextField fullWidth label='UserId' variant='standard' placeholder="Enter your UserId"{...register("user_ID", {
              required: true,
              pattern: /^[A-Za-z][A-Za-z0-9_]{0,29}$/i
            })} />
            {errors?.user_ID?.type === "required" && <p>This field is required</p>}
            {errors?.user_ID?.type === "pattern" && (<p>Please enter valid userID</p>)}

            <FormControl component="fieldset" style={marginTop}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>

            <TextField fullWidth label='Phone Number' variant='standard' placeholder="Enter your phone number" {...register("mobile_No", {
              required: true,
            })} />
            {errors?.user_ID?.type === "required" && <p>This field is required</p>}

            <TextField fullWidth label='Password' variant='standard' placeholder="Enter your password" {...register("Password", {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/i
            })} />
            {errors?.Password?.type === "required" && <p>This field is required</p>}
            {errors?.Password?.type === "pattern" && (<p>Please enter valid password</p>)}

            <TextField fullWidth label='Confirm Password' variant='standard' placeholder="Confirm your password"{...register("cnfPassword")} />
            <FormControlLabel
              control={<Checkbox name="checkedA" />}
              label="I accept the terms and conditions."
            />

            <Grid>
              <label>Already have an account ?</label>
              <Link href="/" >
                Sign Up
              </Link>
            </Grid>

            <Grid style={mrg}>
              <Button type='submit' variant='contained' color='primary'>Sign up</Button>
            </Grid>
          </form>
        </Paper>
      </Grid>

    </div>
  )
}
