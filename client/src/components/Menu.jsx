import styled from "styled-components";
import VTube from "../img/youtube.ico";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsoutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const iconStyle = {
  fontSize: "4vh",
};

const toggleStyle = {
  fontSize: "4.0vh",
  color: "#ff1717",
};

const Container = styled.div`
  position: ${({ menuVisible }) => (menuVisible ? "sticky" : "absolute")};
  top: 0;
  flex: 1;
  z-index: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 2vh;
  border-right: 1px solid ${({ theme }) => theme.soft};
  overflow-y: scroll;
  left: ${({ menuVisible }) => (menuVisible ? "0" : "-100%")};
  padding-top: 10vh;
  width: 100%;
  &::-webkit-scrollbar {
    width: 0.5vh;
    height: 0.1vh;
  }

  &::-webkit-scrollbar-thumb {
    background: #434343;
    box-shadow: inset 2px 2px 2px hsla(0, 0%, 100%, 0.25),
      inset -2px -2px 2px rgba(0, 0, 0, 0.25);
  }

  &::-webkit-scrollbar-track {
    background: linear-gradient(90deg, #434343, #434343 1px, #111 0, #111);
  }

  @media (max-width: 768px) {
    position: absolute;
    padding-top: 5vh;
    height: auto;
    left: ${({ menuVisible }) => (menuVisible ? "0" : "-100%")};
    transition: left 0.3s ease-in-out;
    width: 48vw;
    padding-left: 10px;
    border-radius: 5px;
    font-size: 1.8vh;
    &::-webkit-scrollbar {
      width: 0.5vw;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5%;
  font-weight: bold;
  padding-left: 10%;
  margin-bottom: 2vh;
  font-size: 3vh;

  @media (max-width: 768px) {
    padding-top: 6vh;
  }
`;

const Wrapper = styled.div``;

const Img = styled.img`
  height: 5vh;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 2vh;
  cursor: pointer;
  padding: 1vh 1vw;
  @media (max-width: 768px) {
    padding: 0.7vh 0vw;
  }

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 1vh 0vh;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  padding-left: 1vw;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding: 0.5vh 1.5vw;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 2vh;
  cursor: pointer;
  gap: 5px;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.5vh;
    padding: 0.2vh 1vh;
    margin-top: 1vh;
  }
`;

const Title = styled.div`
  font-size: 2vh;
  font-weight: 600;
  color: #aaaaaa;
  margin-bottom: 2vh;
  margin-top: 1vh;
  margin-left: 10px;
`;

const Toggle = styled.div`
  display: flex;
  padding: 2vh 0.4vw;
  gap: 2vh;
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 10%;
  margin-right: 1vw;
  box-sizing: border-box;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    padding: 2vh 0.4vw;
    gap: 2vh;
    cursor: pointer;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 10%;
    margin-right: 1vw;
    box-sizing: border-box;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const Menu = ({
  menuVisible,
  setMenuVisible,
  darkMode,
  setDarkMode,
}) => {
  const nav = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    if (!menuVisible)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };
  
  const handleSearch = (query) => {
    const hardcodedQueries = {
      Music: "music",
      Sports: "sports",
      Gaming: "gaming",
      Movies: "movies",
      News: "news",
      Live: "live",
    };
    const hardcodedQuery = hardcodedQueries[query] || "";

    nav(`/search?q=${encodeURIComponent(hardcodedQuery)}`);
    setMenuVisible(false);
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    const body = document.querySelector("body");
    body.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };
  
  const toggleMenuClose = () => {
      if (window.innerWidth <= 768) {
        setMenuVisible(!menuVisible);
  }
}

  const handleOthers = () => {
    nav("/others")
  }

  return (
    <>
      <Toggle>
        <MenuOutlinedIcon style={toggleStyle} onClick={toggleMenu} />
      </Toggle>
      <Container menuVisible={menuVisible}>
        <Wrapper onClick={toggleMenuClose}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={VTube} />
              Vtube
            </Logo>
          </Link>
          <Item onClick={() => nav("/")}>
            <HomeIcon style={iconStyle} />
            Home
          </Item>
            <Item  onClick={() => nav("/trends")}>
              <ExploreOutlinedIcon style={iconStyle} />
              Explore
            </Item>
            <Item onClick={() => nav(!currentUser ? "/signin" : "/subscriptions")}>
              <SubscriptionsOutlinedIcon style={iconStyle} />
              Subscriptions
            </Item>
          <Hr />
          <Item onClick={handleDarkMode}>
            <SettingsBrightnessOutlinedIcon style={iconStyle} />
            {darkMode ? "Light" : "Dark"} Mode
          </Item>
          <Item>
            <VideoLibraryOutlinedIcon style={iconStyle} />
            Library
          </Item>
          <Hr />
          {!currentUser && <><Login>
            Sign in to like videos, comment and subscribe.
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon style={iconStyle} />
                SIGN IN
              </Button>
            </Link>
          </Login>
          <Hr /></>}
          <Title>BEST OF VTUBE</Title>
          <Item onClick={() => handleSearch("Music")}>
            <LibraryMusicOutlinedIcon style={iconStyle} />
            Music
          </Item>
          <Item onClick={() => handleSearch("Sports")}>
            <SportsBasketballOutlinedIcon style={iconStyle} />
            Sports
          </Item>
          <Item onClick={() => handleSearch("Gaming")}>
            <SportsEsportsOutlinedIcon style={iconStyle} />
            Gaming
          </Item>
          <Item onClick={() => handleSearch("Movies")}>
            <MovieOutlinedIcon style={iconStyle} />
            Movies
          </Item>
          <Item onClick={() => handleSearch("News")}>
            <ArticleOutlinedIcon style={iconStyle} />
            News
          </Item>
          <Item onClick={() => handleSearch("Live")}>
            <LiveTvOutlinedIcon style={iconStyle} />
            Live
          </Item>
          <Hr />

          <Item onClick={handleOthers}>
            <SettingsoutlinedIcon style={iconStyle}/>
            Settings
          </Item>
          <Item>
            <FlagOutlinedIcon style={iconStyle} />
            Report
          </Item>
          <Item>
            <HelpOutlineOutlinedIcon style={iconStyle} />
            Help
          </Item>
        </Wrapper>
      </Container>
    </>
  );
};
