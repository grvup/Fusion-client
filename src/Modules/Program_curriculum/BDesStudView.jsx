import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Anchor,
  ScrollArea,
  Container,
  Button,
  Grid,
  Paper,
  TextInput,
  Text,
} from "@mantine/core";

const CURRICULUM_DATA = {
  info: {
    programName: "B.Des",
    programCategory: "UG",
    programBeginYear: "2021",
  },
  workingCurriculums: [
    {
      name: "Design UG Curriculum",
      version: "1.0",
      batch: ["B.Des 2021", "B.Des 2022"],
      semesters: 8,
    },
    {
      name: "Design UG Curriculum",
      version: "2.0",
      batch: ["B.Des 2023"],
      semesters: 8,
    },
  ],
  obsoleteCurriculums: [
    {
      name: "Old Design Curriculum",
      version: "0.5",
      batch: ["B.Des 2019"],
      semesters: 8,
    },
    {
      name: "Outdated Design Curriculum",
      version: "1.1",
      batch: ["B.Des 2020"],
      semesters: 8,
    },
  ],
};

function BDesAcadView() {
  const [activeTab, setActiveTab] = useState("info");

  // New States for Filtering
  const [searchName, setSearchName] = useState("");
  const [searchVersion, setSearchVersion] = useState("");

  // Filter Logic for Working Curriculums
  const filteredWorkingCurriculums = CURRICULUM_DATA.workingCurriculums.filter(
    (curr) =>
      curr.name.toLowerCase().includes(searchName.toLowerCase()) &&
      curr.version.toLowerCase().includes(searchVersion.toLowerCase()),
  );

  // Filter Logic for Obsolete Curriculums
  const filteredObsoleteCurriculums =
    CURRICULUM_DATA.obsoleteCurriculums.filter(
      (curr) =>
        curr.name.toLowerCase().includes(searchName.toLowerCase()) &&
        curr.version.toLowerCase().includes(searchVersion.toLowerCase()),
    );

  const handleSearch = () => {
    // Implement search functionality if needed (currently using live filtering)
    console.log(
      "Search initiated with Name:",
      searchName,
      "and Version:",
      searchVersion,
    );
  };

  const renderInfo = () => (
    <div style={{ marginBottom: "20px", display: "flex" }}>
      <Table
        highlightOnHover
        verticalSpacing="sm"
        style={{
          border: "2px solid #1e90ff",
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "20px", // Margin for the table
        }}
      >
        <tbody>
          <tr
            style={{
              backgroundColor: "#15ABFF54",
              borderBottom: "1px solid #1e90ff",
            }}
          >
            <td
              colSpan="2"
              style={{
                fontWeight: "bold",
                padding: "5px",
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              B.DESIGN
            </td>
          </tr>

          <tr
            style={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #1e90ff",
            }}
          >
            <td
              style={{
                fontWeight: "bold",
                padding: "10px",
                textAlign: "left",
                borderRight: "1px solid #1e90ff",
              }}
            >
              Programme Name
            </td>
            <td style={{ padding: "10px" }}>
              {CURRICULUM_DATA.info.programName}
            </td>
          </tr>

          <tr
            style={{
              backgroundColor: "#15ABFF1C",
              borderBottom: "1px solid #1e90ff",
            }}
          >
            <td
              style={{
                fontWeight: "bold",
                padding: "10px",
                textAlign: "left",
                borderRight: "1px solid #1e90ff",
              }}
            >
              Programme Category
            </td>
            <td style={{ padding: "10px" }}>
              {CURRICULUM_DATA.info.programCategory}
            </td>
          </tr>

          <tr style={{ backgroundColor: "#fff" }}>
            <td
              style={{
                fontWeight: "bold",
                padding: "10px",
                textAlign: "left",
                borderRight: "1px solid #1e90ff",
              }}
            >
              Programme Begin Year
            </td>
            <td style={{ padding: "10px" }}>
              {CURRICULUM_DATA.info.programBeginYear}
            </td>
          </tr>
        </tbody>
      </Table>
      {/* Search Filter Section for Info Page */}
      <Paper
        shadow="xs"
        p="md"
        style={{ marginLeft: "20px", minWidth: "250px", marginTop: "20px" }}
      >
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

        <Button onClick={handleSearch} variant="outline" fullWidth>
          Search
        </Button>
      </Paper>
    </div>
  );

  const renderWorkingCurriculums = () => (
    <div style={{ marginTop: "20px", display: "flex" }}>
      <ScrollArea style={{ flex: 1 }}>
        <Table
          highlightOnHover
          verticalSpacing="sm"
          style={{
            border: "2px solid #1e90ff",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#15ABFF54",
                borderBottom: "1px solid #1e90ff",
              }}
            >
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderRight: "1px solid #1e90ff",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderRight: "1px solid #1e90ff",
                }}
              >
                Version
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderRight: "1px solid #1e90ff",
                }}
              >
                Batch
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderRight: "1px solid #1e90ff",
                }}
              >
                No. of Semesters
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkingCurriculums.length > 0 ? (
              filteredWorkingCurriculums.map((curr, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#fff" : "#15ABFF1C",
                    transition: "background-color 0.3s",
                    borderBottom: "1px solid #1e90ff",
                  }}
                >
                  <td
                    style={{
                      padding: "10px",
                      borderRight: "1px solid #1e90ff",
                    }}
                  >
                    {curr.name}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderRight: "1px solid #1e90ff",
                    }}
                  >
                    {curr.version}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      borderRight: "1px solid #1e90ff",
                    }}
                  >
                    {curr.batch.map((b, i) => (
                      <React.Fragment key={i}>
                        <Anchor
                          component={Link}
                          to="#"
                          style={{
                            marginRight: "10px",
                            color: "#1e90ff",
                            textDecoration: "underline",
                          }}
                        >
                          {b}
                        </Anchor>
                        {i < curr.batch.length - 1 && (
                          <span style={{ margin: "0 10px" }}>|</span>
                        )}
                      </React.Fragment>
                    ))}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderRight: "1px solid #1e90ff",
                    }}
                  >
                    {curr.semesters}
                  </td>
                  {/* Removed the Action column here */}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
      {/* Search Filter Section for Working Curriculums */}
      <Paper
        shadow="xs"
        p="md"
        style={{ marginLeft: "20px", minWidth: "250px" }}
      >
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

        <Button onClick={handleSearch} variant="outline" fullWidth>
          Search
        </Button>
      </Paper>
    </div>
  );

  const renderObsoleteCurriculums = () => (
    <div style={{ marginTop: "20px", display: "flex" }}>
      <ScrollArea style={{ flex: 1 }}>
        <Table
          highlightOnHover
          verticalSpacing="sm"
          style={{
            border: "2px solid #1e90ff",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#15ABFF54",
                borderBottom: "1px solid #1e90ff",
              }}
            >
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderRight: "1px solid #1e90ff",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderRight: "1px solid #1e90ff",
                }}
              >
                Version
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderRight: "1px solid #1e90ff",
                }}
              >
                Batch
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderRight: "1px solid #1e90ff",
                }}
              >
                No. of Semesters
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredObsoleteCurriculums.length > 0 ? (
              filteredObsoleteCurriculums.map((curr, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#fff" : "#15ABFF1C",
                    transition: "background-color 0.3s",
                    borderBottom: "1px solid #1e90ff",
                  }}
                >
                  <td
                    style={{
                      padding: "10px",
                      borderRight: "1px solid #1e90ff",
                    }}
                  >
                    {curr.name}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderRight: "1px solid #1e90ff",
                    }}
                  >
                    {curr.version}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      borderRight: "1px solid #1e90ff",
                    }}
                  >
                    {curr.batch.map((b, i) => (
                      <React.Fragment key={i}>
                        <Anchor
                          component={Link}
                          to="#"
                          style={{
                            marginRight: "10px",
                            color: "#1e90ff",
                            textDecoration: "underline",
                          }}
                        >
                          {b}
                        </Anchor>
                        {i < curr.batch.length - 1 && (
                          <span style={{ margin: "0 10px" }}>|</span>
                        )}
                      </React.Fragment>
                    ))}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderRight: "1px solid #1e90ff",
                    }}
                  >
                    {curr.semesters}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
      {/* Search Filter Section for Obsolete Curriculums */}
      <Paper
        shadow="xs"
        p="md"
        style={{ marginLeft: "20px", minWidth: "250px" }}
      >
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

        <Button onClick={handleSearch} variant="outline" fullWidth>
          Search
        </Button>
      </Paper>
    </div>
  );

  return (
    <Container fluid>
      <Grid gutter="lg">
        <Grid.Col span={12}>
          <Button
            onClick={() => setActiveTab("info")}
            variant={activeTab === "info" ? "filled" : "outline"}
            style={{ marginRight: "10px" }}
          >
            B.Design Info
          </Button>
          <Button
            onClick={() => setActiveTab("working")}
            variant={activeTab === "working" ? "filled" : "outline"}
            style={{ marginRight: "10px" }}
          >
            Working Curriculums
          </Button>
          <Button
            onClick={() => setActiveTab("obsolete")}
            variant={activeTab === "obsolete" ? "filled" : "outline"}
          >
            Obsolete Curriculums
          </Button>
        </Grid.Col>

        <Grid.Col span={12}>
          {activeTab === "info" && renderInfo()}
          {activeTab === "working" && renderWorkingCurriculums()}
          {activeTab === "obsolete" && renderObsoleteCurriculums()}
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default BDesAcadView;
