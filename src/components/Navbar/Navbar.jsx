import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";

import navbarStyle from './style'
import {Link, useLocation} from "react-router-dom";

const Navbar = ({cartCount}) => {
    const classes = navbarStyle()
    const location = useLocation()

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar >
                    <Typography component={Link} to={'/'} variant='h6' className={classes.title} color={'inherit'}>
                        <img  src='https://st.depositphotos.com/1987177/3089/v/600/depositphotos_30899437-stock-illustration-online-store-sale-laptop-with.jpg' alt='React Commerce Shop' height={'25px'} className={classes.image}/>
                        React Commerce Shop
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === '/'
                    && <div className={classes.button}>
                        <IconButton component={Link} to={'/cart'} arial-lable={'Show cart item'} color={'inherit'}>
                            <Badge badgeContent={cartCount} color={'secondary'}>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                    }
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;

