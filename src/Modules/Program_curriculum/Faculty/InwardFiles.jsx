import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ScrollArea,
  Button,
  Container,
  Table,
  Grid,
  MantineProvider,
  Flex,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { fetchFacultyInwardFilesData } from "../api/api";
import { host } from "../../../routes/globalRoutes";
import { useNavigate } from "react-router-dom";

function InwardFilesTable({ inwardFiles, username, role, onArchive }) {
  const navigate = useNavigate();
  return (
    <div style={{ maxHeight: "61vh", overflowY: "auto", border: "1px solid #d3d3d3", borderRadius: "10px" }}>
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <Table style={{ backgroundColor: "white", padding: "20px", flexGrow: 1 }}>
        <thead>
          <tr>
            {["Received as", "Send by", "File ID", "Remark", "Date", "Actions"].map(
              (header, index) => (
                <th
                  key={index}
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    fontSize: "16px",
                    textAlign: "center",
                    borderRight: "1px solid #d3d3d3",
                  }}
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {inwardFiles.length > 0 ? (
            inwardFiles.map((inward, index) => (
              <tr
                key={index}
                style={{ backgroundColor: index % 2 !== 0 ? "#E6F7FF" : "#ffffff" }}
              >
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  {inward.receive_id__username}-{inward.receive_design__name}
                </td>
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  {inward.current_id}-{inward.current_design}
                </td>
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  {inward.file_id}
                </td>
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  {inward.remarks}
                </td>
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  {formatDateWithRounding(inward.receive_date)}
                </td>
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  <Flex justify="space-between" gap={5}>
                    <Button
                      variant="filled"
                      style={{ backgroundColor: "#3498db" }}
                      onClick={() => {
                        navigate(`/programme_curriculum/view_inward_file/?id=${inward.id}`);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="filled"
                      style={{ backgroundColor: "#2ecc71" }}
                      onClick={() => {
                        navigate(`/programme_curriculum/forward_course_forms/?id=${inward.id}`);
                      }}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="filled"
                      style={{ backgroundColor: "gray" }}
                      onClick={() => onArchive(inward.id, username, role)}
                    >
                      Archive
                    </Button>
                  </Flex>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "15px 20px" }}>
                No inward files available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

function ArchivedFilesTable({ archivedFiles, username, role, onUnarchive }) {
  const navigate = useNavigate();
  return (
    <div style={{ maxHeight: "61vh", overflowY: "auto", border: "1px solid #d3d3d3", borderRadius: "10px" }}>
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <Table style={{ backgroundColor: "white", padding: "20px", flexGrow: 1 }}>
        <thead>
          <tr>
            {["Received as", "Send by", "File ID", "Remark", "Date", "Actions"].map(
              (header, index) => (
                <th
                  key={index}
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    fontSize: "16px",
                    textAlign: "center",
                    borderRight: "1px solid #d3d3d3",
                  }}
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {archivedFiles.length > 0 ? (
            archivedFiles.map((inward, index) => (
              <tr
                key={index}
                style={{ backgroundColor: index % 2 !== 0 ? "#E6F7FF" : "#ffffff" }}
              >
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  {inward.receive_id__username}-{inward.receive_design__name}
                </td>
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  {inward.current_id}-{inward.current_design}
                </td>
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  {inward.file_id}
                </td>
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  {inward.remarks}
                </td>
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  {formatDateWithRounding(inward.receive_date)}
                </td>
                <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                  <Flex justify="space-around" gap={5}>
                    <Button
                      variant="filled"
                      style={{ backgroundColor: "#3498db" }}
                      onClick={() => {
                        navigate(`/programme_curriculum/view_inward_file/?id=${inward.id}`);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="filled"
                      style={{ backgroundColor: "#2ecc71" }}
                      onClick={() => onUnarchive(inward.id, username, role)}
                    >
                      Unarchive
                    </Button>
                  </Flex>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "15px 20px" }}>
                No archived files available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

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

function InwardFile() {
  const [activeTab, setActiveTab] = useState("InwardFiles");
  const [inwardFiles, setInwardFiles] = useState([]);
  const [archivedFiles, setArchivedFiles] = useState([]);
  const [filter, setFilter] = useState({
    sender: "",
    fileId: "",
    remarks: "",
  });
  const username = useSelector((state) => state.user.roll_no);
  const role = useSelector((state) => state.user.role);
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const applyFilters = (data) => {
    return data.filter((file) => {
      return (
        `${file.current_id}-${file.current_design}`.toLowerCase().includes(filter.sender.toLowerCase()) &&
        file.file_id.toLowerCase().includes(filter.fileId.toLowerCase()) &&
        file.remarks.toLowerCase().includes(filter.remarks.toLowerCase())
      );
    });
  };

  const filteredInwardFiles = applyFilters(inwardFiles);
  const filteredArchivedFiles = applyFilters(archivedFiles);

  return (
    <MantineProvider theme={{ colorScheme: "light" }} withGlobalStyles withNormalizeCSS>
      <Container style={{ padding: "20px", maxWidth: "100%" }}>
        <Flex justify="flex-start" align="center" mb={10}>
          <Button
            variant={activeTab === "InwardFiles" ? "filled" : "outline"}
            onClick={() => setActiveTab("InwardFiles")}
            style={{ marginRight: "10px" }}
          >
            Inward Files
          </Button>
          <Button
            variant={activeTab === "Archived Files" ? "filled" : "outline"}
            onClick={() => setActiveTab("Archived Files")}
            style={{ marginRight: "10px" }}
          >
            Archived Files
          </Button>
        </Flex>
        
        <hr />
        
        <Grid mt={20}>
          {isMobile && (
            <Grid.Col span={12} mb={20}>
              <ScrollArea type="hover">
                {[
                  { label: "Sender", name: "sender" },
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
            <div style={{ backgroundColor: "#f5f7f8", borderRadius: "10px" }}>
              {activeTab === "InwardFiles" ? (
                <InwardFilesTable 
                  inwardFiles={filteredInwardFiles} 
                  username={username} 
                  role={role} 
                  onArchive={handleArchive}
                />
              ) : (
                <ArchivedFilesTable 
                  archivedFiles={filteredArchivedFiles} 
                  username={username} 
                  role={role} 
                  onUnarchive={handleUnarchive}
                />
              )}
            </div>
          </Grid.Col>
          
          {!isMobile && (
            <Grid.Col span={3}>
              <ScrollArea type="hover">
                {[
                  { label: "Sender", name: "sender" },
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

export default InwardFile;