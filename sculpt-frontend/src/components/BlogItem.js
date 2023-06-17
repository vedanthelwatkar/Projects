import React from 'react';
import { Link } from 'react-router-dom';
import './BlogItem.css';


const BlogItem = (props) => {
    let { title, desp, image, link } = props;

    return (
        <>
            <div className='blog-card'>
                <a href={link} target="_blank" rel="noreferrer">
                    <div className='blog-card-img'>
                        <img src={image} alt="" />
                    </div>
                    <div className='blog-card-info'>
                        <div className='blog-info-title'>
                            <h3>{title}</h3>
                        </div>
                        <div className='blog-info-desp'>
                            <p>{desp}</p>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}

export default BlogItem