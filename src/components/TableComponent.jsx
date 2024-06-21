import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Data from "../data.json";
import BillieJeanImg from "../assets/images/billie_jean.png";
import BeatItImg from "../assets/images/beat_it.png";
import SmoothCrimnalImg from "../assets/images/smooth_criminal.png";
import DontStopImg from "../assets/images/dont_stop.png";
import RockWithYouImg from "../assets/images/rock_with_you.png";

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

export default function TableComponent({ updateState }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        background: "transparent",
        overflowY: "auto",
        overflowX: "hidden",
        height: "170px",
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#5d0000",
          borderRadius: "10px",
        },
        marginTop: "20px",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                "&:hover": { background: "#520000", transform: "scale(1.01)" },
                height: 40,
              }}
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
                  cursor: "pointer",
                }}
                onClick={() => updateState(row.hash)}
              >
                <img src={row.AlbumImage} alt={row.title} width={"70%"} />
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
                  cursor: "pointer",
                }}
                onClick={() => updateState(row.hash)}
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
  );
}
