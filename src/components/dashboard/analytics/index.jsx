import React, { useEffect, useRef } from "react";
import "./index.css";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

const TableauEmbed = () => {
  const vizRef = useRef(null);
  let url =
    "https://public.tableau.com/views/SQLQueryResults/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link";

  let [selectedProcess, setSelectedProcess] = React.useState("");
  let [selectedCategory, setSelectedCategory] = React.useState("");
  let [array, setArray] = React.useState([
    {
      name: "Order To Cash",
      selected: false,
      category: [
        {
          name: "Financial Anomalies",
          query: "Duplicate Transactions, Late payments, … etc",
          selected: false,
        },
        {
          name: "Operational Process Anomalies",
          query: "Inconsistent Tax Calculations, … etc",
          selected: false,
        },
        {
          name: "Customer Interaction Anomalies ",
          query: "Unusual Discounts, … etc",
          selected: false,
        },
      ],
    },
    {
      name: "Procurement",
      selected: false,
      category: [
        {
          name: "Process & Approval Anomalies",
          query: "Order Approval Delays, … etc",
          selected: false,
        },
        {
          name: "Vendor and Supplier Performance",
          query: "Inactive Vendor Transactions, … etc",
          selected: false,
        },
      ],
    },
    {
      name: "Payroll",
      selected: false,
      category: [
        {
          name: "Compensation Consistency ",
          query: "Inconsistent Deductions, … etc",
          selected: false,
        },
        {
          name: "Unusual Benefits & Disbursements ",
          query: " Unusual Patterns in Bonus Payments, … etc",
          selected: false,
        },
      ],
    },
  ]);

  function handleClickProcess(processName) {
    setSelectedProcess(processName);
    setSelectedCategory("");
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
                  : { ...category, selected: false }
              ),
            }
          : process
      )
    );
  }

  useEffect(() => {
    const options = {
      width: "100%",
      height: "600px",
      hideTabs: true,
      hideToolbar: true,
    };

    const viz = new window.tableau.Viz(vizRef.current, url, options);

    return () => {
      viz.dispose();
    };
  }, []);

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
              {selectedCategory && selectedProcess && (
                <Tooltip
                  title={
                    array
                      ?.find((process) => process?.name === selectedProcess)
                      ?.category?.find(
                        (category) => category?.name === selectedCategory
                      )?.query
                  }
                >
                  <Chip
                    label={
                      array
                        ?.find((process) => process?.name === selectedProcess)
                        ?.category?.find(
                          (category) => category?.name === selectedCategory
                        )?.query
                    }
                  />
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div ref={vizRef}></div>
      </div>
    </div>
  );
};

export default TableauEmbed;
