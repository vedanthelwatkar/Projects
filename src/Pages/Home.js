import { Box, Typography, Input, useMediaQuery } from "@mui/material";
import MusicLogo from "../svgComponents/MusicLogo";
import DiscoverImg from "../svgComponents/DiscoverImg";
import HomeImg from "../svgComponents/HomeImg";
import LibraryImg from "../svgComponents/LibraryImg";
import TrendsImg from "../svgComponents/TrendsImg";
import SettingImg from "../svgComponents/SettingImg";
import LogoutImg from "../svgComponents/LogoutImg";
import SlidePointer from "../svgComponents/SlidePointer";
import RepeatIcon from "../svgComponents/RepeatIcon";
import PreviousIcon from "../svgComponents/PreviousIcon";
import PauseIcon from "../svgComponents/PauseIcon";
import NextIcon from "../svgComponents/NextIcon";
import ShuffleIcon from "../svgComponents/ShuffleIcon";
import { useState } from "react";
import Background from "../assets/images/Background.png";
import Michael from "../assets/images/Michael.png";
import { Howl } from "howler";
import BeatItAudio from "../assets/audio/Beat-It.mp3";
import BilleJeanAudio from "../assets/audio/Billie-Jean.mp3";
import RockWithYouAudio from "../assets/audio/Rock-With-You.mp3";
import SmoothCriminalAudio from "../assets/audio/Smooth-Criminal.mp3";
import DontStopAudio from "../assets/audio/Don't-Stop.mp3";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StopIcon from "@mui/icons-material/Stop";
import Data from "../data.json";
import BillieJeanImg from "../assets/images/billie_jean.png";
import BeatItImg from "../assets/images/beat_it.png";
import SmoothCrimnalImg from "../assets/images/smooth_criminal.png";
import DontStopImg from "../assets/images/dont_stop.png";
import RockWithYouImg from "../assets/images/rock_with_you.png";
import { useEffect } from "react";
import { useRef } from "react";
import Search from "../svgComponents/Search";
import MobileView from "./MobileView";

