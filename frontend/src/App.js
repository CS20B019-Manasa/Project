
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/home';
import Itempage from './Pages/itempage';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from './Store';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import Cartpage from './Pages/Cartpage.js';
import Signinpage from './Pages/Signinpage.js'
function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className='d-flex flex-column'>
        <header>
          <Navbar variant="dark" style={{ backgroundColor: "#1a687e" }}>
            <Container>
              <LinkContainer to = "/">
                <Navbar.Brand>SuperMart</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/cart" element={<Cartpage />} />
              <Route path="/product/:slug" element={<Itempage />} />
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signinpage />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
