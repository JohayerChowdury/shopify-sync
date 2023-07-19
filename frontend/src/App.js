import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// navigation components
import NavigationBar from './components/UI/NavigationBar';
import { PrivateRoute } from './components/UI/PrivateRoute';

//landing components
import Login from './components/pages/landing/Login';
import Register from './components/pages/landing/Register';
import VerifyUser from './components/pages/user/VerifyUser';

//user components
import Home from './components/pages/user/Home';
import Profile from './components/pages/user/Profile';
import ForgotPassword from './components/pages/user/ForgotPassword';
import ChangePassword from './components/pages/user/ChangePassword';

//store and product components
import Stores from './components/pages/stores/Stores';
import StoreDetails from './components/pages/stores/StoreDetails';
import AddStore from './components/pages/stores/AddStore';
import Products from './components/pages/stores/products/Products';
import ProductDetails from './components/pages/stores/products/ProductDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password/*' element={<ForgotPassword />} />
          <Route path='verify-user' element={<VerifyUser />} />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='/change-password'
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />
          <Route
            path='/add-store'
            element={
              <PrivateRoute>
                <AddStore />
              </PrivateRoute>
            }
          />
          <Route
            path='/stores'
            element={
              <PrivateRoute>
                <Stores />
              </PrivateRoute>
            }
          />
          <Route
            path='/stores/:storeId'
            element={
              <PrivateRoute>
                <StoreDetails />
              </PrivateRoute>
            }
          />
          <Route
            path='/stores/:storeId/products'
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path='/stores/:storeId/products/:productId'
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
