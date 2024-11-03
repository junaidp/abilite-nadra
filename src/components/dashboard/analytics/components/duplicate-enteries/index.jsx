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

const DuplicateEntries = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [chartType, setChartType] = useState("area");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url =
          "https://abilite-analytics.vercel.app/duplicate-transactions";
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
    transactionId: item._id,
    transactionDate: new Date(item.Start_Date).toLocaleDateString(),
    customerName: item.Customer_Name,
    quantitySold: item.Quantity_Sold,
    perUnitPrice: item.Per_Unit_Price,
    transactionAmount: item.Transaction_Amount,
    salesTaxVat: item.Sales_Tax_Vat,
    afterVATAmount: item.After_VAT_Amount,
    balance: item.Balance,
    paymentMethod: item.Payment_Method,
    supplier: item.Supplier,
  }));

  // Custom tooltip to display more information
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>{`Transaction Date: ${data.transactionDate}`}</p>
          <p>{`Customer Name: ${data.customerName}`}</p>
          <p>{`Quantity Sold: ${data.quantitySold}`}</p>
          <p>{`Per Unit Price: ${data.perUnitPrice}`}</p>
          <p>{`Transaction Amount: ${data.transactionAmount}`}</p>
          <p>{`Sales Tax/VAT: ${data.salesTaxVat}`}</p>
          <p>{`After VAT Amount: ${data.afterVATAmount}`}</p>
          <p>{`Balance: ${data.balance}`}</p>
          <p>{`Payment Method: ${data.paymentMethod}`}</p>
          <p>{`Supplier: ${data.supplier}`}</p>
        </div>
      );
    }
    return null;
  };

  // Render the chart based on selected type
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
            <Bar
              dataKey="transactionAmount"
              fill="#8884d8"
              name="Transaction Amount"
            />
            <Bar
              dataKey="afterVATAmount"
              fill="#82ca9d"
              name="After VAT Amount"
            />
            <Bar dataKey="balance" fill="#ffc658" name="Balance" />
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
              dataKey="transactionAmount"
              stroke="#8884d8"
              fill="#8884d8"
              name="Transaction Amount"
            />
            <Area
              type="monotone"
              dataKey="afterVATAmount"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="After VAT Amount"
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
        return (
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="transactionDate" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="transactionAmount"
              stroke="#8884d8"
              name="Transaction Amount"
            />
            <Line
              type="monotone"
              dataKey="afterVATAmount"
              stroke="#82ca9d"
              name="After VAT Amount"
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#ffc658"
              name="Balance"
            />
          </LineChart>
        );
      case "table":
        return (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Transaction Date</th>
                  <th>Customer Name</th>
                  <th>Quantity Sold</th>
                  <th>Per Unit Price</th>
                  <th>Transaction Amount</th>
                  <th>Sales Tax/VAT</th>
                  <th>After VAT Amount</th>
                  <th>Balance</th>
                  <th>Payment Method</th>
                  <th>Supplier</th>
                </tr>
              </thead>
              <tbody>
                {formattedData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.transactionDate}</td>
                    <td>{data.customerName}</td>
                    <td>{data.quantitySold}</td>
                    <td>{data.perUnitPrice}</td>
                    <td>{data.transactionAmount}</td>
                    <td>{data.salesTaxVat}</td>
                    <td>{data.afterVATAmount}</td>
                    <td>{data.balance}</td>
                    <td>{data.paymentMethod}</td>
                    <td>{data.supplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="duplicate-entries-container">
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
          <option value="table">Table View</option>
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

export default DuplicateEntries;
