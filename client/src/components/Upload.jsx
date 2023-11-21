import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 90vh;
  height: 90vh;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 2vh;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 2vh;
    width: 30vh;
    height: 50vh;
    top: -10vh;
  }
`;
const Close = styled.div`
  position: absolute;
  top: 1.5vh;
  right: 1vw;
  cursor: pointer;
  @media (max-width: 768px) {
    right: 1.5vh;
  }
`;
const Title = styled.h1`
  font-size: 3vh;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2vh;
  }
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 1vh;
  background-color: transparent;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 1vh;
  background-color: transparent;
  resize: none;
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
const Label = styled.label`
  font-style: 14px;
`;

export const Upload = ({ setOpen }) => {
  const wrapperRef = useRef();
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const nav = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };
  useEffect(() => {
    video && uploadFile(video,"videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img,"imgUrl");
  }, [img]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };
  const { currentUser } = useSelector((state) => state.user);
  const handleUpload = async (e) => {
    e.preventDefault()
    if(imgPerc===100 && videoPerc===100){
    const res = await axios.post("https://vtube-ycci.onrender.com/api/videos",{...inputs,tags,userId: currentUser._id},
    {
      headers: {
        "Access-Control-Allow-Credentials": "true" ,
        "Access-Control-Allow-Origin": "*" ,
        "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      })
    setOpen(false)
    res.status===200 && nav(`/video/${res.data._id}`)
    }else{
      alert("Wait before Uploading")
    }}


  return (
    <Container>
      <Wrapper ref={wrapperRef}>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a new Video</Title>
        <Label>Video</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          type="text"
          placeholder="Description"
          rows={8}
          name="desc"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Tags    *seperate tags with commas*"
          onChange={handleTags}
        />
        <Label>Image</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            placeholder="Thumbnail"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};
