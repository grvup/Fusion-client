import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MantineProvider,
  Table,
  Flex,
  Container,
  Text,
  Button,
  TextInput,
  Grid,
  Paper,
} from "@mantine/core";

// Sample data for curriculum (retained)
const data = [
  {
    name: "CSE UG Curriculum",
    version: "1.0",
    batch: [
      "B.Tech CSE 2016",
      "B.Tech CSE 2017",
      "B.Tech CSE 2018",
      "B.Tech CSE 2019",
      "B.Tech CSE 2020",
      "B.Tech CSE 2021",
      "B.Tech CSE 2022",
    ],
    semesters: 8,
  },
  {
    name: "ECE UG Curriculum",
    version: "1.0",
    batch: [
      "B.Tech ECE 2016",
      "B.Tech ECE 2017",
      "B.Tech ECE 2018",
      "B.Tech ECE 2019",
      "B.Tech ECE 2020",
      "B.Tech ECE 2021",
      "Phd ECE 2022",
      "B.Tech ECE 2022",
    ],
    semesters: 8,
  },
  {
    name: "ME UG Curriculum",
    version: "1.0",
    batch: [
      "B.Tech ME 2016",
      "B.Tech ME 2017",
      "B.Tech ME 2018",
      "B.Tech ME 2019",
      "B.Tech ME 2020",
      "B.Tech ME 2021",
      "B.Tech ME 2022",
    ],
    semesters: 8,
  },
  {
    name: "Design UG Curriculum",
    version: "1.0",
    batch: [
      "B.Des Des. 2018",
      "B.Des Des. 2019",
      "B.Des Des. 2020",
      "B.Des Des. 2021",
      "B.Des Des. 2022",
    ],
    semesters: 8,
  },
  {
    name: "CSE PG Curriculum",
    version: "1.0",
    batch: ["M.Tech CSE 2020", "M.Tech CSE 2021"],
    semesters: 4,
  },
  {
    name: "ECE PG Curriculum",
    version: "1.0",
    batch: ["M.Tech ECE 2020", "M.Tech ECE 2021"],
    semesters: 4,
  },
  {
    name: "ME PG Curriculum",
    version: "1.0",
    batch: ["M.Tech ME 2020", "M.Tech ME 2021"],
    semesters: 4,
  },
  {
    name: "Design PG Curriculum",
    version: "1.0",
    batch: ["B.Des Des.2020", "B.Des Des.2021"],
    semesters: 4,
  },
  {
    name: "CSE Phd Curriculum",
    version: "1.0",
    batch: [
      "Phd CSE 2016",
      "Phd CSE 2017",
      "Phd CSE 2018",
      "Phd CSE 2019",
      "Phd CSE 2020",
      "Phd CSE 2021",
      "Phd CSE 2022",
    ],
    semesters: 4,
  },
  {
    name: "ECE Phd Curriculum",
    version: "1.0",
    batch: [
      "Phd ECE 2016",
      "Phd ECE 2017",
      "Phd ECE 2018",
      "Phd ECE 2019",
      "Phd ECE 2020",
      "Phd ECE 2021",
    ],
    semesters: 4,
  },
  {
    name: "ME Phd Curriculum",
    version: "1.0",
    batch: [
      "Phd ME 2016",
      "Phd ME 2017",
      "Phd ME 2018",
      "Phd ME 2019",
      "Phd ME 2020",
      "Phd ME 2021",
      "Phd ME 2022",
    ],
    semesters: 4,
  },
  {
    name: "CSE UG Curriculum",
    version: "2.0",
    batch: [],
    semesters: 8,
  },
  {
    name: "ME UG Curriculum",
    version: "2.0",
    batch: [],
    semesters: 8,
  },
  {
    name: "SM UG Curriculum",
    version: "1.0",
    batch: ["B.Tech SM 2020", "B.Tech SM 2021", "B.Tech SM 2022"],
    semesters: 8,
  },
  // ... Add other entries as in your data
];

function Admin_view_all_working_curriculums() {
  const [searchName, setSearchName] = useState("");
  const [searchVersion, setSearchVersion] = useState("");

  // Filtered data based on search inputs
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase()) &&
      item.version.includes(searchVersion),
  );

  // Define alternating row colors (white and light blue)
  const rows = filteredData.map((element, index) => (
    <tr
      key={element.name}
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
        {/* Curriculum name as a link */}
        <Link
          to="/programme_curriculum/view_curriculum" // Or any route you want
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
        }}
      >
        {element.batch.map((b, i) => (
          <div key={i}>{b}</div>
        ))}
      </td>
      <td
        style={{
          padding: "15px 20px",
          textAlign: "center",
          borderRight: "1px solid #d3d3d3", // Added right border here
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
        {/* Breadcrumb Section */}
        <Flex justify="flex-start" align="center" mb={20}>
          <Text size="md" weight={500} style={{ color: "#2C3E50" }}>
            Program and Curriculum &gt; Curriculums
          </Text>
        </Flex>

        {/* Title Section */}
        <Flex justify="flex-start" align="center" mb={20}>
          <Text
            size="md"
            weight={700}
            style={{
              color: "#2C3E50",
              marginRight: "15px",
              textDecoration: "underline",
            }}
          >
            Curriculums
          </Text>
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
                <tbody>{rows}</tbody>
              </Table>
            </div>
          </Grid.Col>

          {/* Search Filter Section */}
          <Grid.Col span={3}>
            <Paper shadow="xs" p="md">
              {/* ADD CURRICULUM button as a link */}
              <Link to="/programme_curriculum/acad_admin_add_curriculum_form">
                <Button
                  variant="filled"
                  color="blue"
                  radius="md"
                  size="md"
                  style={{
                    width: "100%",
                    fontSize: "14px",
                    backgroundColor: "#3498db",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #3498db",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    marginBottom: "20px",
                  }}
                >
                  ADD CURRICULUM
                </Button>
              </Link>

              {/* Filter Search Inputs */}
              <Text weight={700} mb={10}>
                FILTER SEARCH
              </Text>

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

              <Button variant="light" color="blue" fullWidth>
                Search
              </Button>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default Admin_view_all_working_curriculums;
