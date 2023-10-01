import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios"

export default function Home() {
  const [office, setOffice] = useState([]);
  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [time,setTime] = useState("")
  const [date,setDate] = useState("")
  const [visitee,setVisitee] = useState("")

  const send=(event)=>{
    event.preventDefault()
    console.log("clicked")
    if ((name.trim().length<2) || (name==="") || (!name.match(/^[A-z ]+$/))){
        alert("Invalid Name")
        return
    }
  
    if (phone.trim().length<10){
        alert("Invalid Phone number")
        return;
    }

    let url = "https://visitor-management-system--magenta-cat-a1272b.netlify.app/home"
    let data = {name,phone,time,date,visitee,office}
    axios.post(url,data)
    .then(response => {
      if (response.status === 200) {
          alert("Entry Saved");
          setName("")
          setDate("")
          setOffice("")
          setTime("")
          setVisitee("")
          setPhone("")
      } else if (response.statusText === "Duplicate Entry") {
          alert("Duplicate Entry");
      } else {
          alert("Error: " + response.statusText);
      }
    })
    .catch(err=>{
      console.log(err.response.data)
        alert("Error: " + err.response.data)
    })

}

  return (
    
    <Container>
      <center>
        <h1>Visitor Management System</h1>
      </center>
      <a href="/admin" className="link">Admin</a>
      <form onSubmit={send}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10} >
          <TextField label="Enter Name"variant="outlined"fullWidth value={name}onChange={(event) => setName(event.target.value)}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField label="Enter Phone no."variant="outlined"fullWidth value={phone}onChange={(event) => setPhone(event.target.value)}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField label="Enter In-Time"type="time"variant="outlined"fullWidth placeholder=""InputLabelProps={{
              shrink: true,
            }}
            value={time}
            onChange={(event) => setTime(event.target.value)}
            
          />
        </Grid>
        <Grid item xs={10}>
          <TextField label="Enter Date"type="date"variant="outlined"fullWidth placeholder="Enter Date"
          InputLabelProps={{shrink: true,}}value={date}onChange={(event) => setDate(event.target.value)}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField label="Enter Visitee"variant="outlined"fullWidth value={visitee}onChange={(event) => setVisitee(event.target.value)}
          />
        </Grid>
        <Grid item xs={10}>
        <FormControl variant="outlined" fullWidth>
        <InputLabel>Select Office</InputLabel>
        <Select label="Select Office"variant="outlined"fullWidth value={office}onChange={(event) => setOffice(event.target.value)}
        >
            <MenuItem value="Office1">Office 1</MenuItem>
            <MenuItem value="Office2">Office 2</MenuItem>
            <MenuItem value="Office3">Office 3</MenuItem>
            <MenuItem value="Office4">Office 4</MenuItem>
            <MenuItem value="Office5">Office 5</MenuItem>
        </Select>
        </FormControl>
        </Grid>
        <Grid item xs={10}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
      </form>
    </Container>

  );
}
