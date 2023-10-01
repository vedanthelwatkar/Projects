import { useState,useEffect } from "react";
import axios from "axios"

export default function Entries(){

    const [info,setInfo] = useState([])

    useEffect(()=>{
        let url = "http://localhost:8888/entries"
        axios.get(url)
        .then(res=>{
            setInfo(res.data)
            console.log(res.data)
        })
        .catch(err=>{
            alert("Issue " + err)
        })
    },[])

    const delEnt=(phone)=>{
        let url = "http://localhost:8888/del"
        let data = {phone}
        console.log("data",data)
        axios.post(url,data)
        .then(res=>{
            console.log(res)
            if(res.status===200){
                alert("SUCCESS: Record deleted");
                window.location.reload();
            }
        })
        .catch(err=>{
            console.log(err)
            alert("Issue " + err)
        })

    }

    return(
        <>
        <center>
        <h1>Entries</h1>

        <a href="/" className="link">Home</a>
		<table border="4" className="table">
			<tr>
			<th>	Name	</th>
			<th>	Phone	</th>
			<th>	Time	</th>
			<th> 	Date	</th>
            <th> 	Visitee	</th>
			<th> 	Delete	</th>
			</tr>
			
		{
			info.map( (e) => (
			<tr style={{textAlign : "center"}}>
			<td>	{e.name}		</td>
			<td>	{e.phone}	</td>
			<td>	{e.time}	</td>
            <td>	{e.date}	</td>
            <td>	{e.visitee}	</td>
			<td> <button onClick = { () => {if (window.confirm(' Are you sure you want to delete this entry? ')) delEnt(e.phone); console.log("phone"+e.phone) }}>
			Delete </button> </td>
			</tr>

		))
	}

		</table>	
        </center>
        </>
    )
}