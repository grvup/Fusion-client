import {
  Button,
  ScrollArea,
  TextInput,
  Table,
  Loader,
  Flex,
  Grid,
  MantineProvider,
  Container,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState, useEffect } from "react";
import { fetchAllCourses } from "./api/api";

function View_all_courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCode, setSearchCode] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [searchVersion, setSearchVersion] = useState("");
  const [searchCredits, setSearchCredits] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchAllCourses(); // Fetch the courses data
        setCourses(data); // Update the courses state
      } catch (err) {
        setError("Failed to load courses."); // Handle errors
      } finally {
        setLoading(false); // Stop the loader
      }
    };

    loadCourses(); // Fetch courses on component mount
  }, []);

  if (loading) {
    return <Loader size="lg" variant="dots" />; // Show loader while loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an issue
  }

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    return (
      course.code.toLowerCase().includes(searchCode.toLowerCase()) &&
      course.name.toLowerCase().includes(searchCourse.toLowerCase()) &&
      course.version.includes(searchVersion) &&
      course.credits.toString().includes(searchCredits)
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
          <Button variant="filled" style={{ marginRight: "10px" }}>
            Courses
          </Button>
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
                        <a
                          href={`/programme_curriculum/student_course/${course.id}`}
                          style={{
                            color: "#3498db",
                            textDecoration: "none",
                            fontSize: "14px",
                          }}
                          className="course-link"
                        >
                          {course.code}
                        </a>
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                          width: "30%",
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
                          width: "15%",
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
                          width: "15%",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {course.credits}
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
              </ScrollArea>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default View_all_courses;
