import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MantineProvider,
  Table,
  Flex,
  Container,
  Button,
  TextInput,
  Grid,
  Paper,
} from "@mantine/core";

function Admin_view_all_working_curriculums() {
  const [searchName, setSearchName] = useState("");
  const [searchVersion, setSearchVersion] = useState("");
  const [curriculums, setCurriculums] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/programme_curriculum/admin_working_curriculums/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setCurriculums(response.data.curriculums);
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
      item.version.toString().includes(searchVersion)
  );

  // Define alternating row colors
  const rows = filteredData.map((element, index) => (
    <tr
      key={element.name + element.version}
      style={{ backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#E6F7FF" }}
    >
      <td
        style={{
          padding: "15px 20px",
          textAlign: "center",
          color: "#3498db",
          textDecoration: "underline",
          cursor: "pointer",
          borderRight: "1px solid #d3d3d3",
        }}
      >
        {/* Curriculum name as a link */}
        <Link
          to={`/programme_curriculum/view_curriculum?curriculum=${element.name}`}
          style={{ color: "#3498db", textDecoration: "underline" }}
        >
          {element.name}
        </Link>
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
          textAlign:"center"
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
          borderRight: "1px solid #d3d3d3",
        }}
      >
        {element.semesters}
      </td>
      <td
        style={{
          padding: "15px 20px",
          textAlign: "center",
        }}
      >
        {/* Edit button as a link */}
        <Link to="/programme_curriculum/admin_edit_curriculum_form">
          <Button variant="filled" color="green" radius="md">
            EDIT
          </Button>
        </Link>
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
            {/* Table Section */}
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
                        textAlign: "center",
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
                        borderRight: "1px solid #d3d3d3",
                      }}
                    >
                      No. of Semesters
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        Loading...
                      </td>
                    </tr>
                  ) : rows.length > 0 ? (
                    rows
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No curriculums found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="xs" p="md">
              {/* ADD CURRICULUM button as a link */}
              <Link
                to="/programme_curriculum/acad_admin_add_curriculum_form"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="outline"
                  fullWidth
                  style={{ marginBottom: "20px" }}
                >
                  ADD CURRICULUM
                </Button>
              </Link>

              {/* Filters */}
              <TextInput
                label="Name"
                value={searchName}
                onChange={(event) => setSearchName(event.currentTarget.value)}
                mb="sm"
              />
              <TextInput
                label="Version"
                value={searchVersion}
                onChange={(event) =>
                  setSearchVersion(event.currentTarget.value)
                }
              />
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default Admin_view_all_working_curriculums;
