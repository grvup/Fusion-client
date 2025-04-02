import React, { useState } from "react";
import {
  ScrollArea,
  Button,
  TextInput,
  Flex,
  MantineProvider,
  Container,
  Table,
  Grid,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";

function Admin_view_a_courses() {
  const [activeTab, setActiveTab] = useState("Courses");
  const [filter, setFilter] = useState({
    code: "",
    name: "",
    version: "",
    credits: "",
  });
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const courses = [
    {
      code: "NS205c",
      name: "Discrete Mathematics",
      version: "1.0",
      credits: 4,
    },
    {
      code: "NS205i",
      name: "Culture and Science - comparison",
      version: "1.0",
      credits: 4,
    },
    {
      code: "EC2002",
      name: "Digital Electronics and Microprocessor Interfacing",
      version: "1.0",
      credits: 4,
    },
    { code: "Mathematics", name: "Mechatronics", version: "1.0", credits: 4 },
    { code: "Design", name: "Design", version: "1.0", credits: 4 },
    {
      code: "Natural Sciences",
      name: "Natural Science-Mathematics",
      version: "1.0",
      credits: 4,
    },
    {
      code: "Humanities - English",
      name: "Humanities - English",
      version: "1.0",
      credits: 4,
    },
    // ... other courses remain the same
  ];

  // Apply filters to courses
  const filteredCourses = courses.filter((course) => {
    return (
      course.code.toLowerCase().includes(filter.code.toLowerCase()) &&
      course.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      course.version.toLowerCase().includes(filter.version.toLowerCase()) &&
      course.credits.toString().includes(filter.credits)
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
                    {["Course Code", "Course Name", "Version", "Credits", "Edit"].map(
                      (header, index) => (
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
                      )
                    )}
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
                          to={`/programme_curriculum/faculty_course_view?course=${course.code}`}
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
                        <Link to={`/programme_curriculum/faculty_forward_form?course=${course.code}`}>
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
                              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
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