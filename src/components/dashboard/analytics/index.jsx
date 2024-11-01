import React from "react";
import "./index.css";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Transactions from "./components/duplicate-enteries/index";
import OverDue from "./components/overdue/index";

const Analytics = () => {
  let [selectedProcess, setSelectedProcess] = React.useState("");
  let [selectedCategory, setSelectedCategory] = React.useState("");
  let [selectedQuery, setSelectedQuery] = React.useState("");
  let [array, setArray] = React.useState([
    {
      name: "Order To Cash",
      selected: false,
      category: [
        {
          name: "Financial Anomalies",
          selected: false,
          queries: [
            {
              name: "Duplicate Transactions",
              selected: false,
            },
            {
              name: "Late Payments",
              selected: false,
            },
          ],
        },
      ],
    },
  ]);

  function handleClickProcess(processName) {
    setSelectedProcess(processName);
    setArray((pre) =>
      pre?.map((process) =>
        process?.name === processName
          ? { ...process, selected: true }
          : {
              ...process,
              selected: false,
              category: process?.category?.map((singleCategory) => {
                return {
                  ...singleCategory,
                  selected: false,
                };
              }),
            }
      )
    );
  }

  function handleClickCategory(categoryName) {
    setSelectedCategory(categoryName);
    setArray((pre) =>
      pre?.map((process) =>
        process?.name === selectedProcess
          ? {
              ...process,
              category: process?.category?.map((category) =>
                category?.name === categoryName
                  ? { ...category, selected: true }
                  : {
                      ...category,
                      selected: false,
                      queries: category?.queries?.map((singleQuery) => {
                        return {
                          ...singleQuery,
                          selected: false,
                        };
                      }),
                    }
              ),
            }
          : process
      )
    );
  }

  function handleClickQuery(query) {
    setSelectedQuery(query);
    setArray((pre) =>
      pre?.map((process) =>
        process?.name === selectedProcess
          ? {
              ...process,
              category: process?.category?.map((category) =>
                category?.name === selectedCategory
                  ? {
                      ...category,
                      selected: true,
                      queries: category?.queries?.map((singleQuery) =>
                        singleQuery?.name === query
                          ? { ...singleQuery, selected: true }
                          : { ...singleQuery, selected: false }
                      ),
                    }
                  : { ...category, selected: false }
              ),
            }
          : process
      )
    );
  }

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="row">
          <div className="col-lg-4 graphBox">
            <h1 className="heading text-center mt-2">Process</h1>
            <hr />
            <div className="processBox">
              {array.map((process, index) => {
                return (
                  <Chip
                    label={process?.name}
                    key={index}
                    variant={process?.selected ? "" : "outlined"}
                    onClick={() => handleClickProcess(process?.name)}
                  />
                );
              })}
            </div>
          </div>
          <div className="col-lg-4 graphBox">
            <h1 className="heading text-center mt-2">Category</h1>
            <hr />
            <div className="categoryBox">
              {array
                .filter((process) => process?.selected)[0]
                ?.category?.map((category, index) => {
                  return (
                    <Tooltip title={category?.name}>
                      <Chip
                        label={category?.name}
                        key={index}
                        variant={category?.selected ? "" : "outlined"}
                        onClick={() => handleClickCategory(category?.name)}
                      />
                    </Tooltip>
                  );
                })}
            </div>
          </div>
          <div className="col-lg-4 graphBox">
            <h1 className="heading text-center mt-2">Query</h1>
            <hr />
            <div className="queryBox">
              {array
                ?.find((process) => process?.name === selectedProcess)
                ?.category?.find(
                  (singleCategory) => singleCategory?.name === selectedCategory
                )
                ?.queries?.map((query, index) => {
                  return (
                    <Tooltip title={query?.name}>
                      <Chip
                        key={index}
                        label={query?.name}
                        variant={query?.selected ? "" : "outlined"}
                        onClick={() => handleClickQuery(query?.name)}
                      />
                    </Tooltip>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        {selectedQuery === "" ? (
          <p>Please Select Query</p>
        ) : selectedQuery === "Duplicate Transactions" ? (
          <Transactions />
        ) : selectedQuery === "Late Payments" ? (
          <OverDue />
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
