import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Card } from './Card';

const Container = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Recommendation = ({tags}) => {
    const [videos,setVideos] = useState([])

    useEffect(()=>{
        const fetchVideos = async () => {
          const res = await axios.get(`/api/videos/tags?tags=${tags}`,{},
          {
            headers: {
              "Access-Control-Allow-Credentials": "true" ,
              "Access-Control-Allow-Origin": "*" ,
              "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
              "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
              },
            })
            setVideos(res.data)
        }
        fetchVideos()
    },[tags])

  return (
    <Container>{videos.map((video)=>(
        <Card type="sm" key = {video._id} video={video}/>
    ))}</Container>
  )
}
