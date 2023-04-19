import React from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from './Components/Cart';
import Products from './Components/Products';
import Header from './Components/Header';
import ProductList from './Components/ProductList';
import CartList from './Components/CartList';
import { useState } from 'react';
import Main from './Components/Main'
import HookLogin from './Components/HookLogin'
import HookForm from './Components/HookForm'
import styled from '@emotion/styled'
import { SnackbarProvider, MaterialDesignContent } from 'notistack';
import AddProducts from './Components/AddProducts';
import GetProduct from './Components/GetProduct';
import Category from './Components/Category';





const App = () => {
  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: '#2D7738',
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: '#970C0C',
    },
  }));

  return (
    <div>

      <SnackbarProvider

        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}

        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}

        iconVariant={{
          success: '✅',
          info: 'ℹ️',
        }}
      >


        <Router>
          <Routes>
            <Route path='/' element={<HookLogin />} />
            <Route path='/register' element={<HookForm />} />
            <Route path='/main' element={<Main />} />
            <Route path='/add' element={<AddProducts />} />
            <Route path='/product/edit/:id' element={<AddProducts />} />
            <Route path='/product/view/:id' element={<AddProducts />} />
            <Route path='/category' element={<Category />} />
            <Route path='/get' element={<GetProduct />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </div>
  )
}

export default App
