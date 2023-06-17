import React from 'react';
import StoreNavbar from './StoreNavbar';
import StoreSlider from './StoreSlider';
import { MenTshirts } from './SliderImages';
import Sport_Men from './Sport_Men.json';
import StoreCard from './StoreCard';
import './StoreMenTshirt.css';

const StoreMenTshirt = (props) => {
    return (
        <>
            <div className='store-menTshirt'>
                <StoreNavbar />
                <StoreSlider data={MenTshirts} Sliderheight="80vh" />
                <div className='store-menTshirts-main'>
                    <div className='container'>
                        <div className='row'>
                            {
                                Sport_Men.map((element) => {
                                    return (
                                        <div className='col-md-3 my-4' key={element.id}>
                                            <StoreCard name={element.name} price={element.price} offerPrice={element.offerPrice} image={element.smallImg} id={element.id} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreMenTshirt