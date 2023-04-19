import React from 'react'
import '../App.css'
// import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Cart from './Components/Cart';
// import Products from './Components/Products';
import Header from '../Components/Header';
import ProductList from '../Components/ProductList';
import CartList from '../Components/CartList';
import { useState } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';





const Main = () => {



  const [product, setProduct] = useState([
    {
      id: 1,
      name: 'Product 1',
      image: require('C:/Users/100rabh/OneDrive/Desktop/ReactJS/my-app/src/picture/image-1.webp'),
      price: 100,
      quantity: 1
    },
    {
      id: 2,
      name: 'Product 2',
      image: require('C:/Users/100rabh/OneDrive/Desktop/ReactJS/my-app/src/picture/image-2.webp'),
      price: 200,
      quantity: 1
    },
    {
      id: 3,
      name: 'Product 3',
      image: require('C:/Users/100rabh/OneDrive/Desktop/ReactJS/my-app/src/picture/image-3.webp'),
      price: 300,
      quantity: 1
    },
    {
      id: 4,
      name: 'Product 4',
      image: require('C:/Users/100rabh/OneDrive/Desktop/ReactJS/my-app/src/picture/image-4.webp'),
      price: 400,
      quantity: 1
    },
    {
      id: 5,
      name: 'Product 5',
      image: require('C:/Users/100rabh/OneDrive/Desktop/ReactJS/my-app/src/picture/image-1.webp'),
      price: 500,
      quantity: 1
    },
    {
      id: 6,
      name: 'Product 6',
      image: require('C:/Users/100rabh/OneDrive/Desktop/ReactJS/my-app/src/picture/image-2.webp'),
      price: 600,
      quantity: 1
    },
  ])

  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const{enqueueSnackbar,closeSnackbar}=useSnackbar();

  const addToCart = (data) => {

    setCart([...cart, { ...data, quantity: 1 }])

    const itemIndex = cart.findIndex((cartItem) => cartItem.id === data.id);
    if (itemIndex !== -1) {
      const updatedCartItems = [...cart];
      updatedCartItems[itemIndex].quantity++;
      setCart(updatedCartItems);
      enqueueSnackbar("You have already added this product" ,{variant:'warning'})


    } else {
      setCart([...cart, { ...data }]);
      enqueueSnackbar(" Product added Successfully" ,{variant:'success'
    })
    }

  }
 

  const handleShow = (value) => {
    setShowCart(value)
  }

  return (
    <div>

      <div>
        <Header count={cart.length}
          handleShow={handleShow} ></Header>

        {
          showCart ?
            <CartList cart={cart}  setCart={ setCart}></CartList> :
            <ProductList product={product} addToCart={addToCart} ></ProductList>
        }


      </div>

      {/* <Router>
        <Navbar />
        <Routes>
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </Router> */}

    </div>
  )
}

export default Main
