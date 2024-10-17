import React, { useState } from "react";
import {
  MantineProvider,
  Table,
  Flex,
  Container,
  Text,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";

// Data for all programmes and disciplines
const ugData = [
  { programme: "B.Tech ME", discipline: "Mechanical Engineering" },
  { programme: "B.Design", discipline: "Design" },
  { programme: "B.Tech CSE", discipline: "Computer Science and Engineering" },
  {
    programme: "B.Tech ECE",
    discipline: "Electronics and Communication Engineering",
  },
  { programme: "B.Tech SM", discipline: "Smart Manufacturing" },
];

const pgData = [
  { programme: "M.Tech CSE", discipline: "Computer Science and Engineering" },
  {
    programme: "M.Tech ECE",
    discipline: "Electronics and Communication Engineering",
  },
  { programme: "M.Tech ME", discipline: "Mechanical Engineering" },
  { programme: "M.Tech Mechatronics", discipline: "Mechatronics" },
  { programme: "M.Des Design", discipline: "Design" },
  { programme: "M.Tech SM", discipline: "Smart Manufacturing" },
];

const phdData = [
  { programme: "PhD in CSE", discipline: "Computer Science and Engineering" },
  {
    programme: "PhD in ECE",
    discipline: "Electronics and Communication Engineering",
  },
  { programme: "PhD in ME", discipline: "Mechanical Engineering" },
  { programme: "PhD in Physics", discipline: "Natural Sciences - Physics" },
  { programme: "PhD in Maths", discipline: "Natural Sciences - Mathematics" },
  { programme: "PhD in English", discipline: "Humanities - English" },
  { programme: "PhD in Design", discipline: "Design" },
];

function AdminViewProgrammes() {
  const [activeSection, setActiveSection] = useState("ug"); // Default section

  // Function to render the table
  const renderTable = (data) => {
    return data.map((element, index) => (
      <tr
        key={element.programme}
        style={{
          backgroundColor: index % 2 === 0 ? "#E6F7FF" : "#ffffff",
        }}
      >
        <td
          style={{
            padding: "15px 20px",
            textAlign: "center",
            color: "#3498db",
            borderRight: "1px solid #d3d3d3",
            width: "25%",
          }}
        >
          <Link
            to={`/programme_curriculum/acad_view?programme=${encodeURIComponent(
              element.programme,
            )}`}
            style={{ color: "#3498db", textDecoration: "none" }}
          >
            {element.programme}
          </Link>
        </td>
        <td
          style={{
            padding: "15px 20px",
            textAlign: "left",
            borderRight: "1px solid #d3d3d3",
            width: "50%",
          }}
        >
          {element.discipline}
        </td>
        <td
          style={{
            padding: "15px 20px",
            textAlign: "center",
            width: "25%",
          }}
        >
          <Link
            to={`/programme_curriculum/admin_edit_programme_form?programme=${encodeURIComponent(
              element.programme,
            )}`}
          >
            <Button variant="filled" color="green" radius="md">
              EDIT
            </Button>
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <MantineProvider theme={{ colorScheme: "light" }} withGlobalStyles>
      <Container
        style={{ padding: "20px", minHeight: "100vh", maxWidth: "100%" }}
      >
        {/* Breadcrumb Section */}
        <Flex justify="flex-start" align="center" mb={20}>
          <Text size="md" weight={500} style={{ color: "#2C3E50" }}>
            Program and Curriculum &gt; Programmes
          </Text>
        </Flex>

        {/* Buttons for Section Selection */}
        <Flex mb={20}>
          <Button
            variant={activeSection === "ug" ? "filled" : "outline"}
            onClick={() => setActiveSection("ug")}
            style={{ marginRight: "10px" }}
          >
            UG: Undergraduate
          </Button>
          <Button
            variant={activeSection === "pg" ? "filled" : "outline"}
            onClick={() => setActiveSection("pg")}
            style={{ marginRight: "10px" }}
          >
            PG: Post Graduate
          </Button>
          <Button
            variant={activeSection === "phd" ? "filled" : "outline"}
            onClick={() => setActiveSection("phd")}
          >
            PhD: Doctor of Philosophy
          </Button>
        </Flex>

        {/* Table Section */}
        <Flex justify="space-between" align="flex-start" mb={20}>
          <div style={{ flexGrow: 1 }}>
            {/* Conditional Rendering of Tables based on Active Section */}
            {activeSection === "ug" && (
              <Table
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #d3d3d3",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Programme
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "50%",
                      }}
                    >
                      Discipline
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTable(ugData)}</tbody>
              </Table>
            )}
            {activeSection === "pg" && (
              <Table
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #d3d3d3",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Programme
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "50%",
                      }}
                    >
                      Discipline
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTable(pgData)}</tbody>
              </Table>
            )}
            {activeSection === "phd" && (
              <Table
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #d3d3d3",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Programme
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "50%",
                      }}
                    >
                      Discipline
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#C5E2F6",
                        color: "#3498db",
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTable(phdData)}</tbody>
              </Table>
            )}
          </div>

          {/* Add Programme Button */}
          <Link to="/programme_curriculum/acad_admin_add_programme_form">
            <Button
              variant="filled"
              color="blue"
              radius="md"
              style={{ marginLeft: "20px", height: "45px" }}
            >
              ADD PROGRAMME
            </Button>
          </Link>
        </Flex>
      </Container>
    </MantineProvider>
  );
}

export default AdminViewProgrammes;
