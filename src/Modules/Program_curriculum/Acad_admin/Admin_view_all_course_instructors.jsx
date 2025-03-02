import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MantineProvider,
  Table,
  Flex,
  Container,
  Button,
  TextInput,
  Grid,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { adminFetchCourseInstructorData } from "../api/api";

function Admin_view_all_course_instructors() {
  // const [searchName, setSearchName] = useState("");
  // const [searchVersion, setSearchVersion] = useState("");

  const [filters, setFilters] = useState({
    name: "",
    instructor: "",
    year: "",
  });
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token not found");
        }

        const data = await adminFetchCourseInstructorData();
        console.log(data);
        setInstructors(data);
      } catch (error) {
        console.error("Error fetching instructors: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered data based on search inputs
  const filteredData = instructors.filter((item) => {
    // Ensure `instructor_id_id` and `year` exist and are not null/undefined
    const instructorId = item.instructor_id_id || ""; // Default to empty string if undefined
    const year = item.year || ""; // Default to empty string if undefined

    // Convert to string and lowercase for comparison
    return (
      instructorId
        .toString()
        .toLowerCase()
        .includes(filters.instructor.toLowerCase()) &&
      year.toString().toLowerCase().includes(filters.year.toLowerCase())
    );
  });
  const cellStyle = {
    padding: "15px 20px",
    textAlign: "center",
    borderRight: "1px solid #d3d3d3",
  };

  // Define alternating row colors
  const rows = filteredData.map((element, index) => (
    <tr
      key={element.id}
      style={{ backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#E6F7FF" }}
    >
      <td style={cellStyle}>
        {/* Instructor name as a link */}
        <Link
          to={`/programme_curriculum/view_curriculum?curriculum=${element.id}`}
          style={{ color: "#3498db", textDecoration: "underline" }}
        >
          {element.name}
        </Link>
      </td>
      <td style={cellStyle}>{element.version}</td>
      <td style={cellStyle}>
        {element.batch && element.batch.length > 0 ? (
          element.batch.map((b, i) => <div key={i}>{b}</div>)
        ) : (
          <div>No batches available</div>
        )}
      </td>
      <td style={cellStyle}>{element.semesters}</td>
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
      {(() => {
        console.log("The data is: ", instructors);
        return null; // Returning null because we don't want anything to be displayed
      })()}
      <Container
        style={{ padding: "20px", minHeight: "100vh", maxWidth: "100%" }}
      >
        <Flex justify="flex-start" align="center" mb={20}>
          <Button variant="filled" style={{ marginRight: "10px" }}>
            Instructors
          </Button>
        </Flex>

        <Grid>
          {isMobile && (
            <Grid.Col span={12}>
              {[
                { label: "Name", field: "name" },
                { label: "Instructor", field: "instructor" },
                { label: "Year", field: "year" },
              ].map((filter) => (
                <TextInput
                  key={filter.field}
                  label={`${filter.label}:`}
                  value={filters[filter.field]}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      [filter.field]: e.target.value,
                    })
                  }
                  placeholder={`Search by ${filter.label}`}
                  mb={5}
                />
              ))}
              <Link to="/programme_curriculum/acad_admin_add_course_instructor">
                <Button
                  variant="filled"
                  color="blue"
                  radius="sm"
                  style={{ height: "35px", marginTop: "10px" }}
                >
                  Add Course Instructor
                </Button>
              </Link>
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
                      Course Version
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
                      Instructor
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
                      Year
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
                        No instructors found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Grid.Col>

          {!isMobile && (
            <Grid.Col span={3}>
              {[
                { label: "Name", field: "name" },
                { label: "Instructor", field: "instructor" },
                { label: "Year", field: "year" },
              ].map((filter) => (
                <TextInput
                  key={filter.field}
                  label={`${filter.label}:`}
                  value={filters[filter.field]}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      [filter.field]: e.target.value,
                    })
                  }
                  placeholder={`Search by ${filter.label}`}
                  mb={5}
                />
              ))}
              <Link to="/programme_curriculum/acad_admin_add_course_instructor">
                <Button
                  variant="filled"
                  color="blue"
                  radius="sm"
                  style={{ height: "35px", marginTop: "10px" }}
                >
                  Add Course Instructor
                </Button>
              </Link>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default Admin_view_all_course_instructors;
