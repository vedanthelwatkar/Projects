import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
// import LabTest from './CareLabTest.json';
import careitemContext from "../context/careitemContext";
import './CareTestItem.css';
import logo from '../images/logo.png'
import Navbar from './Navbar';
import Footer from './Footer';

const CareTestItem = (props) => {
    let params = useParams();
    const [isActive, setIsActive] = useState(false);
    const toggleActive = (e) => {
        isActive ? setIsActive(false) : setIsActive(true);
        console.log(isActive);
    }

    const navigate = useNavigate();
    const test_home = () => {
        navigate("/");
    }
    const test_care = () => {
        navigate("/care");
    }
    const test_lab = () => {
        navigate();
    }

    const context = useContext(careitemContext);
    const { careitems, getCareItems } = context;
    useEffect(() => {
        getCareItems();
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
                careitems.map((element) => {
                    return element.id === params.careTestId ?
                        <div key={element.id}>
                            <div className={`care-tests-page${isActive ? " activePage" : ""}`} id='blurPage'>
                                <div className='care-test-image'>
                                    <img src={element.fullImageURL} alt={element.testName} />
                                </div>
                                <div className='card-test-all'>
                                    <div className='care-test-link'>
                                        <p onClick={test_home}>Home {'>'}</p>
                                        <p onClick={test_care}>Care {'>'}</p>
                                        <p onClick={test_lab} style={{ color: "black" }}>{element.testName}</p>
                                    </div>
                                    <div className='care-test-details'>
                                        <div className='care-test-card'>
                                            <h2><b>{element.testName}</b></h2>
                                            <p>{element.testDesc}</p>
                                            <div className='care-test-price'>
                                                <div className='care-card-price'>
                                                    <i className='bx bx-rupee'></i>
                                                    <p><s>{element.price}</s></p>
                                                </div>
                                                <div className='care-card-offerPrice'>
                                                    <i className='bx bx-rupee'></i>
                                                    <p>{element.offerPrice}</p>
                                                </div>
                                                {/* </div> */}
                                            </div>
                                            <div className='care-test-info'>
                                                <div className='care-test-repo'>
                                                    <div className='care-test-repo-align'>
                                                        <div className='care-test-repo-icon'>
                                                            <i className='bx bx-time care-sp' ></i>
                                                        </div>
                                                        <div className='care-test-repo-text'>
                                                            <p>{element.noOfTests} Tests</p>
                                                        </div>
                                                    </div>
                                                    <div className='care-test-repo-align'>
                                                        <div className='care-test-repo-icon'>
                                                            <i className='bx bx-test-tube care-sp' ></i>
                                                        </div>
                                                        <div className='care-test-repo-text'>
                                                            <p>Report ready in {element.reportTime}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='care-test-buy'>
                                                    <button type="submit" className="care-button care-button-2">Buy Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='care-test-include'>
                                        <p><b>
                                            Tests Included
                                        </b></p>
                                        <div className="d-flex justify-content-between">
                                            {
                                                element.testsInclude.map((test) => {
                                                    return (
                                                        <div key={test.key}>
                                                            <div className='care-testInclude-card' >
                                                                <div className='care-testInclude-card-img'>
                                                                    <div className='care-testInclude-card-img2' onClick={toggleActive}>
                                                                        <img src={test.url} alt='TEST' />
                                                                    </div>
                                                                </div>
                                                                <div className='care-testInclude-card-details'>
                                                                    <div className='care-testInclude-card-name'>
                                                                        <p>{test.name.slice(0, 25)}...</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className={`${isActive ? "activeTest" : ""}`} id='popupTest'>
                                <div className='care-popup-all'>
                                    <div className="d-flex justify-content-between">
                                        {
                                            element.testsInclude.map((test) => {
                                                return (
                                                    <div key={test.key}>
                                                        <div className='care-popup-test' >
                                                            <div className='care-popup-details'>
                                                                <div className='care-popup-details-img'>
                                                                    <img src={test.url} alt='TEST' />
                                                                </div>
                                                                <div className='care-popup-details-info'>
                                                                    <h4>
                                                                        {test.name}
                                                                    </h4>
                                                                    <div className='care-popup-repo'>
                                                                        <div className='care-popup-repo-align'>
                                                                            <div className='care-popup-repo-icon'>
                                                                                <i className='bx bx-time care-sp' ></i>
                                                                            </div>
                                                                            <div className='care-popup-repo-text'>
                                                                                <p>{test.tests} Tests</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='care-popup-repo-align'>
                                                                            <div className='care-popup-repo-icon'>
                                                                                <i className='bx bx-test-tube care-sp' ></i>
                                                                            </div>
                                                                            <div className='care-popup-repo-text'>
                                                                                <p>{test.time}</p>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='care-popup-desp'>
                                                                <p>{test.desp}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='bc'>
                                        <button className='btn btn-primary' onClick={toggleActive}>close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default CareTestItem