import React, { useState, useEffect } from "react";
import { Table, Anchor, Container, Flex, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { fetchDisciplinesData } from "../api/api";

function DisciplineStud() {
  const [disciplines, setDisciplines] = useState([]); // State to hold discipline data
  const [loading, setLoading] = useState(true); // Loading state for the API call

  // Fetch data from the API
  useEffect(() => {
    const loadDisciplines = async () => {
      try {
        const data = await fetchDisciplinesData();
        setDisciplines(data);
      } catch (err) {
        console.error("Error loading disciplines:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDisciplines();
  }, []);

  return (
    <Container
      style={{
        borderRadius: "8px",
        marginLeft: "0",
        width: "100vw",
      }}
    >
      {/* Align Discipline Heading */}
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "20px" }}
      >
        {/* Discipline Heading */}
        <Button variant="filled" style={{ marginTop: "20px" }}>
          Discipline
        </Button>
      </Flex>

      {/* Scrollable and Larger Table */}
      <Flex style={{ width: "85vw", display: "flex" }}>
        <Table
          highlightOnHover
          verticalSpacing="sm"
          style={{
            width: "65vw",
            border: "2px solid #1e90ff",
            borderRadius: "8px", // Optional: rounded corners for the table
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#15ABFF54" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Discipline</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Programmes</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : disciplines.length > 0 ? (
              disciplines.map((item, index) => (
                <tr
                  key={item.name}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#15ABFF1C",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#15ABFF1C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "#fff" : "#15ABFF1C";
                  }}
                >
                  <td
                    style={{ padding: "10px", borderRight: "1px solid black" }}
                  >
                    {item.name} ({item.acronym})
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.programmes.map((program, i, array) => (
                      <React.Fragment key={i}>
                        <Anchor
                          component={Link}
                          to={`/programme_curriculum/curriculums/${program.id}`}
                          style={{
                            marginRight: "10px",
                            color: "#1e90ff",
                            textDecoration: "underline",
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
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No disciplines found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Flex>
    </Container>
  );
}

export default DisciplineStud;
