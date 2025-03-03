import { Button, Card, Grid, Table, Text } from "@mantine/core";
import React from "react";

function CourseDetail() {
  const courseDetails = {
    createdBy: "atul",
    code: "CS101",
    name: "Introduction to Computer Science",
    version: "1.0",
    contactHours: {
      lecture: "3hrs",
      tutorial: "1hr",
      lab: "2hrs",
      discussion: "1hr",
      project: "1hr",
    },
    credits: "3",
    // prerequisites: 'None',
    prerequisites: { Info: "none", Courses: "none" },
    syllabus: `Introduction to Computer Science, Programming Fundamentals, Data Structures, Algorithms, Basic OOP Concepts.`,
    evaluationSchema: {
      quiz1: "5%",
      midSem: "25%",
      quiz2: "5%",
      endSem: "40%",
      project: "10%",
      labEvaluation: "10%",
      attendance: "5%",
    },
    references: [
      "Introduction to Computer Science by John Doe",
      "Data Structures and Algorithms by Jane Smith",
      "Object-Oriented Programming in Java by Alan Turing",
    ],
  };

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
                    {courseDetails.contactHours.lecture}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.contactHours.tutorial}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.contactHours.lab}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.contactHours.discussion}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.contactHours.project}
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
                    {courseDetails.prerequisites.Info}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.prerequisites.Courses}
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
                    {courseDetails.evaluationSchema.quiz1}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.midSem}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.quiz2}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.endSem}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.project}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.labEvaluation}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.attendance}
                  </td>
                </tr>
              </tr>

              <tr>
                <td style={{ color: "blue", fontWeight: "bold" }}>
                  References & Books
                </td>
                <td>
                  {courseDetails.references.map((reference, index) => (
                    <div key={index}>{reference}</div>
                  ))}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>

        {/* Buttons Grid */}
        <Grid className="button-grid" style={{ margin: "0 3vw 0 1vw" }}>
          <Grid.Col span={15}>
            <a
              href={`/programme_curriculum/faculty_forward_form?course=${courseDetails.code}`}
              style={{ textDecoration: "none" }}
            >
              <Button fullWidth variant="filled" color="blue">
                EDIT COURSE
              </Button>
            </a>
          </Grid.Col>
        </Grid>
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
