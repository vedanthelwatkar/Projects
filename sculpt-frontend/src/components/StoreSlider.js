import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import './StoreSlider.css';
// import { slideImages } from './Store_Slider';


const StoreSlider = (props) => {
  const { data, Sliderheight } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = data.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 4000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);
  return (
    <>
      <div className='store-carousel'>
        <div className="store-slider" style={{ height: Sliderheight }}>
          <AiOutlineArrowLeft className="store-arrow store-prev" onClick={prevSlide} />
          <AiOutlineArrowRight className="store-arrow store-next" onClick={nextSlide} />
          {data.map((slide, index) => {
            return (
              <div
                className={index === currentSlide ? "store-slide store-current" : "store-slide"}
                key={index}
              >
                {index === currentSlide && (
                  <div>
                    <img src={slide.img} alt="slide" className="store-image" />
                  </div>

                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default StoreSlider