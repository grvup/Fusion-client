import { Table } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Acad_admin/Admin_view_semesters_of_a_curriculum.css";
import { fetchSemestersOfCurriculumData } from "./api/api";

function ViewSemesterOfACurriculum() {
  // State to hold curriculum data
  const { id } = useParams();
  const [curriculum, setCurriculum] = useState(null); // Initially, no data

  // Fetch curriculum data from the backend
  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const data = await fetchSemestersOfCurriculumData(id);
        setCurriculum(data); // Store the fetched data in the state
      } catch (fetchError) {
        console.error("Error fetching curriculum data:", fetchError);
      }
    };

    fetchCurriculum();
  }, [id]);

  if (!curriculum) {
    // Render a loading message until the data is fetched
    return <div>Loading curriculum data...</div>;
  }

  // Use the fetched curriculum data to populate the table
  return (
    <div style={{ position: "relative" }}>
      <h2>{curriculum.name} Table</h2>

      <Table
        striped
        highlightOnHover
        style={{
          borderCollapse: "collapse",
          textAlign: "center",
          width: "100%",
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
                    <span key={index}>{batch}&nbsp;&nbsp;&nbsp;</span>
                  ))}
                </h4>
              </td>
            </tr>
          )}
          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }} />
            {curriculum.semesters.map((semester, index) => (
              <td key={index} style={{ border: "1px solid black" }}>
                <a
                  href={`/programme_curriculum/stud_semester_info/${semester.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <strong style={{ color: "blue", fontSize: "0.85vw" }}>
                    Semester {semester.semester_no}
                  </strong>
                </a>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {curriculum.semester_slots.map((slotRow, slotIndex) => (
            <tr key={slotIndex} style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }} />
              {curriculum.semesters.map((semester, index) => (
                <td key={index} style={{ border: "1px solid black" }}>
                  {slotRow[index] &&
                  slotRow[index].name &&
                  slotRow[index].courses.length ? (
                    <div>
                      {slotRow[index].courses.map((course, courseIndex) => (
                        <a
                          href={`/programme_curriculum/stud_course_slot_details/${slotRow[index].id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <p key={courseIndex}>
                            <strong style={{ fontSize: "0.65vw" }}>
                              {course.name}
                            </strong>
                            <br />
                            (L: {course.lecture_hours}, T:{" "}
                            {course.tutorial_hours}, C: {course.credit})
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
            {curriculum.semesters.map((semester, index) => (
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
            {curriculum.semesters.map((semester, index) => (
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
            {curriculum.semester_credits.map((totalCredits, index) => (
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
            {curriculum.semesters.map((semester, index) => (
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
