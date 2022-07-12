// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Error from './components/Error';

function App() {
  return (
    <BrowserRouter>
      <div className="justify-content-center">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/stores" element={<Stores />} /> */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
