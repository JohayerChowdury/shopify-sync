// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Error from './components/Error';
import ErrorMsg from './components/ErrorMsg';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Login from './components/Login';
import NavigationBar from '../../frontend/src/components/NavigationBar';
import Profile from './components/Profile';
import Register from '../../frontend/src/components/pages/Register';

import Stores from './components/pages/Stores';
import StoreDetails from './components/pages/StoreDetails';
import AddStore from './components/pages/AddStore';
import Products from './components/pages/Products';
import ProductDetails from './components/pages/ProductDetails';


function App() {
  // const [userData, setUserData] = useState({
  //   // this initially sets the user and the token to undefined (not logged in)
  //   token: undefined,
  //   user: undefined,
  // });

  // useEffect(() => {
  //   const isLoggedIn = async () => {
  //     // this determines if the user is logged in or not
  //     let token = localStorage.getItem('auth-token'); // gets the authorization token from the local storage
  //     if (token == null) {
  //       // if it doesn't exist, it sets it to null
  //       localStorage.setItem('auth-token', '');
  //       token = '';
  //     }

  //     const tokenResponse = await axios.post(
  //       'htpp://localhost:5000/shopify_api/users/tokenIsValid',
  //       null,
  //       { headers: { 'auth-token': token } }
  //     ); // this method is put in the users.js under the backend and validates the token

  //     console.log(tokenResponse.data);
  //     if (tokenResponse.data) {
  //       // if it is valid, then we can see things like the profile which is a protected function
  //       const userResponse = await axios.get('/shopify_api/users/profile', {
  //         headers: { 'auth-token': token },
  //       });
  //       setUserData({
  //         // once it is valid, this sets the token to the jwt
  //         token: token,
  //         user: userResponse.data,
  //       });
  //     }
  //   };
  //   isLoggedIn();
  // }, []);

  return (
    <BrowserRouter>
        <div className="justify-content-center">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users/forgot_password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />

            <Route exact path="/add-store" element={<AddStore />} />
            <Route path="/stores/:storeId" element={<StoreDetails />} />
            <Route path="/stores/:storeId/products" element={<Products />} />
            <Route
              path="/stores/:storeId/products/:productId"
              element={<ProductDetails />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
