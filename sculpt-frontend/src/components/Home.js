import React, { useEffect } from 'react';
import "./Home.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Navbar';
import sculptvideo from "../images/home.mp4";
import Typewriter from "typewriter-effect";
import equipments from "../images/equipments.svg";
import trainer from "../images/trainer.svg";
import personaltrainer from "../images/personaltrainer.svg";
import transform from "../images/transform.png";
import fitway from "../images/fitway.png";
import sportwear from "../images/sportwear.png";
import sugarfit from "../images/sugarfit.png";
import sculpt from "../images/sculpt-01.jpg";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    let navigate = useNavigate();

    useEffect(() => {
        if ((localStorage.getItem('access_token')) && (localStorage.getItem('refresh_token'))) {
            console.log(localStorage.getItem('acccess_token'));
            console.log(localStorage.getItem('refresh_token'));
            // getNotes();
        }
        else {
            navigate("/login", { replace: true });
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className='sculpt-home'>
                <Navbar />
                <div className='home-video'>
                    <div className='sculpt-home-video'>
                        <video autoPlay={true} loop muted src={sculptvideo} type="video/mp4" />
                    </div>
                    <div className='sculpt-home-text'>
                        <div className='sculpt-home-letter'>
                            <span>S</span>
                            <span>C</span>
                            <span>U</span>
                            <span>L</span>
                            <span>P</span>
                            <span>T</span>
                        </div>
                        <div className="sculpt-home-sayings">
                            <div className='home-text'>
                                <Typewriter
                                    options={{
                                        autoStart: true,
                                        loop: true,
                                        delay: 40,
                                        strings: [
                                            "For Fitter and Healthier You",
                                            "A Fitness Movement that is Worth Breaking Sweat For",
                                            "Workout without Regrets"
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='home-explorepass'>
                        <button className="home-custom-btn home-btn-12"><span>Click!</span><span>Explore Pass</span></button>
                        <br />
                        <i className="fa fa-chevron-down"></i>
                    </div>
                </div>
                <div className='sculpt-home-main'>
                    <div data-aos="fade-up" className='home-pass-info'>
                        <div className='home-pass-elite'>
                            <h5>scultpass</h5>
                            <h2>ELITE</h2>
                            <p>Unlimited acces to group classes and at-home workouts</p>
                        </div>
                        <div className='home-pass-pro'>
                            <h5>scultpass</h5>
                            <h2>PRO</h2>
                            <p>Unlimited acces to all PRO gyms and at-home workouts</p>
                        </div>
                        <div className='home-pass-live'>
                            <h5>scultpass</h5>
                            <h2>LIVE</h2>
                            <p>Unlimited acces to at-home workouts and calorie tracking</p>
                        </div>
                    </div>
                    <div className='home-main1'>
                        <div className='home-main1-row1'>
                            <img data-aos="fade-down-right" className='main1-row1-image-left' src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_630,ar_1.488,q_auto:eco,dpr_1.25,f_auto,fl_progressive/image/test/image_zoom_widget/image_zoom_widget_img_1.png" alt="" />
                            <p data-aos="flip-left" data-aos-delay="100" data-aos-duration="1000" data-aos-offset="100">sculptPass</p>
                            <img data-aos="fade-down-left" className='main1-image-right' src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_630,ar_1.404,q_auto:eco,dpr_1.25,f_auto,fl_progressive/image/test/image_zoom_widget/image_zoom_widget_img_2.png" alt="" />
                        </div>
                        <div data-aos="flip-left" data-aos-delay="100" data-aos-duration="1000" className='home-main1-row2'> One membership for all your fitness needs</div>
                        <div className='home-main1-row3'>
                            <img data-aos="fade-up-right" className='main1-row3-image-left' src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_630,ar_1.29,q_auto:eco,dpr_1.25,f_auto,fl_progressive/image/test/image_zoom_widget/image_zoom_widget_img_3.png" alt="" />
                            <img data-aos="fade-up" className='main1-row3-image-center' src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_630,ar_1.488,q_auto:eco,dpr_1.25,f_auto,fl_progressive/image/test/image_zoom_widget/image_zoom_widget_img_4.png" alt="" />
                            <img data-aos="fade-up-left" className='main1-row3-image-right' src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_630,ar_1.123,q_auto:eco,dpr_1.25,f_auto,fl_progressive/image/test/image_zoom_widget/image_zoom_widget_img_5.png" alt="" />
                        </div>
                    </div>
                    <div className='home-main2'>
                        <div data-aos="slide-up" data-aos-delay="50" data-aos-duration="500" className='home-main2-row main2-row1'>
                            <div data-aos="fade-right" className='main2-row1-text row-2-text'>
                                <h3>5 STAR GYM NEXT TO YOU!</h3>
                                <h5>Where Fitness Becomes Yor Lifestyle</h5>
                                <p>
                                    Join us now and get to make Fitness Becomes part of Your Lifestyle for a very cheap mothly subscription fee! I swear you are gonna love it here
                                </p>
                                <button className="home-custom-btn home-btn-15">Get Started</button>
                            </div>
                            <div data-aos="fade-left" data-aos-delay="500" data-aos-duration="1500" className='main2-row1-image 2-row-image'>
                                <img src={equipments} alt="" />
                            </div>
                        </div>
                        <div data-aos="slide-up" data-aos-delay="50" data-aos-duration="500" className='home-main2-row main-2-row2'>
                            <div data-aos="fade-right" data-aos-delay="500" data-aos-duration="1500" className='main2-row2-image 2-row-image'>
                                <img src={personaltrainer} alt="" />
                            </div>
                            <div data-aos="fade-left" className='main2-row2-text row-2-text'>
                                <h3>LEARN FROM THE BEST</h3>
                                <h5>Your Fitness journey begins with us</h5>
                                <p>
                                    All our trainers have over 30 years of experience combined. Each trainer specializes in strength and mobility workouts.
                                </p>
                                <button className="home-custom-btn home-btn-15">Learn More</button>
                            </div>
                        </div>
                        <div data-aos="slide-up" data-aos-delay="50" data-aos-duration="500" className='home-main2-row main-2-row3'>
                            <div data-aos="fade-right" className='main2-row3-text row-2-text'>
                                <h3>WE ANSWER THE WHY</h3>
                                <h5>Benefits of Workout</h5>
                                <p>
                                    Workout can help you to build your confidence, boost your mood and increase energy levels.
                                </p>
                                <button className="home-custom-btn home-btn-15">Start Now</button>
                            </div>
                            <div data-aos="fade-left" data-aos-delay="500" data-aos-duration="1500" className='main2-row3-image 2-row-image'>
                                <img src={trainer} alt="" />
                            </div>
                        </div>
                    </div>
                    <div data-aos="slide-up" data-aos-duration="500" className='home-main3'>
                        <h3 data-aos="zoom-in-up">sculptpass</h3>
                        <div data-aos="fade" className='main3-passes'>
                            <div className='main3-pass-elite'>
                                <div className='main3-color-pink'>
                                    <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/pink-blur-circle.svg" alt=""></img>
                                </div>
                                <div className='main3-pass-items'>
                                    <div data-aos="flip-left" className='main3-pass-image'>
                                        <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_404,ar_1.31,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/introducting-cult-pass/icp_cb.png" alt=""></img>
                                        <div className='elite-pass-text'>
                                            <p>sculptpass</p>
                                            <h4>ELITE</h4>
                                        </div>
                                    </div>
                                    <div data-aos="fade-up" className='main3-pass-text'>
                                        <h5>Unlimited access to</h5>
                                        <ul>
                                            <li>At-center group classes</li>
                                            <li>All ELITE & PRO gyms</li>
                                            <li>At-home live workouts</li>
                                        </ul>
                                    </div>
                                    <div data-aos="fade-up" data-aos-offset="50" data-aos-delay="0"
                                        data-aos-duration="1000" className='main3-pass-buttons'>
                                        <button className="home-custom-btn home-btn-15 home-try-now">TRY FOR FREE</button>
                                        <button className="home-custom-btn home-btn-15 home-learn-more">LEARN MORE</button>
                                    </div>
                                </div>
                            </div>
                            <div className='main3-pass-pro'>
                                <div className='main3-color-blue'>
                                    <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/aqua-blur-circle.svg" alt=""></img>
                                </div>
                                <div className='main3-pass-items'>
                                    <div data-aos="flip-left" className='main3-pass-image'>
                                        <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_404,ar_1.31,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/introducting-cult-pass/icp_cg.png" alt=""></img>
                                        <div className='pro-pass-text'>
                                            <p>sculptpass</p>
                                            <h4>PRO</h4>
                                        </div>
                                    </div>
                                    <div data-aos="fade-up" className='main3-pass-text'>
                                        <h5>Unlimited access to</h5>
                                        <ul>
                                            <li>All PRO gyms</li>
                                            <li>4 Sessions/m at ELITE gyms & group classes</li>
                                            <li>At-home live workouts</li>
                                        </ul>
                                    </div>
                                    <div data-aos="fade-up" data-aos-offset="50" data-aos-delay="0"
                                        data-aos-duration="1000" className='main3-pass-buttons'>
                                        <button className="home-custom-btn home-btn-15 home-try-now">TRY FOR FREE</button>
                                        <button className="home-custom-btn home-btn-15 home-learn-more">LEARN MORE</button>
                                    </div>
                                </div>
                            </div>
                            <div className='main3-pass-live'>
                                <div className='main3-color-yellow'>
                                    <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/golden-blur-circle.svg" alt=""></img>
                                </div>
                                <div className='main3-pass-items'>
                                    <div data-aos="flip-left" className='main3-pass-image'>
                                        <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_404,ar_1.31,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/introducting-cult-pass/icp_cl.png" alt=""></img>
                                        <div className='live-pass-text'>
                                            <p>sculptpass</p>
                                            <h4>LIVE</h4>
                                        </div>
                                    </div>
                                    <div data-aos="fade-up" className='main3-pass-text'>
                                        <h5>Unlimited access to</h5>
                                        <ul>
                                            <li>At-home workouts</li>
                                            <li>Celebrity Workouts</li>
                                            <li>Goal-based Workouts and Meditation Sesssions</li>
                                        </ul>
                                    </div>
                                    <div data-aos="fade-up" data-aos-offset="50" data-aos-delay="0"
                                        data-aos-duration="1000" className='main3-pass-buttons'>
                                        <button className="home-custom-btn home-btn-15 home-try-now">TRY FOR FREE</button>
                                        <button className="home-custom-btn home-btn-15 home-learn-more">LEARN MORE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='home-main4'>
                        <div className='row'>
                            <div className='main4-color-row1-pink'>
                                <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/pink-blur-circle.svg" alt=""></img>
                            </div>
                            <div className='main4-color-row1-blue'>
                                <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/aqua-blur-circle.svg" alt=""></img>
                            </div>
                            <div className='col-6 main4-row1-col1'>
                                <div data-aos="fade-down-right" data-aos-duration="700" className='main4-col-items'>
                                    <div className='main4-transform'>
                                    </div>
                                    <div className='main4-common-items'>
                                        <div className='main4-common-text'>
                                            <h3>Scult Transform</h3>
                                            <p>Get coached to lose weight for good</p>
                                        </div>
                                        <img src={transform} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 main4-row1-col2'>
                                <div data-aos="fade-down-left" data-aos-duration="700" className='main4-col-items'>
                                    <div className='main4-fitway'>
                                    </div>
                                    <div className='main4-common-items'>
                                        <div className='main4-common-text'>
                                            <h3>The .fit way</h3>
                                            <p>Making health easy, one day at a time</p>
                                        </div>
                                        <img src={fitway} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='main4-color-row2-blue'>
                                <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/aqua-blur-circle.svg" alt=""></img>
                            </div>
                            <div className='main4-color-row2-yellow'>
                                <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/golden-blur-circle.svg" alt=""></img>
                            </div>
                            <div className='main4-color-row2-pink'>
                                <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/pink-blur-circle.svg" alt=""></img>
                            </div>
                            <div className='col-6 main4-row2-col1'>
                                <div data-aos="fade-up-right" data-aos-duration="700" className='main4-col-items'>
                                    <div className='main4-workout'>
                                    </div>
                                    <div className='main4-common-items'>
                                        <div className='main4-common-text'>
                                            <h3>Workout Gear</h3>
                                            <p>Everything you need for your workout</p>
                                        </div>
                                        <img src={sportwear} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 main4-row2-col2'>
                                <div data-aos="fade-up-left" data-aos-duration="700" className='main4-col-items'>
                                    <div className='main4-sugarfit'>
                                    </div>
                                    <div className='main4-common-items'>
                                        <div className='main4-common-text'>
                                            <h3>Sugar .fit</h3>
                                            <p>Reverse type 2 Diabetes and Prediabetes</p>
                                        </div>
                                        <img src={sugarfit} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='home-main5'>
                        <img src={sculpt} alt="" />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Home