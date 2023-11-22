import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Card } from '../components/Card';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 1px;
  padding-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Library = () => {
  const [videos, setVideo] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

    useEffect(()=>{
        const handleLibrary = async () => {
            if (currentUser) {
              const response = await axios.get(
                `https://vtube-ycci.onrender.com/api/videos/find/${currentUser._id}`,
                {
                  headers: {
                    "Access-Control-Allow-Credentials": "true" ,
                    "Access-Control-Allow-Origin": "*" ,
                    "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                  }
              );
              setVideo(response.data)
            } else {
              alert("Login first");
            }
          };
          handleLibrary()
    },[currentUser])

  return (
    <Container>
        {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video) => <Card key={video._id} video={video}/>)
        ) : (
          <>
            <Title>loading library</Title>
          </>
        )}
      </Container>
  )
}
