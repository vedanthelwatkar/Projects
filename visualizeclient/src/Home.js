import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Transactions } from "./components/Transactions";
import { SearchData } from "./components/SearchData";
import "./styles/Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [sale, setSale] = useState("");
  const [itemSale, setItemSale] = useState("");
  const [noSale, setNoSale] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let url = "http://localhost:8000/";
        let response = await axios.get(url);
        setTransactions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  const handleMonthClick = async (monthNumber) => {
    setSelectedMonth(monthNumber);
    let url = "http://localhost:8000/dropdown";
    let response = await axios.post(url, { month: monthNumber });
    setTransactions(response.data.message);
    setSale(response.data.sale);
    setItemSale(response.data.itemsale);
    setNoSale(response.data.nosale);
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

  const updateTransactions = (data) => {
    setTransactions(data);
  };

  return (
    <>
      <div className="transcations">
        <div className="search-dropdown">
          <div>
            <SearchData
              updateTransactions={updateTransactions}
              selectedMonth={selectedMonth}
            />
          </div>
          <div class="notification">
            <div class="notiglow"></div>
            <div class="notiborderglow"></div>
            <div class="notititle">
              Statistics - {monthNames[parseInt(selectedMonth, 10) - 1]}
            </div>
            <div class="notibody">Total sale - {sale}</div>
            <div class="notibody">Total sold item - {itemSale}</div>
            <div class="notibody">Total not sold item - {noSale}</div>
          </div>
          <button
            className="nav"
            onClick={() => {
              nav("/chart");
            }}
          >
            Get bar charts
          </button>
          <div class="dropdown-button">
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
        <Transactions transactions={transactions} />
      </div>
    </>
  );
};
