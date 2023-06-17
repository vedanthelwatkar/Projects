// import React from 'react';
// import {
//   Nav,
//   NavLink,
//   Bars,
//   NavMenu,
//   NavBtn,
//   NavBtnLink
// } from './NavbarElements';
// import logo from '../images/logo.png';
// import { Link, useNavigate } from 'react-router-dom';

// const SculptNavbar = () => {
//   let navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate("/login");
//   }
//   return (
//     <>
//       <Nav>
//         <NavLink to='/'>
//           <img src={logo} alt='logo' />
//         </NavLink>
//         <Bars />
//         <NavMenu>
//           <NavLink to='/fitness' activeStyle>
//             FITNESS
//           </NavLink>
//           <NavLink to='/care' activeStyle>
//             CARE
//           </NavLink>
//           <NavLink to='/mind' activeStyle>
//             MIND
//           </NavLink>
//           <NavLink to='/store' activeStyle>
//             STORE
//           </NavLink>
//           {/* Second Nav */}
//           {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
//         </NavMenu>
//         <NavBtn>
//           {/* <NavBtnLink to='/login'>Sign In</NavBtnLink> */}
//           {!(localStorage.getItem('token')) ?
//             <form className="d-flex" role="search">
//               <NavBtnLink to="/login" trole="button">Login</NavBtnLink>
//               <NavBtnLink to="/signup" role="button">Signup</NavBtnLink>
//             </form>
//             : <NavBtnLink to='/login' onClick={handleLogout}>Logout</NavBtnLink>
//           }
//         </NavBtn>
//       </Nav>
//     </>
//   );
// };

// export default SculptNavbar;
