import {
  AddTaskOutlined,
  Delete,
  FileCopyOutlined,
  ThumbDown,
  ThumbDownOffAltOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { Comments } from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
    margin-bottom: 1vh;
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

  @media (max-width:768px){
    color:${({ theme }) => theme.text};
  }
`;
const Image = styled.img`
  width: 3.25vw;
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

  @media (max-width:768px){
    margin-top: 1vh;
  }
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 1px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  @media (max-width:768px){
    margin-bottom: 2vh;
    margin-top: 0;
  }
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
  @media (max-width:768px){
    margin-top: 1vh;
  }
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
  margin-top: 20px;
  color:${({ theme }) => theme.text};
`

const VideoFrame = styled.video`
  max-height: 72vh;
  width: 100%;
  object-fit: cover;
`;

const TitleandDel = styled.div`
  display: flex;
  justify-content: space-between;
`

const Text = styled.span`
  font-size: 1.6vh;
  color:${({ theme }) => theme.textSoft};
  margin-top: 3vh;
  @media (max-width:768px){
    margin-top: 1vh;
  }
`
const TitleandDesc = styled.div`
  display: flex;
  flex-direction: column;
`
export const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const nav = useNavigate()
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(path)
        const videoRes = await axios.get(`https://vtube-ycci.onrender.com/api/videos/find/${path}`,{},{
          headers: {
            "Access-Control-Allow-Credentials": "true" ,
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          });
          console.log(videoRes)
        const channelRes = await axios.get(`https://vtube-ycci.onrender.com/api/users/find/${videoRes.data.userId}`,{},{
          headers: {
            "Access-Control-Allow-Credentials": "true" ,
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          });
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        console.log("Fetched Video Data:", videoRes.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    if (currentVideo && currentUser) {
      await axios.put(
        `https://vtube-ycci.onrender.com/api/users/like/${currentVideo._id}`,{ userId: currentUser._id },
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
        `https://vtube-ycci.onrender.com/api/users/dislike/${currentVideo._id}`,
        { userId: currentUser._id },
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
            `https://vtube-ycci.onrender.com/api/users/unsub/${channel._id}`,
            { userId: currentUser._id },
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
            `https://vtube-ycci.onrender.com/api/users/sub/${channel._id}`,
            { userId: currentUser._id },
            {
              headers: {
                "Access-Control-Allow-Credentials": "true" ,
                "Access-Control-Allow-Origin": "*" ,
                "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
                "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                },
              }
          );
          window.location.reload()
      dispatch(subscription(channel._id));
    } else {
      alert("Login first");
    }
  };

  const handleSave = (videoUrl) => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = "video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleCopyLink = () => {
    const videoUrl = currentVideo.videoUrl;
    const textarea = document.createElement("textarea");
    textarea.value = videoUrl;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Link copied to clipboard!");
  };
  
  const handleDelete = async () => {
    const shouldDelete = window.confirm("Are you sure you want to Delete?");
    try{
    if (shouldDelete) {
      await axios.delete(
        `https://vtube-ycci.onrender.com/api/videos/${currentVideo._id}`,
        {
          headers: {
            "Access-Control-Allow-Credentials": "true" ,
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          }
      );
      alert("Video deleted")
      nav("/")
    }else{
      console.log("video not deleted")
    }}catch{
      alert("Video not found")
    }
    }


  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls download="video.mp4" />
        </VideoWrapper>
        <TitleandDel>
        <Title>{currentVideo.title}</Title>
        <DeleteWrapper>

        {currentUser && currentUser._id === currentVideo.userId.toString() && (
          <Delete onClick={handleDelete}/>
          )}
          </DeleteWrapper>
        </TitleandDel>
        <Details>
          <TitleandDesc>
          <Info>
            {currentVideo.veiws} veiws • {format(currentVideo.createdAt)}
          </Info>
          <Text>
          Description:-
          </Text>
          <Description>{currentVideo?.desc}</Description>  
          </TitleandDesc>
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
            <Button onClick={handleCopyLink}>
              <FileCopyOutlined /> Copy Link
            </Button>
            <Button disabled={!currentUser} onClick={() => handleSave(currentVideo.videoUrl)}>
              <AddTaskOutlined /> Save
            </Button>
            
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel && channel.img ? channel.img : 'https://icons.iconarchive.com/icons/icons8/windows-8/128/Users-Name-icon.png'} />
            <ChannelDetail>
              <ChannelName>{channel && channel.name ? channel.name :  "Unknown User" }</ChannelName>
              <ChannelCounter>{channel && channel.subscribers ? channel.subscribers : "Unknown"} subscribers</ChannelCounter>
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
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
};
