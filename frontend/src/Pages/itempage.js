import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../Components/Rating';
import './itempage.css';
import Loading from '../Components/Loading';
import Message from '../Components/Message';
import { getError } from '../utils';
import { Store } from '../Store';

function Itempage() {
  //const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [product, setProduct] = useState({});
  const { addToCart } = useContext(Store);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`/api/products/slug/${slug}`);
        setProduct(result.data);
        setLoading(false);
      } catch (err) {
        setError(getError(err));
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const addToCartHandler = () => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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
      )}
    </>
  );
}

export default Itempage;
