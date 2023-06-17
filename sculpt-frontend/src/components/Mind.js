import React, { useState, useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import './Mind.css';
import therapyitemContext from "../context/therapyitemContext";
// import logo from '../images/logo.png';
// import Therapy from './TherapySession.json';
import TherapyItem from './TherapyItem';
import { mindImages } from './SliderImages';
import StoreSlider from './StoreSlider';
import Navbar from './Navbar';
import Footer from './Footer';
import Accordion from './Accordion';
import { MindFAQs } from './FAQsData';

const Mind = (props) => {
    const [mind_therapy, setTherapy] = useState('');

    const searachTherapy = (event) => {
        setTherapy(event.target.value);
    }

    const context = useContext(therapyitemContext);
    const { therapyitems, getTherapyItems } = context;

    let therapySearch = therapyitems.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(mind_therapy.toString().toLowerCase()))
    })


    useEffect(() => {
        getTherapyItems();
    }, [])

    return (
        <>
            <div className='mind'>
                {/* <div className='mind-navbar'>
                    <div className='mind-nav'>
                        <Link to='./Home.js' className='mind-logo'> <img src={logo} alt="logo" /></Link>
                    </div>
                </div> */}
                <div className='mind-nav'>
                    <Navbar />
                </div>
                <div className='mind-slide'>
                    <div className='mind-slide-item'>
                        <StoreSlider data={mindImages} Sliderheight="45vh" />
                    </div>
                </div>
                <div className='mind-main'>
                    <div className='mind-main-top'>
                        <div className='mind-main-title'>
                            <h5>Experts To Help You</h5>
                            <p>Counselling Therapy Sessions With Licensed & Verified Experts</p>
                        </div>
                        <div className='mind-main-search'>
                            <div className="header_center">
                                <form action="https://www.google.com/search" method="get" className="search-bar">
                                    <input type="text" className='therapy-search' value={mind_therapy} placeholder="Enter therapy name...." onChange={searachTherapy.bind(this)} />
                                    <button type="submit"><i className='bx bx-search'></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='mind-main-content'>
                        <div className='container'>
                            <div className='row'>
                                {
                                    therapySearch.map((element) => {
                                        return (
                                            <div className='col-md-6 my-2' key={element.id}>
                                                <TherapyItem therapyName={element.therapyName} therapyDesp={element.therapyDesp} therapySession={element.therapyTime} price={element.therapyPrice} offerPrice={element.offerPrice} imageUrl={element.firstImage} id={element.id} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mind-main-benefits'>
                        <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_1440/dpr_2/image/vm/8d058e84-f098-4129-b107-dc81c19af2f1.png" alt=""></img>
                        <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_1440/dpr_2/image/vm/7f7af73c-3ee3-46c1-9129-0df18dbb02ac.png" alt=""></img>
                    </div>
                </div>
                <div className='mind-main-faqs'>
                    <Accordion data={MindFAQs} />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Mind