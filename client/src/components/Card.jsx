import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  width: 23vw;
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: ${(props) => (props.type === "sm" ? "10px" : "0px")};

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 45px;
    width: 90vw;
  }
`;

const Image = styled.img`
  width: ${(props) => (props.type === "sm" ? "70%" : "100%")};
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  border-radius: 5px;
  @media (max-width: 768px) {
    height: 25vh;
    width: 100%;
  }
`;

const Display = styled.div`
  display: flex;
  gap: 20px;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;
const ChannelImage = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
  @media (max-width: 768px) {
    display: flex;
  }
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 1px;
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 5px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

export const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  const { currentVideo } = useSelector((state) => state.video);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(
          `https://vtubebackend.onrender.com/api/users/find/${video.userId}`,
          {},
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
        setChannel(res.data);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    if (video.userId) {
      fetchChannel();
    }
  }, [video.userId]);

  const incViews = async () => {
    await axios.put(
      `https://vtubebackend.onrender.com/api/videos/view/${currentVideo._id}`,
      {
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers":
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      }
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} onClick={incViews} />
        <Display type={type}>
          <ChannelImage
            type={type}
            src={
              channel.img ||
              "https://icons.iconarchive.com/icons/icons8/windows-8/128/Users-Name-icon.png"
            }
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Display>
      </Container>
    </Link>
  );
};
