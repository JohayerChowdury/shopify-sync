// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Error from './components/Error';
import ErrorMsg from './components/ErrorMsg';
import Home from './components/Home';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <BrowserRouter>
      <div className="justify-content-center">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path = "/login" element = {<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
