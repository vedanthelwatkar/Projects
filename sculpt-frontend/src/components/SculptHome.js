import React from "react";
// import therapyitemContext from "../context/therapyitemContext";
import "./SculptHome.css";
import { Link, useNavigate } from "react-router-dom";


const SculptHome = (props) => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    // const context = useContext(therapyitemContext);
    // const { therapyitems, getTherapyItems } = context;

    // useEffect(() => {
    //     getTherapyItems();
    // }, [])

    return (
        <>
            <div className="home">
                {!(localStorage.getItem('token')) ?
                    <form className="d-flex" role="search">
                        <div className="links">
                            <Link className="btn btn-primary mx-2 link" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2 link" to="/register" role="button">Signup</Link>
                            <Link className="btn btn-primary mx-2 link" to="/care" role="button">Care</Link>
                            <Link className="btn btn-primary mx-2 link" to="/mind" role="button">Mind</Link>
                            <Link className="btn btn-primary mx-2 link" to="/store" role="button">Store</Link>
                        </div>
                    </form>
                    : <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                }
                {/* <div className="testssss">
                    {
                        therapyitems.map((items) => {
                            return (
                                <div className="aaa" key={items.id}>
                                    <p>{items.therapyName}</p>
                                    <p>{items.therapyPrice}</p>
                                </div>
                            )
                        })
                    }
                </div> */}
            </div>
        </>
    )
}

export default SculptHome;