const Home = () => {
  const [value, setValue] = useState("Michael Jackson");
  const [selected, setSelected] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [songImage, setSongImage] = useState();
  const [songTitle, setSongTitle] = useState("");
  const [pauseClicked, setPauseClicked] = useState(false);
  const soundRef = useRef(null);
  const matches = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const song = findSongDetail(selected);

    if (selected) {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
      const sound = new Howl({ src: [song] });
      soundRef.current = sound;
      sound.play();
      setIsPlaying(true);
      setPauseClicked(false);
    }
  }, [selected]);

  useEffect(() => {
    if (pauseClicked && soundRef.current && isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    } else if (!pauseClicked && soundRef.current && !isPlaying) {
      soundRef.current.play();
      setIsPlaying(true);
    }
  }, [pauseClicked]);

  function createData(hash, AlbumImage, title, playing, time, album) {
    return { hash, AlbumImage, title, playing, time, album };
  }

  const rows = Data.map((item) => {
    let AlbumImage;

    switch (item.hash) {
      case 1:
        AlbumImage = BillieJeanImg;
        break;
      case 2:
        AlbumImage = BeatItImg;
        break;
      case 3:
        AlbumImage = SmoothCrimnalImg;
        break;
      case 4:
        AlbumImage = DontStopImg;
        break;
      case 5:
        AlbumImage = RockWithYouImg;
        break;
      default:
        AlbumImage = "";
    }

    return createData(
      item.hash,
      AlbumImage,
      item.title,
      item.playing,
      item.time,
      item.album
    );
  });

  const findSongDetail = (selected) => {
    console.log("selected: ", selected);
    let songSelected = null;

    if (selected === 1) {
      songSelected = BilleJeanAudio;
      setSongImage(BillieJeanImg);
      setSongTitle("Billie Jean");
    }
    if (selected === 2) {
      songSelected = BeatItAudio;
      setSongImage(BeatItImg);
      setSongTitle("Beat It");
    }
    if (selected === 3) {
      songSelected = SmoothCriminalAudio;
      setSongImage(SmoothCrimnalImg);
      setSongTitle("Smooth Criminal");
    }
    if (selected === 4) {
      songSelected = DontStopAudio;
      setSongImage(DontStopImg);
      setSongTitle("Dont Stop Till you...");
    }
    if (selected === 5) {
      songSelected = RockWithYouAudio;
      setSongImage(RockWithYouImg);
      setSongTitle("Rock With You");
    }

    return songSelected;
  };

  return (
    <Box>
      {!matches && (
        <Box
          sx={{
            display: "flex",
            borderRadius: "40px 0px 0px 40px",
            overflow: "hidden",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Box
            sx={{
              height: "100vh",
              width: "20vw",
              background: "#0E0E0E",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "16px",
                  margin: "2vh 2vw 0px 3vw",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MusicLogo />
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#ff5656",
                      fontFamily: "Poppins",
                      fontSize: "1.6rem",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                    }}
                  >
                    Dream
                  </Typography>
                  <Typography
                    sx={{
                      color: "#f6f6f6",
                      fontFamily: "Poppins",
                      fontSize: "1.6rem",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal",
                    }}
                  >
                    Music
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "8vh 0px 0px -5vw",
                  gap: "10px",
                }}
              >
                <Typography
                  sx={{
                    color: "#CFC5C5",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "normal",
                    textTransform: "uppercase",
                  }}
                >
                  Menu
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    <HomeImg />
                    <Typography
                      sx={{
                        color: "#F6F6F6",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "normal",
                        cursor: "pointer",
                      }}
                    >
                      Home
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    <TrendsImg />
                    <Typography
                      sx={{
                        color: "#F6F6F6",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "normal",
                        cursor: "pointer",
                      }}
                    >
                      Trends
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    <LibraryImg />
                    <Typography
                      sx={{
                        color: "#F6F6F6",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "normal",
                        marginLeft: "4px",
                      }}
                    >
                      Library
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    <DiscoverImg />
                    <Typography
                      sx={{
                        color: "#F6F6F6",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "normal",
                      }}
                    >
                      Discover
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  bottom: "80px",
                  marginLeft: "-5vw",
                  gap: "10px",
                }}
              >
                <Typography
                  sx={{
                    color: "#CFC5C5",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "normal",
                    textTransform: "uppercase",
                  }}
                >
                  General
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    <SettingImg />
                    <Typography
                      sx={{
                        color: "#F6F6F6",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "normal",
                        cursor: "pointer",
                      }}
                    >
                      Settings
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    <LogoutImg />
                    <Typography
                      sx={{
                        color: "#F6F6F6",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "normal",
                        cursor: "pointer",
                      }}
                    >
                      Logout
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100vw",
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.00) 73.01%, rgba(15, 15, 15, 0.60) 73.01%), linear-gradient(180deg, #4C0000 0%, #0A0A0A 100%);",
              borderRadius: "0 40px 40px 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "45vw",
                marginLeft: "6vw",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "3vw",
                    margin: "4vh 0px 0px 0vw",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#F6F6F6",
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                      cursor: "pointer",
                    }}
                  >
                    Music
                  </Typography>
                  <Typography
                    sx={{
                      color: "#F6F6F6",
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                      cursor: "pointer",
                    }}
                  >
                    Podcast
                  </Typography>
                  <Typography
                    sx={{
                      color: "#F6F6F6",
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                      cursor: "pointer",
                    }}
                  >
                    Live
                  </Typography>
                  <Typography
                    sx={{
                      color: "#F6F6F6",
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                      cursor: "pointer",
                    }}
                  >
                    Radio
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "25vw",
                    height: "6vh",
                    borderRadius: "50px",
                    background: "#2C0000",
                    margin: "2vh 0px 0px 4vw",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        padding: "1vh 0px 1.5vh 1vw",
                      }}
                    >
                      <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        sx={{
                          color: "#F6F6F6",
                          fontFamily: "Poppins",
                          fontSize: "15px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "normal",
                          width: "21.5vw",
                        }}
                      ></Input>
                    </Box>
                    <Search />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  overflowX: "auto",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                    display: "none",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#5d0000",
                    borderRadius: "10px",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "50vw",
                    height: "284px",
                    marginTop: "15vh",
                    position: "relative",
                    backgroundImage: `url(${Background})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <Box
                    sx={{
                      width: "420px",
                      height: "350px",
                      position: "absolute",
                      bottom: "0%",
                      right: "10%",
                      zIndex: 1,
                    }}
                  >
                    <img
                      src={Michael}
                      alt="Michael"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "30px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#F6F6F6",
                        fontFamily: "Poppins",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "normal",
                        cursor: "pointer",
                      }}
                    >
                      Popular
                    </Typography>
                    <Typography
                      sx={{
                        color: "#F6F6F6",
                        fontFamily: "Poppins",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "normal",
                        cursor: "pointer",
                      }}
                    >
                      See All
                    </Typography>
                  </Box>
                  <Box>
                    <TableContainer
                      component={Paper}
                      sx={{
                        background: "transparent",
                        marginTop: "20px",
                        overflow: "hidden",
                      }}
                    >
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{
                                color: "#CFC5C5",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "normal",
                                textTransform: "uppercase",
                                borderBottom: 0,
                              }}
                            >
                              #
                            </TableCell>
                            <TableCell
                              style={{
                                color: "#CFC5C5",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "normal",
                                textTransform: "uppercase",
                                borderBottom: 0,
                              }}
                              align="right"
                            ></TableCell>
                            <TableCell
                              style={{
                                color: "#CFC5C5",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "normal",
                                textTransform: "uppercase",
                                borderBottom: 0,
                              }}
                              align="left"
                            >
                              Title
                            </TableCell>
                            <TableCell
                              style={{
                                color: "#CFC5C5",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "normal",
                                textTransform: "uppercase",
                                borderBottom: 0,
                              }}
                              align="left"
                            >
                              Playing
                            </TableCell>
                            <TableCell
                              style={{
                                color: "#CFC5C5",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "normal",
                                textTransform: "uppercase",
                                borderBottom: 0,
                              }}
                              align="center"
                            >
                              Time
                            </TableCell>
                            <TableCell
                              style={{
                                color: "#CFC5C5",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "normal",
                                textTransform: "uppercase",
                                borderBottom: 0,
                              }}
                              align="right"
                            >
                              Album
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.hash}
                              sx={{
                                "&:last-child td": { borderBottom: 0 },
                                color: "white",
                                "&:hover": {
                                  transform: "scale(1.01)",
                                },
                                backgroundColor:
                                  row.hash === selected
                                    ? "#520000"
                                    : "transparent",
                                height: 40,
                                cursor: "pointer",
                              }}
                              onClick={() => setSelected(row.hash)}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                style={{
                                  color: "#CFC5C5",
                                  fontFamily: "Poppins",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: "500",
                                  lineHeight: "normal",
                                  textTransform: "capitalize",
                                  borderBottom: 0,
                                }}
                              >
                                {row.hash}
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{
                                  borderBottom: 0,
                                }}
                              >
                                <img
                                  src={row.AlbumImage}
                                  alt={row.title}
                                  width={"70%"}
                                />
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{
                                  color: "#CFC5C5",
                                  fontFamily: "Poppins",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: "500",
                                  lineHeight: "normal",
                                  textTransform: "capitalize",
                                  borderBottom: 0,
                                }}
                              >
                                {row.title}
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{
                                  color: "#CFC5C5",
                                  fontFamily: "Poppins",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: "500",
                                  lineHeight: "normal",
                                  textTransform: "capitalize",
                                  borderBottom: 0,
                                }}
                              >
                                {row.playing}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{
                                  color: "#CFC5C5",
                                  fontFamily: "Poppins",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: "500",
                                  lineHeight: "normal",
                                  textTransform: "capitalize",
                                  borderBottom: 0,
                                }}
                              >
                                {row.time}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  color: "#CFC5C5",
                                  fontFamily: "Poppins",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: "500",
                                  lineHeight: "normal",
                                  textTransform: "capitalize",
                                  borderBottom: 0,
                                }}
                              >
                                {row.album}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                margin: "0px 0px 30px 10.5vw",
              }}
            >
              {selected && (
                <Box
                  sx={{
                    width: "230px",
                    height: "276px",
                    borderRadius: "15px",
                    background: "#6B0000",
                    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#F6F6F6",
                        textAlign: "center",
                        fonFamily: "Poppins",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "normal",
                        marginTop: "15px",
                      }}
                    >
                      Now Playing
                    </Typography>
                    <Box
                      component="img"
                      src={songImage}
                      alt=""
                      sx={{
                        width: "80px",
                        height: "80px",
                        marginTop: "15px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        color: "#F6F6F6",
                        textAlign: "center",
                        fonFamily: "Poppins",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "normal",
                        marginTop: "10px",
                      }}
                    >
                      {songTitle}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#F6F6F6",
                        textAlign: "center",
                        fonFamily: "Poppins",
                        fontSize: "13px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal",
                        marginTop: "5px",
                      }}
                    >
                      Michael Jackson
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        marginTop: "20px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#F6F6F6",
                          textAlign: "right",
                          fontFamily: "Poppins",
                          fontSize: "13px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "normal",
                          position: "relative",
                          bottom: "40%",
                          marginRight: "10px",
                        }}
                      >
                        2.15
                      </Typography>
                      <Box
                        sx={{
                          width: "45px",
                          height: "3px",
                          background: "white",
                          borderRadius: "12px",
                        }}
                      ></Box>
                      <SlidePointer />
                      <Box
                        sx={{
                          width: "45px",
                          height: "3px",
                          background: "white",
                          borderRadius: "12px",
                        }}
                      ></Box>
                      <Typography
                        sx={{
                          color: "#F6F6F6",
                          textAlign: "right",
                          fontFamily: "Poppins",
                          fontSize: "13px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "normal",
                          position: "relative",
                          bottom: "40%",
                          marginLeft: "10px",
                        }}
                      >
                        4.18
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <RepeatIcon />
                      <Box
                        onClick={() => {
                          setSelected((prevSelected) => prevSelected - 1);
                          setPauseClicked(false);
                        }}
                      >
                        <PreviousIcon
                          style={{
                            cursor: selected > 1 ? "pointer" : "not-allowed",
                          }}
                        />
                      </Box>
                      {isPlaying ? (
                        <Box
                          sx={{
                            background: "#480000",
                            borderRadius: "10px",
                          }}
                          onClick={() => {
                            setPauseClicked(true);
                          }}
                        >
                          <StopIcon
                            style={{
                              color: "white",
                              width: "40px",
                              height: "40px",
                              cursor: "pointer",
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: "#480000",
                            borderRadius: "10px",
                          }}
                          onClick={() => {
                            setPauseClicked(false);
                          }}
                        >
                          <PauseIcon />
                        </Box>
                      )}
                      <Box
                        onClick={() => {
                          setSelected((nextSelected) => nextSelected + 1);
                          setPauseClicked(false);
                        }}
                      >
                        <NextIcon
                          style={{
                            cursor: selected < 5 ? "pointer" : "not-allowed",
                          }}
                        />
                      </Box>
                      <ShuffleIcon />
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
      {matches && (
        <MobileView
          rows={rows}
          selected={selected}
          setSelected={setSelected}
          songImage={songImage}
          songTitle={songTitle}
          isPlaying={isPlaying}
          setPauseClicked={setPauseClicked}
        />
      )}
    </Box>
  );
};

export default Home;
