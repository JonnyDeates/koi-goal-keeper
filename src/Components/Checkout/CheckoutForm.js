import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe
} from 'react-stripe-elements'
import SettingsApiService from "../../services/database/settings-api-service";
import SettingsService from "../../services/local/settings-service";
import {getCurrentThemeColors} from "../../Utils/Utils";

const CheckoutForm = ({stripe, toggleShown}) => {
    const list = ['More Theme Options','Uncapped Max on Goals', 'Uncapped Max on Past Goals', 'More List Options', 'Other Day Colors']
    const [receiptUrl, setReceiptUrl] = useState('')
    const handleSubmit = async event => {
        event.preventDefault()

        const {token} = await stripe.createToken()
        if (!!token) {
            const order = await SettingsApiService.togglePaidAccount(SettingsService.getSettings().id, {
                source: token.id
            }).then((data) => {
                SettingsService.saveSettings({paid_account: true})
                window.location.reload();
            });
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
        <div className="checkout-form" style={{backgroundColor: getCurrentThemeColors().sColor}}>
            <h2 >Purchase Koi Premium</h2>
            <h3>Unlock the Following</h3>
            <ol>
                {list.map((txt,i)=> <li key={i}>{txt}</li>)}
            </ol>
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
                <button onClick={()=> toggleShown()} className='cancel-button'>
                    Cancel Your Order
                </button>
                <button type="submit" className="order-button">
                    Get Your Premium
                </button>
            </form>
        </div>
    )
};
export default injectStripe(CheckoutForm)
