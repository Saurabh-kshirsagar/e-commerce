import React, { useState, useEffect } from "react";
import { GetProductD, DeleteProduct } from "../services/getProduct.service";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

const GetProduct = () => {
  const navigate = useNavigate();
  const gridStyle = {
    marginTop: 50,
    textAlign: "center",
    alignItems: "center",
  };
  const imgStyle = { width: 50, height: 50 };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#ccffcc",
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // width:'100%'
  }));
  const [open, setOpen] = React.useState(false);
  const [deleteItemId, setDeleteItemId] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const remove = async () => {
    try {
      const response = await DeleteProduct(deleteItemId);
      fetchData();
      if (response) {

        handleClose();

      }
    } catch (error) {
      alert("error");
    }
  };

  const fetchData = async () => {
    try {
      const response = await GetProductD();
      if (response.data) {
        setData(response.data.data);
        console.log(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <h1>Products</h1>

      {data.length && (
        <>
          {data.map((item) => (
            <Container style={gridStyle}>
              <div key={item.id}>
                <Item>
                  <Box sx={{ flexGrow: 10 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        {/* <img src="C:/Users/100rabh/OneDrive/Desktop/ReactJS/my-app/src/picture/image-1.webp"></img> */}
                        <img style={imgStyle} src={item.image}></img>
                      </Grid>
                      <Grid item xs={2}>
                        <h2>{item.name}</h2>
                      </Grid>
                      <Grid item xs={2}>
                        <h3>${item.price}</h3>
                      </Grid>
                      <Grid item xs={2}>
                        <h4>Quantity : {item.quantity}</h4>
                        <h5>{item.id}</h5>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          variant="contained"
                          onClick={() => {
                            debugger;
                            setDeleteItemId(item.id);
                            handleClickOpen()
                          }}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </Grid>
                      <Grid item xs={1}>
                        <Button onClick={() => navigate(`/product/edit/${item.id}`)}>Edit</Button>
                      </Grid>
                      <Grid item xs={1}>
                        <VisibilityIcon onClick={() => navigate(`/product/view/${item.id}`)} />
                      </Grid>
                    </Grid>
                  </Box>
                </Item>
              </div>

            </Container>

          ))}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirmation !"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the product?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} startIcon={<ThumbDownOffAltIcon />}>No</Button>
              <Button onClick={remove} startIcon={<ThumbUpOffAltIcon />} autoFocus>Yes</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default GetProduct;
