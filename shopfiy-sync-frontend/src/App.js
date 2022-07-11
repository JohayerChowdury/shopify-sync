// import logo from './logo.svg';
import './App.css';
import {createContext , useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import NavigationBar from "./components/NavigationBar";


export const UserContext = createContext();


function App() {

  const [userData , setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const isLoggedIn = async() => {
      let token = localStorage.getItem("auth-token")
      if(token == null) {
        localStorage.setItem("auth-token", "")
        token = ""
      }
      const tokenResponse = await axios.post(
        '/shopify_api/users/tokenIsValid', null, {headers: {"auth-token": token}}
      )
      console.log(tokenResponse.data)
      if(tokenResponse.data) {
        const userResponse = await axios.get('api/users/profile', {headers: {'auth-tokn': token}})
        setUserData({
          token: token,
          user: userResponse.data
        })
      }
    }
    isLoggedIn()
  }, [])


  return(
    <BrowserRouter>
    <UserContext.Provider value = {{userData, setUserData}}>
    <div class = "justify-content-center">
      <NavigationBar />
    </div>
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = '/login' element = {<Login />} />
    </Routes>
    </UserContext.Provider>
    </BrowserRouter>

  );

}

export default App;
