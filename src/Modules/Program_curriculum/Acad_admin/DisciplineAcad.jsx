import React, { useState, useEffect } from "react";
import { Table, Anchor, Container, Button, Flex } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // For making API requests

function DisciplineAcad() {
  const [disciplines, setDisciplines] = useState([]); // State to hold discipline data
  const [loading, setLoading] = useState(true); // Loading state for the API call
  const navigate = useNavigate(); // Hook to navigate between routes

  // Fetch data from the API
  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Replace with actual method to get token
        const response = await axios.get(
          "http://127.0.0.1:8000/programme_curriculum/api/admin_disciplines/",
          {
            headers: {
              Authorization: `Token ${token}`,  // Add the Authorization header
            },
          }
        );
        setDisciplines(response.data.disciplines); // Set the data into state
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching disciplines: ", error);
        setLoading(false); // Set loading to false if there is an error
      }
    };

    fetchDisciplines(); // Trigger data fetch
  }, []);

  return (
    <Container
      style={{
        borderRadius: "8px",
        marginLeft: "0",
        width: "100vw",
      }}
    >
      {/* Header and Button */}
      <Flex justify="space-between" align="center" style={{ marginTop: "20px" }} mb={20}>
        <Button variant="filled" style={{ marginRight: "10px" }}>
          Disciplines
        </Button>
      </Flex>

      {/* Scrollable and Larger Table */}
      <Flex style={{ width: "85vw", display: "flex" }}>
        <Table
          highlightOnHover
          verticalSpacing="sm"
          style={{
            width: "65vw", // Make the table larger by using full width
            border: "2px solid #1e90ff", // Added blue border
            borderRadius: "8px", // Optional: rounded corners for the table
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#15ABFF54" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Discipline</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Programmes</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
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
                  <td style={{ padding: "10px", borderRight: "1px solid black" }}>
                    {item.name} ({item.acronym})
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      display: "flex",
                      alignItems: "center",
                      borderRight: "1px solid black",
                    }}
                  >
                    {item.programmes.map((program, i, array) => (
                      <React.Fragment key={i}>
                        <Anchor
                          component={Link}
                          to={`/programme_curriculum/acad_view?programme=${program.id}`}
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

                  {/* Edit Button */}
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <a
                      href={`/programme_curriculum/acad_admin_edit_discipline_form?discipline=${item.name}`}
                    >
                      <Button
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          padding: "5px 10px",
                        }}
                      >
                        EDIT
                      </Button>
                    </a>
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

        <Button
          style={{
            backgroundColor: "#007bff",
            color: "white",
            width: "15vw",
            marginLeft: "1.5vw",
          }}
          onClick={() =>
            navigate("/programme_curriculum/acad_admin_add_discipline_form")
          }
        >
          ADD DISCIPLINE
        </Button>
      </Flex>
    </Container>
  );
}

export default DisciplineAcad;
