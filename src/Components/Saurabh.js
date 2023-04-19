import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import { Button, TextField } from '@mui/material';
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


export default function Saurabh() {
    const paperStyle = { padding: '30px 20px', width: 800,height:600, margin: "30px auto" }
    const { register, handleSubmit } = useForm();
    const onSubmit = data =>
        console.log(data)

    return (
        <Paper elevation={20} style={paperStyle}>
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Create Account </h1>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={6}>
                        <TextField fullWidth label='First Name' placeholder="Enter your First Name" {...register("fname")} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label='Last Name' placeholder="Enter your Last Name" {...register("lname")} />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth label='Email-Id' placeholder="Enter your Email-Id" {...register("email")} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label='Phone number' placeholder="Enter your Contact Number" {...register("contact")} />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl component="fieldset"  >
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="others" control={<Radio />} label="Others" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth label='Password' placeholder="Enter your Password" {...register("password")} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label='Confirm password' placeholder="Re-enter your password" {...register("cnfpassword")} />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox name="checkedA" />}
                            label="I accept the terms and conditions."

                        />
                    </Grid>

                    <Grid item xs={2}>
                        <Button fullWidth type="submit" variant="contained">Submit</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button fullWidth variant="outlined">Reset</Button>
                    </Grid>

                </Grid>
            </form>
        </Container>
        </Paper>

    )
}
