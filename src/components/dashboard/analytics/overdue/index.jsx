import React from "react";
import "./index.css";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../global-redux/reducers/common/slice";
import { useDispatch } from "react-redux";

const OverDue = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState([]);

  React.useEffect(() => {
    const start = async () => {
      if (loading) return;
      setLoading(true);
      try {
        let url = "https://16309d26240e.ngrok.app/api/payments/overdue";
        const { data } = await axios.get(url);
        setResponse(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("An error has accoured. Please try again later");
      }
    };
    start();
  }, []);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-overdue"));
    dispatch(InitialLoadSidebarActiveLink("li-audit-analytics"));
  }, []);

  return (
    <div className="row">
      <div className="col-lg-12 graphBox">
        <h1 className="heading text-center mt-2">Result</h1>
        <hr />
        <div className="queryBoxResult">
          {loading ? (
            <div className="d-flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="d-flex justify-center flex-col gap-3 align-items-center">
              {response?.map((singleItem) => {
                return Object.entries(singleItem).map(([key, value], index) => {
                  return (
                    <div key={index}>
                      {key !== "id" && <p>{`${key}: ${value}`}</p>}
                    </div>
                  );
                });
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverDue;
