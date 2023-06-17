import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StoreNavbar from './StoreNavbar';
import Sport_Men from './Sport_Men.json';
import './StoreItem.css';

const StoreItem = (props) => {
    let params = useParams();

    const navigate = useNavigate();
    const store_main = () => {
        navigate("/store");
    }
    const store_menTshirts = () => {
        navigate("/store/menTshirt");
    }
    const store_current = () => {
        navigate();
    }

    // const price = 779;
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script")
            script.src = src
            script.onload = () => {
                resolve(true)
            }

            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const displayRazorpay = async (amount) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if (!res) {
            alert('You are Offline')
            return
        }

        const options =
        {
            key: "rzp_test_R3a6IpjZomDjSN",
            currency: "INR",
            amount: amount,
            name: "Sculpt",
            descripyion: "Thanks for purchasing",

            handler: function (response) {
                alert(response.razorpay_payment_id)
                alert("payment succesfull")
            },
            prefill: {
                name: "Sculpt"
            }
            // if(response.razorpay_payment_id)

        };
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }


    return (
        <>
            <StoreNavbar />
            {
                Sport_Men.map((element) => {
                    return element.id === params.storeItemId ?
                        <div key={element.id}>
                            <div className='store-item-main'>
                                <div className='store-item-images'>
                                    <div className='row my-1'>
                                        {
                                            element.mainImg.map((image) => {
                                                return (
                                                    <div className='col-md-6 my-4'>
                                                        <div className='store-item-leftImages'>
                                                            <img src={image} alt="" />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )}
                                    </div>
                                </div>
                                <div className='store-item-right'>
                                    <div className='store-item-link'>
                                        <p onClick={store_main}>Store {'>'}</p>
                                        <p onClick={store_menTshirts}>Men Tshirts {'>'}</p>
                                        <p onClick={store_current}> <b>{element.name}</b></p>
                                    </div>
                                    <div className='store-item-titles'>
                                        <p>SCULPTSPORT</p>
                                        <h2><b>{element.name}</b></h2>
                                    </div>
                                    <div className='store-item-prices'>
                                        <div className='store-item-op'>
                                            <i className='bx bx-rupee'></i>
                                            <p> {element.offerPrice}</p>
                                        </div>
                                        <div className='store-item-pr'>
                                            <i className='bx bx-rupee'></i>
                                            <p><s> {element.price} </s></p>
                                        </div>
                                        <div className='store-item-off'>
                                            <p>{element.perOff}</p>
                                        </div>
                                    </div>
                                    <div className='store-item-desp'>
                                        <p>{element.desp}</p>
                                    </div>
                                    <div className='store-item-sizes'>
                                        <p>Choose Size</p>
                                        <div className='size-row'>
                                            {
                                                element.sizes.map((size) => {
                                                    return (
                                                        <div className='store-item-nestedSizes'>
                                                            <p>{size}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='store-item-buttons'>
                                        <div className='store-item-cart'>
                                            <button type="submit" className="store-item-button store-item-button-2">Add to Cart</button>
                                        </div>
                                        <div className='store-item-buy'>
                                            {/* <button type="submit" className="store-item-button store-item-button-2">Buy Now</button> */}
                                            <button className="store-item-button store-item-button-2" onClick={() => displayRazorpay(element.offerPrice)}>Buy Now</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='store-item-product'>
                                        <p>PRODUCT DETAILS</p>
                                        {
                                            element.details.map((detail) => {
                                                return (
                                                    <div className='store-item-nestedDetail'>
                                                        <li>{detail}</li>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <hr />
                                    <div className='store-item-delivery'>
                                        <input type="text" id="fname" name="firstname" placeholder="Enter your pincode" />
                                        <ul className='store-item-delivery-info'>
                                            <li>Free delivery within 5-7 days</li>
                                            <li> Easy 30 days return available</li>
                                            <li>30 days exchange available</li>
                                            <li><b>To minimise contact between you and the delivery partner, Pay on Delivery option is temporarily disabled</b></li>
                                        </ul>
                                    </div>
                                    <hr />
                                    <div className='store-item-specs'>
                                        <p>Country of Origin: {element.specs}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div key={element.id}>

                        </div>
                })
            }
        </>
    )
}

export default StoreItem