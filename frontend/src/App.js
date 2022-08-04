// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container } from 'react-bootstrap';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import ErrorMsg from './components/ErrorMsg';

import { PrivateRoute } from './components/PrivateRoute';
import Welcome from './components/pages/Welcome';
// import ForgotPassword from './components/pages/ForgotPassword';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NavigationBar from './components/NavigationBar';
import Profile from './components/pages/Profile';
import Register from './components/pages/Register';
import ForgotPassword from './components/pages/ForgotPassword';
import ChangePassword from './components/pages/ChangePassword';

import Stores from './components/pages/Stores';
import StoreDetails from './components/pages/StoreDetails';
import AddStore from './components/pages/AddStore';
import Products from './components/pages/Products';
import ProductDetails from './components/pages/ProductDetails';

function App() {
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
          path = "/change-password"
          element = {
            <PrivateRoute>
              <ChangePassword />
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
