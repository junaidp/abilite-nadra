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
  index,
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

const AreaChart = ({ navigationInfo }) => {
  const data = [
    {
      name: "Medium",
      value: navigationInfo?.jobsDueForCompletionWithinAWeek?.length,
    },
    { name: "High", value: navigationInfo?.managementCommentsOverdue?.length },
  ];

  const COLORS = ["#0088FE", "#70AD47"];
  return (
    <>
      {navigationInfo?.jobsDueForCompletionWithinAWeek?.length === 0 &&
      navigationInfo?.managementCommentsOverdue?.length === 0 ? (
        <h5 className="my-4">No Data To Show Right Now.</h5>
      ) : (
        <PieChart width={500} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={130}
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

export default AreaChart;
