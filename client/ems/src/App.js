import logo from './logo.svg';
import './App.css';
import Entry from './Entry';
import EMS from "./EMS"
import Update from './Update';
import Delete from './Delete';
import Charts from './Charts';
import View from "./View"
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = "/entry" element={<Entry/>}/>
        <Route path = "/" element={<EMS/>}/>
        <Route path = "/view" element={<View/>}/>
        <Route path = "/update" element={<Update/>}/>
        <Route path = "/delete" element={<Delete/>}/>
        <Route path = "/charts" element={<Charts/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
