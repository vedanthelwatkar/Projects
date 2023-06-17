import React from 'react'
import { Link } from 'react-router-dom';
import './CareItem.css'

const CareItem = (props) => {
    let { id, price, offerPrice, imageUrl } = props;

    return (
        <div>
            <div className='care-card' >
                <Link to={`/care/${id}`}>
                    <img className='care-card-img' src={imageUrl} alt='TEST' />
                    <div className='care-card-details'>
                        <div className='care-card-pr'>
                            <p>Price</p>
                            <p><s> {price}</s></p>
                        </div>
                        <div className='care-card-offer'>
                            <p>Offer Price</p>
                            <p>{offerPrice}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default CareItem