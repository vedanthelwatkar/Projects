import React, { useContext, useEffect } from 'react';
import blogitemContext from '../context/blogitemContext';
import './BlogFitness.css';
import logo from '../images/logo.png';
import BlogItem from "./BlogItem";
import { Link } from 'react-router-dom';

const BlogFitness = () => {
    const context = useContext(blogitemContext);
    const { blogitems, getBlogItems } = context;
    // let len = blogitems.length;

    useEffect(() => {
        getBlogItems();
    }, [])

    return (
        <>
            <div className='sculpt-blog'>
                <div className='blog-navbar'>
                    <div className='blog-nav'>
                        <div className='blog-nav-logo'>
                            <Link to="/">
                                <img src={logo} alt="" />
                            </Link>
                        </div>
                        <div className='blog-nav-items'>
                        </div>
                    </div>
                </div>
                <div className='blog-items'>
                    {blogitems.map((element, index) => {
                        return (
                            <div className='blog-container' key={index}>
                                {/* <p>Title: {element.title}</p>
                        <p>Desp: {element.desp}</p>
                        <p>Image: {element.imageURL}</p>
                        <p>Link: {element.link}</p> */}
                                {/* <p>{len}</p> */}
                                <BlogItem title={element.title} desp={element.desp} image={element.imageURL} link={element.link} />
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default BlogFitness;