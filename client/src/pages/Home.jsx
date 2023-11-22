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
  padding-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


export const Home = ({ type }) => {
  const [videos, setVideo] = useState([]);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const loadingTexts = ['fetching data from server...', 'unpacking data...','please wait...'];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://vtube-ycci.onrender.com/api/videos/${type}`,
          {},
          {
            headers: {
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods':
                'GET,OPTIONS,PATCH,DELETE,POST,PUT',
              'Access-Control-Allow-Headers':
                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            },
          }
        );
        setVideo(res.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  },[type])
    



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
          videos.map((video) => <Card key={video._id} video={video}/>)
        ) : (
          <>
            {loadingData()}
          </>
        )}
      </Container>
    </>
  );
};
