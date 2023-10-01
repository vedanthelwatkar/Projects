import { Container, Grid, TextField,Button } from "@mui/material";
import { useState,useRef } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function Admin(){

    const [user,setUser] = useState("")
    const [pass,setPass] = useState("")
    const [pass2,setPass2] = useState("")
    const [otp,setOtp] = useState("")
    const [validotp,setValidOtp] = useState("")
    const nav = useNavigate()
    
    
    const check= (event) => {
        event.preventDefault()

        if (pass.trim().length < 6){
            alert("Password must be above 6 characters")
            return
        }

        if (pass !== pass2){
            alert("Passwords do not match")
            setPass("")
            setPass2("")
            return
        }

        if(!otp){
            alert("Enter OTP first")
            setOtp("")
            return
        }

        if (!user){
            alert("Invalid username")
            return
        }

        if (parseInt(validotp) === parseInt(otp)){
            let url = "https://vms-oyzr.onrender.com/create"
            let data = {user,pass}
            axios.post(url,data)
            .then(res=>{
                if (res.status === 200){
                    alert("Account created Successfully")
                    nav("/admin")
                }
                else{
                    alert("Success: "+res.statusText)
                }
                })
                .catch(err=>{
                    alert("Error: "+ err.response.data)
                })
            }
            else{
                alert("Invalid OTP")
            }
        }
    
        

    
    const validate = (event) =>{
        event.preventDefault()
        let url = "https://vms-oyzr.onrender.com/otp"
        if (!user){
            alert("Invalid Username")
            return
        }
        let userData = { user };
        axios.post(url,userData)
        .then(res=>{
            if (res.status===200){
                setValidOtp(res.data.otp)
                alert("OTP sent")
            }
        })
        .catch(err=>{
            alert("Issue" + err)
        })
    }

    return(
        <>
        <Container>
      <center>
        <h1>Create admin account</h1>
      </center>
      <a href="/" className="link">Home</a>
      <form onSubmit={check}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10}>
          <TextField type = "email" label="Enter email"variant="outlined"fullWidth value={user}onChange={(event) => setUser(event.target.value)}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField type = "password" label="Enter password"variant="outlined"fullWidth value={pass}onChange={(event) => setPass(event.target.value)}/>
        </Grid>
        <Grid item xs={10}>
          <TextField type = "password" label="Enter password again"variant="outlined"fullWidth value={pass2}onChange={(event) => setPass2(event.target.value)}/>
        </Grid>
        <Grid item xs={10}>
        <form className = "getotp" onClick = {validate} style={{display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button type="submit" variant="contained" sx={{bgcolor: '#ffa900',width:"120px;"}}>Send OTP</Button>
        </form>
        </Grid>
        <Grid item xs={10}>
          <TextField type = "number" label="Enter OTP"variant="outlined" fullWidth value={otp}onChange={(event) => setOtp(event.target.value)}/>
        </Grid>
        <Grid item xs={10}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create
          </Button>
        </Grid>
        <Grid item xs={10}>
              <a href="/admin" className="create-user">Admin Login</a>
            </Grid>
        </Grid>
        
        </form>
        
        </Container>
        </>
    )
}