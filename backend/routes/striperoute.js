import React from 'react'
import StripeCheckout from "react-stripe-checkout"
function stripe() {
const [product] = React.useState({
    name: "Dynamic Website",
    price: "6.00",
})
function handleToken(token, addresses) {
 
}
    return (
        <div className='container'>
            <div className='product'>
       <h1>{product.name}</h1>
       <h3>${product.price}</h3>
            </div>
            <StripeCheckout 
            stripeKey='pk_test_51KDqg6CHVE7fxEodl310AvgPAjlV4gKFRpaSA2vSCkyTf2YEhrELGLznPmlcBkJVillyrocvD4du8dBuhhHqJP6g00OPykh47W'
            token={handleToken}
            />
        </div>
    )
}

export default stripe
