import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  ScrollArea,
  Container,
  Button,
  Grid,
  Paper,
  TextInput,
  Text,
} from "@mantine/core";

import { fetchCurriculumData } from "../api/api";

function BDesStudView() {
  const { id } = useParams();
  const [curriculumData, setCurriculumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  // New States for Filtering
  const [searchName, setSearchName] = useState("");
  const [searchVersion, setSearchVersion] = useState("");
  // const [filteredWorkingCurriculums, setWorkingCurriculum] = useState("");

  useEffect(() => {
    const loadCurriculumData = async () => {
      try {
        const cacheKey = `curriculumCache_${id}`;
        const cachedData = localStorage.getItem(cacheKey);
        const timestamp = localStorage.getItem(`${cacheKey}_timestamp`);
        const isCacheValid =
          timestamp && Date.now() - parseInt(timestamp, 10) < 10 * 60 * 1000;
        // 10 min cache

        if (cachedData && isCacheValid) {
          setCurriculumData(JSON.parse(cachedData) || {});
        } else {
          const data = await fetchCurriculumData(id);
          setCurriculumData(data || {});

          localStorage.setItem(cacheKey, JSON.stringify(data));
          localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
        }
      } catch (error) {
        console.error("Error loading curriculum data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCurriculumData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!curriculumData) {
    return <div>No data available</div>;
  }

  // Filter Logic for Working Curriculums
  const filteredWorkingCurriculums = curriculumData.working_curriculums
    ? curriculumData.working_curriculums.filter(
        (curr) =>
          curr.name.toLowerCase().includes(searchName.toLowerCase()) &&
          curr.version.toLowerCase().includes(searchVersion.toLowerCase()),
      )
    : []; // Default to an empty array if undefined

  // Filter Logic for Obsolete Curriculums
  const filteredObsoleteCurriculums = curriculumData.obsoleteCurriculums
    ? curriculumData.obsoleteCurriculums.filter(
        (curr) =>
          curr.name.toLowerCase().includes(searchName.toLowerCase()) &&
          curr.version.toLowerCase().includes(searchVersion.toLowerCase()),
      )
    : []; // Default to an empty array if undefined

  const handleSearch = () => {
    // Implement search functionality if needed (currently using live filtering)
    console.log(
      "Search initiated with Name:",
      searchName,
      "and Version:",
      searchVersion,
    );
  };
  // const [isHovered, setIsHovered] = useState(false);
  // const [isAddCourseSlotHovered, setIsAddCourseSlotHovered] = useState(false);
  // const [isInstigateSemesterHovered, setIsInstigateSemesterHovered] = useState(false);

  const renderInfo = () => (
    <div style={{ marginBottom: "20px", display: "flex" }}>
      <Table
        highlightOnHover
        verticalSpacing="sm"
        style={{
          border: "2px solid #1e90ff",
          borderCollapse: "collapse",
          width: "65vw",
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
              {curriculumData.program.name}
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
            <td style={{ padding: "10px" }}>{curriculumData.program.name}</td>
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
              {curriculumData.program.category}
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
              {curriculumData.program.programme_begin_year}
            </td>
          </tr>
        </tbody>
      </Table>
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
            width: "65vw",
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
                    <a
                      href={`/programme_curriculum/stud_curriculum_view/${curr.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {curr.name}
                    </a>
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
                    {curr.batches.map((b, i) => (
                      <React.Fragment key={i}>
                        <span
                          style={{
                            marginRight: "10px",
                          }}
                        >
                          {`${b.name} ${b.year}`}
                        </span>
                        {i < curr.batches.length - 1 && (
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
                    {curr.no_of_semester}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
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
            width: "65vw",
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
                        <span
                          style={{
                            marginRight: "10px",
                            color: "black", // Set the text color to black or any color of your choice
                            textDecoration: "none", // Remove the underline
                          }}
                        >
                          {b}
                        </span>
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
    </div>
  );

  // Single Filter Section
  const renderFilterSection = () => (
    <Paper
      shadow="xs"
      p="md"
      style={{ marginTop: "20px", margin: "1vw 0vw 0 1.5vw", width: "15vw" }}
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
  );

  return (
    <Container fluid>
      <Grid gutter="lg" style={{ margin: "20px 0" }}>
        <Grid.Col span={12}>
          <Button
            onClick={() => setActiveTab("info")}
            variant={activeTab === "info" ? "filled" : "outline"}
            style={{ marginRight: "10px" }}
          >
            Programme Info
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
          {/* Render Filter Section Conditionally */}
          <div style={{ display: "flex" }}>
            <div>
              {activeTab === "info" && renderInfo()}
              {activeTab === "working" && renderWorkingCurriculums()}
              {activeTab === "obsolete" && renderObsoleteCurriculums()}
            </div>
            <div>
              {(activeTab === "working" || activeTab === "obsolete") &&
                renderFilterSection()}
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default BDesStudView;
