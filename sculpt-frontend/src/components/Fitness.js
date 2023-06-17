import React from 'react';
import "./Fitness.css";
import Navbar from "./Navbar";
import hero from "../images/hero.png";
import sculptvideo from "../images/video.mp4";
import { fitness_main4, fitness_main5, fitness_main7, fitness_main8 } from './SliderImages';
import Slider3 from "./Slider3";
import Slider4 from './Slider4';
import Slider5 from "./Slider5";
import Footer from './Footer';
import fitnessvideo from "../images/fitness.mp4";

const Fitness = (props) => {
    return (
        <>
            <div className='fitness-nav'>
                <Navbar />
            </div>
            <div className='sculpt-fitness'>
                <div className='home-video'>
                    <div className='sculpt-home-video'>
                        {/* <img src={hero} alt="" /> */}
                        <video autoPlay={true} loop muted src={fitnessvideo} type="video/mp4" />
                    </div>
                </div>
                <div className='fitness-container'>
                    <div className='fitness-main2'>
                        <div className='fitness-main2-passes'>
                            <div className='fitness-main2-elite'>
                                <h5>scultpass</h5>
                                <h2>ELITE</h2>
                                <div className='main2-pass-price'>
                                    <p>Starting at </p>
                                    <i className='bx bx-rupee'></i>
                                    <p>1071 / month</p>
                                </div>
                            </div>
                            <div className='fitness-main2-pro'>
                                <h5>scultpass</h5>
                                <h2>PRO</h2>
                                <div className='main2-pass-price'>
                                    <p>Starting at </p>
                                    <i className='bx bx-rupee'></i>
                                    <p>643 / month</p>
                                </div>                        </div>
                            <div className='fitness-main2-live'>
                                <h5>scultpass</h5>
                                <h2>LIVE</h2>
                                <div className='main2-pass-price'>
                                    <p>Starting at </p>
                                    <i className='bx bx-rupee'></i>
                                    <p>112 / month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='fitness-main3'>
                        <h3>Our Centers</h3>
                        <div className='main3-centers'>
                            <div className='main3-center'>
                                <div className='main3-center-video'>
                                    <video autoPlay={true} loop muted src={sculptvideo} type="video/mp4" />
                                </div>
                                <div className='main3-center-info'>
                                    <div className='center-info-data'>
                                        <div className='center-data-title'>
                                            <h3>HSR</h3>
                                            <span>
                                                <h5>Andheri</h5>
                                                <p>*Group Classes</p>
                                            </span>
                                        </div>
                                        <div className='center-data-try'>
                                            <button className="fitness-custom-btn btn-1">TRY NOW</button>
                                        </div>
                                    </div>
                                    <div className='fitness-hr'></div>
                                    <p>Unlimited access starting at <i className='bx bx-rupee'></i> 1464/mo</p>
                                </div>
                            </div>
                            <div className='main3-center'>
                                <div className='main3-center-video'>
                                    <video autoPlay={true} loop muted src={sculptvideo} type="video/mp4" />
                                </div>
                                <div className='main3-center-info'>
                                    <div className='center-info-data'>
                                        <div className='center-data-title'>
                                            <h3>Gymn-X</h3>
                                            <span>
                                                <h5>Bandra</h5>
                                                <p>*Gym</p>
                                            </span>
                                        </div>
                                        <div className='center-data-try'>
                                            <button className="fitness-custom-btn btn-1">TRY NOW</button>
                                        </div>
                                    </div>
                                    <div className='fitness-hr'></div>
                                    <p>Unlimited access starting at <i className='bx bx-rupee'></i> 1872/mo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='fitness-main4'>
                        <div className='main4-color'>
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/malibu-blur-circle.svg" alt="" />
                        </div>
                        <h5>AT-CENTER</h5>
                        <h2>Trainer-led Group Classes</h2>
                        <div className='main4-slider'>
                            {/* <div className="container mt-5 carousel"> */}
                            <Slider3 data={fitness_main4} />
                            {/* </div> */}
                        </div>
                    </div>
                    <div className='fitness-main5'>
                        <div className='main5-color'>
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/pink-blur-circle.svg" alt="" />
                        </div>
                        <h5>AT-HOME</h5>
                        <h2>Live Group Workouts with Calorie Tracking</h2>
                        <div className='main5-slider'>
                            <Slider4 data={fitness_main5} cardHeight="320px" imageHeight="220px" />
                        </div>
                    </div>
                    <div className='fitness-main6'>
                        <div className='main6-color-violet'>
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/violet-blur-circle.svg" alt="" />
                        </div>
                        <div className='main6-color-cornflower'>
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/cornflower-blue-blur-circle.svg" alt="" />
                        </div>
                        <div className='main6-color-yellow'>
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/golden-blur-circle.svg" alt="" />
                        </div>
                        <h2>Choose your Sculptpass</h2>
                        <h5>3 flexible plans to suit your fitness needs</h5>
                        <div className='main6-plans'>
                            <table className='main6-plans-table'>
                                <tr>
                                    <th></th>
                                    <th>ELITE</th>
                                    <th>PRO</th>
                                    <th>LIVE</th>
                                </tr>
                                <tr>
                                    <td>ELITE Gyms & At Centre Group Classes</td>
                                    <td>
                                        <i className="fa-regular fa-circle-check tick"></i>
                                        <p>Unlimited</p>
                                    </td>
                                    <td>04 sessions/ month</td>
                                    <td><i className="fa-regular fa-circle-xmark cross"></i></td>
                                </tr>
                                <tr>
                                    <td>PRO GYMS</td>
                                    <td>
                                        <i className="fa-regular fa-circle-check tick"></i>
                                        <p>Unlimited</p>
                                    </td>
                                    <td>
                                        <i className="fa-regular fa-circle-check tick"></i>
                                        <p>Unlimited</p>
                                    </td>
                                    <td><i className="fa-regular fa-circle-xmark cross"></i></td>
                                </tr>
                                <tr>
                                    <td>Smart Workout Plan</td>
                                    <td>
                                        <i className="fa-regular fa-circle-check tick"></i>
                                        <p>Unlimited</p>
                                    </td>
                                    <td>
                                        <i className="fa-regular fa-circle-check tick"></i>
                                        <p>Unlimited</p>
                                    </td>
                                    <td><i className="fa-regular fa-circle-xmark cross"></i></td>
                                </tr>
                                <tr>
                                    <td>At Home Workout</td>
                                    <td>
                                        <i className="fa-regular fa-circle-check tick"></i>
                                        <p>Unlimited</p>
                                    </td>
                                    <td>
                                        <i className="fa-regular fa-circle-check tick"></i>
                                        <p>Unlimited</p>
                                    </td>
                                    <td>
                                        <i className="fa-regular fa-circle-check tick"></i>
                                        <p>Unlimited</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <span>
                                            <p>Starting at </p>
                                            <i className='bx bx-rupee'></i>
                                            <p>1107 /</p>
                                        </span>
                                        <h6>month</h6>
                                        <button className="fitness-custom-btn btn-3"><span>But Now</span></button>
                                    </td>
                                    <td>
                                        <span>
                                            <p>Starting at </p>
                                            <i className='bx bx-rupee'></i>
                                            <p>678 /</p>
                                        </span>
                                        <h6>month</h6>
                                        <button className="fitness-custom-btn btn-3"><span>But Now</span></button>
                                    </td>
                                    <td>
                                        <span>
                                            <p>Starting at </p>
                                            <i className='bx bx-rupee'></i>
                                            <p>112 /</p>
                                        </span>
                                        <h6>month</h6>
                                        <button className="fitness-custom-btn btn-3"><span>Buy Now</span></button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className='fitness-main7'>
                        <div className='main7-color'>
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/malibu-blur-circle.svg" alt="" />
                        </div>
                        <div className='main7-slider'>
                            <div className='container mt-5 carousel'>
                                <Slider5 data={fitness_main7} />
                            </div>
                        </div>
                        <div className='main7-details'>
                            <div className='main7-details-pass'>
                                <span>
                                    <h3>sculptpass</h3>
                                    <h4>ELITE</h4>
                                </span>
                            </div>
                            <h5>Unlimited access to everything in your city</h5>
                            <div className='main7-details-access'>
                                <p>Unlimited access to</p>
                                <span>
                                    <i className="fa-regular fa-circle-check"></i>
                                    <p>At-center group classes</p>
                                </span>
                                <span>
                                    <i className="fa-regular fa-circle-check"></i>
                                    <p>All ELITE & PRO gyms</p>
                                </span>
                                <span>
                                    <i className="fa-regular fa-circle-check"></i>
                                    <p>At-home live workouts</p>
                                </span>
                            </div>
                            <div className='main7-details-prices'>
                                <p>Starting at ₹1107 / month</p>
                                <div className='main7-details-buttons'>
                                    <button className="fitness-custom-btn btn-3"><span>TRY FOR FREE</span></button>
                                    <button className="fitness-custom-btn btn-3"><span>BUY NOW</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='fitness-main8'>
                        <div className='main8-color'>
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/pink-blur-circle.svg" alt="" />
                        </div>
                        <div className='main7-slider'>
                            <div className='container mt-5 carousel'>
                                <Slider5 data={fitness_main8} />
                            </div>
                        </div>
                        <div className='main7-details'>
                            <div className='main7-details-pass'>
                                <span>
                                    <h3>sculptpass</h3>
                                    <h4>PRO</h4>
                                </span>
                            </div>
                            <h5>Unlimited access to PRO gyms in your city</h5>
                            <div className='main7-details-access'>
                                <p>Unlimited access to</p>
                                <span>
                                    <i className="fa-regular fa-circle-check"></i>
                                    <p>All PRO gyms</p>
                                </span>
                                <span>
                                    <i className="fa-regular fa-circle-check"></i>
                                    <p>At-home live workouts</p>
                                </span>
                                <span>
                                    <i className="fa-regular fa-circle-check"></i>
                                    <p>4 Sessions/month at ELITE gyms & group classes</p>
                                </span>
                            </div>
                            <div className='main7-details-prices'>
                                <p>Starting at ₹678 / month</p>
                                <div className='main7-details-buttons'>
                                    <button className="fitness-custom-btn btn-3"><span>TRY FOR FREE</span></button>
                                    <button className="fitness-custom-btn btn-3"><span>BUY NOW</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='fitness-main9'>
                        <div className='main9-color-violet'>
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/violet-blur-circle.svg" alt="" />
                        </div>
                        <div className='main9-color-yellow'>
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1,q_auto:eco,dpr_1.25,f_auto,fl_progressive//image/test/gradient-circle/golden-blur-circle.svg" alt="" />
                        </div>
                        <div className='main9-video-item'>
                            <div className='main9-video'>
                                <video autoPlay={true} loop muted src={sculptvideo} type="video/mp4" />
                            </div>
                        </div>
                        <div className='main7-details main9-pos'>
                            <div className='main7-details-pass'>
                                <span>
                                    <h3>sculptpass</h3>
                                    <h4>LIVE</h4>
                                </span>
                            </div>
                            <h5>Unlimited access to PRO gyms in your city</h5>
                            <div className='main7-details-access'>
                                <p>Unlimited access to</p>
                                <span>
                                    <i className="fa-regular fa-circle-check"></i>
                                    <p>At-home workouts</p>
                                </span>
                                <span>
                                    <i className="fa-regular fa-circle-check"></i>
                                    <p>Celebrity workouts</p>
                                </span>
                                <span>
                                    <i className="fa-regular fa-circle-check"></i>
                                    <p>Goal-based workouts & meditation sessions</p>
                                </span>
                            </div>
                            <div className='main7-details-prices'>
                                <p>Starting at ₹112 / month</p>
                                <div className='main7-details-buttons'>
                                    <button className="fitness-custom-btn btn-3"><span>TRY FOR FREE</span></button>
                                    <button className="fitness-custom-btn btn-3"><span>BUY NOW</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='fitness-main10'>
                        <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_1440,ar_1738:763/dpr_2/image/vm/a5077452-0ba1-469f-a9ab-3eb6429de7c2.png" alt="" />
                    </div>
                    <div className='fitness-main11'>
                        <div className='main11-details'>
                            <h4>SCULPT COMMUNITY</h4>
                            <h2>Be a part of Sculpt Community</h2>
                        </div>
                        <div className='main11-image'>
                            <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_700,ar_1.315,q_auto:eco,dpr_1.25,f_auto,fl_progressive/image/vm/246641e8-00d7-42f7-ac92-3207665e35f7.svg" alt="" />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Fitness