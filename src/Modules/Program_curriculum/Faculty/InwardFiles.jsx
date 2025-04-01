import React, { useState, useEffect } from "react";
import { ScrollArea, Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { fetchFacultyInwardFilesData } from "../api/api";
import { host } from "../../../routes/globalRoutes";
// import { MagnifyingGlass, X } from "@phosphor-icons/react";

function InwardFile() {
  const [activeTab, setActiveTab] = useState("InwardFiles");
  const [inwardFiles, setInwardFiles] = useState([]);
  const [archivedFiles, setArchivedFiles] = useState([]);
  const username = useSelector((state) => state.user.roll_no);
  const role = useSelector((state) => state.user.role);

  function formatDateWithRounding(isoDateString) {
    const date = new Date(isoDateString);
    // Round minutes up if seconds > 30
    const seconds = date.getSeconds();
    if (seconds > 30) {
      date.setMinutes(date.getMinutes() + 1);
    }
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    let formatted = date.toLocaleString("en-US", options);
    // Handle edge cases (e.g., 11:59 -> 12:00)
    if (date.getMinutes() === 60) {
      date.setHours(date.getHours() + 1);
      date.setMinutes(0);
      formatted = date.toLocaleString("en-US", options);
    }
    return formatted.replace(/(AM|PM)/, (match) => match.toLowerCase());
  }
  useEffect(() => {
    const fetchInwardFiles = async (uname, des) => {
      try {
        const response = await fetchFacultyInwardFilesData(uname, des);
        const data = await response.json();
        console.log(data);
        sessionStorage.setItem("inwardFilesData", JSON.stringify(data));
        const nonArchived = data.courseProposals.filter(
          (file) => !file.sender_archive,
        );
        const archived = data.courseProposals.filter(
          (file) => file.sender_archive,
        );
        setInwardFiles(nonArchived);
        setArchivedFiles(archived);
      } catch (error) {
        console.error("Error fetching inward files:", error);
      }
    };
    fetchInwardFiles(username, role);
  }, [username, role]);

  const handleArchive = async (fileId, uname, designation) => {
    try {
      const token = localStorage.getItem("authToken");
      await fetch(
        `${host}/programme_curriculum/api/tracking_archive/${fileId}/?username=${uname}&des=${designation}`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      // Update local state
      setInwardFiles((prev) => {
        const fileToArchive = prev.find((f) => f.id === fileId);
        if (fileToArchive) {
          fileToArchive.sender_archive = true;
          setArchivedFiles((prevn) => [...prevn, fileToArchive]);
          return prev.filter((f) => f.id !== fileId);
        }
        return prev;
      });
    } catch (error) {
      console.error("Error archiving file:", error);
      alert("Failed to archive file");
    }
  };
  const handleUnarchive = async (fileId, uname, designation) => {
    try {
      const token = localStorage.getItem("authToken");
      await fetch(
        `${host}/programme_curriculum/api/tracking_unarchive/${fileId}/?username=${uname}&des=${designation}`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      // Update local state
      setArchivedFiles((prev) => {
        const fileToUnarchive = prev.find((f) => f.id === fileId);
        if (fileToUnarchive) {
          fileToUnarchive.sender_archive = false;
          setInwardFiles((prevn) => [...prevn, fileToUnarchive]);
          return prev.filter((f) => f.id !== fileId);
        }
        return prev;
      });
    } catch (error) {
      console.error("Error unarchiving file:", error);
      alert("Failed to unarchive file");
    }
  };

  return (
    <div style={{ padding: "20px", paddingTop: "10px" }}>
      <div className="courses-container">
        <div className="courses-table-section full-width">
          <div className="tabs">
            <Button
              variant={activeTab === "InwardFiles" ? "filled" : "outline"}
              onClick={() => setActiveTab("InwardFiles")}
            >
              InwardFiles
            </Button>
            <Button
              variant={
                activeTab === "Finished InwardFiles" ? "filled" : "outline"
              }
              onClick={() => setActiveTab("Finished InwardFiles")}
            >
              Archived FIles
            </Button>
          </div>

          <ScrollArea
            className="courses-scroll-area"
            type="hover"
            style={{ height: "300px" }}
          >
            {activeTab === "InwardFiles" && (
              <div className="InwardFiles-table">
                <table className="courses-table">
                  <thead className="courses-table-header">
                    <tr>
                      <th>Recieved as</th>
                      <th>Send by</th>
                      <th>File id</th>
                      <th>remark</th>
                      <th>date</th>
                      <th>View File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inwardFiles.map((inward, index) => (
                      <tr key={index} className="courses-table-row">
                        <td>
                          {inward.receive_id__username}-
                          {inward.receive_design__name}
                        </td>
                        <td>
                          {inward.current_id}-{inward.current_design}
                        </td>
                        <td>{inward.file_id}</td>
                        <td>{inward.remarks}</td>
                        <td>{formatDateWithRounding(inward.receive_date)}</td>
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
                                window.location.href = `/programme_curriculum/view_inward_file/?id=${inward.id}`;
                              }}
                            >
                              View
                            </Button>
                            <Button
                              variant="filled"
                              color="blue"
                              onClick={() => {
                                window.location.href = `/programme_curriculum/forward_course_forms/?id=${inward.id}`;
                              }}
                            >
                              Submit
                            </Button>
                            <Button
                              variant="filled"
                              color="blue"
                              onClick={() =>
                                handleArchive(inward.id, username, role)
                              }
                            >
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

            {activeTab === "Finished InwardFiles" && (
              <div className="InwardFiles-table">
                <table className="courses-table">
                  <thead className="courses-table-header">
                    <tr>
                      <th>Received as</th>
                      <th>Send by</th>
                      <th>File id</th>
                      <th>Remark</th>
                      <th>Date</th>
                      <th>View File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {archivedFiles.map((inward, index) => (
                      <tr key={index} className="courses-table-row">
                        <td>
                          {inward.receive_id__username}-
                          {inward.receive_design__name}
                        </td>
                        <td>
                          {inward.current_id}-{inward.current_design}
                        </td>
                        <td>{inward.file_id}</td>
                        <td>{inward.remarks}</td>
                        <td>{formatDateWithRounding(inward.receive_date)}</td>
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
                                window.location.href = `/programme_curriculum/view_inward_file/?id=${inward.id}`;
                              }}
                            >
                              View
                            </Button>
                            <Button
                              variant="filled"
                              color="green"
                              onClick={() =>
                                handleUnarchive(inward.id, username, role)
                              }
                            >
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

        {/* Remove isSearchVisible from className since it's not used */}
      </div>

      <style>{`
        .courses-container {
          // padding: 20px;
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

        // .InwardFiles-table {
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

export default InwardFile;
