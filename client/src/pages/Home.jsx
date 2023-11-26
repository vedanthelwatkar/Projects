import styled from "styled-components";
import { Card } from "../components/Card";
import VTube from "../img/youtube.ico";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2vw;
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
  padding-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Home = ({ type }) => {
  const [videos, setVideo] = useState([]);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://vtubebackend.onrender.com/api/videos/${type}`,
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
        setVideo(res.data);
        setProgress(100);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [type]);

  return (
    <>
      <div>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      </div>
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
            <div class="loading-container">
              <div class="loading-icon"></div>
            </div>
            <Title>
              Welcome to VTube! Please note that as we are using free hosting
              sources, there might be a brief 30-40 second delay in loading
              after periods of inactivity. We appreciate your patience and
              assure you that we're working to enhance your browsing experience.
              Thank you for understanding!
            </Title>
          </>
        )}
      </Container>
    </>
  );
};
