import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './MindTherapyItem.css';
import therapyitemContext from "../context/therapyitemContext";
// import Therapy from './TherapySession.json';
import works1 from '../images/works1.jpg';
import works2 from '../images/works2.jpg';
import works3 from '../images/works3.jpg';
import works4 from '../images/works4.jpg';
// import logo from '../images/logo.png';
import Navbar from './Navbar';
import Footer from './Footer';

const MindTherapy = (props) => {
    let params = useParams();
    const [months, setMonths] = useState("1");
    const navigate = useNavigate();
    const therapy_home = () => {
        navigate("/");
    }
    const therapy_mind = () => {
        navigate("/mind");
    }
    const therapy_sess = () => {
        navigate();
    }

    const context = useContext(therapyitemContext);
    const { therapyitems, getTherapyItems } = context;

    useEffect(() => {
        getTherapyItems();
        console.log(params.mindTherapyId);
    }, [])

    return (
        <>
            {/* <div className='care-navbar'>
                <div className='care-nav'>
                    <Link to='./Home.js' className='care-logo'> <img src={logo} alt="logo" /></Link>
                </div>
            </div> */}
            <div className='fitness-nav'>
                <Navbar />
            </div>
            {
                therapyitems.map((element) => {
                    return element.id === params.mindTherapyId ?
                        <div key={element.id}>
                            <div className='mind-therapy-page'>
                                <div className='mind-therapy-image'>
                                    <img src={element.secondImage} alt={element.therapyName} />
                                </div>
                                <div className='mind-therapy-all'>
                                    <div className='mind-therapy-link'>
                                        <p onClick={therapy_home}>Home {'>'}</p>
                                        <p onClick={therapy_mind}>Mind {'>'}</p>
                                        <p onClick={therapy_sess}>{element.therapyName}</p>
                                    </div>
                                    <div className='mind-therapy-details'>
                                        <h2><b>{element.therapyName}</b></h2>
                                        <p>{element.therapyAbout}</p>
                                        <hr />
                                    </div>
                                    <div className='mind-therapy-packs'>
                                        {
                                            element.therapySession.map((therapy) => {
                                                return (
                                                    <div key={therapy.key}>
                                                        <div className='min-rad-all'>
                                                            <label className="mind-rad-label">
                                                                <div className='mind-therapy-session'>
                                                                    <div className='mind-therapy-1'>
                                                                        <div className={`therapy-${therapy.noMonths}-${months}`}>
                                                                            <div className='therapy'>
                                                                                <p>{therapy.noSession} session in {therapy.noMonths} month</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='therapy-desp'>
                                                                            <p>{therapy.desp}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='mind-therapy-2'>
                                                                        <div className='mind-rad-p'>
                                                                            <div className='mind-rad-pr'>
                                                                                <div className={`therapy-rad-${therapy.noMonths}-${months}`}>
                                                                                    <i className='bx bx-rupee'></i>
                                                                                </div>
                                                                                <div className={`therapy-rad-${therapy.noMonths}-${months}`}>
                                                                                    <p><s>{therapy.price}</s></p>
                                                                                </div>
                                                                            </div>
                                                                            <div className='mind-rad-offerPrice'>
                                                                                <div className={`therapy-rad-${therapy.noMonths}-${months}`}>
                                                                                    <i className='bx bx-rupee'></i>
                                                                                </div>
                                                                                <div className={`therapy-rad-${therapy.noMonths}-${months}`}>
                                                                                    <p>{therapy.offer}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* </div> */}
                                                                        {/* </div> */}
                                                                        <div className="mind-rad-per">
                                                                            {/* <div className='mind-rad-offerPrice'> */}
                                                                            <i className='bx bx-rupee'></i>
                                                                            <p>{therapy.perSession}/Session</p>
                                                                            {/* </div> */}
                                                                        </div>
                                                                    </div>
                                                                    <div className='mind-therapy-rad'>
                                                                        <input className="mind-rad-input" type="radio" name="noSession" value={therapy.noMonths} checked={months === therapy.noMonths} onChange={e => setMonths(e.target.value)} />
                                                                    </div>
                                                                </div>

                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className='therapy-book-btn'>
                                            <button type="submit" className="therapy-button therapy-button-2">Book Session</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='mind-therapy-offers'>
                                        <h5>Offers Applied</h5>
                                        {
                                            element.therapyOffer.map((therapy) => {
                                                return (
                                                    <div key={therapy.key}>
                                                        <div className='therapy-offer'>
                                                            <div className='therapy-offer-i'>
                                                                <i className='bx bx-purchase-tag-alt bx-rotate-90' ></i>
                                                            </div>
                                                            <div className='therapy-offer-text'>
                                                                <p>{therapy.offer}</p>
                                                                <span>T&C</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <hr />
                                    </div>
                                    <div className='mind-therapy-works'>
                                        <h5>How It Works</h5>
                                        <div className='mind-therapy-work'>
                                            <img className='works' src={works1} alt="" ></img>
                                            <p>Select a plan that works for you or buy one recommended by our experts</p>
                                        </div>
                                        <div className='mind-therapy-work'>
                                            <img className='works' src={works2} alt="" ></img>
                                            <p>Set improvement targets in consultation with experts</p>
                                        </div>
                                        <div className='mind-therapy-work'>
                                            <img className='works' src={works3} alt="" ></img>
                                            <p>Track and review progress through periodic consultations</p>
                                        </div>
                                        <div className='mind-therapy-work'>
                                            <img className='works' src={works4} alt="" ></img>
                                            <p>Chat with experts on app</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div >
                        :
                        <div key={element.id}>
                            {/* Error: No such test available */}
                        </div>
                })
            }
            <Footer />
        </>
    )
}

export default MindTherapy