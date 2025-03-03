import React, { useState, useEffect } from "react";
import {
  MantineProvider,
  Grid,
  Table,
  Flex,
  Container,
  Button,
  Text,
  TextInput,
  ScrollArea,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { fetchAllProgrammes } from "./api/api";

function ViewAllProgrammes() {
  const [activeSection, setActiveSection] = useState("ug"); // Default to UG
  const [ugData, setUgData] = useState([]); // State to store UG programs
  const [pgData, setPgData] = useState([]); // State to store PG programs
  const [phdData, setPhdData] = useState([]); // State to store PhD programs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [programmeFilter, setProgrammeFilter] = useState("");
  const [disciplineFilter, setDisciplineFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("programmesCache");
        const timestamp = localStorage.getItem("programmesTimestamp");
        const isCacheValid =
          timestamp && Date.now() - parseInt(timestamp, 10) < 10 * 60 * 1000;
        // 10 min cache

        if (cachedData && isCacheValid) {
          const data = JSON.parse(cachedData);
          setUgData(data.ug_programmes || []);
          setPgData(data.pg_programmes || []);
          setPhdData(data.phd_programmes || []);
        } else {
          const data = await fetchAllProgrammes();
          setUgData(data.ug_programmes || []);
          setPgData(data.pg_programmes || []);
          setPhdData(data.phd_programmes || []);

          localStorage.setItem("programmesCache", JSON.stringify(data));
          localStorage.setItem("programmesTimestamp", Date.now().toString());
        }
      } catch (fetchError) {
        console.error("Error fetching data:", fetchError);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = (data) => {
    return data.filter(
      (item) =>
        (item.name ? item.name.toLowerCase() : "").includes(
          programmeFilter.toLowerCase(),
        ) &&
        (item.discipline__name
          ? item.discipline__name.toLowerCase()
          : ""
        ).includes(disciplineFilter.toLowerCase()),
    );
  };

  const renderTable = (data) => {
    const filteredData = applyFilters(data);
    return filteredData.map((element, index) => (
      <tr
        key={element.programme}
        style={{ backgroundColor: index % 2 !== 0 ? "#E6F7FF" : "#ffffff" }}
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
          <Link
            to={`/programme_curriculum/curriculums/${element.id}`}
            style={{ color: "#3498db", textDecoration: "none" }}
          >
            {element.name}
          </Link>
        </td>
        <td
          style={{
            padding: "15px 20px",
            textAlign: "center",
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
      <Container style={{ padding: "20px", maxWidth: "100%" }}>
        {/* Buttons for Section Selection */}
        <Flex justify="flex-start" align="center" mb={10}>
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
        <hr />

        {/* Table Section */}
        <Grid>
          {isMobile && (
            <Grid.Col span={12}>
              <ScrollArea>
                <TextInput
                  label="Programme:"
                  placeholder="Search by Programme"
                  value={programmeFilter}
                  onChange={(e) => setProgrammeFilter(e.target.value)}
                />
                <TextInput
                  label="Discipline:"
                  placeholder="Search by Discipline"
                  value={disciplineFilter}
                  onChange={(e) => setDisciplineFilter(e.target.value)}
                />
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
                scrollbarWidth: "none",
              }}
            >
              <style>
                {`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              {activeSection === "ug" && (
                <Table
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    flexGrow: 1,
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: "15px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        Programme
                      </th>
                      <th
                        style={{
                          padding: "15px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: "1px solid #d3d3d3",
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
                    padding: "20px",
                    flexGrow: 1,
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: "15px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        Programme
                      </th>
                      <th
                        style={{
                          padding: "15px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: "1px solid #d3d3d3",
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
                    padding: "20px",
                    flexGrow: 1,
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: "15px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        Programme
                      </th>
                      <th
                        style={{
                          padding: "15px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: "1px solid #d3d3d3",
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
          </Grid.Col>
          {!isMobile && (
            <Grid.Col span={3}>
              <ScrollArea>
                <TextInput
                  label="Programme:"
                  placeholder="Search by Programme"
                  value={programmeFilter}
                  onChange={(e) => setProgrammeFilter(e.target.value)}
                />
                <TextInput
                  label="Discipline:"
                  placeholder="Search by Discipline"
                  value={disciplineFilter}
                  onChange={(e) => setDisciplineFilter(e.target.value)}
                />
              </ScrollArea>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default ViewAllProgrammes;
