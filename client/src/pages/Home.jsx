import styled from "styled-components";
import { Card } from "../components/Card";
import VTube from "../img/youtube.ico";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
const Img = styled.img`
  height: 5vh;
`;
const Logo = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1%;
    font-weight: bold;
    font-size: large;
    color: ${({ theme }) => theme.text};
    margin-bottom: 3vh;
  }
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Home = ({ type }) => {
  const [videos, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `/api/videos/${type}`,
          {
            header: [
              "Access-Control-Allow-Origin",
              "https://vtube-ytclone.vercel.app/",
            ],
          }
        );
        setVideo(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [type]);

  return (
    <>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Logo>
          <Img src={VTube} />
          Vtube
        </Logo>
      </Link>
      <Container>
        {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video) => <Card key={video._id} video={video} />)
        ) : (
          <>
            <Title>Loading...</Title>
            <Link to="/" style={{ color: "red", marginTop: "2vh" }}>
              Home
            </Link>
          </>
        )}
      </Container>
    </>
  );
};
