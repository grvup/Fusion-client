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
import { Link } from "react-router-dom";
import { fetchDisciplinesData } from "../api/api";

function DisciplineStud() {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for filters
  const [disciplineFilter, setDisciplineFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const loadDisciplines = async () => {
      try {
        const cachedData = localStorage.getItem("disciplinesCache");
        const timestamp = localStorage.getItem("disciplinesTimestamp");
        const isCacheValid =
          timestamp && Date.now() - parseInt(timestamp, 10) < 10 * 60 * 1000;
        // 10 min cache

        if (cachedData && isCacheValid) {
          setDisciplines(JSON.parse(cachedData) || []);
        } else {
          const data = await fetchDisciplinesData();
          setDisciplines(data);

          localStorage.setItem("disciplinesCache", JSON.stringify(data));
          localStorage.setItem("disciplinesTimestamp", Date.now().toString());
        }
      } catch (err) {
        console.error("Error loading disciplines:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDisciplines();
  }, []);

  // Filtered disciplines based on user input
  const filteredDisciplines = disciplines.filter((item) => {
    const disciplineMatch = item.name
      .toLowerCase()
      .includes(disciplineFilter.toLowerCase());
    const programMatch = item.programmes.some((program) =>
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
            Discipline
          </Button>
        </Flex>
        <hr />
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
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                        }}
                      >
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
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        <td
                          style={{
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
                            padding: "15px 20px",
                            textAlign: "center",
                            color: "#3498db",
                          }}
                        >
                          {item.programmes.map((program, i, array) => (
                            <React.Fragment key={i}>
                              <Anchor
                                component={Link}
                                to={`/programme_curriculum/curriculums/${program.id}`}
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "black",
                        }}
                      >
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
              </ScrollArea>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default DisciplineStud;
