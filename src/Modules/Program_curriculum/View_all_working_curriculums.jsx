import React, { useState, useEffect } from "react";
import {
  MantineProvider,
  Table,
  Flex,
  Container,
  TextInput,
  Grid,
  Paper,
  Button,
} from "@mantine/core";

import { fetchWorkingCurriculumsData } from "./api/api";

function View_all_working_curriculums() {
  const [searchName, setSearchName] = useState("");
  const [searchVersion, setSearchVersion] = useState("");
  const [curriculums, setCurriculums] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token is missing");
        }

        const data = await fetchWorkingCurriculumsData(token);
        setCurriculums(data.curriculums); // Set the fetched curriculums
        setLoading(false);
      } catch (error) {
        console.error("Error fetching curriculums: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered data based on search inputs
  const filteredData = curriculums.filter(
    (item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase()) &&
      item.version.includes(searchVersion),
  );

  // Define alternating row colors (white and light blue)
  const rows = filteredData.map((element, index) => (
    <tr
      key={element.name + element.version}
      style={{ backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#E6F7FF" }}
    >
      <td
        style={{
          padding: "15px 20px",
          textAlign: "left",
          color: "#3498db",
          textDecoration: "underline",
          cursor: "pointer",
          borderRight: "1px solid #d3d3d3",
        }}
      >
        <a
          href={`/programme_curriculum/stud_curriculum_view/${element.id}`}
          style={{ color: "#3498db", textDecoration: "underline" }}
        >
          {element.name}
        </a>
      </td>
      <td
        style={{
          padding: "15px 20px",
          textAlign: "center",
          borderRight: "1px solid #d3d3d3",
        }}
      >
        {element.version}
      </td>
      <td
        style={{
          padding: "15px 20px",
          borderRight: "1px solid #d3d3d3",
        }}
      >
        {element.batch && element.batch.length > 0 ? (
          element.batch.map((b, i) => <div key={i}>{b}</div>)
        ) : (
          <div>No batches available</div>
        )}
      </td>
      <td
        style={{
          padding: "15px 20px",
          textAlign: "center",
        }}
      >
        {element.semesters}
      </td>
    </tr>
  ));

  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container
        style={{ padding: "20px", minHeight: "100vh", maxWidth: "100%" }}
      >
        <Flex justify="flex-start" align="center" mb={20}>
          <Button variant="filled" style={{ marginRight: "10px" }}>
            Curriculums
          </Button>
        </Flex>

        <Grid>
          <Grid.Col span={9}>
            {/* Table Section with Increased Height */}
            <div
              style={{
                height: "500px",
                overflowY: "auto",
                border: "1px solid #d3d3d3",
                borderRadius: "10px",
              }}
            >
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
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        fontSize: "16px",
                        textAlign: "left",
                        borderRight: "1px solid #d3d3d3",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        fontSize: "16px",
                        textAlign: "center",
                        borderRight: "1px solid #d3d3d3",
                      }}
                    >
                      Version
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        fontSize: "16px",
                        textAlign: "center",
                        borderRight: "1px solid #d3d3d3",
                      }}
                    >
                      Batch
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                    >
                      No. of Semesters
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        Loading...
                      </td>
                    </tr>
                  ) : rows.length > 0 ? (
                    rows
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No curriculums found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Grid.Col>

          {/* Search Filter Section */}
          <Grid.Col span={3}>
            <Paper shadow="xs" p="md">
              <TextInput
                label="Name contains:"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search by Name"
                mb={10}
              />

              <TextInput
                label="Version"
                value={searchVersion}
                onChange={(e) => setSearchVersion(e.target.value)}
                placeholder="Search by Version"
                mb={10}
              />
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default View_all_working_curriculums;
