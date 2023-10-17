import { useState,useEffect } from "react";
import axios from "axios"
import {Container, Grid ,Button} from '@mui/material'
import { useNavigate } from "react-router-dom";

export default function View(){

    const [info,setInfo] = useState([])
    const [loading, setLoading] = useState(true);
    const nav = useNavigate()

    useEffect(()=>{
        let url = "http://localhost:9999/view"
        axios.get(url)
        .then(res=>{
          if (res.status === 200) {
            setInfo(res.data)
          } else {
            alert("Server returned an error: " + res.status);
          }
            setLoading(false);
        })
        .catch(err=>{
            alert("Issue " + err)
        })
    },[])

    const back = (event) => {
      event.preventDefault()
      nav('/')
    }

    return (
    <>
      <center>
        <h1>Entries</h1>
        <a href="/" className="link">
          Home
        </a>
        <Container>
        <Grid container spacing={4} justifyContent="center" marginTop={'50px'}>
        <Grid item xs={10}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table border="4" className="table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Salary</th>
                </tr>
            </thead>
            <tbody>
              {info.map((e) => (
                <tr style={{ textAlign: "center" }} key={e.phone}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.sal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </Grid>
        <Grid item xs={10}>
        <Button onClick={back} className='submit-btn' type="submit" variant="contained" color="primary" fullWidth>
          Back
        </Button>
      </Grid>
      </Grid>
      </Container>
      </center>
    </>
  );
}