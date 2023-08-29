import {useFormik} from "formik"
import axios from "axios"
import TextField from "@mui/material/TextField"
import Grid from '@mui/material/Grid'
import Box from  '@mui/material/Box'
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import LoginIcon from '@mui/icons-material/Login';
import Avatar from "@mui/material/Avatar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Cookies from "js-cookie";
import { auth ,} from "./FirebaseConfig";
import { GoogleAuthProvider } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"
import GoogleButton from 'react-google-button'
import { customAlert } from './alertUtils';


export default function Login(){
    const nav = useNavigate()
    const storedToken = Cookies.get("token");
    
  
    useEffect(() => {
      if (storedToken) {
        nav("/home");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storedToken]);
  

    const initialValues={"email":"","password":""}

    const handleGoogleSignIn = async () => {
      try {
        const provider = new GoogleAuthProvider(); // Use the 'auth' object
        await signInWithPopup(auth,provider);
        Cookies.set("token", "aasdfghjkl", { expires: 7 });
        nav("/home");
      } catch (error) {
        console.error("Google Sign-In Error:", error);
      }
    };

    const validate = (values) => {
        const errors = {}
        //Validation for email
        if (values.email === "")
            errors.email = "Email cannot be empty"
        else if (! values.email.match('[A-z@. ]'))
            errors.email = "Email should contain only alphabets and @"
        else if (! values.email.includes("@"))
            errors.email = "Invalid Email"
        else if (values.email.trim().length === "")
			errors.email = "Email name cannot be empty spaces"
        //Validation for password
        if(values.password === "")
            errors.password = "Password cannot be empty"
        else if(values.password.trim().length === "")
            errors.password = "Password cannot be empty spaces"
        else if(values.password.trim().length < 6 )
            errors.password = "Password cannot be less than 6 characters"

        return errors
    }

    const onSubmit = async (values, { resetForm }) => {
        const csrfToken = "6NTn65Uehp8qo6HD5HIO66lSpX5kDhUf";
      
        let data = {
          "email": values.email,
          "password": values.password
        };
      
        let url = "https://docgpt.pythonanywhere.com/login/";
      
        try {
          const response = await axios.post(url, data, {
            headers: {
              'X-CSRFToken': csrfToken,
            }
          });
          if (response && response.data) {
            const message = response.data.message;
            const token = response.data.token;
            console.log(response)
            console.log(message)
            console.log(token)
            if (message === 'Login successful.') {
              if (token) {
                Cookies.set("token", token, { expires: 7 });
                nav("/home")}
              else {
                nav("/home");}
              }
            else if (message==="Invalid email or password."){
              customAlert("Invalid username / password")
            } else {
              customAlert('Invalid email or password.');
              resetForm();
              return;
            }
          }
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
            <LoginIcon/>
        </Avatar>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}> 
                        <TextField required fullWidth name = "email" id = "email" label = "Email Address"
                        InputProps={{style: { backgroundColor: '#93B1A6', color: 'white'},}} InputLabelProps={{style: { color: '#fff' },}}
                        onChange = {formik.handleChange} onBlur = {formik.handleBlur} value = {formik.values.email}/>
                        {formik.touched.email && formik.errors.email ? <div className = "err" > {formik.errors.email} </div> : null}
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField required fullWidth type="password" name = "password" id = "password" label = "Password"
                        InputProps={{style: { backgroundColor: '#93B1A6', color: 'white'},}} InputLabelProps={{style: { color: '#fff' },}}
                        onChange = {formik.handleChange} onBlur = {formik.handleBlur} value = {formik.values.password}/>
                        {formik.touched.password && formik.errors.password ? <div className = "err" > {formik.errors.password} </div> : null} 
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 , bgcolor: '#183D3D'}}>Login</Button>
                <p className="login-link">Dont have an account ? <a href = "/signup">Signup</a></p>
                <p className="login-link"><a href = "/reset">Forgot Password?</a></p>
                <GoogleButton onClick={handleGoogleSignIn}/>
            </Box>
        </Box>
    </Container>
    </>
    )
}