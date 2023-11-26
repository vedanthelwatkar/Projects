import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../components/Card";
import LoadingBar from "react-top-loading-bar";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1vh;
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 1px;
  padding-top:3vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  const [progress,setProgress] = useState(10)
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://vtubebackend.onrender.com/api/videos/search${query}`,
          {
            headers: {
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
              "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          }
        );
        setVideos(res.data);
        setProgress(100)
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
  
    fetchVideos();
  }, [query]);
  
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
      {videos.length > 0 ? (
    videos.map((video) => (
      <Card key={video._id} video={video} />
    ))
  ) : (
    <Title>There is nothing to show in this category.</Title>
  )}
    </Container>
    </>
  );
};
