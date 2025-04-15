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
import { useSelector } from "react-redux";
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

  const reduxRole = useSelector((state) => state.user.role);

  // Get role from sessionStorage (fallback)
  const sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
  const sessionRole = sessionData?.last_selected_role;

  // Determine which role to use (Redux takes precedence)
  const role = reduxRole || sessionRole;
  console.log("Role from Redux or sessionStorage: ", role);

  // Check if user is acadadmin
  const isAcadAdmin = role === "acadadmin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token not found");
        }

        const cachedData = localStorage.getItem("AdminInstructorsCache");
        const timestamp = localStorage.getItem("AdminInstructorsTimestamp");
        const isCacheValid =
          timestamp && Date.now() - parseInt(timestamp, 10) < 10 * 60 * 1000;
        const cachedDataChange = localStorage.getItem(
          "AdminInstructorsCacheChange",
        );

        // 10 min cache
        if (cachedData && isCacheValid && cachedDataChange === "false") {
          setInstructors(JSON.parse(cachedData));
        } else {
          const data = await adminFetchCourseInstructorData();
          setInstructors(data);
          localStorage.setItem("AdminInstructorsCacheChange", "false");
          localStorage.setItem("AdminInstructorsCache", JSON.stringify(data));
          localStorage.setItem(
            "AdminInstructorsTimestamp",
            Date.now().toString(),
          );
        }
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
    // Safely extract values or default to empty strings
    const instructorFirst = item.faculty_first_name || "";
    const instructorLast = item.faculty_last_name || "";
    const year = item.year || "";
    const name = item.course_name || "";
  
    // Combine first and last names for filtering
    const fullName = `${instructorFirst} ${instructorLast}`.toLowerCase();
  
    return (
      fullName.includes(filters.instructor.toLowerCase()) &&
      year.toString().toLowerCase().includes(filters.year.toLowerCase()) &&
      name.toLowerCase().includes(filters.name.toLowerCase())
    );
  });
  
  const cellStyle = {
    padding: "15px 20px",
    textAlign: "center",
    borderRight: "1px solid #d3d3d3",
  };

  // Base columns that are always shown
  const baseColumns = [
    { key: "course_code", label: "Code" },
    { key: "course_name", label: "Course Name" },
    { key: "course_version", label: "Version" },
    { key: "faculty", label: "Instructor" },
    { key: "year", label: "Year" },
  ];

  // Add actions column only for acadadmin
  const tableColumns = isAcadAdmin
    ? [...baseColumns, { key: "actions", label: "Actions" }]
    : baseColumns;
  const rows = filteredData.map((element, index) => {
    const baseCells = (
      <>
        <td style={cellStyle}>{element.course_code}</td>
        <td style={cellStyle}>{element.course_name}</td>
        <td style={cellStyle}>{element.course_version}</td>
        <td style={cellStyle}>
          {element.faculty_first_name} {element.faculty_last_name}
        </td>
        <td style={cellStyle}>{element.year}</td>
      </>
    );
    const actionCell = isAcadAdmin ? (
      <td style={{ padding: "15px 20px", textAlign: "center" }}>
        <Link
          to={`/programme_curriculum/admin_edit_course_instructor/${element.id}`}
        >
          <Button variant="filled" color="green" radius="sm">
            Edit
          </Button>
        </Link>
      </td>
    ) : null;

    return (
      <tr
        key={element.id}
        style={{ backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#E6F7FF" }}
      >
        {baseCells}
        {actionCell}
      </tr>
    );
  });

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
        <Flex justify="flex-start" align="center" mb={10}>
          <Button variant="filled" style={{ marginRight: "10px" }}>
            Instructors
          </Button>
        </Flex>
        <hr />
        <Grid>
          {isMobile && (
            <Grid.Col span={12}>
              {[
                { label: "Course Name", field: "name" },
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
              {isAcadAdmin && (
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
              )}
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
                    {tableColumns.map((column) => (
                      <th
                        key={column.key}
                        style={{
                          padding: "15px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={tableColumns.length}
                        style={{ textAlign: "center" }}
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : rows.length > 0 ? (
                    rows
                  ) : (
                    <tr>
                      <td
                        colSpan={tableColumns.length}
                        style={{ textAlign: "center" }}
                      >
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
                { label: "Course Name", field: "name" },
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
              {isAcadAdmin && (
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
              )}
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default Admin_view_all_course_instructors;
