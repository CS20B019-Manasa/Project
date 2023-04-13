import { useEffect, useReducer, useCallback, useRef } from 'react';
import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Components/Product';
import Loading from '../Components/Loading';
import Message from '../Components/Message';


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const logger = (reducer) => {
  return (prevState, action) => {
    const nextState = reducer(prevState, action);
    console.group(action.type);
    console.log("Previous state:", prevState);
    console.log("Action:", action);
    console.log("Next state:", nextState);
    console.groupEnd();
    return nextState;
  };
};

const initialState = {
  products: [],
  loading: true,
  error: '',
};

function Home() {
  const [{ loading, error, products }, dispatch] = useReducer(
    logger(reducer), // wrap reducer with logger
    initialState
  );

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get('/api/products');
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: err.message });
    }
  }, [dispatch]);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchData();
      hasFetched.current = true;
    }
  }, [fetchData]);

  return (
    <div>
      <h2>Featured Products</h2>
      <div className="products">
        {
          loading? (<Loading/>)
          :
          error? (<Message variant="danger">{error}</Message>)
          :
        (
          <Row>
          {products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product = {product}></Product>
          </Col>
        ))}
        </Row>
        )
      }
      </div>
    </div>
  );
}

export default Home;
