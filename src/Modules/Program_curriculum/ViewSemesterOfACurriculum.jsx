import { Table } from "@mantine/core";
import React, { useState } from "react";
import "./Acad_admin/Admin_view_semesters_of_a_curriculum.css";

function ViewSemesterOfACurriculum() {
  // Demo data (matches the example layout)
  const curriculum = {
    name: "CSE UG Curriculum",
    no_of_semester: 8,
    batches: ["2020", "2021"],
  };

  const semesters = [
    {
      semester_no: 1,
      start_semester: "2023-08-01",
      end_semester: "2023-12-15",
      instigate_semester: true,
    },
    {
      semester_no: 2,
      start_semester: "2024-01-10",
      end_semester: "2024-05-15",
      instigate_semester: false,
    },
    {
      semester_no: 3,
      start_semester: null,
      end_semester: null,
      instigate_semester: false,
    },
    {
      semester_no: 4,
      start_semester: null,
      end_semester: null,
      instigate_semester: false,
    },
    {
      semester_no: 5,
      start_semester: "2023-08-01",
      end_semester: "2023-12-15",
      instigate_semester: true,
    },
    {
      semester_no: 6,
      start_semester: "2024-01-10",
      end_semester: "2024-05-15",
      instigate_semester: false,
    },
    {
      semester_no: 7,
      start_semester: null,
      end_semester: null,
      instigate_semester: false,
    },
    {
      semester_no: 8,
      start_semester: null,
      end_semester: null,
      instigate_semester: false,
    },
  ];

  const semester_slots = [
    [
      {
        name: "Slot A",
        courses: [
          {
            name: "Mathematics",
            lecture_hours: 3,
            tutorial_hours: 1,
            credit: 4,
          },
        ],
      },
      {
        name: "Slot B",
        courses: [
          { name: "Physics", lecture_hours: 3, tutorial_hours: 1, credit: 4 },
        ],
      },
      {
        name: "Slot A",
        courses: [
          { name: "Chemistry", lecture_hours: 3, tutorial_hours: 1, credit: 4 },
        ],
      },
      { name: "", courses: [] }, // Empty slot example
    ],
    [
      {
        name: "Slot A",
        courses: [
          { name: "Chemistry", lecture_hours: 3, tutorial_hours: 1, credit: 4 },
        ],
      },
      {
        name: "Slot B",
        courses: [
          { name: "Chemistry", lecture_hours: 3, tutorial_hours: 1, credit: 4 },
        ],
      },
      {
        name: "Slot A",
        courses: [
          { name: "Chemistry", lecture_hours: 3, tutorial_hours: 1, credit: 4 },
        ],
      },
      {
        name: "Slot C",
        courses: [
          {
            name: "Electronics",
            lecture_hours: 3,
            tutorial_hours: 1,
            credit: 4,
          },
        ],
      },
      { name: "", courses: [] },
      { name: "", courses: [] },
    ],
    [
      {
        name: "Slot A",
        courses: [
          { name: "Chemistry", lecture_hours: 3, tutorial_hours: 1, credit: 4 },
        ],
      },
    ],
    [
      {
        name: "Slot A",
        courses: [
          { name: "Chemistry", lecture_hours: 3, tutorial_hours: 1, credit: 4 },
        ],
      },
    ],
    [
      {
        name: "Slot A",
        courses: [
          { name: "Chemistry", lecture_hours: 3, tutorial_hours: 1, credit: 4 },
        ],
      },
    ],

    // Add more slots for each semester
  ];

  const semester_credits = [19, 20, 21, 22, 19, 20, 21, 22]; // Example total credits for each semester
  const semesterscnt = [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6",
    "Semester 7",
    "Semester 8",
  ];

  // State to manage hover effect and option visibility
  const [isHovered, setIsHovered] = useState(false);
  const [isAddCourseSlotHovered, setIsAddCourseSlotHovered] = useState(false);
  const [isInstigateSemesterHovered, setIsInstigateSemesterHovered] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      {/* <nav className="breadcrumbs">
        <span>Program and Curriculum</span>
        <span>Curriculums</span>
        <span>CSE UG Curriculum</span>
      </nav> */}

      {/* Options Section */}
      {/* <div className="program-options">
        <p>Programmes</p>
        <p className="active">Curriculums</p>
        <p>Courses</p>
        <p>disciplines</p>
        <p>batches</p>
      </div> */}
      <h2>{curriculum.name} Table</h2>

      <Table
        striped
        highlightOnHover
        style={{
          borderCollapse: "collapse",
          textAlign: "center",
          width: isHovered ? "calc(100% - 15vw)" : "100%", // Shrink table width when hovered
          transition: "width 0.3s ease", // Smooth transition
        }}
      >
        <thead>
          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }} />
            <td
              colSpan={curriculum.no_of_semester}
              style={{ border: "1px solid black" }}
            >
              <h2>{curriculum.name}</h2>
            </td>
          </tr>
          {curriculum.batches.length > 0 && (
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }} />
              <td
                colSpan={curriculum.no_of_semester}
                style={{ border: "1px solid black" }}
              >
                <h4>
                  Batches:&nbsp;&nbsp;&nbsp;
                  {curriculum.batches.map((batch, index) => (
                    <span key={index}>{batch},&nbsp;&nbsp;&nbsp;</span>
                  ))}
                </h4>
              </td>
            </tr>
          )}
          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }} />
            {semesters.map((semester, index) => (
              <td key={index} style={{ border: "1px solid black" }}>
                <a href={`/programme_curriculum/stud_semester_info/?semester=${ semester.semester_no}`}  style={{textDecoration:'none'}}>

                <strong style={{ color: "blue", fontSize: "0.85vw" }}>
                  Semester {semester.semester_no}
                </strong>
                </a>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {semester_slots.map((slotRow, slotIndex) => (
            <tr key={slotIndex} style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }} />
              {semesters.map((semester, index) => (
                <td key={index} style={{ border: "1px solid black" }}>
                  {slotRow[index] &&
                  slotRow[index].name &&
                  slotRow[index].courses.length ? (
                    <div>
                      {slotRow[index].courses.map((course, courseIndex) => (
                        <a href={`/programme_curriculum/stud_course_slot_details/?courseslot=${ course.name}`} style={{textDecoration:'none'}}>

                        <p key={courseIndex}>
                          <strong style={{ fontSize: "0.65vw" }}>
                            {course.name}
                          </strong>{" "}
                          <br />
                          (L: {course.lecture_hours}, T: {course.tutorial_hours}
                          , C: {course.credit})
                        </p>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div />
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }}>
              <strong style={{ color: "blue", fontSize: "0.75vw" }}>
                Start Date
              </strong>
            </td>
            {semesters.map((semester, index) => (
              <td key={index} style={{ border: "1px solid black" }}>
                {semester.start_semester || "N/A"}
              </td>
            ))}
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }}>
              <strong style={{ color: "blue", fontSize: "0.75vw" }}>
                End Date
              </strong>
            </td>
            {semesters.map((semester, index) => (
              <td key={index} style={{ border: "1px solid black" }}>
                {semester.end_semester || "N/A"}
              </td>
            ))}
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }}>
              <strong style={{ color: "blue", fontSize: "0.75vw" }}>
                Total Credits
              </strong>
            </td>
            {semester_credits.map((totalCredits, index) => (
              <td key={index} style={{ border: "1px solid black" }}>
                {totalCredits}
              </td>
            ))}
          </tr>
          <tr style={{ border: "1px solid black", padding: "0.75vw 45%" }}>
            <td style={{ border: "1px solid black" }}>
              <strong style={{ color: "blue", fontSize: "0.75vw" }}>
                Instigated
              </strong>
            </td>
            {semesters.map((semester, index) => (
              <td key={index} style={{ border: "1px solid black" }}>
                {semester.instigate_semester ? (
                  <div style={{ color: "green" }}>
                    <i className="icon checkmark" /> Yes
                  </div>
                ) : (
                  <div style={{ color: "red" }}>
                    <i className="attention icon" /> Not Yet
                  </div>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ViewSemesterOfACurriculum;
