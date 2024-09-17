import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent = ({ dataInfo }) => {
  const data = [
    { name: "High", value: dataInfo?.orrhigh },
    {
      name: "Medium",
      value: dataInfo?.orrmedium,
    },
    { name: "Low", value: dataInfo?.orrlow },
  ];

  const COLORS = ["#0088FE", "#ED7D31", "#A5A5A5"];

  return (
    <>
      {(dataInfo?.orrhigh === 0 || !dataInfo?.orrhigh) &&
      (dataInfo?.orrmedium === 0 || !dataInfo?.orrmedium) &&
      (dataInfo?.orrlow === 0 || !dataInfo?.orrlow) ? (
        <h5 className="my-4">No Observation Added Yet</h5>
      ) : (
        <PieChart width={500} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      )}
    </>
  );
};

export default PieChartComponent;
