import React from "react";
import { Box } from "@mui/system";
import { IconButton, Stack, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useForm } from "react-hook-form";
import { SnackbarProvider, useSnackbar } from "notistack";
import { productsList, fileUpload } from "../service/user.service";
import { useParams } from "react-router-dom";
import { get_Products, updateProducts } from "../service/get.service";
import { useEffect } from "react";
import { useRef } from "react";
import { SetValue } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import { SnackbarProvider, useSnackbar } from "notistack";

export default function Add_Products() {
  const { register, handleSubmit, reset } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
 
  
  useEffect(() => {
    if (id) {
      get_Item(id);
    }
  }, []);

  const get_Item = async (id) => {
    // debugger
    try {
      const response = await get_Products(id);
      setShowResults(true);

      if (response.status == 200) {
        console.log("success");
        reset(response.data.data[0]);
        setFile(response.data.data[0].image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    console.log(e.target.files);
    // debugger;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await fileUpload(formData);
    if (response.status) {
      setFile(response.data.filepaths[0]);
     
    }
  };

  const onSubmit = async (data) => {
    // debugger;
    if (id) {
      try {
        
        const finalData = {name: data.name,
            price: Number(data.price),
            image: file,
            quantity: Number(data.quantity),
          };
  
          const response2 = await updateProducts(finalData, id);
          if (response2.status == true) {
          }
        } catch (error) {
          enqueueSnackbar("Please try again !!", { variant: "error" });
        }
      } else {
        try {
          
  
          const finalData = {
            name: data.name,
            price: Number(data.price),
            image: file,
            quantity: Number(data.quantity),
          };
          const response2 = await productsList(finalData);
          if (response2.status == true) {
            enqueueSnackbar("success", { variant: "success" });
          }
        } catch (error) {
          enqueueSnackbar("Please try again !!", { variant: "error" });
        }
      }
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={600}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={7}
          padding={5}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          backgroundColor="white"
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
              height: "70%",
            },
          }}
        >
          <Typography variant="h5" padding={3} textAlign="center" color="black">
            Add Your Products
          </Typography>
  
          <TextField
            variant="standard"
            placeholder="Enter Name"
            margin="normal"
            type="text"
            required
            {...register("name")}
          />
          <TextField
            variant="standard"
            placeholder="Enter Price"
            type="number"
            margin="normal"
            required
            {...register("price")}
          />
  
          <TextField
            variant="standard"
            placeholder="Enter Quantity"
            margin="normal"
            type="number"
            required
            {...register("quantity")}
            sx={{ marginBottom: 4 }}
          />
  
          {/* <Button variant="contained" component="label">
    Upload
    <input hidden accept="image/*" multiple type="file" />
  </Button> */}
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" onChange={handleChange} />
            <PhotoCamera />
  
            {/* <img src={file} height="300" width="250" /> */}
          </IconButton>
  
          {/* <h2>Add Image:</h2> */}
          {/* <input type="file" onChange={handleChange} {...register("image")}/>
              <img src={file} /> */}
          <img src={file} height="300" width="250" />
         
            <Button
              type="submit"
              variant="contained"
              value={showResults}
              color="warning"
              sx={{ marginTop: 4, borderRadius: 3 }}
            >
              {isEdit ? "Edit Product" : "Add Product"}
            </Button>
          
        </Box>
      </form>
    );
  }