import React from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { useForm } from "react-hook-form";
import { SnackbarProvider, useSnackbar,enqueueSnackbar } from "notistack";
import {category} from '../services/category.service'

const Category = () => {
    const { register, handleSubmit,} = useForm();
    const onSubmit = async (data) => {
        const finalData = {
            name: data.name,
            code: data.code,
            parent_id : null
        }
        try {
            const response = await category(finalData);
            if (response) {
                enqueueSnackbar("You are registered successfully.", {
                    variant: 'success',
                    anchorOrigin:
                    {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                    

                })
                console.log(response)

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
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h1>Category</h1>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic" fullWidth label="category name" variant="outlined" {...register("name")} />

                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic" fullWidth label="code" variant="outlined" {...register("code")} />

                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic" fullWidth label="code" variant="outlined" {...register("parent_id")} />

                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button variant="contained" type='submit'>Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            {/* <Grid item xs={4}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Grid>
        <Grid item xs={4}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Grid>
        <Grid item xs={8}>
        <Button variant="contained">Submit</Button>
        </Grid> */}

        </div>
    )
}

export default Category
