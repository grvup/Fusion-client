import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Card, Text } from "@mantine/core";
import { fetchCourseDetails } from "./api/api";

function CourseDetail() {
  // Fetch course data from the backend
  const { id } = useParams(); // Extract the course ID from the URL
  const [courseDetails, setCourseDetails] = useState(null); // State to hold course data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const loadCourseDetails = async () => {
      try {
        const data = await fetchCourseDetails(id); // Fetch course details
        setCourseDetails(data); // Update the state with the fetched data
      } catch (err) {
        setError("Failed to load course details."); // Set error message in case of failure
      } finally {
        setLoading(false); // End loading state
      }
    };

    loadCourseDetails(); // Call the fetch function when the component mounts
  }, [id]);

  console.log(courseDetails);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // If no course details are found, return a message
  if (!courseDetails) return <div>No course found!</div>;

  return (
    <div
      className="course-detail-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Course Details Card */}
      <div style={{ display: "flex" }}>
        <Card shadow="sm" padding="lg" className="course-card">
          <Text size="lg" weight={700} className="course-title">
            {courseDetails.code} - {courseDetails.name} - v
            {courseDetails.version}
          </Text>
          {/* <hr style={{ width: "80%" }} /> */}

          {/* <Text size='lg' padding="lg" className='course-title'>
            Course Proposal Form by - {file1Data.createdBy}
          </Text> */}

          <Table className="course-table" striped highlightOnHover>
            <tbody>
              <tr>
                <td style={{ width: "50%", color: "blue", fontWeight: "bold" }}>
                  Course Code
                </td>
                <td style={{ width: "50%" }}>{courseDetails.code}</td>
              </tr>
              <tr>
                <td style={{ color: "blue", fontWeight: "bold" }}>
                  Course Name
                </td>
                <td>{courseDetails.name}</td>
              </tr>
              <tr>
                <td style={{ color: "blue", fontWeight: "bold" }}>Version</td>
                <td>{courseDetails.version}</td>
              </tr>

              <tr>
                <td style={{ padding: "0" }}>
                  <tr>
                    <td
                      rowSpan="5"
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      contactHours
                    </td>
                    <td
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Lecture
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Tutorial
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Lab
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Discussion
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Project
                    </td>
                  </tr>
                </td>

                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.lecture_hours}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.tutorial_hours}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.pratical_hours}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.discussion_hours}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.project_hours}
                  </td>
                </tr>
              </tr>
              <tr>
                <td style={{ color: "blue", fontWeight: "bold" }}>Credits</td>
                <td>{courseDetails.credits}</td>
              </tr>

              <tr>
                <td style={{ padding: "0" }}>
                  <tr>
                    <td
                      rowSpan="2"
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Pre-requisites
                    </td>
                    <td
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Info
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Courses
                    </td>
                  </tr>
                </td>

                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.pre_requisits}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.prerequisites_courses}
                  </td>
                </tr>
              </tr>

              <tr>
                <td style={{ color: "blue", fontWeight: "bold" }}>Syllabus</td>
                <td>{courseDetails.syllabus}</td>
              </tr>

              <tr>
                <td style={{ padding: "0" }}>
                  <tr>
                    <td
                      rowSpan="7"
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Evaluation Schema
                    </td>
                    <td
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Quiz-1
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Mid-Sem-Exam
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Quiz-2
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      End-Sem-Exam
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Project
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Lab
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Course Attendance
                    </td>
                  </tr>
                </td>

                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.percent_quiz_1}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.percent_midsem}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.percent_quiz_2}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.percent_endsem}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.percent_project}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.percent_lab_evaluation}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.percent_course_attendance}
                  </td>
                </tr>
              </tr>

              <tr>
                <td style={{ color: "blue", fontWeight: "bold" }}>
                  References & Books
                </td>
                <td>{courseDetails.ref_books}</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </div>
      <style>{`
        .course-detail-container {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 20px;
        }

        .button-grid {

        }

        .course-card {
          flex: 1;
          background-color: white;
          border-radius: 8px;
          padding: 20px;
        }

        .course-title {
          text-align: center;
          margin-bottom: 20px;
          color: #2c3e50;
        }

        .course-table {
          width: 100%;
          margin-bottom: 20px;
          border-collapse: collapse;
        }

        .course-table td {
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
        }

        .contact-hours, .evaluation-schema {
          display: flex;
          flex-direction: column;
        }

        .contact-row, .evaluation-row {
          padding: 8px;
          border: 1px solid gray;
          background-color: #f8f9fa;
        }

        .course-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }
      `}</style>
    </div>
  );
}
export default CourseDetail;
