import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Store.css';
import { slideImages } from './SliderImages';
import Sport_Men from './Sport_Men.json';
import Sport_Women from './Sport_Women.json'
import SportCard from './SportCard';
import StoreSlider from './StoreSlider';
import StoreNavbar from './StoreNavbar';
import Footer from './Footer';
import StoreMenTshirt from './StoreMenTshirt';
import { StoreFAQs } from './FAQsData';
import Accordion from './Accordion';

const Store = (props) => {
    var justlaunched = [];
    var bestseller = [];
    var tshirts = [];
    var topwear = [];
    var bottomwear = [];

    Sport_Men.forEach(item => {
        if (item.bestSeller === true) {
            bestseller.push(item);
        }
        if (item.justLaunched === true) {
            justlaunched.push(item);
        }
        if (item.tshirt === true) {
            tshirts.push(item);
        }
        // if (item.sportsBra === true || item.tshirt === true) {
        //     topwear.push(item);
        // }
        if (item.joggers === true || item.shorts === true || item.tights === true) {
            bottomwear.push(item);
        }
    })

    Sport_Women.forEach(item => {
        if (item.bestSeller === true) {
            bestseller.push(item);
        }
        if (item.justLaunched === true) {
            justlaunched.push(item);
        }
        if (item.tshirt === true) {
            tshirts.push(item);
        }
        if (item.sportsBra === true) {
            console.log(true);
            topwear.push(item);
        }
        if (item.joggers === true || item.shorts === true || item.tights === true) {
            bottomwear.push(item);
        }
    })

    return (
        <>
            <div className='store'>

                <StoreNavbar />
                <StoreSlider data={slideImages} Sliderheight="45vh" />

                {/*  ------------------- Main Page Starts ---------------------- */}
                <div className='store-main'>
                    {/*  ------------------- Best Seller Start ---------------------- */}
                    <div className='store-main-bs'>
                        <div className='store-main-titles'>
                            <div className='store-tag store-hover' style={{ width: "10vw" }}>
                                {/* <div className='store-tag-hover'></div> */}
                                <Link to={'/store/menTshirt'}><h2><i>BESTSELLERS</i></h2></Link>
                            </div>
                            <span>LOVED BY CULT MEMBERS</span>
                        </div>
                        <div className='store-main-bs-slider'>
                            <SportCard data={bestseller} cardHeight="450px" imageHeight="350px" />
                        </div>
                    </div>
                    {/*  ------------------- Best Seller Ends ---------------------- */}

                    {/*  ------------------- Just Launched Starts ---------------------- */}
                    <div className='store-main-bs'>
                        <div className='store-main-titles'>
                            <div className='store-tag store-hover' style={{ width: "13vw" }}>
                                <Link to={'/store/menTshirt'}><h2><i>JUST LAUNCHED</i></h2></Link>
                            </div>
                            <span>NEW ARRIVALS</span>
                        </div>
                        <div className='store-main-bs-slider'>
                            <SportCard data={justlaunched} cardHeight="450px" imageHeight="350px" />
                        </div>
                    </div>
                    {/*  ------------------- Just Launched Ends ---------------------- */}
                    {/*  ------------------- Tshirts Starts ---------------------- */}
                    <div className='store-main-bs'>
                        <div className='store-main-titles'>
                            <div className='store-tag store-hover' style={{ width: "8vw" }}>
                                <Link to={'/store/menTshirt'}><h2><i>T-SHIRTS</i></h2></Link>
                            </div>
                            {/* <span>NEW ARRIVALS</span> */}
                        </div>
                        <div className='store-main-bs-slider'>
                            <SportCard data={tshirts} cardHeight="450px" imageHeight="350px" />
                        </div>
                    </div>
                    {/*  ------------------- Tshirts Ends ---------------------- */}
                    {/*  ------------------- Topwear Starts ---------------------- */}
                    <div className='store-main-bs'>
                        <div className='store-main-titles'>
                            <div className='store-tag store-hover' style={{ width: "10vw" }}>
                                <Link to={'/store/menTshirt'}><h2><i>TOPWEAR</i></h2></Link>
                            </div>
                            {/* <span>NEW ARRIVALS</span> */}
                        </div>
                        <div className='store-main-bs-slider'>
                            <SportCard data={topwear} cardHeight="450px" imageHeight="350px" />
                        </div>
                    </div>
                    {/*  ------------------- Topwear Ends ---------------------- */}
                    {/*  ------------------- Bottomwear Starts ---------------------- */}
                    <div className='store-main-bs'>
                        <div className='store-main-titles'>
                            <div className='store-tag store-hover' style={{ width: "12vw" }}>
                                <Link to={'/store/menTshirt'}><h2><i>BOTTOMWEAR</i></h2></Link>
                            </div>
                            {/* <span>NEW ARRIVALS</span> */}
                        </div>
                        <div className='store-main-bs-slider'>
                            <SportCard data={bottomwear} cardHeight="450px" imageHeight="350px" />
                        </div>
                    </div>
                    {/*  ------------------- Bottomwear Ends ---------------------- */}
                    {/* Shop by Workout Begins */}
                    <div className='store-main-bs'>
                        <div className='store-main-titles'>
                            <div className='store-tag store-hover' style={{ width: "16vw" }}>
                                <Link to={'/store/menTshirt'}><h2><i>SHOP BY WORKOUT</i></h2></Link>
                            </div>
                        </div>
                        <div className='shop-workout-images'>
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_301,ar_530:700/dpr_2/image/vm/06a67be8-5b49-49b9-83b1-af4e6fa6461b.png" alt="" />
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_301,ar_530:700/dpr_2/image/vm/a026ae3f-fc71-4403-aa75-b03226b7c36f.png" alt="" />
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_301,ar_530:700/dpr_2/image/vm/c0ae83e6-a054-448f-b658-f214863779ce.png" alt="" />
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_301,ar_530:700/dpr_2/image/vm/6dbd08ab-43d5-4f35-abab-d283384f7904.png" alt="" />
                        </div>
                    </div>
                    {/* Shop by Workout Ends */}
                    <div className='store-main-faqs'>
                        <Accordion data={StoreFAQs} />
                    </div>
                    <Footer />
                    {/* -------------------- Main Page Ends ---------------------- */}
                </div>
            </div>
        </>
    )
}

export default Store