import React from 'react';
import { Link } from 'react-router-dom';
import './StoreCard.css';

function StoreCard(props) {
    return (
        <div className="sport-card-container-inner-card">
            <Link to={`/store/${props.id}`}>
                <img src={props.image} alt="hero_img" />

                <div className="sport-inner-card-head">
                    <p>SCULTSPORT</p>
                </div>

                <div className='sport-inner-card-details'>
                    <div className='sport-card-details-title'>
                        {props.name}
                    </div>
                    <div className='sport-card-details-price'>
                        <div className='card-details-op'>
                            <i className='bx bx-rupee'></i>
                            <p>{props.offerPrice}</p>
                        </div>
                        <div className='card-details-p'>
                            <i className='bx bx-rupee'></i>
                            <s><p>{props.price}</p></s>
                        </div>

                        <div className='card-details-off'>
                            <p>{props.perOff}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default StoreCard