import React from 'react';
import { Link } from 'react-router-dom';
import './TherapyItem.css';

const MindItem = (props) => {
    let { therapyName, therapyDesp, therapySession, price, offerPrice, imageUrl, id } = props;

    return (
        <>
            <div className='mind-card' >
                <Link to={`/mind/${id}`}>
                    <img className='mind-card-img' src={imageUrl} alt='TEST' />
                    <div className='mind-card-details'>
                        <div className='mind-card-name'>
                            <p>{therapyName}</p>
                        </div>
                        <div className='mind-card-line' />
                        <div className='mind-card-desp'>
                            <p>{therapyDesp}</p>
                        </div>
                        <div className='mind-card-session'>
                            <i className='bx bx-time-five'></i>
                            <p>{therapySession}</p>
                        </div>
                        <div className='mind-card-p'>
                            <div className='mind-card-price'>
                                <i className='bx bx-rupee'></i>
                                <p><s>{price}</s></p>
                            </div>
                            <div className='mind-card-offerPrice'>
                                <i className='bx bx-rupee'></i>
                                <p>{offerPrice}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default MindItem