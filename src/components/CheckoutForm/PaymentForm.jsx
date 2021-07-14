import React from 'react';
import {Typography, Button, Divider} from "@material-ui/core";
import {Elements, CardElement, ElementsConsumer} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import Review from "./Review";


const PaymentForm = ({shippingData, checkoutToken, backStep, onCaptureCheckout, nextStep, timeout}) => {
    const stripePromise = loadStripe('pk_test_51IqiYQKpOgA1aZuXF81C9OCM6GIv6TeO6Z3q07QC49M23m33sw04nJrvDErBDa0UWzxSsc93RQyD4tSyrhnKeSkO004PaAqnKi')
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault()
        if (!stripe || !elements) return
        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement})
        if (error) {
            console.log(error)
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email
                },
                shipping: {
                    name: 'International',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fulfillment: {shipping_method: shippingData.shippingOption},
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };
            onCaptureCheckout(checkoutToken.id, orderData)
            timeout()
            nextStep()
        }
    }

    return (
        <>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant={'h6'} gutterBottom style={{margin: '220px 0'}}>
                Payment method
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) =>
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement/>
                            <br/> <br/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button onClick={backStep} variant={'outlined'}>
                                    Back
                                </Button>
                                <Button type={'submit'} variant={'contained'} disabled={!stripe} color={'primary'}>
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    }
                </ElementsConsumer>
            </Elements>
        </>
    );
};

export default PaymentForm;