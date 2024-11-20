import React, { useState, useEffect } from "react";
import { Container, Button, Table, Flex } from "@mantine/core";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { studentFetchSemesterData } from "../api/api";

export default function StudSemesterInfo({ curriculum }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [semesterData, setSemesterData] = useState(null);
  const [courseSlots, setCourseSlots] = useState([]);

  useEffect(() => {
    const getSemesterData = async () => {
      try {
        const data = await studentFetchSemesterData(id);
        setSemesterData(data.semester);
        setCourseSlots(data.semester.course_slots);
      } catch (error) {
        console.error("Error fetching semester data:", error);
      }
    };

    getSemesterData();
  }, [id]);

  const renderCourseTables = (data) =>
    data.map((slot) => (
      <Table
        key={slot.id}
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid #d3d3d3",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th
              colSpan="4"
              style={{
                padding: "15px 20px",
                backgroundColor: "#F9F9F9",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.25rem",
                borderBottom: "1px solid #d3d3d3",
              }}
            >
              {slot.name || "NS1"}
            </th>
          </tr>
          <tr>
            <th
              colSpan="4"
              style={{
                padding: "15px 20px",
                backgroundColor: "#F9F9F9",
                textAlign: "center",
                fontWeight: "bold",
                borderBottom: "1px solid #d3d3d3",
              }}
            >
              Type: {slot.type || "Natural Science"}
            </th>
          </tr>
          <tr>
            <th
              style={{
                padding: "12px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                textAlign: "center",
                width: "20%",
              }}
            >
              Course Code
            </th>
            <th
              style={{
                padding: "12px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                textAlign: "center",
                width: "40%",
              }}
            >
              Course Name
            </th>
            <th
              style={{
                padding: "12px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                textAlign: "center",
                width: "20%",
              }}
            >
              Credits
            </th>
          </tr>
        </thead>
        <tbody>
          {slot.courses.map((course) => (
            <tr key={`${slot.id}-${course.code}`}>
              <td
                style={{
                  padding: "15px 20px",
                  textAlign: "center",
                  color: "#3498db",
                  backgroundColor: "#ffffff",
                  borderRight: "1px solid #d3d3d3",
                  borderBottom: "1px solid #d3d3d3",
                }}
              >
                <a
                  href={`/programme_curriculum/student_course/${course.id}`}
                  style={{ textDecoration: "none" }}
                >
                  {course.code}
                </a>
              </td>
              <td
                style={{
                  padding: "15px 20px",
                  textAlign: "left",
                  backgroundColor: "#ffffff",
                  borderRight: "1px solid #d3d3d3",
                  borderBottom: "1px solid #d3d3d3",
                }}
              >
                {course.name}
              </td>
              <td
                style={{
                  padding: "15px 20px",
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                  borderRight: "1px solid #d3d3d3",
                  borderBottom: "1px solid #d3d3d3",
                }}
              >
                {course.credits}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    ));

  return (
    <Container
      style={{ padding: "20px", minHeight: "100vh", maxWidth: "100%" }}
    >
      {/* Tabs for Semester Info and Course Slots */}
      <Flex mb={20}>
        <Button
          variant={activeTab === 0 ? "filled" : "outline"}
          onClick={() => setActiveTab(0)}
          style={{ marginRight: "10px" }}
        >
          Semester {semesterData?.semester_no || "1"} Info
        </Button>
        <Button
          variant={activeTab === 1 ? "filled" : "outline"}
          onClick={() => setActiveTab(1)}
        >
          Semester {semesterData?.semester_no || "1"} Course Slots
        </Button>
      </Flex>

      {/* Conditional Rendering for Semester Info Tab */}
      {activeTab === 0 && semesterData && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Semester Information Table */}
          <div>
            <Table
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #d3d3d3",
                width: "65vw",
              }}
            >
              <tbody>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#ffffff",
                      textAlign: "center",
                      fontWeight: "bold",
                      borderBottom: "1px solid #d3d3d3",
                    }}
                  >
                    {curriculum || "CSE UG Curriculum v1.0"}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#ffffff",
                      textAlign: "center",
                      fontWeight: "bold",
                      borderBottom: "1px solid #d3d3d3",
                    }}
                  >
                    Semester: {semesterData.semester_no}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#C5E2F6",
                      color: "#3498db",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRight: "1px solid #d3d3d3",
                    }}
                  >
                    Instigate Semester
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#C5E2F6",
                      color: semesterData.instigate_semester ? "green" : "red",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {semesterData.instigate_semester ? "Active" : "Not Yet"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#ffffff",
                      color: "#3498db",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRight: "1px solid #d3d3d3",
                    }}
                  >
                    Start Semester Date
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#ffffff",
                      textAlign: "center",
                    }}
                  >
                    {semesterData.start_semester || "None"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#C5E2F6",
                      color: "#3498db",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRight: "1px solid #d3d3d3",
                    }}
                  >
                    End Semester Date
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#C5E2F6",
                      textAlign: "center",
                    }}
                  >
                    {semesterData.end_semester || "None"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#ffffff",
                      color: "#3498db",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRight: "1px solid #d3d3d3",
                    }}
                  >
                    Registration Start Date
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#ffffff",
                      textAlign: "center",
                    }}
                  >
                    {semesterData.registration_start || "None"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#C5E2F6",
                      color: "#3498db",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRight: "1px solid #d3d3d3",
                    }}
                  >
                    Registration End Date
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#C5E2F6",
                      textAlign: "center",
                    }}
                  >
                    {semesterData.registration_end || "None"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}

      {/* Conditional Rendering for Course Slots Tab */}
      {activeTab === 1 && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {courseSlots.length > 0 ? (
            renderCourseTables(courseSlots)
          ) : (
            <div>No course slots available.</div>
          )}
        </div>
      )}
    </Container>
  );
}

StudSemesterInfo.propTypes = {
  curriculum: PropTypes.string.isRequired,
};
