import React, { useState, useEffect } from "react";
import {
  MantineProvider,
  Table,
  Flex,
  Container,
  TextInput,
  Grid,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { fetchWorkingCurriculumsData } from "../api/api";

function FacultyViewAllWorkingCurriculums() {
  const [filters, setFilters] = useState({
    name: "",
    version: "",
    batch: "",
    semesters: "",
  });
  const [curriculums, setCurriculums] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("curriculumsCache");
        const timestamp = localStorage.getItem("curriculumsTimestamp");
        const isCacheValid =
          timestamp && Date.now() - parseInt(timestamp, 10) < 10 * 60 * 1000;
        // 10 min cache

        if (cachedData && isCacheValid) {
          setCurriculums(JSON.parse(cachedData) || []);
        } else {
          const token = localStorage.getItem("authToken");
          if (!token) throw new Error("Authorization token is missing");

          const data = await fetchWorkingCurriculumsData(token);
          setCurriculums(data.curriculums || []);

          localStorage.setItem(
            "curriculumsCache",
            JSON.stringify(data.curriculums),
          );
          localStorage.setItem("curriculumsTimestamp", Date.now().toString());
        }
      } catch (error) {
        console.error("Error fetching curriculums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on input filters
  const filteredData = curriculums.filter((item) => {
    return (
      item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      item.version.toLowerCase().includes(filters.version.toLowerCase()) &&
      (item.batch || []).some((b) =>
        b.toLowerCase().includes(filters.batch.toLowerCase()),
      ) &&
      item.semesters.toString().includes(filters.semesters)
    );
  });
  const cellStyle = {
    padding: "15px 20px",
    textAlign: "center",
    borderRight: "1px solid #d3d3d3",
  };
  // Generate table rows with alternating row colors
  const rows = filteredData.map((curriculum, index) => (
    <tr
      key={curriculum.id}
      style={{ backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#E6F7FF" }}
    >
      <td style={cellStyle}>
        <Link
          to={`/programme_curriculum/stud_curriculum_view/${curriculum.id}`}
          style={{ color: "#3498db", textDecoration: "none" }}
        >
          {curriculum.name}
        </Link>
      </td>
      <td style={cellStyle}>{curriculum.version}</td>
      <td style={cellStyle}>
        {curriculum.batch && curriculum.batch.length > 0
          ? curriculum.batch.join(", ")
          : "No batches available"}
      </td>
      <td style={cellStyle}>{curriculum.semesters}</td>
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
                    {["Name", "Version", "Batch", "No. of Semesters"].map(
                      (header, index) => (
                        <th
                          key={index}
                          style={{
                            padding: "15px 20px",
                            backgroundColor: "#C5E2F6",
                            color: "#3498db",
                            fontSize: "16px",
                            textAlign: "center",
                            borderRight:
                              index < 3 ? "1px solid #d3d3d3" : "none",
                          }}
                        >
                          {header}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        Loading...
                      </td>
                    </tr>
                  ) : rows.length > 0 ? (
                    rows
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No curriculums found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Grid.Col>

          {/* Filter Section */}
          {!isMobile && (
            <Grid.Col span={3}>
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
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default FacultyViewAllWorkingCurriculums;
