
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './Pages/home';
import Itempage from './Pages/itempage';
function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">VMart</Link>
        </header>
        <main>
        <Routes>
            <Route path="/product/:slug" element={<Itempage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
