import { useState } from 'react';
import blogitemContext from "./blogitemContext";

const BlogItemState = (props) => {
    const host = "http://localhost:5000"
    const blogitemsInitial = [];
    const [blogitems, setBlogItems] = useState(blogitemsInitial);
    // Get all Items
    const getBlogItems = async () => {
        // API CALL
        const response = await fetch(`${host}/api/blogItems/crawl`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': localStorage.getItem('token')
            },
        });
        const blogs = await response.json();
        console.log(blogs);
        setBlogItems(blogs);
    }

    return (
        <blogitemContext.Provider value={{ blogitems, getBlogItems }}>
            {props.children}
        </blogitemContext.Provider>
    )
}

export default BlogItemState