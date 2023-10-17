import {useState,useRef} from "react"
import { Container, Grid, TextField ,Button} from '@mui/material'
import {useNavigate} from "react-router-dom"
import {useFormik} from "formik"
import axios from "axios"

export default function Entry() {

    const nav = useNavigate()
    const rUid = useRef()
    const rName = useRef()
    const rSal = useRef()


    const initialValues = {"id":"","name":"","sal":""}

    const validate = (values) => {
      const errors={}
      if (values.id < 0 )
        errors.id = "Id cannot be -ve"
      else if (values.id === 0)
        errors.id = "Id cannot be 0"
      else if (values.id === "")
        errors.id = "Id cannot be empty"
      else if (values.name.trim().length < 2)
        errors.name = "Name cannot be less than 2 aplhabets"
      if (typeof values.name !== "string")
        errors.name = "Name cannot be numbers"
      else if (values.name === "")
			  errors.name = "Name cannot be empty"
      else if (values.name.trim() === "")
        errors.name = "Name cannot be empty spaces"
      else if (values.name.trim().length < 2)
        errors.name = "Name cannot be less than 2characters"
      else if (! values.name.match ('[A-z ]+'))
        errors.name = "Name should contain only aplhabets"
      if(values.sal === "")
        errors.sal = "Salary cannot empty"
      else if (values.sal.toString().length > 10)
        errors.sal = "Invalid Salary"
      else if  (values.sal < 8000)
        errors.sal = "Salary should atleast be 8000"      
      return errors;
    }
    
    const onSubmit = (values,{resetForm}) => {
      let url = "http://localhost:9999/entry"
      let data = {"id":values.id,"name":values.name,"sal":values.sal}
      axios.post(url,data)
      .then(res=>{
        if (res.status === 200)
          alert("Entry Saved")
          resetForm();
      })
      .catch(err=>{
        alert(err.response.data)
        resetForm();
      })
    }
  
    const formik = useFormik({initialValues,validate,onSubmit,initialTouched: {id: false,name: false,sal: false,},})

    const back = (event) => {
      event.preventDefault()
      nav('/')
    }

  return (
    <Container>
    <center>
      <h1>Add Entry</h1>
    </center>
    <a href="/" className="link">Back</a>
    <form onSubmit={formik.handleSubmit}> 
    <Grid container spacing={4} justifyContent="center" marginTop={'50px'}>
      <Grid item xs={10}>
        <TextField type = "number" label="Enter ID" variant="outlined" fullWidth 
        onChange={formik.handleChange} ref={rUid} onBlur = {formik.handleBlur} name="id"
        value = {formik.values.id}/>
        {formik.touched.id && formik.errors.id ? <div className = "err" > {formik.errors.id} </div> : null}
      </Grid>
      <Grid item xs={10}>
        <TextField type = "text" label="Enter Name" variant="outlined" fullWidth 
        onChange={formik.handleChange} ref={rName} onBlur = {formik.handleBlur} name="name"
        value = {formik.values.name}/>
        {formik.touched.name && formik.errors.name ? <div className = "err" > {formik.errors.name} </div> : null}
      </Grid>
      <Grid item xs={10}>
        <TextField type = "number" label="Enter Salary" variant="outlined" fullWidth 
        onChange={formik.handleChange} ref={rSal} onBlur = {formik.handleBlur} name="sal"
        value = {formik.values.sal}/>
        {formik.touched.sal && formik.errors.sal ? <div className = "err" > {formik.errors.sal} </div> : null}
      </Grid>

      <Grid item xs={10}>
        <Button className='submit-btn' type="submit" variant="contained" color="primary" fullWidth>
          Save
        </Button>
      </Grid>
      <Grid item xs={10}>
        <Button onClick={back} className='submit-btn' type="submit" variant="contained" color="primary" fullWidth>
          Back
        </Button>
      </Grid>
      <h1> {formik.values.ans} </h1>
      </Grid>
      </form>
      
      </Container>
  );
}


