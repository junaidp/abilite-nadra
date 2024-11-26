import React, { useState } from "react";
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

const DuplicateEntries = ({ data }) => {
  const [chartType, setChartType] = useState("table");

  // If data is empty, return an empty array for the formatted data
  const formattedData = data || [];

  // Extract keys dynamically from the first item in the data array to use as chart fields
  const keys = formattedData.length > 0 ? Object.keys(formattedData[0]) : [];

  // Custom tooltip to display more information
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      return (
        <div className="custom-tooltip">
          {keys.map((key) => (
            <p key={key}>
              {key}: {dataItem[key]}
            </p>
          ))}
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
            <XAxis dataKey={keys[0]} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {keys.slice(1).map((key) => (
              <Bar key={key} dataKey={key} fill="#8884d8" name={key} />
            ))}
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={keys[0]} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {keys.slice(1).map((key) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke="#8884d8"
                fill="#8884d8"
                name={key}
              />
            ))}
          </AreaChart>
        );
      case "line":
        return (
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={keys[0]} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {keys.slice(1).map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke="#8884d8"
                name={key}
              />
            ))}
          </LineChart>
        );
      case "table":
        return (
          <div>
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  {keys.map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formattedData.map((item, index) => (
                  <tr key={index}>
                    {keys.map((key) => (
                      <td key={key}>{item[key]}</td>
                    ))}
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

      <div className="chart-container mt-4 ml-4">
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DuplicateEntries;
