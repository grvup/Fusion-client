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
} from "@mantine/core";
import axios from "axios"; // Assuming axios is used for API calls
import { useMediaQuery } from "@mantine/hooks";

function AdminViewAllBatches() {
  const [activeTab, setActiveTab] = useState("Batches");
  const [filter, setFilter] = useState({
    name: "",
    discipline: "",
    year: "",
    curriculum: "",
  });
  const [batches, setBatches] = useState([]);
  const [finishedBatches, setFinishedBatches] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Fetch data from the backend
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Replace with actual method to get token

        const response = await axios.get(
          "http://127.0.0.1:8000/programme_curriculum/api/admin_batches/",
          {
            headers: {
              Authorization: `Token ${token}`, // Add the Authorization header
            },
          },
        ); // Replace with actual endpoint
        setBatches(response.data.batches); // Assuming API returns {runningBatches, finishedBatches}
        setFinishedBatches(response.data.finished_batches);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    fetchBatches();
  }, []);
  // console.log(batches)
  // Handle search input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  // Filter logic (can be adjusted based on API response structure)
  const applyFilters = (data) => {
    return data.filter((batch) => {
      return (
        batch.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        batch.discipline
          .toLowerCase()
          .includes(filter.discipline.toLowerCase()) &&
        batch.year.toString().includes(filter.year) &&
        batch.curriculum.toLowerCase().includes(filter.curriculum.toLowerCase())
      );
    });
  };

  const filteredBatches = applyFilters(batches);
  const filteredFinishedBatches = applyFilters(finishedBatches);

  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container style={{ padding: "20px", maxWidth: "100%" }}>
        <Flex justify="flex-start" align="center" mb={10}>
          <Button
            variant={activeTab === "Batches" ? "filled" : "outline"}
            style={{ marginRight: "10px" }}
            onClick={() => setActiveTab("Batches")}
          >
            Batches
          </Button>
          <Button
            variant={activeTab === "Finished Batches" ? "filled" : "outline"}
            style={{ marginRight: "10px" }}
            onClick={() => setActiveTab("Finished Batches")}
          >
            Finished Batches
          </Button>
        </Flex>
        <hr />
        {/* <div className="top-actions">
            <a
              href="/programme_curriculum/acad_admin_add_batch_form"
              style={{ textDecoration: "none" }}
            >
              <Button variant="filled" color="blue">
                Add Batch
              </Button>
            </a>
          </div> */}
        <Grid>
          {isMobile && (
            <Grid.Col span={12}>
              <ScrollArea type="hover">
                {[
                  { label: "Name", name: "name" },
                  { label: "Discipline", name: "discipline" },
                  { label: "Year", name: "year" },
                  { label: "Curriculum", name: "curriculum" },
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
                <a
                  href="/programme_curriculum/acad_admin_add_batch_form"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="filled"
                    color="blue"
                    radius="sm"
                    style={{ height: "35px", marginTop: "10px" }}
                  >
                    Add Batch
                  </Button>
                </a>
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
              {activeTab === "Batches" && (
                <Table
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    flexGrow: 1,
                  }}
                >
                  <thead
                    className="courses-table-header"
                    style={{ backgroundColor: "#b0e0ff" }}
                  >
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
                        Curriculum
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
                    {Array.isArray(filteredBatches) &&
                    filteredBatches.length > 0 ? (
                      filteredBatches.map((batch, index) => (
                        <tr
                          key={index}
                          className="courses-table-row"
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#fff" : "#15ABFF1C",
                          }}
                        >
                          <td
                            style={{
                              padding: "15px 20px",
                              textAlign: "center",
                              color: "black",
                              width: "15%",
                              borderRight: "1px solid #d3d3d3",
                            }}
                          >
                            {batch.name}
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
                            {batch.discipline}
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
                            {batch.year}
                          </td>
                          <td
                            style={{
                              padding: "15px 20px",
                              textAlign: "center",
                              color: "black",
                              width: "35%",
                              borderRight: "1px solid #d3d3d3",
                            }}
                          >
                            <a
                              href={`/programme_curriculum/view_curriculum?curriculum=${batch.id}`}
                              className="course-link"
                              style={{
                                color: "#3498db",
                                textDecoration: "none",
                                fontSize: "14px",
                              }}
                            >
                              {batch.curriculum} &nbsp;v
                              {batch.curriculumVersion}
                            </a>
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
                            <a
                              href={`/programme_curriculum/admin_edit_batch_form?batch=${batch.name}`}
                              className="course-link"
                              style={{ textDecoration: "none" }}
                            >
                              <Button variant="filled" color="green">
                                Edit
                              </Button>
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No batches found</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}

              {activeTab === "Finished Batches" && (
                <Table
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    flexGrow: 1,
                  }}
                >
                  <thead
                    className="courses-table-header"
                    style={{ backgroundColor: "#b0e0ff" }}
                  >
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
                        Curriculum
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
                    {Array.isArray(filteredFinishedBatches) &&
                    filteredFinishedBatches.length > 0 ? (
                      filteredFinishedBatches.map((batch, index) => (
                        <tr
                          key={index}
                          className="courses-table-row"
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#fff" : "#15ABFF1C",
                          }}
                        >
                          <td
                            style={{
                              padding: "15px 20px",
                              textAlign: "center",
                              color: "black",
                              width: "15%",
                              borderRight: "1px solid #d3d3d3",
                            }}
                          >
                            {batch.name}
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
                            {batch.discipline}
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
                            {batch.year}
                          </td>
                          <td
                            style={{
                              padding: "15px 20px",
                              textAlign: "center",
                              color: "black",
                              width: "35%",
                              borderRight: "1px solid #d3d3d3",
                            }}
                          >
                            <a
                              href={`/programme_curriculum/view_curriculum?curriculum=${batch.id}`}
                              className="course-link"
                              style={{ textDecoration: "none" }}
                            >
                              {batch.curriculum} &nbsp;v
                              {batch.curriculumVersion}
                            </a>
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
                            <a
                              href={`/programme_curriculum/admin_edit_batch_form?batch=${batch.name}`}
                              className="course-link"
                              style={{ textDecoration: "none" }}
                            >
                              <Button variant="filled" color="green">
                                Edit
                              </Button>
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No batches found</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </div>
          </Grid.Col>
          {!isMobile && (
            <Grid.Col span={3}>
              <ScrollArea type="hover">
                {[
                  { label: "Name", name: "name" },
                  { label: "Discipline", name: "discipline" },
                  { label: "Year", name: "year" },
                  { label: "Curriculum", name: "curriculum" },
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
                <a
                  href="/programme_curriculum/acad_admin_add_batch_form"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="filled"
                    color="blue"
                    radius="sm"
                    style={{ height: "35px", marginTop: "10px" }}
                  >
                    Add Batch
                  </Button>
                </a>
              </ScrollArea>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default AdminViewAllBatches;
