import React from "react";
import "./index.css";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import DataView from "./components/index";
import { toast } from "react-toastify";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Analytics = () => {
  const [selectedProcess, setSelectedProcess] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [data, setData] = React.useState("");
  const [array, setArray] = React.useState([
    {
      name: "Order To Cash",
      selected: false,
      category: [
        {
          name: "Financial Anomalies",
          selected: false,
          queries: [
            {
              name: "Abnormal Inventory Changes",
              selected: false,
              endpoint: "abnormalInventoryChanges",
            },
            {
              name: "Duplicate Transactions",
              selected: false,
              endpoint: "duplicateTransactions",
            },
            {
              name: "Late Payments",
              selected: false,
              endpoint: "latePayments",
            },
          ],
        },
        {
          name: "Operational Process Anomalies",
          selected: false,
          queries: [
            {
              name: "Inconsistent Handling of Sales Tax Calculation",
              selected: false,
              endpoint: "inconsistentHandlingOfSalesTaxCalculation",
            },
            {
              name: "Inconsistent Tax Calculations",
              selected: false,
              endpoint: "inconsistentTaxCalculations",
            },
            {
              name: "Inconsistent Tax Rates",
              selected: false,
              endpoint: "inconsistentTaxRates",
            },
            // {
            //   name: "Inconsistent Unit Costs",
            //   selected: false,
            //   endpoint: "inconsistentUnitCosts",
            // },
            // {
            //   name: "Inconsistent Unit Prices",
            //   selected: false,
            //   endpoint: "inconsistentUnitPrices",
            // },
            {
              name: "Unusual Time Gaps in Payment Processing",
              selected: false,
              endpoint: "unusualTimeGapsInPaymentProcessing",
            },
            {
              name: "Unusual Time Gaps in Shipped and Delivered Dates",
              selected: false,
              endpoint: "unusualTimeGapsInShippedAndDeliveredDates",
            },
          ],
        },
        {
          name: "Customer Interaction Anomalies",
          selected: false,
          queries: [
            {
              name: "Inconsistencies in Payment Methods",
              selected: false,
              endpoint: "inconsistenciesInPaymentMethods",
            },
            // {
            //   name: "Suspicious Customer Behavior",
            //   selected: false,
            //   endpoint: "suspiciousCustomerBehavior",
            // },
            {
              name: "Unusual Discounts",
              selected: false,
              endpoint: "unusualDiscounts",
            },
            {
              name: "Unusual Order Amounts",
              selected: false,
              endpoint: "unusualOrderAmounts",
            },
            {
              name: "Unusual Patterns in Customer Returns",
              selected: false,
              endpoint: "unusualPatternsInCustomerReturns",
            },
            // {
            //   name: "Unusual Patterns in Employee Sales Performance",
            //   selected: false,
            //   endpoint: "unusualPatternsInEmployeeSalesPerformance",
            // },
            {
              name: "Unusual Patterns in Gift Card Usage",
              selected: false,
              endpoint: "unusualPatternsInGiftCardUsage",
            },
            {
              name: "Unusual Patterns in Invoice Amounts",
              selected: false,
              endpoint: "unusualPatternsInInvoiceAmounts",
            },
            // {
            //   name: "Unusual Patterns in Product Returns",
            //   selected: false,
            //   endpoint: "unusualPatternsInProductReturns",
            // },
            {
              name: "Unusual Patterns in Refunds",
              selected: false,
              endpoint: "unusualPatternsInRefunds",
            },
          ],
        },
      ],
    },
    {
      name: "Payments",
      selected: false,
      category: [
        {
          name: "Transaction Integrity and Compliance",
          selected: false,
          queries: [
            {
              name: "Duplicate Payments",
              selected: false,
              endpoint: "duplicatePayments",
            },
            {
              name: "Payments Exceeding Approved Limits",
              selected: false,
              endpoint: "paymentsExceedingApprovedLimits",
            },
            // {
            //   name: "Payments Inconsistent with Contractual Agreements",
            //   selected: false,
            //   endpoint: "paymentsInconsistentWithContractualAgreements",
            // },
            {
              name: "Payments with Unexpected Expense Categories",
              selected: false,
              endpoint: "paymentsWithUnexpectedExpenseCategories",
            },
            {
              name: "Payments with Unexpected Third-Party Involvement",
              selected: false,
              endpoint: "paymentsWithUnexpectedThirdPartyInvolvement",
            },
            // {
            //   name: "Unexpected Changes in Payment Patterns Over Time",
            //   selected: false,
            //   endpoint: "unexpectedChangesInPaymentPatternsOverTime",
            // },
            {
              name: "Unusual Patterns in Payment Rejections or Failures",
              selected: false,
              endpoint: "unusualPatternsInPaymentRejectionsOrFailures",
            },
          ],
        },
        {
          name: "Geographical and Regulatory Compliance",
          selected: false,
          queries: [
            {
              name: "Payments with Inconsistent VAT/GST Application",
              selected: false,
              endpoint: "paymentsWithInconsistentVAT_GSTApplication",
            },
            {
              name: "Payments with Unexpected Cross-Currency Transactions",
              selected: false,
              endpoint: "paymentsWithUnexpectedCrossCurrencyTransactions",
            },
          ],
        },
        {
          name: "Operational Anomalies",
          selected: false,
          queries: [
            {
              name: "Payments Outside Standard Business Hours",
              selected: false,
              endpoint: "paymentsOutsideStandardBusinessHours",
            },
            {
              name: "Payments with High Transaction Fees",
              selected: false,
              endpoint: "paymentsWithHighTransactionFees",
            },
            {
              name: "Payments with High Transaction Velocity",
              selected: false,
              endpoint: "paymentsWithHighTransactionVelocity",
            },
            {
              name: "Payments with Inconsistent Payment Date vs. Invoice Due Date",
              selected: false,
              endpoint: "PaymentsWithInconsistentPaymentDateVSInvoiceDueDate",
            },
            {
              name: "Payments with Unexpected Delays",
              selected: false,
              endpoint: "paymentsWithUnexpectedDelays",
            },
            // {
            //   name: "Payments with Unexpected Late Fees",
            //   selected: false,
            //   endpoint: "paymentsWithUnexpectedLateFees",
            // },
            // {
            //   name: "Payments with Unexpected Payment Sources",
            //   selected: false,
            //   endpoint: "paymentsWithUnexpectedPaymentSources",
            // },
            // {
            //   name: "Payments with Unusual Timing or Frequency by Vendor",
            //   selected: false,
            //   endpoint: "paymentsWithUnusualTimingOrFrequencyByVendor",
            // },
            {
              name: "Payments with Unusual Payment Duration",
              selected: false,
              endpoint: "paymentsWithUnusualPaymentDuration",
            },
            // {
            //   name: "Payments with Unusual Patterns in Invoice Matching",
            //   selected: false,
            //   endpoint: "paymentsWithUnusualPatternsInInvoiceMatching",
            // },
          ],
        },
        {
          name: "Payment Behavior Analysis",
          selected: false,
          queries: [
            {
              name: "Payments with Inconsistent Handling of Advance Payments",
              selected: false,
              endpoint: "paymentsWithInconsistentHandlingOfAdvancePayments",
            },
            {
              name: "Unusual Patterns in Payment Approval Chains",
              selected: false,
              endpoint: "unusualPatternsInPaymentApprovalChains",
            },
            {
              name: "Unusual Patterns in Payment Approval Times",
              selected: false,
              endpoint: "unusualPatternsInPaymentApprovalTimes",
            },
            {
              name: "Unusual Patterns in Payment Metadata",
              selected: false,
              endpoint: "unusualPatternsInPaymentMetadata",
            },
          ],
        },
      ],
    },
    {
      name: "Procurement",
      selected: false,
      category: [
        {
          name: "Process and Approval Anomalies",
          selected: false,
          queries: [
            {
              name: "Abnormal Frequency of Change Orders",
              selected: false,
              endpoint: "abnormalFrequencyOfChangeOrders",
            },
            {
              name: "Abnormal Order Approval Delays",
              selected: false,
              endpoint: "abnormalOrderApprovalDelays",
            },
            // {
            //   name: "Abnormal Patterns in Employee Vacation or Leave",
            //   selected: false,
            //   endpoint: "abnormalEmployeeVacationKickback",
            // },
            {
              name: "Abnormal Patterns in Procurement System Logins",
              selected: false,
              endpoint: "abnormalProcurementLogins",
            },
            {
              name: "Abnormal Transaction Timing",
              selected: false,
              endpoint: "abnormalTransactionTiming",
            },
            {
              name: "Abnormal Trends in Warranty Claims",
              selected: false,
              endpoint: "abnormalTrendsInWarrantyClaims",
            },
            {
              name: "Outliers in Purchase Amounts",
              selected: false,
              endpoint: "outliersInPurchaseAmounts",
            },
            {
              name: "Unexpected Patterns in Order Cancellation Rates",
              selected: false,
              endpoint: "unexpectedCancellationPatterns",
            },
          ],
        },
        {
          name: "Vendor and Supplier Performance",
          selected: false,
          queries: [
            {
              name: "Abnormal Vendor Relationship Durations",
              selected: false,
              endpoint: "abnormalVendorRelationshipDurations",
            },
            {
              name: "Anomalies in Vendor Bid Submission Times",
              selected: false,
              endpoint: "anomaliesInVendorBidSubmissionTimes",
            },
            {
              name: "Duplicate Entries",
              selected: false,
              endpoint: "findDuplicateEntries",
            },
            {
              name: "Inactive Vendor Transactions",
              selected: false,
              endpoint: "inactiveVendorTransactions",
            },
            {
              name: "Vendor Credit Limit Violations",
              selected: false,
              endpoint: "vendorCreditLimitViolations",
            },
          ],
        },
      ],
    },
  ]);

  const fetchData = async (endpoint) => {
    if (loading) return;
    setLoading(true);
    try {
      const url = `https://abilite-analytics.vercel.app/api/v1/${endpoint}`;
      const { data } = await axios.get(url);
      setData(data);
    } catch (error) {
      toast.error("An error has occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  function handleClickProcess(processName) {
    setSelectedProcess(processName);
    setArray((prevProcesses) =>
      prevProcesses.map((process) => {
        const isSelectedProcess = process.name === processName;

        return {
          ...process,
          selected: isSelectedProcess,
          category: process.category.map((category) => ({
            ...category,
            selected: false,
            queries: category.queries.map((query) => ({
              ...query,
              selected: false,
            })),
          })),
        };
      })
    );
  }

  function handleClickCategory(categoryName) {
    setSelectedCategory(categoryName);
    setArray((prevProcesses) =>
      prevProcesses.map((process) => {
        if (process.name !== selectedProcess) return process;

        return {
          ...process,
          category: process.category.map((category) => {
            const isSelectedCategory = category.name === categoryName;

            return {
              ...category,
              selected: isSelectedCategory,
              queries: category.queries.map((query) => ({
                ...query,
                selected: false,
              })),
            };
          }),
        };
      })
    );
  }

  function handleClickQuery(queryName) {
    setArray((prevProcesses) =>
      prevProcesses.map((process) => {
        if (process.name !== selectedProcess) return process;

        return {
          ...process,
          category: process.category.map((category) => {
            if (category.name !== selectedCategory) return category;

            return {
              ...category,
              selected: true,
              queries: category.queries.map((query) => {
                const isSelectedQuery = query.name === queryName;
                if (isSelectedQuery) {
                  fetchData(query.endpoint);
                }
                return {
                  ...query,
                  selected: isSelectedQuery,
                };
              }),
            };
          }),
        };
      })
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
        {loading ? (
          <CircularProgress />
        ) : !data || data.length == 0 ? (
          <p>No data found.</p>
        ) : (
          <DataView data={data} />
        )}
      </div>
    </div>
  );
};

export default Analytics;
