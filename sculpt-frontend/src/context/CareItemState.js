import { useState } from 'react';
import careitemContext from "./careitemContext";

const CareItemState = (props) => {
    const host = "http://localhost:5000"
    const careitemsInitial = [];
    const [careitems, setCareItems] = useState(careitemsInitial);

    // Get all Items
    const getCareItems = async () => {
        // API CALL
        const response = await fetch(`${host}/api/careItems/fetchcareitems`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setCareItems(json);
    }

    return (
        <careitemContext.Provider value={{ careitems, getCareItems }}>
            {props.children}
        </careitemContext.Provider>
    )
}

export default CareItemState