import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "../style/home.css";

const Grid = () => {
  const rows = 15;
  const cols = 20;
  const dropLength = 7;
  const activationThreshold = 0.05;
  const initialDrops = Array.from({ length: cols }, () => ({
    row: -dropLength,
    active: false,
    opacity: Array.from(
      { length: dropLength },
      (_, i) => 0.3 + i * 0.1
    ).reverse(),
  }));

  const [drops, setDrops] = useState(initialDrops);
  const [dropColor, setDropColor] = useState("#FF0000");
  useEffect(() => {
    const dropInterval = setInterval(() => {
      setDrops((prevDrops) =>
        prevDrops.map((drop, index) => {
          if (!drop.active && Math.random() < activationThreshold) {
            return { ...drop, row: 0, active: true };
          } else if (drop.active) {
            const newRow = drop.row + 1;
            if (newRow >= rows) {
              return { ...drop, row: -dropLength, active: false };
            }
            return { ...drop, row: newRow };
          }
          return drop;
        })
      );
    }, 80);
    const colorInterval = setInterval(() => {
      const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      setDropColor(newColor);
    }, 2500);

    return () => {
      clearInterval(dropInterval);
      clearInterval(colorInterval);
    };
  }, []);

  const gridCells = Array.from({ length: rows * cols }, (_, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;

    const drop = drops[col];
    const isDropCell =
      drop.active && row >= drop.row && row < drop.row + dropLength;

    let opacity = 1;

    if (isDropCell) {
      const dropIndex = row - drop.row;
      opacity = drop.opacity[dropLength - 1 - dropIndex];
    }

    return (
      <Box
        key={index}
        className={`grid-cell ${isDropCell ? "drop-cell" : ""}`}
        style={{
          opacity: opacity,
          transition: "opacity 0.3s ease-out, background-color 0.3s ease-out",
          backgroundColor: isDropCell ? dropColor : "black",
        }}
      ></Box>
    );
  });

  return <Box className="grid-container">{gridCells}</Box>;
};

export default Grid;
