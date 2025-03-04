import {
  Button,
  ScrollArea,
  TextInput,
  Table,
  Flex,
  Grid,
  MantineProvider,
  Container,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllCourses } from "../api/api";

function Admin_view_all_courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Show loader until data is fetched
  const [error, setError] = useState(null); // Handle errors
  const [searchCode, setSearchCode] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [searchVersion, setSearchVersion] = useState("");
  const [searchCredits, setSearchCredits] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const cachedData = localStorage.getItem("AdminCoursesCache");
        const timestamp = localStorage.getItem("AdminCoursesTimestamp");
        const isCacheValid =
          timestamp && Date.now() - parseInt(timestamp, 10) < 10 * 60 * 1000;
        const cachedDatachange = localStorage.getItem(
          "AdminCoursesCachechange",
        );
        // 10 min cache
        if (cachedData && isCacheValid && cachedDatachange === "false") {
          setCourses(JSON.parse(cachedData));
        } else {
          const data = await fetchAllCourses();
          setCourses(data);
          localStorage.setItem("AdminCoursesCachechange", "false");

          localStorage.setItem("AdminCoursesCache", JSON.stringify(data));
          localStorage.setItem("AdminCoursesTimestamp", Date.now().toString());
        }
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading) {
    <tr>
      <td colSpan="5" style={{ textAlign: "center" }}>
        Loading...
      </td>
    </tr>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an issue
  }

  const filteredCourses = courses.filter((course) => {
    return (
      (searchCode === "" ||
        course.code.toLowerCase().includes(searchCode.toLowerCase())) &&
      (searchCourse === "" ||
        course.name.toLowerCase().includes(searchCourse.toLowerCase())) &&
      (searchVersion === "" || course.version.includes(searchVersion)) &&
      (searchCredits === "" ||
        course.credits.toString().includes(searchCredits))
    );
  });

  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container style={{ padding: "20px", maxWidth: "100%" }}>
        <Flex justify="flex-start" align="center" mb={10}>
          <div>
            <Button variant="filled" style={{ marginRight: "10px" }}>
              Courses
            </Button>
          </div>
          {/* <div className="top-actions">
              <a
                href="/programme_curriculum/acad_admin_add_course_proposal_form"
                style={{
                            color: "#3498db",
                            textDecoration: "none",
                            fontSize: "14px",
                          }}
              >
                <Button className="add-course-btn">ADD COURSE</Button>
              </a>
            </div> */}
        </Flex>
        <hr />
        <Grid>
          {isMobile && (
            <Grid.Col span={12}>
              <ScrollArea type="hover">
                <TextInput
                  label="Course Code:"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Search by Code"
                  mb={5}
                />
                <TextInput
                  label="Course Name:"
                  value={searchCourse}
                  onChange={(e) => setSearchCourse(e.target.value)}
                  placeholder="Search by Course Name"
                  mb={5}
                />
                <TextInput
                  label="Version:"
                  value={searchVersion}
                  onChange={(e) => setSearchVersion(e.target.value)}
                  placeholder="Search by Version"
                  mb={5}
                />
                <TextInput
                  label="Credits:"
                  value={searchCredits}
                  onChange={(e) => setSearchCredits(e.target.value)}
                  placeholder="Search by Credits"
                  mb={5}
                />
                <Link to="/programme_curriculum/acad_admin_add_course_proposal_form">
                  <Button
                    variant="filled"
                    color="blue"
                    radius="sm"
                    style={{ height: "35px", marginTop: "10px" }}
                  >
                    Add Course
                  </Button>
                </Link>
              </ScrollArea>
            </Grid.Col>
          )}
          <Grid.Col span={isMobile ? 12 : 9}>
            {/* Table Section */}
            <div
              style={{
                maxHeight: "61vh",
                overflowY: "auto",
                border: "1px solid #d3d3d3",
                borderRadius: "10px",
                scrollbarWidth: "none", // For Firefox
              }}
            >
              <style>
                {`
                                /* Hide scrollbar for Chrome, Edge, and Safari */
                                div::-webkit-scrollbar {
                                  display: none;
                                }
                              `}
              </style>

              <Table highlightOnHover striped className="courses-table">
                <thead className="courses-table-header">
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
                      Course Code
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
                      Course Name
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
                      Version
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
                      Credits
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
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 !== 0 ? "#E6F7FF" : "#ffffff",
                      }}
                    >
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                          width: "20%",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        <Link
                          to={`/programme_curriculum/admin_course/${course.id}`}
                          className="course-link"
                          style={{
                            color: "#3498db",
                            textDecoration: "none",
                            fontSize: "14px",
                          }}
                        >
                          {course.code}
                        </Link>
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                          width: "20%",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {course.name}
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                          width: "20%",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {course.version}
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                          width: "20%",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {course.credits}
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                          width: "20%",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        <Link
                          to={`/programme_curriculum/acad_admin_edit_course_form/${course.id}`}
                        >
                          <Button variant="filled" color="green" radius="sm">
                            Edit
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid.Col>
          {!isMobile && (
            <Grid.Col span={3}>
              <ScrollArea type="hover">
                <TextInput
                  label="Course Code:"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Search by Code"
                  mb={5}
                />
                <TextInput
                  label="Course Name:"
                  value={searchCourse}
                  onChange={(e) => setSearchCourse(e.target.value)}
                  placeholder="Search by Course Name"
                  mb={5}
                />
                <TextInput
                  label="Version:"
                  value={searchVersion}
                  onChange={(e) => setSearchVersion(e.target.value)}
                  placeholder="Search by Version"
                  mb={5}
                />
                <TextInput
                  label="Credits:"
                  value={searchCredits}
                  onChange={(e) => setSearchCredits(e.target.value)}
                  placeholder="Search by Credits"
                  mb={5}
                />
                <Link to="/programme_curriculum/acad_admin_add_course_proposal_form">
                  <Button
                    variant="filled"
                    color="blue"
                    radius="sm"
                    style={{ height: "35px", marginTop: "10px" }}
                  >
                    Add Course
                  </Button>
                </Link>
              </ScrollArea>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default Admin_view_all_courses;
