import React from "react";
import { Table, Anchor, ScrollArea, Container } from "@mantine/core";
import { Link } from "react-router-dom";
import "./Faculty_view_all_courses.css";

// Initial discipline data
const disciplineData = [
  {
    discipline: "Computer Science and Engineering",
    programs: [
      {
        label: "M.Tech CSE",
        link: "/programme_curriculum/discipline/mtech-cse",
      },
      { label: "PhD in CSE", link: "/programme_curriculum/discipline/phd-cse" },
      {
        label: "B.Tech CSE",
        link: "/programme_curriculum/discipline/btech-cse",
      },
    ],
  },
  {
    discipline: "Mechanical Engineering",
    programs: [
      { label: "M.Tech ME", link: "/programme_curriculum/discipline/mtech-me" },
      { label: "PhD in ME", link: "/programme_curriculum/discipline/phd-me" },
      { label: "B.Tech ME", link: "/programme_curriculum/discipline/btech-me" },
    ],
  },
  {
    discipline: "Electronics and Communication Engineering",
    programs: [
      {
        label: "M.Tech ECE",
        link: "/programme_curriculum/discipline/mtech-ece",
      },
      { label: "PhD in ECE", link: "/programme_curriculum/discipline/phd-ece" },
      {
        label: "B.Tech ECE",
        link: "/programme_curriculum/discipline/btech-ece",
      },
    ],
  },
  {
    discipline: "Mechatronics",
    programs: [
      {
        label: "M.Tech Mechatronics",
        link: "/programme_curriculum/discipline/mtech-mechatronics",
      },
    ],
  },
  {
    discipline: "Design",
    programs: [
      { label: "B.Design", link: "/programme_curriculum/discipline/bdesign" },
      {
        label: "PhD in Design",
        link: "/programme_curriculum/discipline/phd-design",
      },
      {
        label: "M.Des Design",
        link: "/programme_curriculum/discipline/mdes-design",
      },
    ],
  },
  {
    discipline: "Natural Sciences-Mathematics",
    programs: [
      {
        label: "PhD in Maths",
        link: "/programme_curriculum/discipline/phd-maths",
      },
    ],
  },
  {
    discipline: "Natural Sciences-Physics",
    programs: [
      {
        label: "PhD in Physics",
        link: "/programme_curriculum/discipline/phd-physics",
      },
    ],
  },
  {
    discipline: "Humanities - English",
    programs: [
      {
        label: "PhD in English",
        link: "/programme_curriculum/discipline/phd-english",
      },
    ],
  },
  {
    discipline: "Smart Manufacturing",
    programs: [
      { label: "M.Tech SM", link: "/programme_curriculum/discipline/mtech-sm" },
      { label: "B.Tech SM", link: "/programme_curriculum/discipline/btech-sm" },
    ],
  },
];

// Component starts here
function Discipline() {
  return (
    <Container
      style={{
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        marginLeft: "0",
        width: "100%",
      }}
    >
      {" "}
      {/* Full width and no left margin */}
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
      <h2 style={{ fontSize: "24px", textAlign: "left", marginBottom: "20px" }}>
        {" "}
        {/* Aligned to left */}
        Discipline
      </h2>
      {/* Scrollable Table */}
      <ScrollArea>
        <Table
          highlightOnHover
          verticalSpacing="sm"
          style={{
            border: "2px solid #1e90ff", // Added blue border
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
                <td style={{ padding: "10px" }}>{item.discipline}</td>
                <td
                  style={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.programs.map((program, i, array) => (
                    <React.Fragment key={i}>
                      <Anchor
                        component={Link}
                        to={`/programme_curriculum/faculty_view/${program.id}`}
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
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
}

export default Discipline;
