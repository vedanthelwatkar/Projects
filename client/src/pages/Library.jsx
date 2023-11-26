import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "../components/Card";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

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
  const [progress, setProgress] = useState(10);
  const [loading,setLoading] = useState("Please wait loading videos...")

  useEffect(() => {
    const handleLibrary = async () => {
      try {
        if (currentUser) {
          const response = await axios.get(
            `https://vtubebackend.onrender.com/api/videos/user/find/${currentUser._id}`,
            {
              headers: {
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                "Access-Control-Allow-Headers":
                  "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
              },
            }
          );
    
          setVideo(response.data);
          setProgress(100);
        } else {
          setLoading("NO VIDEOS FOUND FOR THE USER");
          alert("Login first");
        }
      } catch (error) {
        setProgress(0)
        console.error("Error fetching videos:", error);
        setLoading("NO VIDEOS FOUND FOR THE USER");
        
      }
    };    
    handleLibrary();
  }, [currentUser]);

  return (
    <>
      <div>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      </div>
      <Container>
        {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video) => <Card key={video._id} video={video} />)
        ) : (
          <>
            <Title>{loading}</Title>
          </>
        )}
      </Container>
    </>
  );
};
