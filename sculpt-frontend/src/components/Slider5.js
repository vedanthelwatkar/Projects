import React from 'react';
import Slider from "react-slick";
import "./Slider5.css";

const Slider5 = (props) => {
    const { data } = props;

    let settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 10,
        autoplaySpeed: 3000,
        cssEase: "linear",
        arrows: false
    }
    return (
        <>
            <div className='slider5-card-container'>
                <Slider {...settings}>
                    {
                        data.map((slide) => {
                            return (
                                <div className="slider5-card-wrapper" key={slide.id}>
                                    <div className='slider5-card'>
                                        <div className="slider5-card-image">
                                            <img src={slide.img} alt="" />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </Slider>
            </div>
        </>
    )
}

export default Slider5;




