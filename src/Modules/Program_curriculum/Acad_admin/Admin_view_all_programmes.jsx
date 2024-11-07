import React, { useState, useEffect } from "react";
import {
  MantineProvider,
  Table,
  Flex,
  Container,
  Button,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminViewProgrammes() {
  const [activeSection, setActiveSection] = useState("ug"); // Default section
  const [ugData, setUgData] = useState([]); // State to store UG programs
  const [pgData, setPgData] = useState([]); // State to store PG programs
  const [phdData, setPhdData] = useState([]); // State to store PhD programs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have stored the token in localStorage or state
        const token = localStorage.getItem("authToken"); // Replace with actual method to get token
  
        const response = await axios.get(
          "http://127.0.0.1:8000/programme_curriculum/api/admin_programmes/",
          {
            headers: {
              Authorization: `Token ${token}`,  // Add the Authorization header
            },
          }
        );
  
        setUgData(response.data.ug_programmes);
        setPgData(response.data.pg_programmes);
        setPhdData(response.data.phd_programmes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  console.log(ugData)
  

  // Function to render the table
  const renderTable = (data) => {
    return data.map((element, index) => (
      <tr
        key={element.programme}
        style={{
          backgroundColor: index % 2 === 0 ? "#E6F7FF" : "#ffffff",
        }}
      >
        <td
          style={{
            padding: "15px 20px",
            textAlign: "center",
            color: "#3498db",
            borderRight: "1px solid #d3d3d3",
            width: "25%",
          }}
        >
          <Link
            to={`/programme_curriculum/acad_view?programme=${encodeURIComponent(
              element.id,
            )}`}
            style={{ color: "#3498db", textDecoration: "none" }}
          >
            {element.name}
          </Link>
        </td>
        <td
          style={{
            padding: "15px 20px",
            textAlign: "left",
            borderRight: "1px solid #d3d3d3",
            width: "50%",
          }}
        >
          {element.discipline__name}
        </td>
        <td
          style={{
            padding: "15px 20px",
            textAlign: "center",
            width: "25%",
          }}
        >
          <Link
            to={`/programme_curriculum/admin_edit_programme_form?programme=${encodeURIComponent(
              element.programme,
            )}`}
          >
            <Button variant="filled" color="green" radius="md">
              EDIT
            </Button>
          </Link>
        </td>
      </tr>
    ));
  };

  if (loading) {
    return (
      <Container>
        <Text>Loading programmes...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text color="red">{error}</Text>
      </Container>
    );
  }

  return (
    <MantineProvider theme={{ colorScheme: "light" }} withGlobalStyles>
      <Container style={{ padding: "20px", minHeight: "100vh", maxWidth: "100%" }}>
        <Flex mb={20}>
          <Button
            variant={activeSection === "ug" ? "filled" : "outline"}
            onClick={() => setActiveSection("ug")}
            style={{ marginRight: "10px" }}
          >
            UG: Undergraduate
          </Button>
          <Button
            variant={activeSection === "pg" ? "filled" : "outline"}
            onClick={() => setActiveSection("pg")}
            style={{ marginRight: "10px" }}
          >
            PG: Post Graduate
          </Button>
          <Button
            variant={activeSection === "phd" ? "filled" : "outline"}
            onClick={() => setActiveSection("phd")}
          >
            PhD: Doctor of Philosophy
          </Button>
        </Flex>

        {/* Table Section */}
        <Flex justify="space-between" align="flex-start" mb={20}>
          <div style={{ flexGrow: 1 }}>
            {/* Conditional Rendering of Tables based on Active Section */}
            {activeSection === "ug" && (
              <Table
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #d3d3d3",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Programme
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "50%",
                      }}
                    >
                      Discipline
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTable(ugData)}</tbody>
              </Table>
            )}
            {activeSection === "pg" && (
              <Table
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #d3d3d3",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Programme
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "50%",
                      }}
                    >
                      Discipline
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTable(pgData)}</tbody>
              </Table>
            )}
            {activeSection === "phd" && (
              <Table
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #d3d3d3",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Programme
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "50%",
                      }}
                    >
                      Discipline
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTable(phdData)}</tbody>
              </Table>
            )}
          </div>

          {/* Add Programme Button */}
          <Link to="/programme_curriculum/acad_admin_add_programme_form">
            <Button
              variant="filled"
              color="blue"
              radius="md"
              style={{ marginLeft: "20px", height: "45px" }}
            >
              ADD PROGRAMME
            </Button>
          </Link>
        </Flex>
      </Container>
    </MantineProvider>
  );
}

export default AdminViewProgrammes;
