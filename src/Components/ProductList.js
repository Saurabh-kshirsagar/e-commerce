import { Button, Grid, Typography } from '@mui/material';
import '../App.css';

function ProductList({ product,addToCart }) {

    

    const addProducts=product.map((productItem, productIndex) => {
        return ( 
            
            <div style={{ width: '20%' }}>
                <div className='product-item'>
                <li key={productItem.id}>
                    <img src={productItem.image} width="100%" />
                    <Typography>{productItem.name}</Typography>
                    <Typography>{productItem.price}</Typography>
                    <Button  onClick={() => addToCart(productItem,productIndex)} variant='outlined'>Add To Cart</Button>
                    </li> 
                </div>
            </div>
        )
    })
    return (
       <>
       <Grid container >
       
        {addProducts}
       
       
       </Grid>
       </>
    )
}

export default ProductList