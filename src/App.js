import React, {useEffect} from 'react';
import {Navbar, Products, Cart, Checkout } from "./components";
import {commerce} from './components/lib/commerce'
import {Switch, Route} from 'react-router'


const App = () => {
    const [products, setProducts] = React.useState([])
    const [cart, setCart] = React.useState({})
    const [order, setOrder] = React.useState({})
    const [errorMessage, serErrorMessage] = React.useState('')

    const fetchProducts = async () => {
        const {data} = await commerce.products.list()
        setProducts(data)
    }
    console.log(order)

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const {cart} = await commerce.cart.add(productId, quantity)
        setCart(cart)
    }
    const handleUpdateCartQty = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity})
        setCart(cart)
    }

    const handleRemoveFromCart = async (productsId) => {
        const {cart} = await commerce.cart.remove(productsId);
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();
        setCart(cart)
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()
            setCart(newCart)
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try{
            const incomingOrder = await  commerce.checkout.capture(checkoutTokenId, newOrder)
            setOrder(incomingOrder)
            refreshCart()
        } catch (error) {
            console.log(error)
            serErrorMessage(error.data.error.message)
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart()
    }, [])

    console.log(cart)

    return (
        <div>
            <Navbar cartCount={cart.total_items && cart.total_items}/>
            <Switch>
                <Route path='/' exact>
                    <Products products={products} onAddToCart={handleAddToCart}/>
                </Route>
                <Route path='/cart' exact>
                    <Cart cart={cart}
                          handleRemoveFromCart={handleRemoveFromCart}
                          handleEmptyCart={handleEmptyCart}
                          handleUpdateCartQty={handleUpdateCartQty}
                    />
                </Route>
                <Route path={'/checkout'} exact>
                    <Checkout cart={cart}
                    order={order}
                    error={errorMessage}
                              onCaptureCheckout ={handleCaptureCheckout}
                    />
                </Route>
            </Switch>

        </div>
    );
};

export default App;
