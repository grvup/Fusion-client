import React, { useState, useEffect } from "react";
import {
  ScrollArea,
  Button,
  TextInput,
  Flex,
  MantineProvider,
  Container,
  Table,
  Grid,
  Text
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { fetchFacultyOutwardFilesData } from "../api/api";
import { host } from "../../../routes/globalRoutes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OutwardFile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("OutwardFiles");
  const [outwardFiles, setOutwardFiles] = useState([]);
  const [archivedFiles, setArchivedFiles] = useState([]);
  const [filter, setFilter] = useState({
    sender: "",
    receiver: "",
    fileId: "",
    remarks: ""
  });
  
  const username = useSelector((state) => state.user.roll_no);
  const role = useSelector((state) => state.user.role);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
      setOutwardFiles((prev) => {
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
          setOutwardFiles((prevn) => [...prevn, fileToUnarchive]);
          return prev.filter((f) => f.id !== fileId);
        }
        return prev;
      });
    } catch (error) {
      console.error("Error unarchiving file:", error);
      alert("Failed to unarchive file");
    }
  };
  
  useEffect(() => {
    const fetchOutwardFiles = async (uname, des) => {
      try {
        const response = await fetchFacultyOutwardFilesData(uname, des);
        const data = await response.json();
        const nonArchived = data.courseProposals.filter(
          (file) => !file.sender_archive,
        );
        const archived = data.courseProposals.filter(
          (file) => file.sender_archive,
        );
        setOutwardFiles(nonArchived);
        setArchivedFiles(archived);
      } catch (error) {
        console.error("Error fetching outward files:", error);
      }
    };
    fetchOutwardFiles(username, role);
  }, [username, role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const applyFilters = (data) => {
    return data.filter((file) => {
      const sender = `${file.current_id}-${file.current_design}`;
      const receiver = `${file.receive_id__username}-${file.receive_design__name}`;
      
      return (
        sender.toLowerCase().includes(filter.sender.toLowerCase()) &&
        receiver.toLowerCase().includes(filter.receiver.toLowerCase()) &&
        file.file_id.toLowerCase().includes(filter.fileId.toLowerCase()) &&
        file.remarks.toLowerCase().includes(filter.remarks.toLowerCase())
      );
    });
  };

  const filteredOutwardFiles = applyFilters(outwardFiles);
  const filteredArchivedFiles = applyFilters(archivedFiles);

  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container style={{ padding: "20px", maxWidth: "100%" }}>
        <Flex justify="flex-start" align="center" mb={10}>
          <Button
            variant={activeTab === "OutwardFiles" ? "filled" : "outline"}
            onClick={() => setActiveTab("OutwardFiles")}
            style={{ marginRight: "10px" }}
          >
            Outward Files
          </Button>
          <Button
            variant={activeTab === "Finished OutwardFiles" ? "filled" : "outline"}
            onClick={() => setActiveTab("Finished OutwardFiles")}
            style={{ marginRight: "10px" }}
          >
            Archived Files
          </Button>
        </Flex>
        <hr />

        <Grid>
          {isMobile && (
            <Grid.Col span={12}>
              <ScrollArea type="hover">
                {[
                  { label: "Sender", name: "sender" },
                  { label: "Receiver", name: "receiver" },
                  { label: "File ID", name: "fileId" },
                  { label: "Remarks", name: "remarks" },
                ].map((input, index) => (
                  <TextInput
                    key={index}
                    label={`${input.label}:`}
                    placeholder={`Filter by ${input.label}`}
                    value={filter[input.name]}
                    name={input.name}
                    mb={5}
                    onChange={handleInputChange}
                  />
                ))}
              </ScrollArea>
            </Grid.Col>
          )}
          <Grid.Col span={isMobile ? 12 : 9}>
            <div
              style={{
                maxHeight: "61vh",
                overflowY: "auto",
                border: "1px solid #d3d3d3",
                borderRadius: "10px",
              }}
            >
              <style>
                {`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>

              <Table
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  flexGrow: 1,
                }}
              >
                <thead>
                  <tr>
                    {[
                      "Sent by",
                      "Received as",
                      "File ID",
                      "Remarks",
                      "Forward Date",
                      "Actions"
                    ].map((header, index) => (
                      <th
                        key={index}
                        style={{
                          padding: "15px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: index < 5 ? "1px solid #d3d3d3" : "none",
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === "OutwardFiles"
                    ? filteredOutwardFiles
                    : filteredArchivedFiles
                  ).map((file, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 !== 0 ? "#E6F7FF" : "#ffffff",
                      }}
                    >
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {file.current_id}-{file.current_design}
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {file.receive_id__username}-{file.receive_design__name}
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {file.file_id}
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {file.remarks}
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {formatDateWithRounding(file.forward_date)}
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                        }}
                      >
                        <Flex justify="space-around" gap={10}>
                          <Button
                            variant="filled"
                            color="blue"
                            onClick={() => navigate(`/programme_curriculum/view_inward_file/?id=${file.id}`)}
                          >
                            View
                          </Button>
                          {activeTab === "OutwardFiles" ? (
                            <Button
                              variant="filled"
                              color="gray"
                              onClick={() =>
                                handleArchive(file.id, username, role)
                              }
                            >
                              Archive
                            </Button>
                          ) : (
                            <Button
                              variant="filled"
                              color="green"
                              onClick={() =>
                                handleUnarchive(file.id, username, role)
                              }
                            >
                              Unarchive
                            </Button>
                          )}
                        </Flex>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid.Col>

          {!isMobile && (
            <Grid.Col span={3}>
              <ScrollArea type="hover">
                {[
                  { label: "Sender", name: "sender" },
                  { label: "Receiver", name: "receiver" },
                  { label: "File ID", name: "fileId" },
                  { label: "Remarks", name: "remarks" },
                ].map((input, index) => (
                  <TextInput
                    key={index}
                    label={`${input.label}:`}
                    placeholder={`Filter by ${input.label}`}
                    value={filter[input.name]}
                    name={input.name}
                    mb={5}
                    onChange={handleInputChange}
                  />
                ))}
              </ScrollArea>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default OutwardFile;