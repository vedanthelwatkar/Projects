import {useFormik} from "formik"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import TextField from "@mui/material/TextField"
import Grid from '@mui/material/Grid'
import Box from  '@mui/material/Box'
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import LockIcon from '@mui/icons-material/Lock';
import Avatar from "@mui/material/Avatar"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Cookies from "js-cookie"
import { customAlert } from './alertUtils';

export default function SignUp(){
    const nav = useNavigate()
    const storedToken = Cookies.get("token");
  
    useEffect(() => {
      if (storedToken) {
        nav("/home");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storedToken]);

    const initialValues={"first_name":"","last_name":"","email":"","password1":"","password2":"","tnc":""}

    const validate = (values) => {
        const errors = {}
        //Validation for first name
        if (values.first_name === "")
			errors.first_name = "First name cannot be empty"
		else if (values.first_name.trim() === "")
			errors.first_name = "First name cannot be empty spaces"
		else if (values.first_name.trim().length < 2)
			errors.first_name = "First name cannot be less than 2 characters"
		else if (! values.first_name.match ('[A-z ]+'))
			errors.first_name = "First name should contain only aplhabets"
        //Validation for last name
        if (values.last_name === "")
			errors.last_name = "Last name cannot be empty"
		else if (values.last_name.trim() === "")
			errors.last_name = "Last name cannot be empty spaces"
		else if (values.last_name.trim().length < 2)
			errors.last_name = "Last name cannot be less than 2 characters"
		else if (! values.last_name.match ('[A-z ]+'))
			errors.last_name = "Last name should contain only aplhabets"
        //Validation for email
        if (values.email === "")
            errors.email = "Email cannot be empty"
        else if (! values.email.match('[A-z@. ]'))
            errors.email = "Email should contain only alphabets and @"
        else if (! values.email.includes("@"))
            errors.email = "Invalid Email"
        else if (values.email.trim().length === "")
			errors.email = "Email name cannot be empty spaces"
        //Validation for password 1
        if(values.password1 === "")
            errors.password1 = "Password cannot be empty"
        else if(values.password1.trim().length === "")
            errors.password1 = "Password cannot be empty spaces"
        else if(values.password1.trim().length < 6 )
            errors.password1 = "Password cannot be less than 6 characters"
        else if(values.password1 !== values.password2)
            errors.password1 = "Passwords are not same"
        //Validation for password 2 
        if(values.password2 === "")
            errors.password2 = "Password cannot be empty"
        else if(values.password2.trim().length === "")
            errors.password2 = "Password cannot be empty spaces"
        else if(values.password2.trim().length < 6 )
            errors.password2 = "Password cannot be less than 6 characters"

        if (!values.tnc)
            errors.tnc = "You must agree to our Terms and Conditions";

        return errors
    }

    
    const onSubmit = async (values,{resetForm}) => {
        const csrfToken = "6NTn65Uehp8qo6HD5HIO66lSpX5kDhUf"; // Replace this with the actual CSRF token fetched from the backend
      
        let data = {
          "first_name": values.first_name,
          "last_name": values.last_name,
          "email": values.email,
          "password": values.password1
        };
        console.log(data)
      
        let url = "https://docgpt.pythonanywhere.com/signup/";
        
        try {
            const response = await axios.post(url, data, {
                headers: {
                  'X-CSRFToken': csrfToken,
                }
              });
              console.log(response);
              if (response && response.data) {
                const message = response.data.message;
                if (message === 'AE'){
                  customAlert('Email Already Exists');
                  values.email=""
                  return;
                } else {
                  nav("/");
                }
              }
              console.log("Data saved successfully.");
        } catch (err) {
          console.log("issue " + err);
        }
      };
      

    const formik =  useFormik({initialValues,validate,onSubmit})

	return(
    <>
    <Container component="main" maxWidth="xs">
        <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
        <Avatar sx={{ width: 60, height: 60, bgcolor: '#183D3D' }}>
            <LockIcon/>
        </Avatar>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField name = "first_name" id = "first_name" label = "First Name" autoFocus required 
                        InputProps={{style: { backgroundColor: '#93B1A6', color: 'white' },}}InputLabelProps={{style: { color: '#fff' },}}
                        onChange = {formik.handleChange} onBlur = {formik.handleBlur} value = {formik.values.first_name}/>
                        {formik.touched.first_name && formik.errors.first_name ? <div className = "err" > {formik.errors.first_name} </div> : null}
                    </Grid>
                    <Grid item xs={12} sm={6}> 
                        <TextField name = "last_name" id = "last_name" label = "Last Name" required
                        InputProps={{style: { backgroundColor: '#93B1A6', color: 'white' },}}InputLabelProps={{style: { color: '#fff' },}}
                        onChange = {formik.handleChange} onBlur = {formik.handleBlur} value = {formik.values.last_name}/> 
                        {formik.touched.last_name && formik.errors.last_name ? <div className = "err" > {formik.errors.last_name} </div> : null}
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField required fullWidth name = "email" id = "email" label = "Email Address"
                        InputProps={{style: { backgroundColor: '#93B1A6', color: 'white' },}}InputLabelProps={{style: { color: '#fff' },}}
                        onChange = {formik.handleChange} onBlur = {formik.handleBlur} value = {formik.values.email}/>
                        {formik.touched.email && formik.errors.email ? <div className = "err" > {formik.errors.email} </div> : null}
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField required fullWidth type="password" name = "password1" id = "password1" label = "Enter Password"
                        InputProps={{style: { backgroundColor: '#93B1A6', color: 'white' },}}InputLabelProps={{style: { color: '#fff' },}}
                        onChange = {formik.handleChange} onBlur = {formik.handleBlur} value = {formik.values.password1}/>
                        {formik.touched.password1 && formik.errors.password1 ? <div className = "err" > {formik.errors.password1} </div> : null} 
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField required fullWidth type="password" name = "password2" id = "password2" label = "Repeat Password"
                        InputProps={{style: { backgroundColor: '#93B1A6', color: 'white' },}}InputLabelProps={{style: { color: '#fff' },}}
                        onChange = {formik.handleChange} onBlur = {formik.handleBlur} value = {formik.values.password2}/>
                        {formik.touched.password2 && formik.errors.password2 ? <div className = "err" > {formik.errors.password2} </div> : null}
                    </Grid>
                </Grid>
                <FormControlLabel control={<Checkbox name = "tnc" value={formik.values.tnc}style={{ color: '#F0F0F0' }} onChange = {formik.handleChange} onBlur = {formik.handleBlur} color="primary" />} label="By creating an account you agree to our T&C"style={{ color: '#F0F0F0' }}/>
                {formik.touched.tnc && formik.errors.tnc ? <div className = "err" > {formik.errors.tnc} </div> : null}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 , bgcolor: '#183D3D'}}>Sign Up</Button>
                <p className="login-link">
Already have an account ? <a href="/login">Login</a>
</p>

                
            </Box>
        </Box>
    </Container>
    </>
    )
}