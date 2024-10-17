import React, { useState } from "react";
import { Copy } from "@phosphor-icons/react";

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
  const [isHovered, setIsHovered] = useState(false);
  const [isAddCourseSlotHovered, setIsAddCourseSlotHovered] = useState(false);

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
              <th style={{ padding: "10px", textAlign: "center" }}>Action</th>
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
                      href={`/programme_curriculum/view_curriculum?curriculum=
                        ${curr.name}`}
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
                    {curr.batch.map((b, i) => (
                      <React.Fragment key={i}>
                        <span
                          style={{
                            marginRight: "10px",
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
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <a
                      href={`/programme_curriculum/admin_edit_curriculum_form?curriculum=
                        ${curr.name}`}
                    >
                      <Button
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          padding: "5px 10px",
                        }}
                      >
                        EDIT
                      </Button>
                    </a>
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
      style={{ marginTop: "20px", margin: "1vw 0vw 0 1.5vw", width: "20vw" }}
    >
      <Button
        variant="filled"
        style={{ width: "100%", padding: "0.25vw", margin: "0 0 1vw 0" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        OPTIONS
      </Button>

      {/* Options visible on hover */}
      {isHovered && (
        <div
          className={`options-dropdowns ${isHovered ? "open" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div>
            <h4 className="section-title">CURRICULUM</h4>
            <a
              href="/programme_curriculum/acad_admin_add_curriculum_form"
              style={{ textDecoration: "none" }}
            >
              <button className="dropdown-btns green-btns">
                ADD CURRICULUM
              </button>
            </a>
            <div
              onMouseEnter={() => setIsAddCourseSlotHovered(true)}
              onMouseLeave={() => setIsAddCourseSlotHovered(false)}
            >
              <button className="add-course-slot-button">
                REPLICATE CURRICULUM
              </button>

              {/* Semester options visible on hover */}
              {isAddCourseSlotHovered && (
                <div className="semester-dropdowns">
                  {CURRICULUM_DATA.workingCurriculums.map((curr, index) => (
                    <a
                      href={`/programme_curriculum/acad_admin_replicate_curriculum?curriculum=
                        ${curr.name}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="semester-options" key={index}>
                        <div>
                          <text>{curr.name}</text>
                          &nbsp;v
                          <text>{curr.version}</text>
                        </div>
                        <div>
                          <Copy size={20} color="#000" weight="bold" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <h4 style={{ margin: "0.5vh 0" }}>Programe</h4>
            <a
              href="/programme_curriculum/admin_edit_programme_form"
              style={{ textDecoration: "none" }}
            >
              <button className="dropdown-btns blue-btns">
                EDIT PROGRAMME
              </button>
            </a>

            {/* <button className="dropdown-btn black-btn">LINK BATCH</button> */}
          </div>
        </div>
      )}

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
      <style>
        {`
            .options-dropdowns {
              position: absolute;
              top: 38.5vh;
              right: 2.5vw;
              background-color: white;
              border: 1px solid #ddd;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              padding: 15px;
              z-index: 1;
              width: 18vw;
              overflow-x: visible;
              opacity: 0;
              max-height: 0;
              transition: max-height 0.4s ease-out, opacity 0.4s ease-out;
              border-radius: 5px;
            }
            
            .options-dropdowns.open {
              opacity: 1;
              max-height: 24vw;
              transition: max-height 0.4s ease-in, opacity 0.4s ease-in;
            }

            .semester-dropdowns {
              position: absolute;
              right: 16.5vw;
              top: 17vh;
              background-color: white;
              border: 1px solid #ddd;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              padding: 10px;
              z-index: 2;
              width: 18vw;
              /* max-height: 150px;  */
              overflow-y: auto; /* Scroll if content overflows */
              /* overflow-x: visible; */
              transition: max-height 0.4s ease-out;
              border-radius: 5px;
            }
            
            .semester-options {
              /* position: absolute; */
              display: flex;
              justify-content: space-between;
              padding: 5px;
              cursor: pointer;
              border-bottom: 1px solid #ddd;
              overflow-x: visible;
              z-index: 2;
            }
            
            .semester-options:hover {
              background-color: #f1f1f1;
            }
            .dropdown-btns {
              display: block;
              width: 100%;
              padding: 10px;
              margin-bottom: 10px;
              font-size: 14px;
              border: none;
              cursor: pointer;
              border-radius: 4px;
              color: black;
              transition: background-color 0.3s ease;
            }
            
            .green-btns {
              background-color: #bee9e8;
            }
            
            .blue-btns{
              background-color: #62b6cb;
            }
            
            .black-btns {
              background-color: #6a95ad;
            }
            
            
            `}
      </style>
    </Container>
  );
}

export default BDesAcadView;
