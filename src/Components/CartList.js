import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import "../App.css";
import { Grid, Paper, Typography} from "@mui/material";
import { SnackbarProvider, useSnackbar } from 'notistack';


import { styled } from '@mui/material/styles';

function CartList({ cart , setCart}) {
    const [CART, setCART] = useState([])
    const [CART3, setCART3] = useState([])
    const{enqueueSnackbar,closeSnackbar}=useSnackbar();


    useEffect(() => {
        setCART(cart)
    }, [cart])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      })); 
      

    const removeFromCart = (index) => {
        const newCartItems = [...CART]; // Make a copy of the cart items
        newCartItems.splice(index, 1); // Remove the item at the specified index
        setCART(newCartItems); // Update the cart items state
        setCart(newCartItems);
        enqueueSnackbar("Product Removed" ,{variant:'error'})

    };
    const cartProduct=CART?.map((cartItem, cartindex) => {
        return (
            <>
            {/* <Container>
                <Grid container spacing={5}>
                    
                    <Paper>
                        <Box p={20}>
                        <Grid item lg={3}>
                        <img src={cartItem.image} width={100} />
                        </Grid>
                        <Grid item lg={3}><Typography>{cartItem.name}</Typography></Grid>
                        <Grid item lg={3}> <Typography>{cartItem.price * cartItem.quantity}</Typography></Grid>
                        </Box>
                    </Paper>
                  
                </Grid>
            </Container> */}
            
              <div>
                  <img src={cartItem.image} width={100} />
                  <span> {cartItem.name} </span>
                  <button
                      onClick={() => {
                          const CART2 = CART.map((item, index) => {
                              return cartindex === index ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 } : item
                          })
                          setCART(CART2)
                      }}
                  >-</button>
                  <span> {cartItem.quantity} </span>
                  <button
                      onClick={() => {
                          const CART2 = CART.map((item, index) => {
                              return cartindex === index ? { ...item, quantity: item.quantity + 1 } : item
                          })
                          setCART(CART2)
                      }}
                  >+</button>
                  <span> Rs. {cartItem.price * cartItem.quantity} </span>
                  <IconButton>
                      <DeleteIcon onClick={() => removeFromCart()} sx={{ color: 'red' }} />
                  </IconButton>
              </div>
              </>
          )
      })

    return (
        <div>
           <Grid spacing={4}>
           <Item >{cartProduct}</Item>
           </Grid>
           {/* <Grid item container xs={12} spacing={1}>
            <Grid sx={{margin:"5, auto"}} item xs={12}>
            {cartProduct}
            </Grid>
           
           </Grid> */}

            <p> Total  <span></span>
                {
                    CART.map(item => item.price * item.quantity).reduce((total, value) => total + value, 0)
                }
            </p>
        </div >
    );
}

export default CartList;
