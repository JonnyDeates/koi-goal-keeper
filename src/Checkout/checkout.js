import {Elements, StripeProvider} from "react-stripe-elements";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
    const pktest = 'pk_test_51HKB0JJUCsOYSAkZdUq0wWjOTjTIzILbQjAy8Cgz0loq4KStnLZtzvQpFlo7J5EeDaxpf6ADLabZv0club1dafwG00y2Jh1rUZ';
    return (
        <StripeProvider apiKey={pktest}>
            <Elements>
            <CheckoutForm/>
            </Elements>
        </StripeProvider>
    )
}

export default Checkout