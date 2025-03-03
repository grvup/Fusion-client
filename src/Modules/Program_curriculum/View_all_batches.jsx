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
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { fetchBatchesData } from "./api/api";

function Batches() {
  const [activeTab, setActiveTab] = useState("Batches");
  const [filter, setFilter] = useState({
    name: "",
    discipline: "",
    year: "",
    curriculum: "",
  });
  // const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const [finishedBatches, setFinishedBatches] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const loadBatches = async () => {
      try {
        const cachedData = localStorage.getItem("batchesCache");
        const timestamp = localStorage.getItem("batchesTimestamp");
        const isCacheValid =
          timestamp && Date.now() - parseInt(timestamp, 10) < 10 * 60 * 1000;
        // 10 min cache

        if (cachedData && isCacheValid) {
          const data = JSON.parse(cachedData);
          setBatches(data.runningBatches || []);
          setFinishedBatches(data.finishedBatches || []);
        } else {
          const data = await fetchBatchesData();
          setBatches(data.runningBatches || []);
          setFinishedBatches(data.finishedBatches || []);

          localStorage.setItem("batchesCache", JSON.stringify(data));
          localStorage.setItem("batchesTimestamp", Date.now().toString());
        }
      } catch (err) {
        console.error("Error loading batches:", err);
      }
    };

    loadBatches();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

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
            onClick={() => setActiveTab("Batches")}
            style={{ marginRight: "10px" }}
          >
            Batches
          </Button>
          <Button
            variant={activeTab === "Finished Batches" ? "filled" : "outline"}
            onClick={() => setActiveTab("Finished Batches")}
            style={{ marginRight: "10px" }}
          >
            Finished Batches
          </Button>
        </Flex>
        <hr />

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
                    {["Name", "Discipline", "Year", "Curriculum"].map(
                      (header, index) => (
                        <th
                          key={index}
                          style={{
                            padding: "15px 20px",
                            backgroundColor: "#C5E2F6",
                            color: "#3498db",
                            fontSize: "16px",
                            textAlign: "center",
                            borderRight: "1px solid #d3d3d3",
                          }}
                        >
                          {header}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === "Batches"
                    ? filteredBatches
                    : filteredFinishedBatches
                  ).map((batch, index) => (
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
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        {batch.year}
                      </td>
                      <td
                        style={{
                          padding: "15px 20px",
                          textAlign: "center",
                          color: "#3498db",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        <Link
                          to={`/programme_curriculum/stud_curriculum_view/${batch.id}`}
                          style={{
                            color: "#3498db",
                            textDecoration: "none",
                            fontSize: "14px",
                          }}
                        >
                          {batch.curriculum}
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
              </ScrollArea>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default Batches;
