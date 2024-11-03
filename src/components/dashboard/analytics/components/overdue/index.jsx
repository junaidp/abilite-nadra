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
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://abilite-analytics.vercel.app/late-payments"
        );
        setResponse(data);
      } catch (error) {
        toast.error("An error has occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formattedData = response.map((item) => ({
    Customer_ID: item.Customer_ID,
    Order_ID: item.Order_ID,
    Customer_Name: item.Customer_Name,
    Balance: item.Balance,
    Payment_Method: item.Payment_Method,
    Due_Date: new Date(item.Due_Date).toLocaleDateString(),
    overdueDays: item.overdueDays,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="label">{`Due Date: ${label}`}</p>
          <p>{`Customer Name: ${data.Customer_Name}`}</p>
          <p>{`Payment Method: ${data.Payment_Method}`}</p>
          <p>{`Balance: ${data.Balance}`}</p>
          <p>{`Overdue Days: ${data.overdueDays}`}</p>
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
            <XAxis dataKey="Due_Date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="overdueDays" fill="#8884d8" name="Overdue Days" />
            <Bar dataKey="Balance" fill="#ffc658" name="Balance" />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Due_Date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="overdueDays"
              stroke="#8884d8"
              fill="#8884d8"
              name="Overdue Days"
            />
            <Area
              type="monotone"
              dataKey="Balance"
              stroke="#ffc658"
              fill="#ffc658"
              name="Balance"
            />
          </AreaChart>
        );
      case "line":
        return (
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Due_Date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="overdueDays"
              stroke="#8884d8"
              name="Overdue Days"
            />
            <Line
              type="monotone"
              dataKey="Balance"
              stroke="#ffc658"
              name="Balance"
            />
          </LineChart>
        );
      case "table":
      default:
        return (
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Balance</th>
                <th>Payment Method</th>
                <th>Due Date</th>
                <th>Overdue Days</th>
              </tr>
            </thead>
            <tbody>
              {formattedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Customer_ID}</td>
                  <td>{item.Order_ID}</td>
                  <td>{item.Customer_Name}</td>
                  <td>{item.Balance}</td>
                  <td>{item.Payment_Method}</td>
                  <td>{item.Due_Date}</td>
                  <td>{item.overdueDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
          aria-label="Select chart type"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="area">Area Chart</option>
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default OverDue;
