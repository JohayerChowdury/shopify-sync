// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container } from 'react-bootstrap';
import { history } from './helpers/history';

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
    <BrowserRouter history={history}>
      <div className="justify-content-center">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/" element={<Home />} />
          {/* <PrivateRoute path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/users/forgot_password" element={<ForgotPassword />} /> */}
          <Route path="/profile" element={<Profile />} />

          <Route path="/add-store" element={<AddStore />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/stores/:storeId" element={<StoreDetails />} />
          <Route path="/stores/:storeId/products" element={<Products />} />
          <Route
            path="/stores/:storeId/products/:productId"
            element={<ProductDetails />}
          />
          {/* <PrivateRoute
            path="/users/forgot_password"
            element={<ForgotPassword />}
          />
          <PrivateRoute path="/profile" element={<Profile />} />

          <PrivateRoute exact path="/add-store" element={<AddStore />} />
          <PrivateRoute path="/stores" element={<Stores />} />
          <PrivateRoute path="/stores/:storeId" element={<StoreDetails />} />
          <PrivateRoute
            path="/stores/:storeId/products"
            element={<Products />}
          />
          <PrivateRoute
            path="/stores/:storeId/products/:productId"
            element={<ProductDetails />}
          /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
