import { useState,useEffect } from "react";
import axios from "axios"

export default function Entries(){

    const [info,setInfo] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        let url = "https://vms-oyzr.onrender.com/entries"
        axios.get(url)
        .then(res=>{
            setInfo(res.data)
            setLoading(false);
        })
        .catch(err=>{
            alert("Issue " + err)
        })
    },[])

    const delEnt=(phone)=>{
        let url = "https://vms-oyzr.onrender.com/del"
        let data = {phone}
        axios.post(url,data)
        .then(res=>{
            if(res.status===200){
                alert("SUCCESS: Record deleted");
                window.location.reload();
            }
        })
        .catch(err=>{
            alert("Issue " + err)
        })

    }
    console.log(info);

   return (
    <>
      <center>
        <h1>Entries</h1>
        <a href="/" className="link">
          Home
        </a>
        {loading ? (
          // Display loading message or spinner while data is loading
          <p>Loading...</p>
        ) : (
          <table border="4" className="table">
            {/* Your table header */}
            <tbody>
              {info.map((e) => (
                <tr style={{ textAlign: "center" }} key={e.phone}>
                  {/* Your table data */}
                  <td>{e.name}</td>
                  <td>{e.phone}</td>
                  <td>{e.time}</td>
                  <td>{e.date}</td>
                  <td>{e.visitee}</td>
                  <td>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this entry?"))
                          delEnt(e.phone);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </center>
    </>
  );
}