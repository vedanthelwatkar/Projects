import './App.css';
import Home from './Home';
import Admin from "./Admin"
import Create from "./Create"
import Entries from "./Entries"
import { BrowserRouter, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Home/>}></Route>
        <Route path="/admin" element ={<Admin/>}></Route>
        <Route path="/create" element = {<Create/>}></Route>
        <Route path="/entries" element={<Entries/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
