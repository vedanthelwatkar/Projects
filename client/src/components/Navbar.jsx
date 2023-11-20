import {
  AccountCircleOutlined,
  SearchOutlined,
  VideoCallOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/userSlice";
import { Upload } from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 8vh;
  border-bottom: 0.2px solid ${({ theme }) => theme.soft};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 2vw;
  position: relative;
`;
const Search = styled.div`
  width: 50vw;
  height: 4vh;
  left: 0;
  right: 0;
  margin-left: ${({ menuVisible }) => (menuVisible ? "10.5vw" : "23vw")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5%;
  border: 1px solid #ccc;
  border-radius: 40px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    width: 65%;
    padding-right: 0;
    margin-left: 7vw;
  }
`;
const Input = styled.input`
  border: none;
  color: ${({ theme }) => theme.text};
  width: 100%;
  height: 100%;
  background-color: transparent;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.textSoft};
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  margin-left: 10px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  gap: 5px;
  height: 5.7vh;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.5vh;
    padding: 0.7vh 1vh;
    height: 5vh;
  }
`;
const Hr = styled.hr`
  height: 125%;
  border: 2px solid ${({ theme }) => theme.soft};
  margin-right: 5px;

  @media (max-width: 768px) {
    height: 100%;
    margin-right: 3px;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
`;
const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;
const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${({ theme }) => theme.soft};
  min-width: 3vw;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  ${Dropdown}:hover & {
    display: block;
  }
`;
const MenuItem = styled.div`
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  color: ${({ theme }) => theme.text};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const UserDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
export const Navbar = ({ menuVisible }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const nav = useNavigate()
  const [q,setQ] = useState("")

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    const shouldLogout = window.confirm("Are you sure you want to logout?");

    if (shouldLogout) {
      dispatch(logout());
      nav("/")
    }
  };
  const [open,setOpen] = useState(false)
  

  return (
    <>
    <Container>
      <Wrapper>
        <Search menuVisible={menuVisible}>
          <Input placeholder="Search" onChange={e=>setQ(e.target.value)} />
          <Hr></Hr>
          <SearchOutlined style={{ cursor: "pointer" }} onClick={()=>nav(`/search?q=${q}`)}/>
        </Search>

        {currentUser ? (
          <UserDropdown>
            <VideoCallOutlined style={{cursor:"pointer"}} onClick={()=>setOpen(true)} />
            <Avatar src={currentUser.img} onClick={toggleDropdown} />
            <Dropdown>
              <span>{currentUser.name}</span>
              <DropdownContent>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </DropdownContent>
            </Dropdown>
          </UserDropdown>
        ) : (
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlined />
              SIGN IN
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
        {open && <Upload setOpen={setOpen}/>}
        </>
  );
};
