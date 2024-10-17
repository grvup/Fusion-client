import React from "react";
import { Table, Anchor, Container, Button, Flex } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
// import './Admin_view_all_courses.css';

// Updated discipline data
const disciplineData = [
  {
    discipline: "Computer Science and Engineering (CSE)",
    programs: [
      { label: "M.Tech CSE", link: "/acad_curriculum/discipline/mtech-cse" },
      { label: "PhD in CSE", link: "/acad_curriculum/discipline/phd-cse" },
      { label: "B.Tech CSE", link: "/acad_curriculum/discipline/btech-cse" },
    ],
  },
  {
    discipline: "Mechanical Engineering (ME)",
    programs: [
      { label: "M.Tech ME", link: "/acad_curriculum/discipline/mtech-me" },
      { label: "PhD in ME", link: "/acad_curriculum/discipline/phd-me" },
      { label: "B.Tech ME", link: "/acad_curriculum/discipline/btech-me" },
    ],
  },
  {
    discipline: "Electronics and Communication Engineering (ECE)",
    programs: [
      { label: "M.Tech ECE", link: "/acad_curriculum/discipline/mtech-ece" },
      { label: "PhD in ECE", link: "/acad_curriculum/discipline/phd-ece" },
      { label: "B.Tech ECE", link: "/acad_curriculum/discipline/btech-ece" },
    ],
  },
  {
    discipline: "Mechatronics (MT)",
    programs: [
      {
        label: "M.Tech Mechatronics",
        link: "/acad_curriculum/discipline/mtech-mechatronics",
      },
    ],
  },
  {
    discipline: "Design (Des.)",
    programs: [
      { label: "B.Design", link: "/acad_curriculum/discipline/bdesign" },
      {
        label: "PhD in Design",
        link: "/acad_curriculum/discipline/phd-design",
      },
      {
        label: "M.Des Design",
        link: "/acad_curriculum/discipline/mdes-design",
      },
    ],
  },
  {
    discipline: "Natural Sciences-Mathematics (Maths)",
    programs: [
      { label: "PhD in Maths", link: "/acad_curriculum/discipline/phd-maths" },
    ],
  },
  {
    discipline: "Natural Sciences-Physics (Physics)",
    programs: [
      {
        label: "PhD in Physics",
        link: "/acad_curriculum/discipline/phd-physics",
      },
    ],
  },
  {
    discipline: "Humanities - English (English)",
    programs: [
      {
        label: "PhD in English",
        link: "/acad_curriculum/discipline/phd-english",
      },
    ],
  },
  {
    discipline: "Smart Manufacturing (SM)",
    programs: [
      { label: "M.Tech SM", link: "/acad_curriculum/discipline/mtech-sm" },
      { label: "B.Tech SM", link: "/acad_curriculum/discipline/btech-sm" },
    ],
  },
];

function DisciplineAcad() {
  const navigate = useNavigate(); // Hook to navigate between routes

  return (
    <Container
      style={{
        // marginTop: "20px",
        // padding: "20px",
        // backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        marginLeft: "0",
        width: "100vw",
      }}
    >
      <nav className="breadcrumbs">
        <span>Program and Curriculum</span>
        <span>Curriculums</span>
        <span>CSE UG Curriculum</span>
      </nav>

      {/* Options Section */}
      <div className="program-options">
        <p>Programmes</p>
        <p>Curriculums</p>
        <p>Courses</p>
        <p className="active">disciplines</p>
        <p>batches</p>
      </div>

      {/* Align Discipline Heading and Add Discipline Button in a single row */}
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "20px" }}
      >
        {/* Discipline Heading */}
        <h2 style={{ fontSize: "24px", textAlign: "left" }}>Discipline</h2>

        {/* Add Discipline Button */}
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
              <th style={{ padding: "10px", textAlign: "center" }}>
                Action
              </th>{" "}
              {/* Added for Edit Button */}
            </tr>
          </thead>
          <tbody>
            {disciplineData.map((item, index) => (
              <tr
                key={item.discipline}
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
                  {item.discipline}
                </td>
                <td
                  style={{
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    borderRight: "1px solid black",
                  }}
                >
                  {item.programs.map((program, i, array) => (
                    <React.Fragment key={i}>
                      <Anchor
                        component={Link}
                        to={`/programme_curriculum/acad_view?programme=${program.label}`}
                        style={{
                          marginRight: "10px",
                          color: "#1e90ff",
                          textDecoration: "underline",
                        }}
                      >
                        {program.label}
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
                    href={`/programme_curriculum/acad_admin_edit_discipline_form?discipline=${
                      item.discipline
                    }`}
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
            ))}
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
