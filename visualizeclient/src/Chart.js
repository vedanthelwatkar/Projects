import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

import axios from "axios";
import "./styles/Chart.css";
import { useNavigate } from "react-router-dom";

export const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const nav = useNavigate();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let url = "http://localhost:8000/allChartData";
        let response = await axios.get(url);
        const pricesArray = response.data;
        console.log(pricesArray);

        const priceRanges = Array.from({ length: 10 }, (_, index) => {
          const lowerBound = index * 100;
          const upperBound = lowerBound + 100;

          const upperBoundLabel = upperBound === 1000 ? "above" : upperBound;

          const filteredPrices = pricesArray.filter((price) => {
            if (upperBoundLabel === "above") {
              return price >= lowerBound;
            } else {
              return price >= lowerBound && price < upperBound;
            }
          });

          const count = filteredPrices.length;

          return {
            range: `${lowerBound}-${upperBoundLabel}`,
            count: count,
          };
        });

        console.log("Fetched data successfully:", priceRanges);
        setChartData(priceRanges);
        setDataLoaded(true);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchTransactions();
  }, []);

  const handleMonthClick = async (monthNumber) => {
    setSelectedMonth(monthNumber);
    try {
      const response = await axios.post("http://localhost:8000/chartData", {
        month: monthNumber,
      });

      const priceRanges = Array.from({ length: 10 }, (_, index) => {
        const lowerBound = index * 100;
        const upperBound = lowerBound + 100;

        const upperBoundLabel = upperBound === 1000 ? "above" : upperBound;

        const count = response.data.filter((price) => {
          if (upperBoundLabel === "above") {
            return price >= lowerBound;
          } else {
            return price >= lowerBound && price < upperBound;
          }
        }).length;

        return {
          range: `${lowerBound}-${upperBoundLabel}`,
          count: count,
        };
      });

      setChartData(priceRanges);
    } catch (error) {
      console.error(error);
    }
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <div className="chart-container">
        {dataLoaded ? (
          <div className="chart">
            <div class="heading">
              Statistics -{" "}
              {selectedMonth
                ? monthNames[parseInt(selectedMonth, 10) - 1]
                : "For all months"}
            </div>
            <BarChart width={600} height={400} data={chartData}>
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8">
                <LabelList dataKey="count" position="top" />
              </Bar>
            </BarChart>
          </div>
        ) : (
          <p>Loading data...</p>
        )}

        <button
          className="nav"
          onClick={() => {
            nav("/");
          }}
        >
          Back
        </button>
        <div className="dropdown-button">
          <button className="button">Select &nbsp; ▼</button>
          <div className="dropdown-content">
            <a id="jan" onClick={() => handleMonthClick("01")}>
              January
            </a>
            <a id="feb" onClick={() => handleMonthClick("02")}>
              February
            </a>
            <a id="mar" onClick={() => handleMonthClick("03")}>
              March
            </a>
            <a id="apr" onClick={() => handleMonthClick("04")}>
              April
            </a>
            <a id="may" onClick={() => handleMonthClick("05")}>
              May
            </a>
            <a id="jun" onClick={() => handleMonthClick("06")}>
              June
            </a>
            <a id="july" onClick={() => handleMonthClick("07")}>
              July
            </a>
            <a id="aug" onClick={() => handleMonthClick("08")}>
              August
            </a>
            <a id="sept" onClick={() => handleMonthClick("09")}>
              September
            </a>
            <a id="oct" onClick={() => handleMonthClick("10")}>
              October
            </a>
            <a id="nov" onClick={() => handleMonthClick("11")}>
              November
            </a>
            <a id="dec" onClick={() => handleMonthClick("12")}>
              December
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
