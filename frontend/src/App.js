
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/home';
import Itempage from './Pages/itempage';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useContext} from 'react';
import { Store } from './Store';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import Cartpage from './Pages/Cartpage.js';
import Signinpage from './Pages/Signinpage.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Addresspage from './Pages/Addresspage';
import Signuppage from './Pages/Signuppage';
import Paymentpage from './Pages/Paymentpage';
import Placeorder from './Pages/Placeorder';
import Orderpage from './Pages/Orderpage';
import SearchBox from './Components/SearchBox';
import SearchScreen from './Pages/SearchScreen';
import Success from './Pages/Success';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar variant="dark" style={{ backgroundColor: "#1a687e" }}>
            <Container>
              <LinkContainer to = "/">
                <Navbar.Brand>SuperMart</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
              <Nav className="me-auto  w-100  justify-content-end">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/cart" element={<Cartpage />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/product/:slug" element={<Itempage />} />
              <Route path="/" element={<Home />} />
              <Route path="/shipping" element={<Addresspage />} />
              <Route path="/signin" element={<Signinpage />} />
              <Route path="/signup" element={<Signuppage />} />
              <Route path="/payment" element={<Paymentpage />} />
              <Route path="/placeorder" element={<Placeorder />} />
              <Route path="/success" element={<Success />} />
              <Route path="/order" element={<Orderpage />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
