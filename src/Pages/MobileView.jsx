import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SlidePointer from "../svgComponents/SlidePointer";
import RepeatIcon from "../svgComponents/RepeatIcon";
import PreviousIcon from "../svgComponents/PreviousIcon";
import PauseIcon from "../svgComponents/PauseIcon";
import NextIcon from "../svgComponents/NextIcon";
import ShuffleIcon from "../svgComponents/ShuffleIcon";
import StopIcon from "@mui/icons-material/Stop";
import MenuIcon from "@mui/icons-material/Menu";
import MusicLogo from "../svgComponents/MusicLogo";
import DiscoverImg from "../svgComponents/DiscoverImg";
import HomeImg from "../svgComponents/HomeImg";
import LibraryImg from "../svgComponents/LibraryImg";
import TrendsImg from "../svgComponents/TrendsImg";
import SettingImg from "../svgComponents/SettingImg";
import LogoutImg from "../svgComponents/LogoutImg";
import { useState } from "react";

const MobileView = ({
  rows,
  selected,
  setSelected,
  songImage,
  songTitle,
  setPauseClicked,
  isPlaying,
}) => {
  const [menuHidden, setMenuHidden] = useState(false);

  const handleMenu = () => {
    setMenuHidden((prevMenuHidden) => !prevMenuHidden);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #4C0000 0%, #0A0A0A 100%);",
        overflow: "scroll",
      }}
    >
      <Box
        className="menu-bar"
        sx={{
          width: "70vw",
          background: "#0E0E0E",
          display: menuHidden ? "flex" : "none",
          flexDirection: "column",
          position: "absolute",
          zIndex: "1",
          borderRadius: "0px 12px 12px 12px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              margin: "2vh 2vw 0px 3vw",
              justifyContent: "flex-start",
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
              margin: "4vh 0px 0px 7vw",
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "5vh 7vw",
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
      <MenuIcon
        sx={{
          color: "white",
          position: "absolute",
          left: "3%",
          top: "1%",
          zIndex: "2",
        }}
        onClick={handleMenu}
      />
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "230px",
            height: "276px",
            borderRadius: "15px",
            background: "#6B0000",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
            display: "flex",
            justifyContent: "center",
            marginTop: "4vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!songImage && !songTitle && (
              <Typography
                sx={{
                  color: "#F6F6F6",
                  textAlign: "center",
                  fonFamily: "Poppins",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                }}
              >
                Select a song to play!
              </Typography>
            )}
            {songImage && songTitle && (
              <Box>
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
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
                </Box>
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
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            background: "transparent",
            marginTop: "20px",
            width: "90vw",
            height: "90vh",
            overflow: "Scroll",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    color: "#CFC5C5",
                    fontFamily: "Poppins",
                    fontSize: "10px",
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
                    fontSize: "10px",
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
                    fontSize: "10px",
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
                    fontSize: "10px",
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
                    fontSize: "10px",
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
                    fontSize: "10px",
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
                      row.hash === selected ? "#520000" : "transparent",
                    height: 40,
                    cursor: "pointer",
                    overflow: "scroll",
                  }}
                  onClick={() => setSelected(row.hash)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: "#CFC5C5",
                      fontFamily: "Poppins",
                      fontSize: "10px",
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
                      padding: "0px",
                    }}
                  >
                    <img src={row.AlbumImage} alt={row.title} width={"100%"} />
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "#CFC5C5",
                      fontFamily: "Poppins",
                      fontSize: "10px",
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
                      fontSize: "10px",
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
                      fontSize: "10px",
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
                      fontSize: "10px",
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
  );
};

export default MobileView;
