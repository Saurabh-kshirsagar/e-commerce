import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';


import "../App.css";
import { useFetcher } from "react-router-dom";

function Header(props) {
  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ bgcolor:'black',top:0 }} position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div onClick={() => props.handleShow(false)}>
                Shopping Cart App
              </div>
            </Typography>
            <div onClick={() => props.handleShow(true)}>
              {" "}
              <Badge  badgeContent={props.count} color="primary">
                <Avatar sx={{bgcolor:'red',}}>
                <ShoppingCartIcon  sx={{padding:5}}  />
                </Avatar>
                
              </Badge>
              
            </div>
           
           <div >
            <Button  href="/"  variant="outlined">
            {/* <Link href="/login"  > */}
                                Logout
                            {/* </Link> */}
                            </Button>
                            </div>
           
            
           
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
