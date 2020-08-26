import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe
} from 'react-stripe-elements'
import SettingsApiService from "../services/database/settings-api-service";
import SettingsService from "../services/local/settings-service";

const CheckoutForm = ({stripe}) => {
    const [receiptUrl, setReceiptUrl] = useState('')
    const handleSubmit = async event => {
        event.preventDefault()

        const {token} = await stripe.createToken()
        if (!!token) {
            const order = await SettingsApiService.togglePaidAccount(SettingsService.getSettings().id, {
                source: token.id
            }).then(() => SettingsService.saveSettings({paid_account: true}))
            if (order && order.data)
                setReceiptUrl(order.data.charge.receipt_url)
        }

        if (receiptUrl) {
            return (
                <div className="success">
                    <h2>Payment Successful!</h2>
                    <a href={receiptUrl}>View Receipt</a>
                    <Link to="/koi/">Home</Link>
                </div>
            )
        }
    }
    return (
        <div className="checkout-form">
            <p>Amount: $5.00</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Card details
                    <CardNumberElement/>
                </label>
                <label>
                    Expiration date
                    <CardExpiryElement/>
                </label>
                <label>
                    CVC
                    <CardCVCElement/>
                </label>
                <button type="submit" className="order-button">
                    Pay
                </button>
            </form>
        </div>
    )
};
export default injectStripe(CheckoutForm)
