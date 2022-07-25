// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//importing react-router-dom components
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//importing App components
import NavigationBar from './components/NavigationBar';
import Error from './components/pages/Error';
import Home from './components/pages/Home';
import Stores from './components/pages/Stores';
import StoreDetails from './components/pages/StoreDetails';
import AddStore from './components/pages/AddStore';
import Products from './components/pages/Products';
import ProductDetails from './components/pages/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="justify-content-center">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stores" element={<Stores />} />
          <Route exact path="/add-store" element={<AddStore />} />
          <Route path="/stores/:storeId" element={<StoreDetails />} />
          <Route path="/stores/:storeId/products" element={<Products />} />
          <Route
            path="/stores/:storeId/products/:productId"
            element={<ProductDetails />}
          />
          {/* <Route path="/stores/edit/:storeId" element={<StoreForm />} /> */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
