import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="checkout-steps">
      <div className={props.step1 ? 'active' : 'deactive'}>Sign-In</div>
      <div className={props.step2 ? 'active' : 'deactive'}>Detail</div>
      <div className={props.step3 ? 'active' : 'deactive'}>Payment</div>
      <div className={props.step4 ? 'active' : 'deactive'}>Place Order</div>
    </div>
  );
}
