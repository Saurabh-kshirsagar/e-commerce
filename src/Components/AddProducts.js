import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { addProducts } from "../services/addProducts.service";
import { fileUpload } from "../services/fileUpload.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetProductD, get_Products, updateProducts } from '../services/getProduct.service'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";



const AddProducts = () => {
  const gridStyle = { margin: "50px auto" };
  const gridItem = { backgroundColor: "#1bbd7e", margin: "30px auto" };
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const currentUrl = window.location.href;
  const isView = currentUrl.includes("view");
  const isEdit = currentUrl.includes("edit");
  const [showResults, setShowResults, resetResult] = React.useState(false);
  const [isDisabled, setIsDisabled] = useState(false);


  useEffect(() => {
    if (id) {
      get_Item(id);
    }
  }, []);

  const get_Item = async (id) => {
    try {
      const response = await get_Products(id);
      setShowResults(true);
      {
        isView ? setIsDisabled(true) : setIsDisabled(false);
      }
      if (response.status == 200) {
        console.log("success");
        reset(response.data.data[0]);
        setFile(response.data.data[0].image);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const [file, setFile] = useState();
  //image upload
  const handleChange = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await fileUpload(formData);
    //   console.log(res)
    if (res.status) {
      // console.log('object')
      setFile(res.data.filepaths[0]);
    }
  };
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  // const onSubmit = async (data) => {
  //   if (id) {
  //     try {

  //       const finalData = {
  //         name: data.name,
  //         price: data.price,
  //         image: file,
  //         quantity: data.quantity,
  //       };

  //       const response2 = await updateProducts(finalData, id);
  //       if (response2.status == true) {

  //       }
  //     } catch (error) {
  //       enqueueSnackbar("Please try again !!", { variant: "error" });
  //     }
  //   }
  //   else {
  //     try {
  //       const finalData = {
  //         name: data.name,
  //         price: data.price,
  //         image: file,
  //         quantity: data.quantity,
  //       };
  //       const response2 = await addProducts(finalData);
  //       if (response2.status == true) {
  //         enqueueSnackbar("success", { variant: "success" });
  //       }
  //     } catch (error) {
  //       enqueueSnackbar("Please try again !!", { variant: "error" });
  //     }
  //   }
  //   // const finalData = {
  //   //   name: data.name,
  //   //   price: data.p_price,
  //   //   image: file,
  //   //   quantity: data.p_quantity,
  //   // };

  //   // try {
  //   //   const addProduct = await addProducts(finalData);
  //   //   if (addProduct.status == true) {
  //   //     alert("success");
  //   //   }
  //   // } catch (err) { }
  // };

  const onSubmit = async (data) => {
    console.log(data);
    const finalData = {
      name: data.name,
      price: data.price,
      image: file,
      quantity: data.quantity,
    };
    if (id) {
      try {
        const updtResponse = await updateProducts(id, finalData);
        if (updtResponse) {
          enqueueSnackbar("Update Successfully!", { variant: "success" })
        }
      } catch (err) {
        console.log("error");
        enqueueSnackbar("Please check", { variant: "error" })
      }
    } else {
      try {
        const response = await addProducts(finalData);
        if (response) {
          // alert("success")
          enqueueSnackbar("Added Successfully!", { variant: "success" })
        }
      } catch (err) {
        console.log("error");
        enqueueSnackbar("Please check", { variant: "error" })
      }
    }
  };

  return (
    <div>
      <Container>
        <Grid style={gridStyle} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3">
              {" "}
              Add Products <ControlPointIcon />
            </Typography>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid style={gridStyle} container spacing={2}>
            <Grid item xs={4}>
              <TextField
                id="standard-basic"
                disabled={isDisabled}
                InputLabelProps={{ shrink: true }}
                fullWidth
                focused={id ? true : false}
                label="Product Name"
                variant="outlined"
                {...register("name", {
                  required: true,
                })}
              />
              {errors?.name?.type === "required" && (
                <p>This field is required</p>
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-basic"
                fullWidth
                disabled={isDisabled}
                InputLabelProps={{ shrink: true }}
                focused={id ? true : false}
                label="Product Price"
                variant="outlined"
                {...register("price", {
                  required: true,
                })}
              />
              {errors?.price?.type === "required" && (
                <p>This field is required</p>
              )}
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="standard-basic"
                fullWidth
                disabled={isDisabled}
                InputLabelProps={{ shrink: true }}
                focused={id ? true : false}
                label="Product Quantity"
                variant="outlined"
                {...register("quantity", {
                  required: true,
                })}
              />
              {errors?.quantity?.type === "required" && (
                <p>This field is required</p>
              )}
            </Grid>
          </Grid>

          <Grid style={gridStyle} container spacing={2}>
            <Grid item xs={3}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button
                  fullWidth
                  disabled={isDisabled}
                  variant="contained"
                  component="label"
                  onChange={handleChange}
                >
                  Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>

                <IconButton
                  fullWidth
                  disabled={isDisabled}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input hidden accept="image/*" type="file" />

                  <PhotoCamera />
                </IconButton>
              </Stack>
              <img src={file} disabled={isDisabled} height="200" width="150"></img>
            </Grid>
          </Grid>
          <Grid style={gridStyle} container spacing={2}>
            <Grid item xs={4}>
              <Button style={gridItem} variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default AddProducts;
