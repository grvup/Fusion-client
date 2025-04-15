import React, { useState, useEffect } from "react";
import {
  ScrollArea,
  Button,
  TextInput,
  Flex,
  MantineProvider,
  Container,
  Table,
  Grid,
  LoadingOverlay,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { fetchAllCourses } from "../api/api";

function Admin_view_a_courses() {
  const [activeTab, setActiveTab] = useState("Courses");
  const [filter, setFilter] = useState({
    code: "",
    name: "",
    version: "",
    credits: "",
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCourses();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  // Apply filters to courses
  const filteredCourses = courses.filter((course) => {
    return (
      course.code.toLowerCase().includes(filter.code.toLowerCase()) &&
      course.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      course.version.toLowerCase().includes(filter.version.toLowerCase()) &&
      course.credits.toString().includes(filter.credits)
    );
  });

  if (loading) {
    return (
      <MantineProvider theme={{ colorScheme: "light" }}>
        <Container
          style={{ padding: "20px", maxWidth: "100%", height: "100vh" }}
        >
          <LoadingOverlay visible={false} overlayBlur={2} />
        </Container>
      </MantineProvider>
    );
  }

  if (error) {
    return (
      <MantineProvider theme={{ colorScheme: "light" }}>
        <Container style={{ padding: "20px", maxWidth: "100%" }}>
          <div style={{ color: "red" }}>Error: {error}</div>
        </Container>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container style={{ padding: "20px", maxWidth: "100%" }}>
        <Flex justify="flex-start" align="center" mb={10}>
          <Button
            variant={activeTab === "Courses" ? "filled" : "outline"}
            onClick={() => setActiveTab("Courses")}
            style={{ marginRight: "10px" }}
          >
            Courses
          </Button>
        </Flex>
        <hr />

        <Grid>
          {isMobile && (
            <Grid.Col span={12}>
              <ScrollArea type="hover">
                {[
                  { label: "Course Code", name: "code" },
                  { label: "Course Name", name: "name" },
                  { label: "Version", name: "version" },
                  { label: "Credits", name: "credits" },
                ].map((input, index) => (
                  <TextInput
                    key={index}
                    label={`${input.label}:`}
                    placeholder={`Select by ${input.label}`}
                    value={filter[input.name]}
                    name={input.name}
                    mb={5}
                    onChange={handleInputChange}
                  />
                ))}
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
                position: "relative",
              }}
            >
              <style>
                {`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>

              <Table
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  flexGrow: 1,
                }}
              >
                <thead>
                  <tr>
                    {[
                      "Code",
                      "Course Name",
                      "Version",
                      "Credits",
                      "Edit",
                    ].map((header, index) => (
                      <th
                        key={index}
                        style={{
                          padding: "15px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: index < 4 ? "1px solid #d3d3d3" : "none",
                        }}
                      >
                        {header}
                      </th>
                    ))}
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
                          color: "#3498db",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        <Link
                          to={`/programme_curriculum/faculty_course_view/${course.id}`}
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
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {course.credits}
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                        }}
                      >
                        <Link
                          to={`/programme_curriculum/edit_course_proposal_form/${course.id}`}
                        >
                          <Button
                            style={{
                              backgroundColor: "#28a745",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              padding: "8px 12px",
                              cursor: "pointer",
                              transition: "background-color 0.3s",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = "#218838";
                              e.currentTarget.style.boxShadow =
                                "0 4px 8px rgba(0, 0, 0, 0.2)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = "#28a745";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
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
                {[
                  { label: "Course Code", name: "code" },
                  { label: "Course Name", name: "name" },
                  { label: "Version", name: "version" },
                  { label: "Credits", name: "credits" },
                ].map((input, index) => (
                  <TextInput
                    key={index}
                    label={`${input.label}:`}
                    placeholder={`Select by ${input.label}`}
                    value={filter[input.name]}
                    name={input.name}
                    mb={5}
                    onChange={handleInputChange}
                  />
                ))}
              </ScrollArea>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default Admin_view_a_courses;
