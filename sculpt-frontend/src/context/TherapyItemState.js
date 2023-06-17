import { useState } from 'react';
import therapyitemContext from "./therapyitemContext";

const TherapyItemState = (props) => {
    const host = "http://localhost:5000"
    const therapyitemsInitial = [];
    const [therapyitems, setTherapyItems] = useState(therapyitemsInitial);

    const getTherapyItems = async () => {
        const response = await fetch(`${host}/api/therapyItems/fetchtherapyitems`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        console.log(json);
        setTherapyItems(json);
    }

    return (
        <therapyitemContext.Provider value={{ therapyitems, getTherapyItems }}>
            {props.children}
        </therapyitemContext.Provider>
    )
}

export default TherapyItemState