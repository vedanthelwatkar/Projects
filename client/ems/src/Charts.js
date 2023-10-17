import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend} from 'recharts'; // Import necessary components
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Charts() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const [h1,seth1] = useState("")

  useEffect(() => {
    let url = "http://localhost:9999/top";
    axios.get(url)
      .then(res => {
        if (res.status === 200) {
          if (res.data.length === 0){
            seth1("NO DATA FOUND")
            return
          }
          else{
          console.log(res.data);
          setInfo(res.data);
          }
        } else {
          alert("Server returned an error: " + res.status);
        }
        setLoading(false);
      })
      .catch(err => {
        alert("Issue " + err);
      });
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C05780'];

  const chartData = info.map(item => ({
    name: item.name,
    value: item.sal,
  }));

  const back = (event) => {
    event.preventDefault();
    nav('/');
  };

  return (
    <>
      <div>
        <center>
          <h1>Pie Chart</h1>
          <a href="/" className="link" onClick={back}>
            Back
          </a>
          <h2>{h1}</h2>
          {loading ? (
            <p>Loading data...</p>
          ) : (
<div className="chart-container">
  <PieChart width={800} height={400}>
    <Pie
      dataKey="value"
      data={chartData}
      cx="50%"
      cy="50%"
      outerRadius={150}
      fill="#8884d8"
      label
    >
      {chartData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
      
    </Pie>
    <Tooltip />
    <Legend layout="vertical" align="right" verticalAlign="middle"/>
  </PieChart>
</div>

          )}
        </center>
      </div>
    </>
  );
}
