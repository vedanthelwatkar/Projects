import React, { useState } from "react";
import styled from "styled-components";
import VTube from "../img/youtube.ico";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../redux/userSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 5vh 5vw;
  border: 1px solid ${({ theme }) => theme.soft};
  gap: 3vh;
  width: 20vw;
  @media (max-width: 768px) {
    width: 60vw;
    height: 40vh;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.ph};
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.textSoft};
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
const More = styled.div`
  display: flex;
  font-size: 2vh;
  margin-top: 10px;
  color: ${({ theme }) => theme.textSoft};

  @media (max-width:768px){
    display: flex;
    align-items: center;
    justify-content: center;
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
export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckPassword] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate()

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!name || name.trim() === "") {
      alert("Please enter a valid name.")
      return;
    }
  
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (!password || password.trim() === "") {
      alert("Please enter a valid password.")
      return;
    }
  
    if (password !== checkpassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("/api/auth/signup", { name, email, password },{
        headers: {
          "Access-Control-Allow-Origin": "https://vtube-ytclone.vercel.app/",
        }
      });
      dispatch(loginSuccess(res.data))
      nav("/signin")
    } catch (err) {
        dispatch(loginFailure());
      console.log(err);
    }
  };


  return (
    <>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Logo>
          <Img src={VTube} />
          Vtube
        </Logo>
      </Link>
      <Container>
        <Wrapper>
          <Title>Sign up</Title>
          <Input
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter Password Again"
            onChange={(e) => setCheckPassword(e.target.value)}
          />
          <Button onClick={handleSignup}>Sign up</Button>
        </Wrapper>
        <More>
        <Link to="/signin" style={{ color: "#ff1717" }}>Already have an account?</Link>
        </More>
      </Container>
    </>
  );
};
