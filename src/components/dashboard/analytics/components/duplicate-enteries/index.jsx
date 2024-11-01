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

const DuplicateEnteries = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [chartType, setChartType] = useState("area");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = "https://abilite-analytics.vercel.app/transactions";
        const { data } = await axios.get(url);
        setResponse(data);
      } catch (error) {
        toast.error("An error has occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Format data for charts
  const formattedData = response.map((item) => ({
    transactionId: item.Transaction_ID,
    transactionDate: new Date(item.Transaction_Date).toLocaleDateString(),
    srNo: item.Sr_No,
  }));

  // Custom tooltip to display more information
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>{`Transaction Date: ${data.transactionDate}`}</p>
          <p>{`Transaction ID: ${data.transactionId}`}</p>
          <p>{`Sr. No: ${data.srNo}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="transactionDate" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="transactionId" fill="#8884d8" name="Transaction ID" />
            <Bar dataKey="srNo" fill="#82ca9d" name="Sr. No" />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="transactionDate" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="transactionId"
              stroke="#8884d8"
              fill="#8884d8"
              name="Transaction ID"
            />
            <Area
              type="monotone"
              dataKey="srNo"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Sr. No"
            />
          </AreaChart>
        );
      case "line":
      default:
        return (
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="transactionDate" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="transactionId"
              stroke="#8884d8"
              name="Transaction ID"
            />
            <Line
              type="monotone"
              dataKey="srNo"
              stroke="#82ca9d"
              name="Sr. No"
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="overdue-container">
      <h1 className="heading">Select Chart Type</h1>
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

export default DuplicateEnteries;
