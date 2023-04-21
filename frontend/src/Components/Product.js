import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import '../index.css';
import { useContext} from 'react';
//import { useNavigate} from 'react-router-dom';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;
  const { addToCart } = useContext(Store);
  //const navigate = useNavigate();
  const addToCartHandler = () => {
    addToCart({ ...product, quantity: 1 });
  };
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} no_of_reviews={product.no_of_reviews} />
        <Card.Text>Rs. {product.price}</Card.Text>
        <Button onClick={addToCartHandler} variant="primary">
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
export default Product;