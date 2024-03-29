import { Delete } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";
import { deleteComment } from "../redux/videoSlice";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
`;
const Avatar = styled.img`
  width: 2.45vw;
  height: 5vh;
  border-radius: 50%;

  @media (max-width:768px){
    width:11vw;
  }

`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;
const Text = styled.span``;
export const Comment = ({comment,setComments}) => {
  const [channel,setChannel] = useState([])
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchComment = async ()=>{
      const res = await axios.get(
        `https://vtubebackend.onrender.com/api/users/find/${comment.userId}`,{},
        {
          headers: {
            "Access-Control-Allow-Credentials": "true" ,
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          }
      );
      setChannel(res.data)
    }
    fetchComment()
  },[comment.userId,currentUser])

  const handleDelete = async () => {
    const shouldDelete = window.confirm("Are you sure you want to Delete?");
    if (shouldDelete) {
      try {
        await axios.delete(
          `https://vtubebackend.onrender.com/api/comments/${comment._id}`,
          {
            headers: {
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
              "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          }
        );
        dispatch(deleteComment(comment._id));
        setComments((prevComments) => prevComments.filter((c) => c._id !== comment._id));
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }else{
      console.log("comment not deleted")
    }
    }

  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={channel && channel.img ? channel.img : 'https://icons.iconarchive.com/icons/icons8/windows-8/128/Users-Name-icon.png'} />
      <Details>
        <Name>
          {channel && channel.name ? channel.name :  "Unknown User" }<Date>{comment && comment.createdAt ? format(comment.createdAt) : "Unknown"}</Date>
        </Name>
        <Text>
        {comment.desc}
        </Text>
      </Details>
      </div>
      {currentUser && currentUser._id === comment.userId.toString() && (
        <Delete onClick={handleDelete} style={{cursor:"pointer"}} />
      )}
    </Container>
  );
};
