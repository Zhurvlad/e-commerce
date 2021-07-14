import React from 'react';
import {Container, Typography, Button, Grid} from "@material-ui/core";

import cartStyles from './Styles'
import {CartItem} from "../index";
import {Link} from "react-router-dom";

const Cart = ({cart, handleRemoveFromCart, handleEmptyCart, handleUpdateCartQty}) => {
    const classes = cartStyles()

    const EmptyCart = () => (
        <Typography variant={'subtitle1'}>You have no items in tour shopping cart,
        <Link to={'/'} className={classes.link}>
            start adding some!
        </Link>
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items &&
                    cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={handleEmptyCart}>
                    Empty cart
                </Button>
                 <Button component={Link} to={'/checkout'} className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>
                    CheckOut
                </Button>

            </div>
        </>
    );

    if(!cart.line_items) return 'Loading...'

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant={'h3'} gutterBottom>
                Your Shopping Cart
            </Typography>
            {!cart.line_items.length ? <EmptyCart/> : <FilledCart/> }
        </Container>
    );
};

export default Cart;

