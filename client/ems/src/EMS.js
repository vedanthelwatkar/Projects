import { Container, Grid, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';


export default function EMS(){
    const [location, setLocation] = useState(null);
    const [temperature, setTemperature] = useState(null); 

    useEffect(() => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            fetch(url)
              .then((res) => res.json())
              .then((data) => {
                setLocation(data.address.city);
                fetchTemperatureData(latitude, longitude);
              })
              .catch(() => {
                console.log('Error fetching data from API');
              });
          });
        }
      }, []);


    const fetchTemperatureData = (latitude, longitude) => {
        const apiKey = 'c6e315d09197cec231495138183954bd';
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        
        fetch(weatherUrl)
            .then((res) => res.json())
            .then((data) => {
                const temp = data.main.temp;
                setTemperature(temp); // Set the temperature in the state
            })
            .catch(() => {
                console.log('Error fetching temperature data');
            });
    };
    const nav = useNavigate()

    const add = (event) => {
        event.preventDefault()
        nav("/entry")
    }

    const view = (event) => {
        event.preventDefault()
        nav("/view")
    }

    const update = (event) => {
        event.preventDefault()
        nav("/update")
    }

    const dele = (event) => {
        event.preventDefault()
        nav("/delete")
    }

    const charts = (event) => {
        event.preventDefault()
        nav("/charts")
    }

    return(
       <>
       <center>
        <h1>EMS</h1>
        <Container>
            <Grid container spacing={7} justifyContent="center">
                <Grid item xs={10}>
                    <Button onClick={add} className='ems-btn' type="submit" variant="contained" color="primary" fullWidth>
                        ADD
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <Button onClick={view} className='ems-btn' type="submit" variant="contained" color="primary" fullWidth>
                        VIEW
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <Button onClick={update} className='ems-btn' type="submit" variant="contained" color="primary" fullWidth>
                        UPDATE
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <Button onClick={dele} className='ems-btn' type="submit" variant="contained" color="primary" fullWidth>
                        DELETE
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <Button onClick={charts} className='ems-btn' type="submit" variant="contained" color="primary" fullWidth>
                        CHARTS
                    </Button>
                </Grid>
                <Grid item xs={10} className='loctemp'>
                        {location && <p>Location: {location}</p>}
                        {temperature && <p>Temperature: {temperature}°C</p>}
                </Grid>
            </Grid>
        </Container>
        
        </center>
       </>                                  
    )    
}
