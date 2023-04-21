import React, { useContext } from 'react';
import { Store } from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Message from '../Components/Message';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate} from 'react-router-dom';
import '../index.css';

function CartPage() {
  const navigate = useNavigate();
  const { state, removeFromCart, incrementCartItem, decrementCartItem, clearCart } = useContext(Store);

  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };

  const handleIncrementItem = (item) => {
    incrementCartItem(item);
  };

  const handleDecrementItem = (item) => {
    decrementCartItem(item);
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  const { cartItems } = state.cart;

  return (
    <div>
      <title>Shopping Cart</title>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </Message>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => handleDecrementItem(item)}
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() => handleIncrementItem(item)}
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>Rs. {item.price}</Col>
                    <Col md={2}>
                      <Button
                            onClick={() => handleRemoveItem(item)}
                            variant="light"
                        >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : Rs. 
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed
                    </Button>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className= "d-grid">
                    <Button
                      type="button"
                      variant="danger"
                      disabled={cartItems.length === 0}
                      onClick={() => clearCart()}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartPage;
