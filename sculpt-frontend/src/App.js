import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Alert from './components/Alert';
import { useState } from 'react';
import Care from './components/Care';
import CareTestItem from './components/CareTestItem';
import Mind from './components/Mind';
import MindTherapyItem from './components/MindTherapyItem';
import Store from './components/Store';
import StoreMenTshirt from './components/StoreMenTshirt';
import StoreItem from './components/StoreItem';
import CareItemState from './context/CareItemState';
import TherapyItemState from './context/TherapyItemState';
import Fitness from './components/Fitness';
import BMI from "./components/BMI";
import Contact from './components/Contact';
import BlogFitness from './components/BlogFitness';
import BlogItemState from './context/BlogItemState';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <>
      <CareItemState>
        <TherapyItemState>
          <BlogItemState>
            <BrowserRouter>
              <Alert alert={alert} />
              <div className='app-container'>
                <Routes>
                  <Route path="/" element={<Home showAlert={showAlert} />} />
                  <Route exact path="/login" element={<Login showAlert={showAlert} />} />
                  <Route exact path="/register" element={<Register showAlert={showAlert} />} />
                  <Route exact path="/fitness" element={<Fitness showAlert={showAlert} />} />
                  <Route exact path="/care" element={<Care showAlert={showAlert} />} />
                  <Route exact path="/care/:careTestId" element={< CareTestItem />} />
                  <Route exact path="/mind" element={<Mind showAlert={showAlert} />} />
                  <Route exact path="/mind/:mindTherapyId" element={< MindTherapyItem />} />
                  <Route exact path="/store" element={<Store showAlert={showAlert} />} />
                  <Route exact path="/store/menTshirt" element={<StoreMenTshirt showAlert={showAlert} />} />
                  <Route exact path="/store/:storeItemId" element={< StoreItem />} />
                  <Route exact path="/bmi" element={< BMI />} />
                  <Route exact path="/contact" element={< Contact />} />
                  <Route exact path="/blogs" element={< BlogFitness />} />
                </Routes>
              </div>
            </BrowserRouter>
          </BlogItemState>
        </TherapyItemState>
      </CareItemState>
    </>
  );
}

export default App;
