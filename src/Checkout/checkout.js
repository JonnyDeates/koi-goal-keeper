import {Elements, StripeProvider} from "react-stripe-elements";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import './Checkout.css'
const Checkout = ({isShown, toggleShown}) => {
    const pktest = 'pk_test_51HKB0JJUCsOYSAkZdUq0wWjOTjTIzILbQjAy8Cgz0loq4KStnLZtzvQpFlo7J5EeDaxpf6ADLabZv0club1dafwG00y2Jh1rUZ';
    try {
        return (
            <>{isShown ? <>
                <div className={'checkout-wrapper'} onClick={toggleShown}/>
                <div className={'checkout'}>
                    <StripeProvider apiKey={pktest}>
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