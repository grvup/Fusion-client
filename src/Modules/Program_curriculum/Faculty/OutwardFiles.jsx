import React, { useState } from "react";
import { ScrollArea, Button } from "@mantine/core";

// import { MagnifyingGlass, X } from "@phosphor-icons/react";

function OutwardFile() {
  const [activeTab, setActiveTab] = useState("OutwardFiles");
  // const [filter, setFilter] = useState({
  //   sendBy: "",
  //   receivedAs: "",
  //   fileId: 0,
  //   remark: "",
  //   date: "",
  // });

  const OutwardFiles = [
    {
      sendBy: "atul - Professor",
      receivedAs: "vkjain - HOD (CSE)",
      fileId: 1,
      remark: "pls take a review",
      date: "Oct 13, 2024, 10:58 p.m.",
    },
  ];

  const ArchivedFiles = [
    {
      sendBy: "atul - Professor",
      receivedAs: "vkjain - HOD (CSE)",
      fileId: 1,
      remark: "check it",
      date: "Oct 13, 2024, 11:12 p.m.",
    },
  ];

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilter({
  //     ...filter,
  //     [name]: value,
  //   });
  // };

  return (
    <div style={{ padding: "20px", paddingTop: "10px" }}>
      {/* <div className="program-options" style={{ border: "none" }}>
        <div className="top-actions">
          {!isSearchVisible ? (

            <MagnifyingGlass
              size={24}
              onClick={() => setIsSearchVisible(true)}
              style={{ cursor: "pointer", color: "#007bff" }}
            />
          ) : null}
        </div>
      </div> */}

      <div className="courses-container">
        <div className="courses-table-section full-width">
          <div className="tabs">
            <Button
              variant={activeTab === "OutwardFiles" ? "filled" : "outline"}
              onClick={() => setActiveTab("OutwardFiles")}
            >
              Outward Files
            </Button>
            <Button
              variant={
                activeTab === "Finished OutwardFiles" ? "filled" : "outline"
              }
              onClick={() => setActiveTab("Finished OutwardFiles")}
            >
              Archived FIles
            </Button>
          </div>

          <ScrollArea
            className="courses-scroll-area"
            type="hover"
            style={{ height: "300px" }}
          >
            {activeTab === "OutwardFiles" && (
              <div className="OutwardFiles-table">
                <table className="courses-table">
                  <thead className="courses-table-header">
                    <tr>
                      <th>Send by</th>
                      <th>Received as</th>
                      <th>File id</th>
                      <th>remark</th>
                      <th>date</th>
                      <th>View File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OutwardFiles.map((outward, index) => (
                      <tr key={index} className="courses-table-row">
                        <td>{outward.sendBy}</td>
                        <td>{outward.receivedAs}</td>
                        <td>{outward.fileId}</td>
                        <td>{outward.remark}</td>
                        <td>{outward.date}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <Button
                              variant="filled"
                              color="blue"
                              onClick={() => {
                                window.location.href = `/programme_curriculum/view_inward_file`;
                              }}
                            >
                              View
                            </Button>
                            <Button variant="filled" color="gray">
                              Archive
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "Finished OutwardFiles" && (
              <div className="OutwardFiles-table">
                <table className="courses-table">
                  <thead className="courses-table-header">
                    <tr>
                      <th>Send by</th>
                      <th>Received as</th>
                      <th>File id</th>
                      <th>Remark</th>
                      <th>Date</th>
                      <th>View File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ArchivedFiles.map((outward, index) => (
                      <tr key={index} className="courses-table-row">
                        <td>{outward.sendBy}</td>
                        <td>{outward.receivedAs}</td>
                        <td>{outward.fileId}</td>
                        <td>{outward.remark}</td>
                        <td>{outward.date}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <Button
                              variant="filled"
                              color="blue"
                              onClick={() => {
                                window.location.href = `/programme_curriculum/view_inward_file`;
                              }}
                            >
                              View
                            </Button>
                            <Button variant="filled" color="green">
                              UnArchive
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Remove isSearchVisible from className */}
      </div>

      <style>{`
        .courses-container {
          display: flex;
          gap: 20px;
          width: 100%;
          height: 100vh;
          transition: all 0.3s ease-in-out;
        }

        .courses-table-section {
          flex: 3;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease-in-out;
          overflow-x: scroll;
        }

        .full-width {
          flex: 1;
        }

        .top-actions {
          display: flex;
          gap: 10px;
          margin-left: auto;
          align-items: center;
        }

        .tabs {
          display: flex;
          gap: 20px;
          margin-top: 10px;
        }

        .courses-scroll-area {
          margin-top: 20px;
        }

        // .OutwardFiles-table {
        //   margin-top: 20px;
        // }

        .courses-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #d3d3d3;
        }

        .courses-table th {
          padding: 15px 20px;
          background-color: #C5E2F6;
          color: #3498db;
          font-size: 16px;
          text-align: center;
          border-right: 1px solid #d3d3d3;
          font-weight: normal;
        }

        .courses-table th:last-child {
          border-right: none;
        }

        .courses-table td {
          padding: 15px 20px;
          text-align: center;
          color: black;
          border-right: 1px solid #d3d3d3;
        }

        .courses-table td:last-child {
          border-right: none;
        }

        /* Add alternating row colors */
        .courses-table tbody tr:nth-child(even) {
          background-color: #15ABFF1C;
        }

        .courses-table tbody tr:nth-child(odd) {
          background-color: #fff;
        }

        .courses-search-section {
          flex: 1;
          min-width: 300px;
          transition: all 0.3s ease-in-out;
          height: 400px;
          position: relative;
        }

        .filter-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .breadcrumbs {
          font-size: 14px;
          margin-bottom: 10px;
          color: #333;
          font-size: 20px;
        }

        .breadcrumbs > span {
          margin-right: 5px;
          font-size: 1.4vw;
          font-weight: bold;
        }

        .breadcrumbs > span::after {
          content: ">";
          margin-left: 5px;
        }

        .breadcrumbs > span:last-child::after {
          content: ""; /* Remove the '>' from the last breadcrumb */
        }
      `}</style>
    </div>
  );
}

export default OutwardFile;
