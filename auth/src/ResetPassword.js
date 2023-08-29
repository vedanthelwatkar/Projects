import {useFormik} from "formik"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import TextField from "@mui/material/TextField"
import Grid from '@mui/material/Grid'
import Box from  '@mui/material/Box'
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import LockResetIcon from '@mui/icons-material/LockReset';
import Avatar from "@mui/material/Avatar"
import Cookies from "js-cookie";
import { customAlert } from './alertUtils';

export default function ResetPassword(){

  const storedToken = Cookies.get("token");
  
  useEffect(() => {
    if (storedToken) {
      nav("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedToken]);


    const nav = useNavigate()

    const initialValues={"email":"","otp":"","password1":"","password2":""}

    const validate = (values) => {
        const errors = {}
        // Validation for email
        if (!values.email)
          errors.email = "Email cannot be empty"
        else if (!values.email.match('[A-z@. ]'))
          errors.email = "Email should contain only alphabets and @"
        else if (!values.email.includes("@"))
          errors.email = "Invalid Email"
        else if (!values.email.trim())
          errors.email = "Email name cannot be empty spaces"
      
        // Validation for otp
        if (!values.otp)
          errors.otp = "Otp cannot be empty"
        else if (!values.otp.toString().trim())
          errors.otp = "Otp cannot be empty spaces"
        else if (values.otp.toString().trim().length < 6)
          errors.otp = "Otp cannot be less than 6 numbers"
      
        // Validation for password 1
        if (!values.password1)
          errors.password1 = "Password cannot be empty"
        else if (!values.password1.trim())
          errors.password1 = "Password cannot be empty spaces"
        else if (values.password1.trim().length < 6)
          errors.password1 = "Password cannot be less than 6 characters"
        else if (values.password1 !== values.password2)
          errors.password1 = "Passwords are not same"
      
        // Validation for password 2
        if (!values.password2)
          errors.password2 = "Password cannot be empty"
        else if (!values.password2.trim())
          errors.password2 = "Password cannot be empty spaces"
        else if (values.password2.trim().length < 6)
          errors.password2 = "Password cannot be less than 6 characters"
      
        return errors
      }

      const csrfToken = "6NTn65Uehp8qo6HD5HIO66lSpX5kDhUf";
      
      const onSubmit = async (values,{resetForm}) => {
        let url = "https://docgpt.pythonanywhere.com/reset/";
        let data = {
            "email":values.email,
            "otp":values.otp,
            "password":values.password1
        };
      
        try {
          const response = await axios.post(url, data, {
            headers: {
              'X-CSRFToken': csrfToken,
            }
          });
            
            const message = response.data.message;
            if (message === 'Password updated successfully.'){
                customAlert("Password Changed")
                nav("/login")}
            else{
                customAlert('Issue');
                return
              }
          }
         catch (err) {
          console.log("issue " + err);
        }
      };
      
    const formik =  useFormik({initialValues,validate,onSubmit})

    const otp = (event) => {
        event.preventDefault()
            let url = "http://docgpt.pythonanywhere.com/otp/";
            let data = {
              "email":formik.values.email
            };
          
            try {
              axios.post(url, data, {
                headers: {
                  'X-CSRFToken': csrfToken,
                }
              });
                customAlert('otp sent')
                nav("/reset")
                
              }
             catch (err) {
              console.log("issue " + err);
            }
          };


	return(
    <>
    <Container component="main" maxWidth="xs">
        <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
        <Avatar sx={{ width: 60, height: 60, bgcolor: '#183D3D' }}>
            <LockResetIcon/>
        </Avatar>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}> 
                        <TextField autoFocus required fullWidth name = "email" id = "email" label = "Email Address"
                        InputProps={{style: { backgroundColor: '#93B1A6', color: 'white'},}} InputLabelProps={{style: { color: '#fff' },}}
                        onChange = {formik.handleChange} onBlur = {formik.handleBlur} value = {formik.values.email} style={{ width:"400px" }}/>
                        {formik.touched.email && formik.errors.email ? <div className = "err" > {formik.errors.email} </div> : null}
                    </Grid>
                </Grid>
            </Box>
            <form className = "getotp" onSubmit = {otp} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Button type="submit" variant="contained" sx={{ mt: 0, mb: 3, bgcolor: '#183D3D',width:"120px;"}}>Send OTP</Button>
    </form>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={2}>
                    <Grid item xs={12}> 
                        <TextField required fullWidth type="number" name = "otp" id = "otp" label = "Enter Otp"
                        InputProps={{style: { backgroundColor: '#93B1A6', color: 'white'},}} InputLabelProps={{style: { color: '#fff' },}}
                        onChange = {formik.handleChange} onBlur = {formik.handleBlur} value = {formik.values.otp}/>
                        {formik.touched.otp && formik.errors.otp ? <div className = "err" > {formik.errors.otp} </div> : null} 
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField required fullWidth type="password" name = "password1" id = "password1" label = "Enter Password"
                        InputProps={{style: { backgroundColor: '#93B1A6', color: 'white'},}} InputLabelProps={{style: { color: '#fff' },}}
                        onChange = {formik.handleChange} onBlur = {formik.handleBlur} value = {formik.values.password1}/>
                        {formik.touched.password1 && formik.errors.password1 ? <div className = "err" > {formik.errors.password1} </div> : null} 
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField required fullWidth type="password" name = "password2" id = "password2" label = "Repeat Password"
                        InputProps={{style: { backgroundColor: '#93B1A6', color: 'white'},}} InputLabelProps={{style: { color: '#fff' },}}
                        onChange = {formik.handleChange} onBlur = {formik.handleBlur} value = {formik.values.password2}/>
                        {formik.touched.password2 && formik.errors.password2 ? <div className = "err" > {formik.errors.password2} </div> : null} 
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 , bgcolor: '#183D3D'}}>Reset Password</Button>
            </Box>
        </Box>
        <p className="login-link"><a href="/login">Login Page</a></p>
        
    </Container>

    </>
    )
}
