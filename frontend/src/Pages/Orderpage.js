import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';

//To select from the linked bank accounts
export default function BankPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, Bank },
  } = state;

  const [BankName, setBank] = useState(
    Bank || 'SBI'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_BANK_NAME', payload: BankName });
    localStorage.setItem('Bank', BankName);
    navigate('/success');
  };

  //return the options user bank accounts
  return (
    <div>
      <div className="container small-container">
        <title>Payment</title>
        <h1 className="my-3">Select Bank</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="SBI"
              label="SBI"
              value="SBI"
              checked={BankName === 'SBI'}
              onChange={(e) => setBank(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="HDFC"
              label="HDFC"
              value="HDFC"
              checked={BankName === 'HDFC'}
              onChange={(e) => setBank(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Pay</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}