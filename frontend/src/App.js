
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/home';
import Itempage from './Pages/itempage';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
function App() {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column'>
        <header>
          <Navbar variant="dark" style={{ backgroundColor: "#1a687e" }}>
            <Container>
              <LinkContainer to = "/">
                <Navbar.Brand>VMart</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<Itempage />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
