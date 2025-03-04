import React, { useState, useEffect } from "react";
import {
  MantineProvider,
  Table,
  Anchor,
  Container,
  Flex,
  Button,
  Grid,
  TextInput,
  ScrollArea,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import { fetchDisciplinesData } from "../api/api";

function DisciplineAcad() {
  const [disciplines, setDisciplines] = useState([]); // State to hold discipline data
  const [loading, setLoading] = useState(true); // Loading state for the API call
  const navigate = useNavigate(); // Hook to navigate between routes
  const [disciplineFilter, setDisciplineFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("DisciplineAcad");
        const timestamp = localStorage.getItem("DisciplineAcadTimestamp");
        const isCacheValid =
          timestamp && Date.now() - parseInt(timestamp, 10) < 10 * 60 * 1000;
        // 10 min cache
        const cachedDatachange = localStorage.getItem(
          "AdminDisciplineCachechange",
        );
        if (cachedData && isCacheValid && cachedDatachange === "false") {
          setDisciplines(JSON.parse(cachedData));
        } else {
          const token = localStorage.getItem("authToken");
          if (!token) throw new Error("Authorization token not found");

          const data = await fetchDisciplinesData(token);
          setDisciplines(data);
          localStorage.setItem("AdminDisciplineCachechange", "false");

          localStorage.setItem("DisciplineAcad", JSON.stringify(data));
          localStorage.setItem(
            "DisciplineAcadTimestamp",
            Date.now().toString(),
          );
        }
      } catch (error) {
        console.error("Error fetching disciplines: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredDisciplines = disciplines.filter((item) => {
    const disciplineMatch =
      disciplineFilter === "" ||
      item.name.toLowerCase().includes(disciplineFilter.toLowerCase());

    const programMatch =
      programFilter === "" ||
      item.programmes.some((program) =>
        program.name.toLowerCase().includes(programFilter.toLowerCase()),
      );

    return disciplineMatch && programMatch;
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
            Disciplines
          </Button>
        </Flex>
        <hr />

        {/* Scrollable and Larger Table */}
        <Grid>
          {isMobile && (
            <Grid.Col span={12}>
              <ScrollArea>
                <TextInput
                  label="Discipline:"
                  placeholder="Select by Discipline:"
                  value={disciplineFilter}
                  onChange={(e) => setDisciplineFilter(e.target.value)}
                  mt={5}
                />
                <TextInput
                  label="Programme:"
                  placeholder="Select by Programme"
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  mt={5}
                />
                <Button
                  variant="filled"
                  color="blue"
                  radius="sm"
                  style={{ height: "35px", marginTop: "10px" }}
                  onClick={() =>
                    navigate(
                      "/programme_curriculum/acad_admin_add_discipline_form",
                    )
                  }
                >
                  Add Discipline
                </Button>
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
                      Discipline
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
                      Programmes
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        Loading...
                      </td>
                    </tr>
                  ) : filteredDisciplines.length > 0 ? (
                    filteredDisciplines.map((item, index) => (
                      <tr
                        key={item.name}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#fff" : "#15ABFF1C",
                        }}
                      >
                        <td
                          style={{
                            width: "40%",
                            padding: "15px 20px",
                            textAlign: "center",
                            color: "black",
                            borderRight: "1px solid #d3d3d3",
                          }}
                        >
                          {item.name} ({item.acronym})
                        </td>
                        <td
                          style={{
                            width: "40%",
                            padding: "15px 20px",
                            textAlign: "center",
                            color: "black",
                            borderRight: "1px solid #d3d3d3",
                          }}
                        >
                          {item.programmes.map((program, i, array) => (
                            <React.Fragment key={i}>
                              <Anchor
                                component={Link}
                                to={`/programme_curriculum/acad_view?programme=${program.id}`}
                                style={{
                                  color: "#3498db",
                                  textDecoration: "none",
                                  fontSize: "14px",
                                }}
                              >
                                {program.name}
                              </Anchor>
                              {i < array.length - 1 && (
                                <span style={{ margin: "0 10px" }}>|</span>
                              )}
                            </React.Fragment>
                          ))}
                        </td>

                        {/* Edit Button */}
                        <td
                          style={{
                            padding: "15px 20px",
                            textAlign: "center",
                            color: "black",
                            borderRight: "1px solid #d3d3d3",
                          }}
                        >
                          <Link
                            to={`/programme_curriculum/acad_admin_edit_discipline_form/${item.id}`}
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
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        No disciplines found
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
                <TextInput
                  label="Discipline:"
                  placeholder="Select by Discipline:"
                  value={disciplineFilter}
                  onChange={(e) => setDisciplineFilter(e.target.value)}
                  mt={5}
                />
                <TextInput
                  label="Programme:"
                  placeholder="Select by Programme"
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  mt={5}
                />
                <Button
                  variant="filled"
                  color="blue"
                  radius="sm"
                  style={{ height: "35px", marginTop: "10px" }}
                  onClick={() =>
                    navigate(
                      "/programme_curriculum/acad_admin_add_discipline_form",
                    )
                  }
                >
                  Add Discipline
                </Button>
              </ScrollArea>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default DisciplineAcad;
