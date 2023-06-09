import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Checkout from '../Components/Checkout';
import { Store } from '../Store';

//To select payment options either pay on delivery or online payment
export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayonDelivery'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    if (paymentMethodName === 'PayonDelivery') {
      navigate('/success');
    } else {
      navigate('/order');
    }
  };
  // return the two options for payment method
  return (
    <div>
      <Checkout step1 step2 step3></Checkout>
      <div className="container small-container">
        <title>Payment Method</title>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayonDelivery"
              label="Pay on Delivery"
              value="PayonDelivery"
              checked={paymentMethodName === 'PayonDelivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Debit/CreditCards"
              label="Debit/Credit Cards"
              value="Debit/CreditCards"
              checked={paymentMethodName === 'Debit/CreditCards'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}