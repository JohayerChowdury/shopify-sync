// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Home from './components/pages/Home';
import Stores from './components/pages/Stores';
import StoreDetails from './components/pages/StoreDetails';
import Error from './components/pages/Error';
import AddStore from './components/pages/AddStore';

function App() {
  return (
    <BrowserRouter>
      <div className="justify-content-center">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/stores/add" element={<AddStore />} />
          <Route path="/stores/:storeId" element={<StoreDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
