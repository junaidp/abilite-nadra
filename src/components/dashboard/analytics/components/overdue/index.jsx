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
        let url = "https://abilite-analytics.vercel.app/overdue";
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
    id: item._id,
    customerName: item.Customer_Name,
    quantitySold: item.Quantity_Sold,
    transactionAmount: item.Transaction_Amount,
    salesTaxVat: item.Sales_Tax_Vat,
    afterVatAmount: item.After_VAT_Amount,
    balance: item.Balance,
    paymentMethod: item.Payment_Method,
    supplier: item.Supplier,
    perUnitPrice: item.Per_Unit_Price,
    dueDate: new Date(item.Due_Date).toLocaleDateString(),
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="label">{`Due Date: ${label}`}</p>
          <p>{`Customer Name: ${data.customerName}`}</p>
          <p>{`Payment Method: ${data.paymentMethod}`}</p>
          <p>{`Supplier: ${data.supplier}`}</p>
          <p>{`Per Unit Price: ${data.perUnitPrice}`}</p>
          <p>{`Quantity Sold: ${data.quantitySold}`}</p>
          <p>{`Transaction Amount: ${data.transactionAmount}`}</p>
          <p>{`Balance: ${data.balance}`}</p>
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
            <XAxis dataKey="dueDate" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="quantitySold" fill="#8884d8" name="Quantity Sold" />
            <Bar
              dataKey="transactionAmount"
              fill="#82ca9d"
              name="Transaction Amount"
            />
            <Bar dataKey="balance" fill="#ffc658" name="Balance" />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dueDate" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="quantitySold"
              stroke="#8884d8"
              fill="#8884d8"
              name="Quantity Sold"
            />
            <Area
              type="monotone"
              dataKey="transactionAmount"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Transaction Amount"
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#ffc658"
              fill="#ffc658"
              name="Balance"
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
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="quantitySold"
              stroke="#8884d8"
              name="Quantity Sold"
            />
            <Line
              type="monotone"
              dataKey="transactionAmount"
              stroke="#82ca9d"
              name="Transaction Amount"
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#ffc658"
              name="Balance"
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
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default OverDue;
