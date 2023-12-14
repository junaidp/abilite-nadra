import React from "react";
import TopBar from "../../../../common/top-bar/TopBar";
import Sidebar from "../../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";
import Pagination from "../../../../common/pagination/Pagination";

const AuditableUnits = () => {
  let { showSidebar } = useSelector((state) => state.common);

  let data = [
    {
      no: "1",
      objective:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      rating: "53",
    },
  ];
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="row"
          id={showSidebar ? "SideComponents" : "SideComponentsFullWidth"}
        >
          <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
            <div className="mb-0 heading">Auditable Units</div>
          </header>

          <div className="row">
            <div className="col-lg-12">
              <div className="example-header">
                <div className="mb-2 w-100">
                  <input
                    matInput
                    placeholder="Filter"
                    id="inputField"
                    style={{ borderBottom: "1px solid black" }}
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered  table-hover rounded">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th style={{ width: "80px" }}>Sr. #</th>
                      <th>Business Objective</th>
                      <th>Risk Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item,index) => {
                      return (
                        <tr style={{ height: "40px" }} key={index}>
                          <td>{item?.no}</td>
                          <td>{item?.objective}</td>
                          <td>{item?.rating}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditableUnits;
