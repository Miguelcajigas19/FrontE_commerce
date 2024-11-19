import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Shopping_car from './components/Shopping_car';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/car" element={<Shopping_car />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;