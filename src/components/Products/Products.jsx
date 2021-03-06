import React from 'react';
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";

import productsStyle from './styles'


const Products = ({products, onAddToCart}) => {
    const classes = productsStyle();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify='center' spacing={4}>
                {products &&
                products.map((product) =>
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={1} >
                        <Product product={product} onAddToCart={onAddToCart}/>
                    </Grid>)}
            </Grid>
        </main>
    );
};

export default Products;
