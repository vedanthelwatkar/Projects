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
            const res = await axios.get(`https://vtube-ycci.onrender.com/api/videos/tags?tags=${tags}`,
            {
              header: [
                "Access-Control-Allow-Origin",
                "https://vtube-ytclone.vercel.app/",
              ],
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
