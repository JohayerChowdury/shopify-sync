// import React, {useContext} from 'react';
// import { Link } from 'react-router-dom';
// import { Navbar, Container, Nav } from 'react-bootstrap';
// import {UserContext} from "../App";

// function Navigation() {
//   const {userData, setUserData} = useContext(UserContext);

//   const logOut = () => {
//     setUserData({
//       token: undefined,
//       user:undefined,
//     });
//     localStorage.setItem("auth-token","");
//   };
//   return (
//     <Navbar bg="dark" expand="lg" variant="dark">
//       <Container>
//         <Navbar.Brand>
//           <Link to="/" className="navbar-brand">
//             Home{' '}
//           </Link>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <li className="nav-item">
//               <Link to="stores" className="nav-link">
//                 Stores
//               </Link>
//             </li>
            
//             <li className = "nav-item">
//               <Link to ="/login" className = "nav-link">
//                 Login
//               </Link>
//             </li>
//             <li className = "nav-item">
//               <Link to = "/register" className = "nav-link">
//                 Register
//               </Link>
//             </li>
            
//             {/* <li className="nav-item">
//               <Link to="/settings" className="nav-link">
//                 Settings
//               </Link>
//             </li> */}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navigation;
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { authAtom } from "../states/authStates";
import {useRecoilValue} from 'recoil';

const Navigation = () => {
  const auth = useRecoilValue(authAtom);

  // const logOut = () => {
  //   setUserData({
  //     token: undefined,
  //     user: undefined,
  //   });
  //   localStorage.setItem("auth-token", "");
  // };
  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.setItem('auth-token', "");
    setAuth(null);
  }
  

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant = "dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            { auth ? ( //This is what pops up when the user is logged in
              <Nav className="ml-auto">
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <LinkContainer to = "/stores">
                  <Nav.Link>Stores</Nav.Link>
                </LinkContainer>
                <LinkContainer to = "/database">
                  <Nav.Link>Database</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link onClick={logOut}>Log Out</Nav.Link>
                </LinkContainer>
              </Nav>
            ) : ( // when the user isn't logged in
              <Nav className="ml-auto">
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;