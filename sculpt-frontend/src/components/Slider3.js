import React from 'react';
import Slider from "react-slick";
import LeftArrow from "../images/left1.png";
import RightArrow from "../images/right1.png";
import "./Slider3.css";

function Slider3(props) {
    const { data } = props;
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src={LeftArrow} alt="prevArrow" {...props} />
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img src={RightArrow} alt="nextArrow" {...props} />
    );

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: "linear",
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
    }
    return (
        <>
            <div className='slider3-card-container'>
                <Slider {...settings}>
                    {
                        data.map((slide) => {
                            return (
                                <div className="slider3-card-wrapper" key={slide.id}>
                                    <div className="sld3-card">
                                        <div className="sld3-card-image">
                                            <img src={slide.img} alt="" />
                                        </div>
                                        <div className="sld3-details">
                                            <p>Benefits</p>
                                            <ul className='sld3-details-benefits'>
                                                {
                                                    slide.benifits.map((benefit, index) => {
                                                        return (
                                                            <li key={index}>{benefit}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <div className='sld3-details-calories'>
                                                <p>CALORIES:</p>
                                                <span>
                                                    <i className='bx bxs-hot'></i>
                                                    <p>{slide.calories}</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        )
                    }
                </Slider>
            </div>
        </>
    )
}

export default Slider3




