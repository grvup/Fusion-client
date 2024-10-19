import React, { useState } from "react";
import {
  MantineProvider,
  Table,
  Flex,
  Container,
  Text,
  Button,
} from "@mantine/core";

// Sample data for all programmes and disciplines
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
  { programme: "PhD in Physics", discipline: "Natural Sciences-Physics" },
  { programme: "PhD in Maths", discipline: "Natural Sciences-Mathematics" },
  { programme: "PhD in English", discipline: "Humanities - English" },
  { programme: "PhD in Design", discipline: "Design" },
];

function renderTable(data) {
  return data.map((element, index) => (
    <tr
      key={element.programme}
      style={{ backgroundColor: index % 2 === 0 ? "#E6F7FF" : "#ffffff" }}
    >
      <td
        style={{
          padding: "15px 20px",
          textAlign: "center",
          color: "#3498db",
          width: "33%",
          borderRight: "1px solid #d3d3d3",
        }}
      >
        <a
            href={`/programme_curriculum/curriculums?programme=${encodeURIComponent(
              element.programme,
            )}`}
            style={{ color: "#3498db", textDecoration: "none" }}
          >
            {element.programme}
          </a>
      </td>
      <td
        style={{
          padding: "15px 20px",
          textAlign: "left",
          width: "67%",
          borderRight: "1px solid #d3d3d3",
        }}
      >
        {element.discipline}
      </td>
    </tr>
  ));
}

function View_all_programmes() {
  const [activeSection, setActiveSection] = useState("ug"); // Default to UG

  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container
        style={{ padding: "20px", minHeight: "100vh", maxWidth: "100%" }}
      >
       

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
                        width: "33%",
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
                        width: "67%",
                      }}
                    >
                      Discipline
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
                        width: "33%",
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
                        width: "67%",
                      }}
                    >
                      Discipline
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
                        width: "33%",
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
                        width: "67%",
                      }}
                    >
                      Discipline
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTable(phdData)}</tbody>
              </Table>
            )}
          </div>
        </Flex>
      </Container>
    </MantineProvider>
  );
}

export default View_all_programmes;
