import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import './Slider4.css';
import leftArrow from '../images/left1.png';
import rightArrow from '../images/right1.png';


const Slider4 = (props) => {
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
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
    };
    return (
        <>
            <div className="slider4-card-container">
                <Slider {...settings} className="slider4-card-container-inner">
                    {data.map((item, index) => {
                        return (
                            <div
                                className="slider4-card-items"
                                key={index} style={{ height: cardHeight }}>
                                <Link to="">
                                    <img src={item.img} alt="hero_img" style={{ height: imageHeight }} />

                                    <div className='slider4-card-details'>
                                        <div className='slider4-details-name'>
                                            {item.trainerName}
                                        </div>
                                        <div className='slider4-details-workout'>
                                            {item.workout}
                                        </div>
                                        <div className='slider4-details-info'>
                                            <p>{item.type}</p>
                                            <li><span>{item.level}</span></li>
                                            <li><span>{item.duration}</span></li>
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

export default Slider4;