import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./index.css";

const OverDue = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [chartType, setChartType] = useState("area");

  useEffect(() => {
    const start = async () => {
      setLoading(true);
      try {
        let url = "https://16309d26240e.ngrok.app/api/payments/overdue";
        const { data } = await axios.get(url);
        setResponse(data);
      } catch (error) {
        toast.error("An error has occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    start();
  }, []);

  const formattedData = response.map((item) => ({
    id: item.id,
    dueDate: new Date(item.dueDate).toLocaleDateString(),
  }));

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dueDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="id" fill="#8884d8" />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dueDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="id"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        );
      case "line":
      default:
        return (
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dueDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="id" stroke="#8884d8" />
          </LineChart>
        );
    }
  };

  return (
    <div className="overdue-container">
      <h1 className="heading">Overdue Payments</h1>
      <div className="chart-selector row">
        <select
          id="chartType"
          className="form-select h-40 col-lg-10"
          aria-label="Default select example"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="area">Area Chart</option>
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default OverDue;
