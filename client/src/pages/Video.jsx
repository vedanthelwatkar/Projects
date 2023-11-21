import {
  AddTaskOutlined,
  ReplyOutlined,
  ThumbDown,
  ThumbDownOffAltOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { Comments } from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import { Recommendation } from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};

  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 2vh;
  }
`;
const Buttons = styled.div`
  display: flex;
  gap: 1vw;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  padding: 0vh 1vw;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
    color: lightgrey;
  }

  @media (max-width: 768px) {
    padding: 0vh 3.4vw;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 1vw;
`;
const Image = styled.img`
  width: 4vw;
  height: 7vh;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 16vw;
  }
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 1px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Description = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  background-color: ${({ theme, isSubscribed }) =>
    isSubscribed ? "grey" : "red"};
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const VideoFrame = styled.video`
  max-height: 72vh;
  width: 100%;
  object-fit: cover;
`;

export const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/api/videos/find/${path}`,{},{
          headers: {
            "Access-Control-Allow-Credentials": "true" ,
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          });
        const channelRes = await axios.get(`/api/users/find/${videoRes.data.userId}`,{},{
          headers: {
            "Access-Control-Allow-Credentials": "true" ,
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          });
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    if (currentVideo && currentUser) {
      await axios.put(
        `/api/users/like/${currentVideo._id}`,
        {},
        {
          headers: {
            "Access-Control-Allow-Credentials": "true" ,
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          }
      );
      dispatch(like(currentUser._id));
    } else {
      alert("Login first");
    }
  };

  const handleDislike = async () => {
    if (currentVideo && currentUser) {
      await axios.put(
        `/api/users/dislike/${currentVideo._id}`,
        {},
        {
          headers: {
            "Access-Control-Allow-Credentials": "true" ,
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          }
      );
      dispatch(dislike(currentUser._id));
    } else {
      alert("Login first");
    }
  };

  const handleSubscribe = async () => {
    if (currentUser && channel) {
      currentUser.subscribedUsers.includes(channel._id)
        ? await axios.put(
            `/api/users/unsub/${channel._id}`,
            {},
            {
              headers: {
                "Access-Control-Allow-Credentials": "true" ,
                "Access-Control-Allow-Origin": "*" ,
                "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
                "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                },
              }
          )
        : await axios.put(
            `/api/users/sub/${channel._id}`,
            {},
            {
              headers: {
                "Access-Control-Allow-Credentials": "true" ,
                "Access-Control-Allow-Origin": "*" ,
                "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
                "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                },
              }
          );
      dispatch(subscription(channel._id));
    } else {
      alert("Login first");
    }
  };
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike} disabled={!currentUser}>
              {currentUser && currentVideo.likes?.includes(currentUser._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOutlined />
              )}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike} disabled={!currentUser}>
              {currentUser &&
              currentVideo.dislikes?.includes(currentUser._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOffAltOutlined />
              )}{" "}
              Dislike
            </Button>
            <Button disabled={!currentUser}>
              <ReplyOutlined /> Share
            </Button>
            <Button disabled={!currentUser}>
              <AddTaskOutlined /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe
            onClick={handleSubscribe}
            isSubscribed={
              currentUser && currentUser.subscribedUsers?.includes(channel._id)
            }
          >
            {currentUser && currentUser.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        {currentUser && <Comments videoId={currentVideo._id} />}
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
};
