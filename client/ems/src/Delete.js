import {useRef} from "react"
import { Container, Grid, TextField ,Button} from '@mui/material'
import {useNavigate} from "react-router-dom"
import {useFormik} from "formik"
import axios from "axios"

export default function Delete() {

    const nav = useNavigate()
    const rUid = useRef()


    const initialValues = {"id":""}

    const validate = (values) => {
      const errors={}
      if (values.id < 0 )
        errors.id = "Id cannot be -ve"
      else if (values.id === 0)
        errors.id = "Id cannot be 0"
      else if (values.id === "")
        errors.id = "Id cannot be empty"
      return errors;
    }
    
    const onSubmit = (values, { resetForm }) => {
      let url = "http://localhost:9999/del"
      let data = {"id":values.id}
      axios.post(url,data)
      .then(res=>{
        if (res.status === 200)
          alert("Entry Deleted")
          resetForm();
      })
      .catch(err=>{
        alert(err.response.data)
        resetForm();
      })
    }
  
    const formik = useFormik({initialValues,validate,onSubmit,initialTouched: {id: false,},})

    const back = (event) => {
      event.preventDefault()
      nav('/')
    }

  return (
    <Container>
    <center>
      <h1>Delete Entry</h1>
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
        <Button className='submit-btn' type="submit" variant="contained" color="primary" fullWidth>
          Delete
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


