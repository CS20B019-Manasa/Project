import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../Components/Rating';
import { Store } from '../Store';
import './itempage.css';

// To render the item page
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };
  // Return the details of that particular product
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="img-large" src={product.image} alt={product.name}></img>
          </Col>
            <Col md={3}>
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating rating={product.rating} no_of_reviews={product.no_of_reviews}></Rating>
                </li>
                <li>Price: Rs. {product.price}</li>
                <li>
                  <h3>About this item:</h3>
                  <p>{product.description}</p>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ul>
                    <li>
                      <Row>
                        <Col>Price:</Col>
                        <Col>Rs. {product.price}</Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <text className="stocktext">In Stock</text>
                          ) : (
                            <text className="nostocktext">Not Available</text>
                          )}
                        </Col>
                      </Row>
                    </li>
                    {product.countInStock > 0 && (
                      <li>
                        <div className="d-grid">
                          <Button onClick={addToCartHandler} variant="primary">
                            Add to Cart
                          </Button>
                        </div>
                      </li>
                    )}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
    </div>
  );
}
export default ProductScreen;