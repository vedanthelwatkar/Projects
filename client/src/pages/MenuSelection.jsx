import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1vh;
  padding-left: 10px;
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
export const MenuSelection = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`https://gleaming-pumps-frog.cyclic.app/api/videos/select${query}`,
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
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
  
    fetchVideos();
  }, [query]);
  
  return (
    <Container>
      {videos.length > 0 ? (
    videos.map((video) => (
      <Card key={video._id} video={video} />
    ))
  ) : (
    <Title>There is nothing to show in this category.</Title>
  )}
    </Container>
  );
};
