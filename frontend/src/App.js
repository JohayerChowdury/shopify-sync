// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container } from 'react-bootstrap';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import NavigationBar from './components/UI/NavigationBar';
import ErrorMsg from './components/UI/ErrorMsg';
import { PrivateRoute } from './components/UI/PrivateRoute';

import Welcome from './components/pages/landing/Welcome';
import Login from './components/pages/landing/Login';
import Register from './components/pages/landing/Register';

import Home from './components/pages/user/Home';
import Profile from './components/pages/user/Profile';
import ForgotPassword from './components/pages/user/ForgotPassword';

import Stores from './components/pages/stores/Stores';
import StoreDetails from './components/pages/stores/StoreDetails';
import AddStore from './components/pages/stores/AddStore';
import Products from './components/pages/stores/products/Products';
import ProductDetails from './components/pages/stores/products/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-store"
          element={
            <PrivateRoute>
              <AddStore />
            </PrivateRoute>
          }
        />
        <Route
          path="/stores"
          element={
            <PrivateRoute>
              <Stores />
            </PrivateRoute>
          }
        />
        <Route
          path="/stores/:storeId"
          element={
            <PrivateRoute>
              <StoreDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/stores/:storeId/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/stores/:storeId/products/:productId"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
