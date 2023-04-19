import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';

function Products() {
  const items = [
    {
      id: 1,
      name: 'Product 1',
      image: require('C:/Users/100rabh/OneDrive/Desktop/ReactJS/my-app/src/picture/image-1.webp'),
      price: 10,
      quantity: 1
    },
    {
      id: 2,
      name: 'Product 2',
      image: require('C:/Users/100rabh/OneDrive/Desktop/ReactJS/my-app/src/picture/image-2.webp'),
      price: 19,
      quantity: 1
    },
    {
      id: 3,
      name: 'Product 3',
      image: require('C:/Users/100rabh/OneDrive/Desktop/ReactJS/my-app/src/picture/image-3.webp'),
      price: 80,
      quantity: 1
    },
  ]

  const [cartItems, setCartItems] = useState([]);

  const arrproduct = items.map((item) => (
    <li key={item.id}>
      <div>

        <h3 >{item.name}</h3>
        <img src={item.image} height='250px' width="180px" />
        <p>{item.price}</p>
        <Button onClick={() => addToCart(item)} variant="contained">Add to Cart</Button>
      </div>
    </li>
  ))

  const addToCart = (item) => {
    const itemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item }]);
    }
  };

 

  console.log(cartItems)
  return (
    <>


      {/* <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
      <Grid container spacing={1} >
        {arrproduct}
      </Grid>



      {/* </Grid> */}
    </>
  );


}

export default Products;
