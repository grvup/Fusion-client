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
  ScrollArea,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { fetchWorkingCurriculumsData } from "../api/api";

function Admin_view_all_working_curriculums() {
  const [filters, setFilters] = useState({
    name: "",
    version: "",
    batch: "",
    semesters: "",
  });
  const [curriculums, setCurriculums] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("AdminCurriculumsCache");
        const timestamp = localStorage.getItem("AdminCurriculumsTimestamp");
        const isCacheValid =
          timestamp && Date.now() - parseInt(timestamp, 10) < 10 * 60 * 1000; // 10 min cache
        const cachedDatachange = localStorage.getItem(
          "AdminCurriculumsCachechange",
        );
        if (cachedData && isCacheValid && cachedDatachange === "false") {
          setCurriculums(JSON.parse(cachedData));
        } else {
          const token = localStorage.getItem("authToken");
          if (!token) throw new Error("Authorization token not found");

          const data = await fetchWorkingCurriculumsData(token);
          localStorage.setItem("AdminCurriculumsCachechange", "false");
          setCurriculums(data.curriculums);
          localStorage.setItem(
            "AdminCurriculumsCache",
            JSON.stringify(data.curriculums),
          );
          localStorage.setItem(
            "AdminCurriculumsTimestamp",
            Date.now().toString(),
          );
        }
      } catch (error) {
        console.error("Error fetching curriculums: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered data based on search inputs
  const filteredData = curriculums.filter((item) => {
    return (
      (filters.name === "" ||
        item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.version === "" ||
        item.version.toLowerCase().includes(filters.version.toLowerCase())) &&
      (filters.batch === "" ||
        (item.batch || []).some((b) =>
          b.toLowerCase().includes(filters.batch.toLowerCase()),
        )) &&
      (filters.semesters === "" ||
        item.semesters.toString().includes(filters.semesters))
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
        {/* Curriculum name as a link */}
        <Link
          to={`/programme_curriculum/view_curriculum?curriculum=${element.id}`}
          style={{ color: "#3498db", textDecoration: "none" }}
        >
          {element.name}
        </Link>
      </td>
      <td style={cellStyle}>{element.version}</td>
      <td
        style={{
          padding: "15px 20px",
          borderRight: "1px solid #d3d3d3",
          textAlign: "center",
        }}
      >
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
        <Link
          to={`/programme_curriculum/acad_admin_replicate_curriculum_form?curriculum=${element.id}`}
        >
          <Button variant="filled" color="green" radius="sm">
            Replicate
          </Button>
        </Link>
      </td>
      <td
        style={{
          padding: "15px 20px",
          textAlign: "center",
        }}
      >
        {/* Edit button as a link */}
        <Link
          to={`/programme_curriculum/admin_edit_curriculum_form?curriculum=${element.id}`}
        >
          <Button variant="filled" color="green" radius="sm">
            Edit
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
      <Container style={{ padding: "20px", maxWidth: "100%" }}>
        <Flex justify="flex-start" align="center" mb={10}>
          <Button variant="filled" style={{ marginRight: "10px" }}>
            Curriculums
          </Button>
        </Flex>
        <hr />

        <Grid>
          {isMobile && (
            <Grid.Col span={12}>
              <ScrollArea>
                {[
                  { label: "Name", field: "name" },
                  { label: "Version", field: "version" },
                  { label: "Batch", field: "batch" },
                  { label: "No. of Semesters", field: "semesters" },
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
                <Link to="/programme_curriculum/acad_admin_add_curriculum_form">
                  <Button
                    variant="filled"
                    color="blue"
                    radius="sm"
                    style={{ height: "35px", marginTop: "10px" }}
                  >
                    Add Curriculum
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
                      Name
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
                      Batch
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
                      No. of Semesters
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
                        No curriculums found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Grid.Col>

          {!isMobile && (
            <Grid.Col span={3}>
              <ScrollArea>
                {[
                  { label: "Name", field: "name" },
                  { label: "Version", field: "version" },
                  { label: "Batch", field: "batch" },
                  { label: "No. of Semesters", field: "semesters" },
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
                <Link to="/programme_curriculum/acad_admin_add_curriculum_form">
                  <Button
                    variant="filled"
                    color="blue"
                    radius="sm"
                    style={{ height: "35px", marginTop: "10px" }}
                  >
                    Add Curriculum
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

export default Admin_view_all_working_curriculums;
