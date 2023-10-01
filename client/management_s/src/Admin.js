import { Container, Grid, TextField,Button } from "@mui/material";
import { useState,useRef } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function Admin(){

    const [user,setUser] = useState("")
    const [pass,setPass] = useState("")
    const nav = useNavigate()


    const check= (event) => {
        event.preventDefault()

        if (pass.trim().length < 6){
            alert("Password must be above 6 characters")
            return
        }
    
        if (!user){
            alert("Invalid username")
            return
        }
        
        let url = "https://vms-oyzr.onrender.com/check"
        let data = {user,pass}
        axios.post(url,data)
        .then(res=>{
            if (res.status === 200){
                nav("/entries")
            }
            else{
                alert("Success: "+res.statusText)
            }
        })
        .catch(err=>{
            alert("Error: "+ err.response.data)
        })
    }


    return(
        <>
        <Container>
      <center>
        <h1>Admin Login</h1>
      </center>
      <a href="/" className="link">Home</a>
      <form onSubmit={check}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10}>
          <TextField type = "email"label="Enter email"variant="outlined" fullWidth value={user}onChange={(event) => setUser(event.target.value)}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField type = "password"label="Enter password"variant="outlined" fullWidth value={pass}onChange={(event) => setPass(event.target.value)}/>
        </Grid>

        <Grid item xs={10}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Grid>
        <Grid item xs={10}>
              <a href="/create" className="create-user">Create admin account</a>
            </Grid>
        </Grid>
        
        </form>
        
        </Container>
        </>
    )
}