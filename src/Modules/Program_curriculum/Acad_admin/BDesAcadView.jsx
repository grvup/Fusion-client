import React, { useState, useEffect } from "react";
import { Copy } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import {
  MantineProvider,
  Flex,
  Table,
  ScrollArea,
  Container,
  Button,
  Grid,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import { useMediaQuery } from "@mantine/hooks";
import { host } from "../../../routes/globalRoutes";

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
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  // Create an instance of URLSearchParams to parse query parameters
  const queryParams = new URLSearchParams(location.search);

  // Get the value of the 'programme' query parameter
  const programmeId = queryParams.get("programme"); // This will be '1'

  const [activeTab, setActiveTab] = useState("info");

  // New States for Filtering
  const [searchName, setSearchName] = useState("");
  const [batchName, setBatchName] = useState("");
  const [searchVersion, setSearchVersion] = useState("");
  const [program, setProgram] = useState(null);
  const [workingCurriculums, setWorkingCurriculums] = useState([]);
  const [pastCurriculums, setPastCurriculums] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurriculmns = async () => {
      try {
        // Assuming you have stored the token in localStorage or state
        const token = localStorage.getItem("authToken"); // Replace with actual method to get token

        const response = await axios.get(
          `${host}/programme_curriculum/api/curriculums/${programmeId}`, // Use backticks for template literal
          {
            headers: {
              Authorization: `Token ${token}`, // Add the Authorization header
            },
          },
        );

        setProgram(response.data.program);
        setBatchName(response.data.name);
        setWorkingCurriculums(response.data.working_curriculums);
        console.log("working curriculums: ", response.data.working_curriculums);
        setPastCurriculums(response.data.past_curriculums);
        // setLoading(false);
        console.log("response data: ", response.data);
      } catch (FetchError) {
        console.error("Error fetching data: ", error);
        setError("Failed to load data");
        // setLoading(false);
      }
    };

    fetchCurriculmns();
  }, []);
  console.log(workingCurriculums);

  const [isHovered, setIsHovered] = useState(false);
  const [isAddCourseSlotHovered, setIsAddCourseSlotHovered] = useState(false);

  const renderInfo = () => (
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
      <Table style={{ backgroundColor: "white", padding: "20px" }}>
        <tbody>
          <tr>
            <td
              colSpan="2"
              style={{
                padding: "15px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {program ? program.name : ""}
            </td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                backgroundColor: "#FFFFFF",
                color: "#3498db",
                padding: "15px 20px",
                textAlign: "left",
                borderRight: "1px solid #d3d3d3",
              }}
            >
              Programme Name
            </td>
            <td style={{ padding: "20px 20px", backgroundColor: "#FFFFFF" }}>
              {program ? program.name : ""}
            </td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                backgroundColor: "#E6F7FF",
                color: "#3498db",
                padding: "15px 20px",
                textAlign: "left",
                borderRight: "1px solid #d3d3d3",
              }}
            >
              Programme Category
            </td>
            <td style={{ padding: "20px 20px", backgroundColor: "#E6F7FF" }}>
              {program ? program.category : ""}
            </td>
          </tr>

          <tr>
            <td
              style={{
                fontWeight: "bold",
                backgroundColor: "#FFFFFF",
                color: "#3498db",
                padding: "15px 20px",
                textAlign: "left",
                borderRight: "1px solid #d3d3d3",
              }}
            >
              Programme Begin Year
            </td>
            <td style={{ padding: "20px 20px", backgroundColor: "#FFFFFF" }}>
              {CURRICULUM_DATA.info.programBeginYear}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );

  const renderWorkingCurriculums = () => (
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
      <Table style={{ backgroundColor: "white", padding: "20px" }}>
        <thead>
          <tr
            style={{
              backgroundColor: "#15ABFF54",
              borderBottom: "1px solid #d3d3d3",
            }}
          >
            <th
              style={{
                padding: "15px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "15px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Version
            </th>
            <th
              style={{
                padding: "15px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Batch
            </th>
            <th
              style={{
                padding: "15px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              No. of Semesters
            </th>
            <th
              style={{
                padding: "15px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {workingCurriculums.length > 0 ? (
            workingCurriculums.map((curr, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#E6F7FF",
                }}
              >
                <td
                  style={{
                    padding: "15px 20px",
                    borderRight: "1px solid #d3d3d3",
                    textAlign: "center",
                  }}
                >
                  <Link
                    to={`/programme_curriculum/view_curriculum?curriculum=${curr.id}`}
                    style={{ color: "#3498db", textDecoration: "none" }}
                  >
                    {curr.name}
                  </Link>
                </td>
                <td
                  style={{
                    padding: "15px 20px",
                    borderRight: "1px solid #d3d3d3",
                    textAlign: "center",
                  }}
                >
                  {curr.version}
                </td>
                <td
                  style={{
                    padding: "15px 20px",
                    textAlign: "center",
                    borderRight: "1px solid #d3d3d3",
                  }}
                >
                  {/* {curr.batch.map((b, i) => (
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
                    ))} */}
                  {batchName} {curr.year}
                </td>
                <td
                  style={{
                    padding: "15px 20px",
                    borderRight: "1px solid #d3d3d3",
                    textAlign: "center",
                  }}
                >
                  {curr.no_of_semester}
                </td>
                <td
                  style={{
                    padding: "15px 20px",
                    borderRight: "1px solid #d3d3d3",
                    textAlign: "center",
                  }}
                >
                  <Link
                    to={`/programme_curriculum/admin_edit_curriculum_form?curriculum=${curr.id}`}
                  >
                    <Button variant="filled" color="green" radius="sm">
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{ textAlign: "center", padding: "15px 20px" }}
              >
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );

  const renderObsoleteCurriculums = () => (
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
      <Table style={{ backgroundColor: "white", padding: "20px" }}>
        <thead>
          <tr
            style={{
              backgroundColor: "#15ABFF54",
              borderBottom: "1px solid #d3d3d3",
            }}
          >
            <th
              style={{
                padding: "15px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "15px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Version
            </th>
            <th
              style={{
                padding: "15px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Batch
            </th>
            <th
              style={{
                padding: "15px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              No. of Semesters
            </th>
          </tr>
        </thead>
        <tbody>
          {pastCurriculums.length > 0 ? (
            pastCurriculums.map((curr, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#E6F7FF",
                }}
              >
                <td
                  style={{
                    padding: "15px 20px",
                    borderRight: "1px solid #d3d3d3",
                  }}
                >
                  {curr.name}
                </td>
                <td
                  style={{
                    padding: "15px 20px",
                    borderRight: "1px solid #d3d3d3",
                  }}
                >
                  {curr.version}
                </td>
                <td
                  style={{
                    padding: "15px 20px",
                    display: "flex",
                    textAlign: "center",
                    borderRight: "1px solid #d3d3d3",
                  }}
                >
                  {/* {curr.batch.map((b, i) => (
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
                    ))} */}
                  {curr.batch}
                </td>
                <td
                  style={{
                    padding: "15px 20px",
                    borderRight: "1px solid #d3d3d3",
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
                style={{ textAlign: "center", padding: "15px 20px" }}
              >
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );

  // Single Filter Section
  const renderFilterSection = () => (
    <ScrollArea>
      {/* <Button
        variant="filled"
        style={{ width: "100%", padding: "0.25vw", margin: "0 0 1vw 0" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        OPTIONS
      </Button> */}

      {/* Options visible on hover */}

      <div
        className={`options-dropdowns ${isHovered ? "open" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        overflow
      >
        <div>
          <p
            style={{
              marginBottom: "-7px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Curriculum Options:
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              marginTop: "10px",
            }}
          >
            <Link
              to="/programme_curriculum/acad_admin_add_curriculum_form"
              style={{
                textDecoration: "none",
                flex: "1 1 auto",
                maxWidth: "141px",
              }}
            >
              <Button
                className="dropdown-btns green-btns"
                variant="filled"
                style={{ width: "100%" }}
              >
                Add Curriculum
              </Button>
            </Link>

            <div
              style={{
                position: "relative",
                flex: "1 1 auto",
                minWidth: "150px",
              }}
              onMouseEnter={() => setIsAddCourseSlotHovered(true)}
              onMouseLeave={() => setIsAddCourseSlotHovered(false)}
            >
              <Button
                variant="filled"
                style={{ width: "100%", maxWidth: "170px" }}
              >
                Replicate Curriculum
              </Button>

              {isAddCourseSlotHovered && (
                <div
                  className="semester-dropdowns"
                  style={{
                    fontSize: "14px",
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "#fff",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    borderRadius: "5px",
                    zIndex: 10,
                    padding: "8px",
                    width: "100%",
                    maxWidth: "170px",
                  }}
                >
                  {workingCurriculums.length > 0 ? (
                    workingCurriculums.map((curr, index) => (
                    <Link
                      key={index}
                      to={`/programme_curriculum/acad_admin_replicate_curriculum_form?curriculum=${curr.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="semester-options"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "5px 10px",
                          borderBottom: "1px solid #ddd",
                          cursor: "pointer",
                        }}
                      >
                        <div>
                          <span>{curr.name}</span> v<span>{curr.version}</span>
                        </div>
                        <Copy size={20} color="#000" weight="bold" />
                      </div>
                    </Link>
                  ))) : (
                    <div
                      style={{
                        padding: "5px 10px",
                        textAlign: "center",
                        color: "#999",
                      }}
                    >
                      No curriculums available
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <p
            style={{
              marginTop: "4px",
              marginBottom: "-7px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Programe Options:
          </p>
          <Link
            to={`/programme_curriculum/admin_edit_programme_form/${programmeId}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              className="dropdown-btns blue-btns"
              variant="filled"
              style={{
                marginTop: "10px",
                width: "100%",
                maxWidth: "141px",
                marginBottom: "10px",
              }}
            >
              Edit Programme
            </Button>
          </Link>
          <TextInput
            label="Name:"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by Name"
            mb={5}
          />

          <TextInput
            label="Version:"
            value={searchVersion}
            onChange={(e) => setSearchVersion(e.target.value)}
            placeholder="Search by Version"
            mb={5}
          />

          {/* <button className="dropdown-btn black-btn">LINK BATCH</button> */}
        </div>
      </div>
    </ScrollArea>
  );

  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container style={{ padding: "20px", maxWidth: "100%" }}>
        <Flex justify="flex-start" align="center" mb={10}>
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
            style={{ marginRight: "10px" }}
          >
            Obsolete Curriculums
          </Button>
        </Flex>
        <hr />
        <Grid>
          {isMobile && (
            <Grid.Col span={12}>
              {(activeTab === "working" || activeTab === "obsolete") &&
                renderFilterSection()}
            </Grid.Col>
          )}
          <Grid.Col span={isMobile ? 12 : 9}>
            {/* Render Filter Section Conditionally */}
            {/* <div style={{ display: "flex" }}> */}
            <div>
              {activeTab === "info" && renderInfo()}
              {activeTab === "working" && renderWorkingCurriculums()}
              {activeTab === "obsolete" && renderObsoleteCurriculums()}
            </div>
            {/* </div> */}
          </Grid.Col>
          {!isMobile && (
            <Grid.Col span={3}>
              {(activeTab === "working" || activeTab === "obsolete") &&
                renderFilterSection()}
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default BDesAcadView;
