import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import SignUp from "./SignUp"
import Login from "./Login"
import ChangePassword from "./ChangePassword"
import ResetPassword from "./ResetPassword"
import Internet from "./Internet"
import Logout from './Logout';
import Home from "./Home"



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/signup" element = {<SignUp/>}/>
          <Route path = "/cp" element = {<ChangePassword/>}/>
          <Route path = "/reset" element = {<ResetPassword/>}/>
          <Route path = "*" element = {<Login/>}/>
          <Route path = "/" element={<Login/>}/>
          <Route path = "/internet" element={<Internet/>}/>
          <Route path = '/logout' element={<Logout/>}/>
          <Route path = '/home' element={<Home/>}/>
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
