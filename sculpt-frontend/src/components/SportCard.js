import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import './SportCard.css';
import leftArrow from '../images/left1.png';
import rightArrow from '../images/right1.png';


function SportCard(props) {
    const { data, cardHeight, imageHeight } = props;
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src={leftArrow} alt="prevArrow" {...props} />
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img src={rightArrow} alt="nextArrow" {...props} />

    );
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        // cssEase: "linear",
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
    };
    return (
        <>
            <div className="sport-card-container">
                <Slider {...settings} className="sport-card-container-inner">
                    {data.map((item, index) => {
                        return (
                            <div
                                className="sport-card-items"
                                key={index} style={{ height: cardHeight }}>
                                <Link to={`/store/${item.id}`}>
                                    <img src={item.smallImg} alt="hero_img" style={{ height: imageHeight }} />

                                    <div className="sport-inner-card-head">
                                        <p>SCULTSPORT</p>
                                    </div>
                                    <div className='sport-inner-card-details'>
                                        <div className='sport-card-details-title'>
                                            {item.name}
                                        </div>
                                        <div className='sport-card-details-price'>
                                            <div className='card-details-op'>
                                                <i className='bx bx-rupee'></i>
                                                <p>{item.offerPrice}</p>
                                            </div>
                                            <div className='card-details-p'>
                                                <i className='bx bx-rupee'></i>
                                                <s><p>{item.price}</p></s>
                                            </div>

                                            <div className='card-details-off'>
                                                <p>{item.perOff}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </>
    )
}

export default SportCard;