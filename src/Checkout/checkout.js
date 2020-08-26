import {Elements, StripeProvider} from "react-stripe-elements";
import STRIPE_PUBLIC from '../config'
import React from "react";
import CheckoutForm from "./CheckoutForm";
import './Checkout.css'
const Checkout = ({isShown, toggleShown}) => {
    const publicKey = STRIPE_PUBLIC;
    try {
        return (
            <>{isShown ? <>
                <div className={'checkout-wrapper'} onClick={toggleShown}/>
                <div className={'checkout'}>
                    <StripeProvider apiKey={publicKey}>
                        <Elements>
                            <CheckoutForm toggleShown={toggleShown}/>
                        </Elements>
                    </StripeProvider>
                </div>

            </> : ''}</>
        )
    } catch (e) {
        console.log(e)
        return <></>
    }
}

export default Checkout