import React, { useState } from "react";
import styled from "styled-components";
import VTube from "../img/youtube.ico";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";

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
  gap: 10px;
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
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
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

  @media (max-width: 768px) {
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
export const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!name || name.trim() === "") {
      alert("Please enter a valid name.");
      return;
    }

    if (!password || password.trim() === "") {
      alert("Please enter a valid password.");
      return;
    }
    try {
      const res = await axios.post(
        "https://vtubebackend.onrender.com/api/auth/signin",
        { name, password },
        {
          headers: {
            "Access-Control-Allow-Credentials": "true" ,
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          }
      );
      dispatch(loginSuccess(res.data));
      nav("/");
    } catch (err) {
      alert("Login Failed")
      dispatch(loginFailure());
    }
  };
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post(
            "https://vtubebackend.onrender.com/api/auth/google",
            {
              name: result.user.displayName,
              email: result.user.email,
              img: result.user.photoURL,
            },
            {
            headers: {
              "Access-Control-Allow-Credentials": "true" ,
              "Access-Control-Allow-Origin": "*" ,
              "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
              "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
              },
            }
            
          )
          .then((res) => {
            dispatch(loginSuccess(res.data));
            nav("/");
          });
      })
      .catch((err) => {
        alert("Login Failed")
        dispatch(loginFailure());
      });
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
          <Title>Sign in</Title>
          <SubTitle>to continue to VTube</SubTitle>
          <Input
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Sign in</Button>
          <Title>or</Title>
          <GoogleButton onClick={signInWithGoogle} />
        </Wrapper>
        <More>
          <Link to="/signup" style={{ color: "#ff1717" }}>
            Create account
          </Link>
        </More>
      </Container>
    </>
  );
};
