import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Comment } from "./Comment";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addComment } from "../redux/videoSlice";

const Container = styled.div`
  max-height: ${(props) => (props.commentVisible ? "800px" : "0")};
  overflow-y: auto;
  transition: max-height 0.5s ease-in-out;
`;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.bg};
`;
const Avatar = styled.img`
  width: 4vw;
  height: 7vh;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 16vw;
  }
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  height: 5vh;
  color: ${({ theme }) => theme.text};
`;
const Toggle = styled.div`
  border-bottom: 3px solid ${({ theme }) => theme.soft};
  background-color: ${({ theme }) => theme.soft};
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    gap: 2vh;
    cursor: pointer;
    z-index: 10;
    width: 100%;
    height: max-content;
    box-sizing: border-box;
    border-bottom: 3px solid ${({ theme }) => theme.soft};
    background-color: ${({ theme }) => theme.soft};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const toggleStyle = {
  fontSize: "2.0vh",
  color: "black",
};
const ToggleContainer = styled.div`
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  &:hover {
    color: ${({ theme }) => theme.text};
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
const Hr = styled.hr`
  margin: 1vh 0vh;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

export const Comments = ({videoId}) => {
  const [comments,setComments] = useState([])
  const [comment,setComment] = useState("")
  const [commentVisible, setCommentVisible] = useState(true);
  const {currentUser}=useSelector((state)=>state.user)
  const {currentVideo}=useSelector((state)=>state.video)
  const dispatch = useDispatch()
  const setIp = useRef()

  const toggleComment = () => {
    setCommentVisible(!commentVisible);
  };


  useEffect(()=>{
    const fetchComments = async () => {
      try{
        const res = await axios.get(`https://vtubebackend.onrender.com/api/comments/${currentVideo._id}`,{},
        {
          headers: {
            "Access-Control-Allow-Credentials": "true" ,
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          })
        setComments(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchComments()
  },[currentVideo._id])

  const handleComment = async () => {
    if (currentVideo && currentUser) {
      const newComment = {
        desc: comment,
        videoId: currentVideo._id,
        userId: currentUser._id,
      };
  
      try {
        const response = await axios.post('https://vtubebackend.onrender.com/api/comments', newComment, {
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        });
  
        dispatch(addComment(response.data));
        setComments((prevComments) => [response.data, ...prevComments]);
        setIp.current.value = "";
  
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    } else {
      alert("Login first");
    }
  };
  



  return (
    <>
      <ToggleContainer onClick={toggleComment}>
        <Toggle>
          <IconButton style={toggleStyle}>
            Comments
            <ExpandMoreIcon />
          </IconButton>
        </Toggle>
      </ToggleContainer>
      <Container commentVisible={commentVisible}>
      {currentUser && <NewComment>
          <Avatar src={currentUser.img  || 'https://icons.iconarchive.com/icons/icons8/windows-8/128/Users-Name-icon.png'} />
          <Input placeholder="Add a comment" ref={setIp} onChange={e=>setComment(e.target.value)} />
          <Button onClick={handleComment}>Comment</Button>
        </NewComment>}
        {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment) => <Comment key={comment._id} comment={comment} setComments={setComments} />)
          ) : (
            <>
            <Title>No comments yet</Title>
            <Hr/>
            </>
          )}
          
      </Container>
    </>
  );
};
