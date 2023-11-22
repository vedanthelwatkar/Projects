import { Delete } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";

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
export const Comment = ({comment}) => {
  const [channel,setChannel] = useState([])
  const { currentUser } = useSelector((state) => state.user);
  useEffect(()=>{
    const fetchComment = async ()=>{
      const res = await axios.get(
        `https://vtube-ycci.onrender.com/api/users/find/${comment.userId}`,{},
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
      await axios.delete(
        `http://localhost:8000/api/comments/${comment._id}`,
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
    }else{
      console.log("comment not deleted")
    }
    }

  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.name}<Date>{format(channel.createdAt)}</Date>
        </Name>
        <Text>
        {comment.desc}
        </Text>
      </Details>
      </div>
      {currentUser && currentUser._id === comment.userId.toString() && (
        <Delete onClick={handleDelete} />
      )}
    </Container>
  );
};
