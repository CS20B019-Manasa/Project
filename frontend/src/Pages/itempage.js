import axios from 'axios';
import { useEffect, useReducer, useCallback, useRef} from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
//import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../Components/Rating';
import './itempage.css';
import Loading from '../Components/Loading';
import Message from '../Components/Message';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  product: [],
  loading: true,
  error: '',
};
function Itempage() {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(
    reducer, initialState
  );

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get(`/api/products/slug/${slug}`);
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
    }
  }, [slug]);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchData();
      hasFetched.current = true;
    }
  }, [fetchData], [slug]);
  return (
    loading? (<Loading/>):
    error? (<Message variant="danger">{error}</Message>):
    (<div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt = {product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating
                rating={product.rating}
                no_of_reviews = {product.no_of_reviews}
              ></Rating>
            </li>
            <li>
              Price: Rs. {product.price}
            </li>
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
                    <Col>{product.countInStock>0?
                    <text class="stocktext">In Stock</text>
                    :
                    <text class="nostocktext">Not Available</text>
                    }</Col>
                  </Row>
                  <li>
                    {product.countInStock > 0 && (
                      <li>
                        <div className="d-grid">
                          <Button>
                            Add to Cart
                          </Button>
                        </div>
                      </li>
                    )}
                  </li>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>)
  );
}
export default Itempage;