import {
  Button,
  Container,
  Flex,
  MantineProvider,
  Table,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { fetchAllProgrammes } from "../api/api";

function ViewAllProgrammes() {
  const [activeSection, setActiveSection] = useState("ug"); // Default to UG
  const [ugData, setUgData] = useState([]); // State to store UG programs
  const [pgData, setPgData] = useState([]); // State to store PG programs
  const [phdData, setPhdData] = useState([]); // State to store PhD programs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the API without token for now
        const data = await fetchAllProgrammes();
        setUgData(data.ug_programmes);
        setPgData(data.pg_programmes);
        setPhdData(data.phd_programmes);
      } catch (fetchError) {
        console.error("Error fetching data:", fetchError);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTable = (data) => {
    return data.map((element, index) => (
      <tr
        key={element.programme}
        style={{ backgroundColor: index % 2 === 0 ? "#E6F7FF" : "#ffffff" }}
      >
        <td
          style={{
            padding: "15px 20px",
            textAlign: "center",
            color: "#3498db",
            width: "33%",
            borderRight: "1px solid #d3d3d3",
          }}
        >
          <a
            href={`/programme_curriculum/curriculums/${element.id}`}
            style={{ color: "#3498db", textDecoration: "none" }}
          >
            {element.name}
          </a>
        </td>
        <td
          style={{
            padding: "15px 20px",
            textAlign: "left",
            width: "67%",
            borderRight: "1px solid #d3d3d3",
          }}
        >
          {element.discipline__name}
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
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container
        style={{ padding: "20px", minHeight: "100vh", maxWidth: "100%" }}
      >
        {/* Buttons for Section Selection */}
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
                        width: "33%",
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
                        width: "67%",
                      }}
                    >
                      Discipline
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
                        width: "33%",
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
                        width: "67%",
                      }}
                    >
                      Discipline
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
                        width: "33%",
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
                        width: "67%",
                      }}
                    >
                      Discipline
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTable(phdData)}</tbody>
              </Table>
            )}
          </div>
        </Flex>
      </Container>
    </MantineProvider>
  );
}

export default ViewAllProgrammes;
